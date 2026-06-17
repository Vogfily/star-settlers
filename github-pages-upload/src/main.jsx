const { useEffect, useMemo, useRef, useState } = React;

function Icon({ label }) {
  return <span className="icon" aria-hidden="true">{label}</span>;
}

const Copy = () => <Icon label="⧉" />;
const Dice5 = () => <Icon label="⚄" />;
const Orbit = () => <Icon label="◎" />;
const RadioTower = () => <Icon label="⌁" />;
const Rocket = () => <Icon label="↗" />;
const Satellite = () => <Icon label="◉" />;
const Shuffle = () => <Icon label="⇄" />;
const Swords = () => <Icon label="!" />;
const Undo2 = () => <Icon label="✓" />;

const RESOURCES = {
  rock: { name: "レアメタル", terrain: "鉱物次元", color: "#a3544a" },
  rare: { name: "ナノマシン", terrain: "機械次元", color: "#64748b" },
  material: { name: "建材", terrain: "熱帯次元", color: "#2f855a" },
  nano: { name: "皮革", terrain: "大草原", color: "#7c9a3e" },
  food: { name: "穀物", terrain: "肥沃な大地", color: "#d5a11e" },
};

const RESOURCE_KEYS = Object.keys(RESOURCES);
const PLAYERS = [
  { id: 0, name: "Player A", color: "#ff5d73" },
  { id: 1, name: "Player B", color: "#31b6c4" },
  { id: 2, name: "Player C", color: "#f6b642" },
  { id: 3, name: "Player D", color: "#8b7cf6" },
];

const COSTS = {
  route: { rock: 1, material: 1 },
  planet: { rock: 1, material: 1, nano: 1, food: 1 },
  star: { rare: 3, food: 2 },
  frontier: { rare: 1, nano: 1, food: 1 },
};

const BUILD_LIMITS = {
  route: 15,
  planet: 5,
  star: 4,
};

const DEV_DECK = [
  ...Array(14).fill("tv"),
  ...Array(2).fill("route"),
  ...Array(2).fill("collect"),
  ...Array(2).fill("plenty"),
  ...Array(5).fill("point"),
];

const DEV_NAMES = {
  tv: "TVA",
  route: "領界路開通",
  collect: "押収",
  plenty: "補給衛星",
  point: "勝利記録",
};

const FIXED_SPACEPORTS = [
  { tileNumber: 3, side: "upperLeft", type: null },
  { tileNumber: 8, side: "left", type: null },
  { tileNumber: 16, side: "right", type: null },
  { tileNumber: 19, side: "lowerRight", type: null },
  { tileNumber: 2, side: "upperLeft", type: "rare" },
  { tileNumber: 4, side: "upperLeft", type: "nano" },
  { tileNumber: 7, side: "right", type: "nano" },
  { tileNumber: 13, side: "lowerLeft", type: "material" },
  { tileNumber: 18, side: "lowerLeft", type: "rock" },
];

const HEX_SIDE_INDEX = {
  right: 0,
  lowerRight: 1,
  lowerLeft: 2,
  left: 3,
  upperLeft: 4,
  upperRight: 5,
};

const BUILD_LABEL = {
  route: "領界路",
  planet: "小都市",
  star: "大都市",
  frontier: "未知への旅",
};

const TILE_SETUP = [
  "material",
  "nano",
  "rock",
  "food",
  "rare",
  "rock",
  "food",
  "material",
  "nano",
  "desert",
  "material",
  "rare",
  "material",
  "food",
  "nano",
  "rock",
  "rare",
  "food",
  "nano",
];
const RESOURCE_TILE_SETUP = TILE_SETUP.filter((tile) => tile !== "desert");
const FIXED_NUMBER_BY_TILE = {
  1: 11,
  2: 12,
  3: 9,
  4: 4,
  5: 6,
  6: 5,
  7: 10,
  8: null,
  9: 3,
  10: 11,
  11: 4,
  12: 8,
  13: 8,
  14: 10,
  15: 9,
  16: 3,
  17: 5,
  18: 2,
  19: 6,
};
const NEUTRON_TILE_NUMBER = 8;
const HEX_COORDS = [];
for (let q = -2; q <= 2; q += 1) {
  const r1 = Math.max(-2, -q - 2);
  const r2 = Math.min(2, -q + 2);
  for (let r = r1; r <= r2; r += 1) HEX_COORDS.push({ q, r });
}

const HEX_SIZE = 54;
const CENTER = { x: 360, y: 340 };
const EPS = 8;

function mulberry32(seed) {
  return function random() {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hashString(input) {
  let hash = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function shuffle(items, random) {
  const next = [...items];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

function hexToPixel(q, r) {
  return {
    x: CENTER.x + HEX_SIZE * Math.sqrt(3) * (q + r / 2),
    y: CENTER.y + HEX_SIZE * 1.5 * r,
  };
}

function pointKey(point) {
  return `${Math.round(point.x / EPS)}:${Math.round(point.y / EPS)}`;
}

function edgeKey(a, b) {
  return [a, b].sort().join("|");
}

function addRes(target, key, amount) {
  if (!key || key === "desert") return;
  target[key] = (target[key] || 0) + amount;
}

function emptyResources(value = 0) {
  return Object.fromEntries(RESOURCE_KEYS.map((key) => [key, value]));
}

function totalResources(resources) {
  return RESOURCE_KEYS.reduce((sum, key) => sum + Number(resources[key] || 0), 0);
}

function hasResources(player, resources) {
  return RESOURCE_KEYS.every((key) => (player.resources[key] || 0) >= Number(resources[key] || 0));
}

function moveResources(from, to, resources) {
  RESOURCE_KEYS.forEach((key) => {
    const amount = Number(resources[key] || 0);
    from.resources[key] -= amount;
    to.resources[key] += amount;
  });
}

function cleanBundle(resources) {
  return Object.fromEntries(RESOURCE_KEYS.map((key) => [key, Math.max(0, Number(resources[key] || 0))]));
}

function bundleText(resources) {
  const parts = RESOURCE_KEYS.filter((key) => Number(resources[key] || 0) > 0).map((key) => `${RESOURCES[key].name}${resources[key]}`);
  return parts.length ? parts.join(" + ") : "なし";
}

function bundleSignature(resources) {
  return RESOURCE_KEYS.filter((key) => Number(resources[key] || 0) > 0).join("+") || "none";
}

function offerSignature(offer) {
  return `${bundleSignature(offer.turnGives)}=>${bundleSignature(offer.partnerGives)}`;
}

function isGiftOffer(offer) {
  return totalResources(offer.turnGives) === 0 || totalResources(offer.partnerGives) === 0;
}

function isBetterOffer(candidate, current, usedCombos = []) {
  const candidateTurnGives = totalResources(candidate.turnGives);
  const candidatePartnerGives = totalResources(candidate.partnerGives);
  const currentTurnGives = totalResources(current.turnGives);
  const currentPartnerGives = totalResources(current.partnerGives);
  const sameTurnCost = candidateTurnGives === currentTurnGives;
  const samePartnerPay = candidatePartnerGives === currentPartnerGives;
  const lowerTurnCost = candidateTurnGives < currentTurnGives;
  const higherPartnerPay = candidatePartnerGives > currentPartnerGives;
  const newCombo = !usedCombos.includes(offerSignature(candidate));

  if (samePartnerPay && lowerTurnCost) return true;
  if (sameTurnCost && higherPartnerPay) return true;
  return newCombo && candidateTurnGives <= currentTurnGives && candidatePartnerGives >= currentPartnerGives && (lowerTurnCost || higherPartnerPay);
}

function canPlayerOffer(state, partnerId, offer) {
  const turnPlayer = state.players[state.turn];
  const partner = state.players[partnerId];
  return !isGiftOffer(offer) && hasResources(turnPlayer, offer.turnGives) && hasResources(partner, offer.partnerGives);
}

function canPotentiallyIntervene(state, playerId) {
  const negotiation = state.negotiation;
  if (!negotiation || playerId === negotiation.turnPlayer || playerId === negotiation.partner) return false;
  const current = negotiation.currentOffer;
  const turnPlayer = state.players[negotiation.turnPlayer];
  const player = state.players[playerId];
  const turnCost = totalResources(current.turnGives);
  const partnerPay = totalResources(current.partnerGives);
  const playerCards = totalResources(player.resources);

  if (turnCost > 1 && hasResources(turnPlayer, current.turnGives) && hasResources(player, current.partnerGives)) return true;
  if (playerCards > partnerPay && hasResources(turnPlayer, current.turnGives)) return true;
  return false;
}

function spaceportName(type) {
  return type ? `${RESOURCES[type].name} 2:1` : "3:1";
}

function visualTileNumberMap() {
  return new Map(
    [...HEX_COORDS]
      .sort((a, b) => (a.r === b.r ? hexToPixel(a.q, a.r).x - hexToPixel(b.q, b.r).x : a.r - b.r))
      .map((coord, index) => [`${coord.q}:${coord.r}`, index + 1])
  );
}

function makeBoard(seedText) {
  const random = mulberry32(hashString(seedText));
  const boardNumbers = visualTileNumberMap();
  const shuffledResources = shuffle(RESOURCE_TILE_SETUP, random);
  const vertices = new Map();
  const edges = new Map();
  const tiles = HEX_COORDS.map((coord, index) => {
    const center = hexToPixel(coord.q, coord.r);
    const boardNumber = boardNumbers.get(`${coord.q}:${coord.r}`);
    const terrain = boardNumber === NEUTRON_TILE_NUMBER ? "desert" : shuffledResources.pop();
    const number = FIXED_NUMBER_BY_TILE[boardNumber] ?? null;
    const corners = Array.from({ length: 6 }, (_, i) => {
      const angle = (Math.PI / 180) * (60 * i - 30);
      const point = {
        x: center.x + HEX_SIZE * Math.cos(angle),
        y: center.y + HEX_SIZE * Math.sin(angle),
      };
      const key = pointKey(point);
      if (!vertices.has(key)) vertices.set(key, { id: key, x: point.x, y: point.y, tiles: [] });
      vertices.get(key).tiles.push(index);
      return key;
    });
    for (let i = 0; i < 6; i += 1) {
      const key = edgeKey(corners[i], corners[(i + 1) % 6]);
      if (!edges.has(key)) edges.set(key, { id: key, a: corners[i], b: corners[(i + 1) % 6], tiles: [] });
      edges.get(key).tiles.push(index);
    }
    return { id: index, boardNumber, ...coord, center, terrain, number, corners };
  });

  const vertexList = [...vertices.values()];
  const edgeList = [...edges.values()];
  const adjacency = {};
  const incidentEdges = {};
  vertexList.forEach((v) => {
    adjacency[v.id] = new Set();
    incidentEdges[v.id] = [];
  });
  edgeList.forEach((e) => {
    adjacency[e.a].add(e.b);
    adjacency[e.b].add(e.a);
    incidentEdges[e.a].push(e.id);
    incidentEdges[e.b].push(e.id);
  });
  const spaceports = FIXED_SPACEPORTS.map((spaceport, index) => {
      const tile = tiles.find((item) => item.boardNumber === spaceport.tileNumber);
      const sideIndex = HEX_SIDE_INDEX[spaceport.side];
      const aId = tile.corners[sideIndex];
      const bId = tile.corners[(sideIndex + 1) % 6];
      const edge = edges.get(edgeKey(aId, bId));
      const type = spaceport.type;
      const a = vertices.get(edge.a);
      const b = vertices.get(edge.b);
      const x = (a.x + b.x) / 2;
      const y = (a.y + b.y) / 2;
      const dx = x - CENTER.x;
      const dy = y - CENTER.y;
      const length = Math.hypot(dx, dy) || 1;
      return {
        id: `spaceport-${index}`,
        edgeId: edge.id,
        vertices: [edge.a, edge.b],
        type,
        tileNumber: spaceport.tileNumber,
        side: spaceport.side,
        x,
        y,
        labelX: x + (dx / length) * 42,
        labelY: y + (dy / length) * 42,
      };
    });

  return {
    tiles,
    vertices: vertexList,
    edges: edgeList,
    spaceports,
    adjacency: Object.fromEntries(Object.entries(adjacency).map(([k, v]) => [k, [...v]])),
    incidentEdges,
  };
}

function createGame(roomId = crypto.randomUUID().slice(0, 8)) {
  const board = makeBoard(roomId);
  const neutron = board.tiles.find((tile) => tile.terrain === "desert")?.id ?? 9;
  return {
    id: roomId,
    board,
    players: PLAYERS.map((player) => ({
      ...player,
      isCpu: false,
      resources: emptyResources(),
      hiddenNewFrontiers: [],
      playedNewFrontiers: [],
      frontierPlayedTurn: null,
      playedTv: 0,
      bonus: { longest: false, largestTv: false },
    })),
    buildings: {},
    routes: {},
    deck: shuffle(DEV_DECK, mulberry32(hashString(`${roomId}:deck`))),
    discard: [],
    turn: 0,
    turnCount: 0,
    phase: "setup",
    turnStage: "setup",
    setupStep: 0,
    setupOrder: [0, 1, 2, 3, 3, 2, 1, 0],
    setupPendingVertex: null,
    action: "planet",
    dice: null,
    rolled: false,
    criminalTile: neutron,
    selectedTile: neutron,
    negotiation: null,
    pendingDiscards: {},
    pendingSteal: null,
    criminalMover: null,
    privateMessages: [],
    log: ["領界の準備が整いました。小都市と領界路を初期配置してください。"],
    winner: null,
  };
}

function canAfford(player, cost) {
  return Object.entries(cost).every(([key, amount]) => (player.resources[key] || 0) >= amount);
}

function pay(player, cost) {
  Object.entries(cost).forEach(([key, amount]) => {
    player.resources[key] -= amount;
  });
}

function resourceText(resources) {
  return RESOURCE_KEYS.map((key) => `${RESOURCES[key].name}${resources[key] || 0}`).join(" / ");
}

function visibleResourceText(player, viewerId) {
  if (player.id === viewerId) return resourceText(player.resources);
  return `資源 ${totalResources(player.resources)}枚`;
}

function frontierType(card) {
  return typeof card === "string" ? card : card.type;
}

function frontierBoughtTurn(card) {
  return typeof card === "string" ? -1 : card.boughtTurn;
}

function canPlayFrontier(card, state) {
  return frontierBoughtTurn(card) < state.turnCount;
}

function publicPlayedFrontiers(player) {
  const played = player.playedNewFrontiers || [];
  if (!played.length) return "使用済みなし";
  const counts = played.reduce((acc, type) => {
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});
  return Object.entries(counts).map(([type, count]) => `${DEV_NAMES[type]}${count}`).join(" / ");
}

function playerSpaceports(state, playerId) {
  return state.board.spaceports.filter((spaceport) =>
    spaceport.vertices.some((vertexId) => state.buildings[vertexId]?.player === playerId)
  );
}

function tradeRateFor(state, playerId, give) {
  const ports = playerSpaceports(state, playerId);
  if (ports.some((port) => port.type === give)) return 2;
  if (ports.some((port) => port.type === null)) return 3;
  return 4;
}

function spaceportText(state, playerId) {
  const ports = playerSpaceports(state, playerId);
  if (!ports.length) return "次元門なし";
  return ports.map((port) => spaceportName(port.type)).join(" / ");
}

function currentPlayer(state) {
  const active = state.phase === "setup" ? state.setupOrder[state.setupStep] : state.turn;
  return state.players[active];
}

function isCpuPlayer(state, playerId) {
  return Boolean(state.players[playerId]?.isCpu);
}

function phaseLabel(state) {
  if (state.phase === "setup") return "初期配置";
  if (state.turnStage === "roll") return "サイコロ";
  if (state.turnStage === "production") return "資源獲得";
  return "メインフェーズ";
}

function isMainPhase(state) {
  return state.phase === "play" && state.turnStage === "main";
}

function numberWeight(number) {
  return ({ 6: 5, 8: 5, 5: 4, 9: 4, 4: 3, 10: 3, 3: 2, 11: 2, 2: 1, 12: 1 })[number] || 0;
}

function playerResourceCoverage(state, playerId) {
  const coverage = new Set();
  state.board.vertices.forEach((vertex) => {
    const building = state.buildings[vertex.id];
    if (building?.player !== playerId) return;
    vertex.tiles.forEach((tileId) => {
      const terrain = state.board.tiles[tileId].terrain;
      if (terrain !== "desert") coverage.add(terrain);
    });
  });
  return coverage;
}

function vertexScore(state, vertexId, playerId) {
  const vertex = state.board.vertices.find((item) => item.id === vertexId);
  if (!vertex) return -999;
  const coverage = playerResourceCoverage(state, playerId);
  let score = 0;
  vertex.tiles.forEach((tileId) => {
    const tile = state.board.tiles[tileId];
    if (tile.terrain === "desert") return;
    score += numberWeight(tile.number) * 2;
    if (!coverage.has(tile.terrain)) score += 3;
    if (tile.id === state.criminalTile) score -= 2;
  });
  if (state.board.spaceports.some((spaceport) => spaceport.vertices.includes(vertexId))) score += 3;
  return score;
}

function bestPlanetVertex(state, playerId) {
  return state.board.vertices
    .filter((vertex) => canBuildPlanet(state, vertex.id, playerId))
    .map((vertex) => ({ id: vertex.id, score: vertexScore(state, vertex.id, playerId) }))
    .sort((a, b) => b.score - a.score)[0]?.id || null;
}

function bestStarVertex(state, playerId) {
  return state.board.vertices
    .filter((vertex) => state.buildings[vertex.id]?.player === playerId && state.buildings[vertex.id]?.type === "planet")
    .map((vertex) => ({ id: vertex.id, score: vertexScore(state, vertex.id, playerId) }))
    .sort((a, b) => b.score - a.score)[0]?.id || null;
}

function bestRouteEdge(state, playerId, free = false) {
  return state.board.edges
    .filter((edge) => canBuildRoute(state, edge.id, playerId, free))
    .map((edge) => ({
      id: edge.id,
      score: Math.max(vertexScore(state, edge.a, playerId), vertexScore(state, edge.b, playerId)) + (state.phase === "setup" ? 4 : 0),
    }))
    .sort((a, b) => b.score - a.score)[0]?.id || null;
}

function discardForCpu(player, need) {
  const bundle = emptyResources();
  for (let i = 0; i < need; i += 1) {
    const key = RESOURCE_KEYS
      .filter((resource) => (player.resources[resource] || 0) - (bundle[resource] || 0) > 0)
      .sort((a, b) => ((player.resources[b] || 0) - (bundle[b] || 0)) - ((player.resources[a] || 0) - (bundle[a] || 0)))[0];
    if (!key) break;
    bundle[key] += 1;
  }
  return bundle;
}

function bestCriminalTile(state, actor) {
  const leaderIds = state.players
    .filter((player) => player.id !== actor)
    .map((player) => ({ id: player.id, vp: getVp(state, player.id) }))
    .sort((a, b) => b.vp - a.vp)
    .map((entry) => entry.id);
  const candidates = state.board.tiles
    .filter((tile) => tile.id !== state.criminalTile && tile.terrain !== "desert")
    .map((tile) => {
      const adjacentPlayers = [...new Set(tile.corners.map((vertexId) => state.buildings[vertexId]?.player).filter((id) => id !== undefined))];
      const hitsOpponent = adjacentPlayers.filter((id) => id !== actor).length;
      const hitsSelf = adjacentPlayers.includes(actor) ? 1 : 0;
      const leaderBonus = adjacentPlayers.reduce((sum, id) => sum + Math.max(0, 4 - leaderIds.indexOf(id)), 0);
      return { id: tile.id, score: numberWeight(tile.number) * 3 + hitsOpponent * 5 + leaderBonus - hitsSelf * 8 };
    })
    .sort((a, b) => b.score - a.score);
  return candidates[0]?.id ?? state.board.tiles.find((tile) => tile.id !== state.criminalTile)?.id ?? state.criminalTile;
}

function bestStealVictim(state, victimIds) {
  return [...victimIds]
    .map((id) => ({ id, vp: getVp(state, id), cards: totalResources(state.players[id].resources) }))
    .sort((a, b) => b.vp - a.vp || b.cards - a.cards)[0]?.id ?? victimIds[0];
}

function findCpuBankTrade(state, playerId, cost) {
  const player = state.players[playerId];
  if (canAfford(player, cost)) return null;
  const deficits = RESOURCE_KEYS.filter((key) => (player.resources[key] || 0) < (cost[key] || 0));
  for (const take of deficits) {
    for (const give of RESOURCE_KEYS) {
      if (give === take) continue;
      const rate = tradeRateFor(state, playerId, give);
      const afterGive = { ...player.resources, [give]: (player.resources[give] || 0) - rate, [take]: (player.resources[take] || 0) + 1 };
      if ((player.resources[give] || 0) >= rate && RESOURCE_KEYS.every((key) => (afterGive[key] || 0) >= (cost[key] || 0))) {
        return { give, take };
      }
    }
  }
  return null;
}

function bestCpuCollectResource(state, playerId) {
  const needOrder = ["rare", "food", "rock", "material", "nano"];
  return needOrder
    .map((key) => ({
      key,
      score: state.players.reduce((sum, player) => player.id === playerId ? sum : sum + (player.resources[key] || 0), 0),
    }))
    .sort((a, b) => b.score - a.score)[0]?.key || "rare";
}

function nextCpuEvent(state) {
  if (state.action === "discard") {
    const cpuDiscard = pendingDiscardEntries(state).find(([playerId]) => isCpuPlayer(state, Number(playerId)));
    if (cpuDiscard) {
      const playerId = Number(cpuDiscard[0]);
      return { type: "discardResources", resources: discardForCpu(state.players[playerId], Number(cpuDiscard[1])), playerId };
    }
  }
  const active = currentPlayer(state);
  if (!active?.isCpu || state.winner !== null || state.negotiation) return null;
  const playerId = active.id;
  const player = state.players[playerId];

  if (state.phase === "setup") {
    if (state.action === "planet") {
      const vertexId = bestPlanetVertex(state, playerId);
      return vertexId ? { type: "vertex", vertexId, playerId } : null;
    }
    if (state.action === "route") {
      const edgeId = bestRouteEdge(state, playerId);
      return edgeId ? { type: "edge", edgeId, playerId } : null;
    }
  }

  if (state.phase !== "play" || state.turn !== playerId) return null;
  if (state.action === "discard") {
    const need = Number(state.pendingDiscards?.[playerId] || 0);
    if (need > 0) return { type: "discardResources", resources: discardForCpu(player, need), playerId };
    return null;
  }
  if (state.action === "criminal" && (state.criminalMover ?? playerId) === playerId) {
    return { type: "selectTile", tileId: bestCriminalTile(state, playerId), playerId };
  }
  if (state.action === "steal" && state.pendingSteal?.thief === playerId) {
    return { type: "stealResource", victimId: bestStealVictim(state, state.pendingSteal.victims), playerId };
  }
  if (!state.rolled) return { type: "roll", playerId };
  if (!isMainPhase(state)) return null;

  const playable = player.hiddenNewFrontiers.find((card) => frontierType(card) !== "point" && canPlayFrontier(card, state));
  if (playable && player.frontierPlayedTurn !== state.turnCount) {
    const type = frontierType(playable);
    if (type === "tv") return { type: "playDev", card: "tv", playerId };
    if (type === "collect") return { type: "playDev", card: "collect", resource: bestCpuCollectResource(state, playerId), playerId };
    if (type === "plenty") return { type: "playDev", card: "plenty", a: "rare", b: "food", playerId };
    if (type === "route" && bestRouteEdge(state, playerId, true)) return { type: "playDev", card: "route", playerId };
  }
  if (state.action === "freeRoute") {
    const edgeId = bestRouteEdge(state, playerId, true);
    return edgeId ? { type: "edge", edgeId, free: true, playerId } : { type: "setAction", action: "build", playerId };
  }

  const starId = bestStarVertex(state, playerId);
  if (starId && canAfford(player, COSTS.star)) return { type: "setAction", action: "star", playerId, follow: { type: "vertex", vertexId: starId, playerId } };
  const planetId = bestPlanetVertex(state, playerId);
  if (planetId && canAfford(player, COSTS.planet)) return { type: "setAction", action: "planet", playerId, follow: { type: "vertex", vertexId: planetId, playerId } };
  const routeId = bestRouteEdge(state, playerId);
  if (routeId && canAfford(player, COSTS.route)) return { type: "setAction", action: "route", playerId, follow: { type: "edge", edgeId: routeId, playerId } };
  if (canAfford(player, COSTS.frontier) && state.deck.length) return { type: "buyDev", playerId };

  const tradeTarget = [COSTS.star, COSTS.planet, COSTS.route, COSTS.frontier].map((cost) => findCpuBankTrade(state, playerId, cost)).find(Boolean);
  if (tradeTarget) return { type: "bankTrade", ...tradeTarget, playerId };
  return { type: "endTurn", playerId };
}

function addLog(state, text) {
  state.log = [text, ...state.log].slice(0, 8);
}

function addPrivateMessage(state, playerId, text) {
  state.privateMessages = [{ to: playerId, text }, ...(state.privateMessages || [])].slice(0, 16);
}

function discardRequirement(player) {
  const total = totalResources(player.resources);
  return total >= 8 ? Math.floor(total / 2) : 0;
}

function pendingDiscardEntries(state) {
  return Object.entries(state.pendingDiscards || {}).filter(([, value]) => value > 0);
}

function adjacentStealVictims(state, tileId, thiefId) {
  const tile = state.board.tiles[tileId];
  if (!tile) return [];
  return [...new Set(
    tile.corners
      .map((vertexId) => state.buildings[vertexId]?.player)
      .filter((playerId) => playerId !== undefined && playerId !== thiefId && totalResources(state.players[playerId].resources) > 0)
  )];
}

function randomResourceKey(resources) {
  const pool = RESOURCE_KEYS.flatMap((key) => Array(Number(resources[key] || 0)).fill(key));
  return pool.length ? pool[Math.floor(Math.random() * pool.length)] : null;
}

function startCriminalMove(state, actor) {
  state.action = "criminal";
  state.turnStage = "production";
  state.criminalMover = actor;
  state.selectedTile = state.criminalTile;
}

function finishCriminalMove(state, actor, tileId) {
  if (tileId === state.criminalTile) return false;
  state.criminalTile = tileId;
  addLog(state, `ラヴェジャーズが${tileName(state.board.tiles[tileId])}へ移動しました。`);
  const victims = adjacentStealVictims(state, tileId, actor);
  if (victims.length) {
    state.pendingSteal = { thief: actor, victims };
    state.action = "steal";
    addLog(state, `${state.players[actor].name} が奪う相手を選びます。`);
  } else {
    state.pendingSteal = null;
    state.criminalMover = null;
    if (state.rolled) {
      state.turnStage = "main";
      state.action = "build";
    } else {
      state.turnStage = "roll";
      state.action = "roll";
    }
  }
  return true;
}

function getVp(state, playerId) {
  const planets = Object.values(state.buildings).filter((b) => b.player === playerId && b.type === "planet").length;
  const stars = Object.values(state.buildings).filter((b) => b.player === playerId && b.type === "star").length;
  const points = state.players[playerId].hiddenNewFrontiers.filter((card) => frontierType(card) === "point").length;
  const publicPoints = (state.players[playerId].playedNewFrontiers || []).filter((card) => card === "point").length;
  const bonus = (state.players[playerId].bonus.longest ? 2 : 0) + (state.players[playerId].bonus.largestTv ? 2 : 0);
  return planets + stars * 2 + points + publicPoints + bonus;
}

function distanceRule(state, vertexId) {
  return !state.board.adjacency[vertexId].some((next) => state.buildings[next]);
}

function routeTouchesOwnNetwork(state, edge, playerId) {
  return [edge.a, edge.b].some((vertexId) => {
    const building = state.buildings[vertexId];
    if (building?.player === playerId) return true;
    if (building && building.player !== playerId) return false;
    return state.board.incidentEdges[vertexId].some((edgeId) => state.routes[edgeId]?.player === playerId);
  });
}

function canBuildRoute(state, edgeId, playerId, free = false) {
  if (state.routes[edgeId]) return false;
  if (countRoutes(state, playerId) >= BUILD_LIMITS.route) return false;
  const edge = state.board.edges.find((item) => item.id === edgeId);
  if (!edge) return false;
  if (state.phase === "setup") return state.setupPendingVertex && [edge.a, edge.b].includes(state.setupPendingVertex);
  return (free || canAfford(state.players[playerId], COSTS.route)) && routeTouchesOwnNetwork(state, edge, playerId);
}

function canBuildPlanet(state, vertexId, playerId) {
  if (state.buildings[vertexId] || !distanceRule(state, vertexId)) return false;
  if (countBuildings(state, playerId, "planet") >= BUILD_LIMITS.planet) return false;
  if (state.phase === "setup") return !state.setupPendingVertex;
  if (!canAfford(state.players[playerId], COSTS.planet)) return false;
  return state.board.incidentEdges[vertexId].some((edgeId) => state.routes[edgeId]?.player === playerId);
}

function countBuildings(state, playerId, type) {
  return Object.values(state.buildings).filter((building) => building.player === playerId && building.type === type).length;
}

function countRoutes(state, playerId) {
  return Object.values(state.routes).filter((route) => route.player === playerId).length;
}

function isBlockedVertex(state, vertexId, playerId) {
  const building = state.buildings[vertexId];
  return building && building.player !== playerId;
}

function longestRouteLength(state, playerId) {
  const ownEdges = new Set(Object.entries(state.routes).filter(([, route]) => route.player === playerId).map(([edgeId]) => edgeId));
  if (!ownEdges.size) return 0;
  const edgeById = Object.fromEntries(state.board.edges.map((edge) => [edge.id, edge]));

  function walk(vertexId, used) {
    if (isBlockedVertex(state, vertexId, playerId)) return 0;
    let best = 0;
    for (const edgeId of state.board.incidentEdges[vertexId] || []) {
      if (!ownEdges.has(edgeId) || used.has(edgeId)) continue;
      const edge = edgeById[edgeId];
      const nextVertex = edge.a === vertexId ? edge.b : edge.a;
      const nextUsed = new Set(used);
      nextUsed.add(edgeId);
      best = Math.max(best, 1 + walk(nextVertex, nextUsed));
    }
    return best;
  }

  let best = 0;
  for (const edgeId of ownEdges) {
    const edge = edgeById[edgeId];
    best = Math.max(best, 1 + walk(edge.a, new Set([edgeId])), 1 + walk(edge.b, new Set([edgeId])));
  }
  return best;
}

function refreshBonuses(state) {
  const currentLongest = state.players.find((player) => player.bonus.longest);
  const currentTv = state.players.find((player) => player.bonus.largestTv);
  const currentLongestLength = currentLongest ? longestRouteLength(state, currentLongest.id) : 4;
  const currentTvCount = currentTv ? currentTv.playedTv : 2;
  if (currentLongest && currentLongestLength < 5) {
    currentLongest.bonus.longest = false;
  }
  const routeLeader = state.players
    .map((player) => ({ id: player.id, length: longestRouteLength(state, player.id) }))
    .filter((entry) => entry.length >= 5 && entry.length > (currentLongestLength >= 5 ? currentLongestLength : 4))
    .sort((a, b) => b.length - a.length)[0];
  const tvLeader = state.players
    .map((player) => ({ id: player.id, count: player.playedTv }))
    .filter((entry) => entry.count >= 3 && entry.count > currentTvCount)
    .sort((a, b) => b.count - a.count)[0];

  if (routeLeader) {
    state.players.forEach((player) => {
      player.bonus.longest = player.id === routeLeader.id;
    });
  }
  if (tvLeader) {
    state.players.forEach((player) => {
      player.bonus.largestTv = player.id === tvLeader.id;
    });
  }
}

function produce(state, total) {
  state.turnStage = "production";
  if (total === 7) {
    const pending = Object.fromEntries(
      state.players
        .map((player) => [player.id, discardRequirement(player)])
        .filter(([, need]) => need > 0)
    );
    state.pendingDiscards = pending;
    if (pendingDiscardEntries(state).length) {
      state.action = "discard";
      addLog(state, "7が出ました。資源8枚以上のプレイヤーは半分を捨てます。");
    } else {
      addLog(state, "7が出ました。ラヴェジャーズを任意のタイルへ移動できます。");
      startCriminalMove(state, state.turn);
    }
    return;
  }
  const gained = [];
  state.board.tiles.forEach((tile) => {
    if (tile.number !== total || tile.id === state.criminalTile || tile.terrain === "desert") return;
    tile.corners.forEach((vertexId) => {
      const building = state.buildings[vertexId];
      if (!building) return;
      const amount = building.type === "star" ? 2 : 1;
      addRes(state.players[building.player].resources, tile.terrain, amount);
      gained.push(`${state.players[building.player].name}+${RESOURCES[tile.terrain].name}${amount}`);
    });
  });
  addLog(state, gained.length ? `産出 ${total}: ${gained.join(", ")}` : `産出 ${total}: 何も生まれませんでした。`);
  state.turnStage = "main";
}

function moveTurn(state) {
  refreshBonuses(state);
  const winner = state.players.find((player) => getVp(state, player.id) >= 10);
  if (winner) {
    state.winner = winner.id;
    addLog(state, `${winner.name} が10点に到達しました。`);
    return;
  }
  state.turn = (state.turn + 1) % 4;
  state.turnCount = (state.turnCount || 0) + 1;
  state.rolled = false;
  state.dice = null;
  state.turnStage = "roll";
  state.action = "roll";
  addLog(state, `${state.players[state.turn].name} のターンです。`);
}

function reducer(state, event) {
  const next = structuredClone(state);
  const actor = event.playerId ?? currentPlayer(next).id;
  const player = next.players[actor];
  if (next.winner && event.type !== "reset") return next;

  if (event.type === "reset") return createGame(event.roomId || crypto.randomUUID().slice(0, 8));
  if (event.type === "rename") {
    next.players[actor].name = event.name.slice(0, 18) || `Player ${actor + 1}`;
    return next;
  }
  if (event.type === "setCpu") {
    const targetId = Number(event.targetId);
    const target = next.players[targetId];
    if (!target) return next;
    target.isCpu = Boolean(event.isCpu);
    if (target.isCpu) {
      target.name = target.name.startsWith("CPU") ? target.name : `CPU ${String.fromCharCode(65 + targetId)}`;
      addLog(next, `${target.name} がCPUとして参加します。`);
    } else {
      target.name = target.name.startsWith("CPU") ? `Player ${targetId + 1}` : target.name;
      addLog(next, `${target.name} がプレイヤー枠に戻りました。`);
    }
    return next;
  }
  if (event.type === "setAction") {
    if (["discard", "steal"].includes(next.action)) return next;
    next.action = event.action;
    return next;
  }
  if (event.type === "selectTile") {
    next.selectedTile = event.tileId;
    if (next.action === "criminal") {
      if (event.tileId === next.criminalTile) return next;
      finishCriminalMove(next, next.criminalMover ?? actor, event.tileId);
    }
    return next;
  }
  if (event.type === "discardResources") {
    const need = Number(next.pendingDiscards?.[actor] || 0);
    const bundle = cleanBundle(event.resources || {});
    if (!need || totalResources(bundle) !== need || !hasResources(player, bundle)) return next;
    RESOURCE_KEYS.forEach((key) => {
      player.resources[key] -= bundle[key] || 0;
    });
    delete next.pendingDiscards[actor];
    addLog(next, `${player.name} が資源${need}枚を捨てました。`);
    if (!pendingDiscardEntries(next).length) {
      next.pendingDiscards = {};
      addLog(next, "全員の廃棄が完了しました。ラヴェジャーズを移動してください。");
      startCriminalMove(next, next.turn);
    } else {
      next.turnStage = "production";
    }
    return next;
  }
  if (event.type === "stealResource") {
    const pending = next.pendingSteal;
    const victimId = Number(event.victimId);
    if (!pending || actor !== pending.thief || !pending.victims.includes(victimId)) return next;
    const victim = next.players[victimId];
    const stolen = randomResourceKey(victim.resources);
    if (!stolen) return next;
    victim.resources[stolen] -= 1;
    next.players[actor].resources[stolen] += 1;
    addLog(next, `${next.players[actor].name} が ${victim.name} から資源1枚を奪いました。`);
    addPrivateMessage(next, actor, `${victim.name} から ${RESOURCES[stolen].name} を奪いました。`);
    addPrivateMessage(next, victimId, `${next.players[actor].name} に ${RESOURCES[stolen].name} を奪われました。`);
    next.pendingSteal = null;
    next.criminalMover = null;
    next.turnStage = next.rolled ? "main" : "roll";
    next.action = next.rolled ? "build" : "roll";
    return next;
  }
  if (event.type === "roll") {
    if (actor !== next.turn || next.rolled || next.phase !== "play") return next;
    const d1 = Math.floor(Math.random() * 6) + 1;
    const d2 = Math.floor(Math.random() * 6) + 1;
    next.dice = [d1, d2];
    next.rolled = true;
    produce(next, d1 + d2);
    if (next.turnStage === "main") next.action = "build";
    return next;
  }
  if (event.type === "vertex") {
    const vertexId = event.vertexId;
    if (next.phase === "setup") {
      const active = next.setupOrder[next.setupStep];
      if (actor !== active || next.action !== "planet" || !canBuildPlanet(next, vertexId, actor)) return next;
      next.buildings[vertexId] = { player: actor, type: "planet" };
      next.setupPendingVertex = vertexId;
      next.action = "route";
      addLog(next, `${player.name} が小都市を配置しました。領界路を接続してください。`);
      return next;
    }
    if (actor !== next.turn || !isMainPhase(next)) return next;
    if (next.action === "planet" && canBuildPlanet(next, vertexId, actor)) {
      pay(player, COSTS.planet);
      next.buildings[vertexId] = { player: actor, type: "planet" };
      addLog(next, `${player.name} が小都市を建設しました。`);
    } else if (next.action === "star") {
      const building = next.buildings[vertexId];
      if (building?.player === actor && building.type === "planet" && countBuildings(next, actor, "star") < BUILD_LIMITS.star && canAfford(player, COSTS.star)) {
        pay(player, COSTS.star);
        building.type = "star";
        addLog(next, `${player.name} が小都市を大都市へ強化しました。`);
      }
    }
    refreshBonuses(next);
    return next;
  }
  if (event.type === "edge") {
    const edgeId = event.edgeId;
    const free = event.free || next.action === "freeRoute";
    if (next.phase === "setup") {
      const active = next.setupOrder[next.setupStep];
      if (actor !== active || next.action !== "route" || !canBuildRoute(next, edgeId, actor)) return next;
      next.routes[edgeId] = { player: actor };
      if (next.setupStep >= 4) {
        next.board.vertices.find((v) => v.id === next.setupPendingVertex)?.tiles.forEach((tileId) => {
          addRes(player.resources, next.board.tiles[tileId].terrain, 1);
        });
      }
      next.setupPendingVertex = null;
      next.setupStep += 1;
      if (next.setupStep >= next.setupOrder.length) {
        next.phase = "play";
        next.turn = 0;
        next.rolled = false;
        next.turnStage = "roll";
        next.action = "roll";
        addLog(next, "初期配置完了。最初のプレイヤーからサイコロを振ります。");
      } else {
        next.action = "planet";
        addLog(next, `${next.players[next.setupOrder[next.setupStep]].name} が小都市を配置します。`);
      }
      return next;
    }
    if (actor !== next.turn || !isMainPhase(next) || !canBuildRoute(next, edgeId, actor, free)) return next;
    if (!free) pay(player, COSTS.route);
    next.routes[edgeId] = { player: actor };
    if (next.action === "freeRoute") {
      next.freeRoutesLeft = Math.max(0, (next.freeRoutesLeft || 1) - 1);
      if (next.freeRoutesLeft === 0) next.action = "build";
    }
    addLog(next, `${player.name} が領界路を建設しました。`);
    refreshBonuses(next);
    return next;
  }
  if (event.type === "buyDev") {
    if (actor !== next.turn || !isMainPhase(next) || !canAfford(player, COSTS.frontier) || next.deck.length === 0) return next;
    pay(player, COSTS.frontier);
    const card = next.deck.pop();
    player.hiddenNewFrontiers.push({ type: card, boughtTurn: next.turnCount || 0 });
    addLog(next, `${player.name} が未知への旅を獲得しました。`);
    return next;
  }
  if (event.type === "playDev") {
    if (player.frontierPlayedTurn === next.turnCount) return next;
    const cardIndex = player.hiddenNewFrontiers.findIndex((card) => frontierType(card) === event.card && canPlayFrontier(card, next));
    if (actor !== next.turn || !isMainPhase(next) || cardIndex < 0) return next;
    const card = player.hiddenNewFrontiers.splice(cardIndex, 1)[0];
    const type = frontierType(card);
    player.playedNewFrontiers = player.playedNewFrontiers || [];
    player.playedNewFrontiers.push(type);
    player.frontierPlayedTurn = next.turnCount;
    next.discard.push(type);
    if (type === "point") {
      addLog(next, `${player.name} が勝利記録を公開しました。`);
    }
    if (type === "tv") {
      player.playedTv += 1;
      startCriminalMove(next, actor);
      addLog(next, `${player.name} がTVAを起動。ラヴェジャーズを移動します。`);
    }
    if (type === "route") {
      next.action = "freeRoute";
      next.freeRoutesLeft = 2;
      addLog(next, `${player.name} が領界路開通を実行。無料で2本まで建設できます。`);
    }
    if (type === "collect") {
      const key = event.resource || RESOURCE_KEYS[0];
      let total = 0;
      next.players.forEach((other) => {
        if (other.id === actor) return;
        total += other.resources[key] || 0;
        other.resources[key] = 0;
      });
      player.resources[key] += total;
      addLog(next, `${player.name} が押収で${RESOURCES[key].name}${total}を集めました。`);
    }
    if (type === "plenty") {
      addRes(player.resources, event.a || "rock", 1);
      addRes(player.resources, event.b || "material", 1);
      addLog(next, `${player.name} が補給衛星から資源を受け取りました。`);
    }
    refreshBonuses(next);
    return next;
  }
  if (event.type === "bankTrade") {
    const rate = tradeRateFor(next, actor, event.give);
    if (actor !== next.turn || !isMainPhase(next) || (player.resources[event.give] || 0) < rate) return next;
    player.resources[event.give] -= rate;
    player.resources[event.take] += 1;
    addLog(next, `${player.name} が${rate}:1通信交易を行いました。`);
    return next;
  }
  if (event.type === "startNegotiation") {
    const offer = { turnGives: cleanBundle(event.turnGives), partnerGives: cleanBundle(event.partnerGives) };
    const partnerId = Number(event.partnerId);
    if (actor !== next.turn || !isMainPhase(next) || next.negotiation || partnerId === actor || !next.players[partnerId]) return next;
    if (isCpuPlayer(next, actor) || isCpuPlayer(next, partnerId)) return next;
    if (!canPlayerOffer(next, partnerId, offer)) return next;
    next.negotiation = {
      id: crypto.randomUUID(),
      turnPlayer: actor,
      partner: partnerId,
      offeredBy: actor,
      awaiting: partnerId,
      currentOffer: offer,
      usedCombos: [offerSignature(offer)],
      history: [`${next.players[actor].name} が ${next.players[partnerId].name} に交換を申し出ました。`],
    };
    addLog(next, `${next.players[actor].name} が公開交渉を開始しました。`);
    return next;
  }
  if (event.type === "counterNegotiation") {
    const negotiation = next.negotiation;
    if (!negotiation || actor !== negotiation.awaiting) return next;
    if (isCpuPlayer(next, actor)) return next;
    const offer = { turnGives: cleanBundle(event.turnGives), partnerGives: cleanBundle(event.partnerGives) };
    if (!canPlayerOffer(next, negotiation.partner, offer)) return next;
    negotiation.currentOffer = offer;
    negotiation.offeredBy = actor;
    negotiation.awaiting = actor === negotiation.turnPlayer ? negotiation.partner : negotiation.turnPlayer;
    negotiation.usedCombos = [...new Set([...negotiation.usedCombos, offerSignature(offer)])];
    negotiation.history = [
      `${next.players[actor].name} が条件変更を提示しました。`,
      ...negotiation.history,
    ].slice(0, 8);
    return next;
  }
  if (event.type === "interveneNegotiation") {
    const negotiation = next.negotiation;
    if (!negotiation || actor === negotiation.turnPlayer || actor === negotiation.partner) return next;
    if (isCpuPlayer(next, actor)) return next;
    const offer = { turnGives: cleanBundle(event.turnGives), partnerGives: cleanBundle(event.partnerGives) };
    if (!canPlayerOffer(next, actor, offer) || !isBetterOffer(offer, negotiation.currentOffer, negotiation.usedCombos)) return next;
    const previousPartner = negotiation.partner;
    negotiation.partner = actor;
    negotiation.offeredBy = actor;
    negotiation.awaiting = negotiation.turnPlayer;
    negotiation.decision = null;
    negotiation.currentOffer = offer;
    negotiation.usedCombos = [...new Set([...negotiation.usedCombos, offerSignature(offer)])];
    negotiation.history = [
      `${next.players[actor].name} が ${next.players[previousPartner].name} より有利な条件で介入しました。`,
      ...negotiation.history,
    ].slice(0, 8);
    addLog(next, `${next.players[actor].name} が公開交渉に介入しました。`);
    return next;
  }
  if (event.type === "acceptNegotiation") {
    const negotiation = next.negotiation;
    if (!negotiation || negotiation.decision || actor !== negotiation.awaiting) return next;
    if (isCpuPlayer(next, actor)) return next;
    if (!canPlayerOffer(next, negotiation.partner, negotiation.currentOffer)) return next;
    negotiation.decision = { type: "accepted", by: actor };
    negotiation.awaiting = null;
    negotiation.history = [
      `${next.players[actor].name} が交換を受け入れました。介入がなければ確定できます。`,
      ...negotiation.history,
    ].slice(0, 8);
    addLog(next, `${next.players[actor].name} が交換を受け入れました。`);
    return next;
  }
  if (event.type === "rejectNegotiation") {
    const negotiation = next.negotiation;
    if (!negotiation || negotiation.decision || actor !== negotiation.awaiting) return next;
    if (isCpuPlayer(next, actor)) return next;
    negotiation.decision = { type: "rejected", by: actor };
    negotiation.awaiting = null;
    negotiation.history = [
      `${next.players[actor].name} が交換を拒否しました。介入がなければ終了できます。`,
      ...negotiation.history,
    ].slice(0, 8);
    addLog(next, `${next.players[actor].name} が交換を拒否しました。`);
    return next;
  }
  if (event.type === "finalizeNegotiation") {
    const negotiation = next.negotiation;
    if (!negotiation || !negotiation.decision || actor !== negotiation.turnPlayer) return next;
    if (negotiation.decision.type === "accepted") {
      if (!canPlayerOffer(next, negotiation.partner, negotiation.currentOffer)) return next;
      const turnPlayer = next.players[negotiation.turnPlayer];
      const partner = next.players[negotiation.partner];
      moveResources(turnPlayer, partner, negotiation.currentOffer.turnGives);
      moveResources(partner, turnPlayer, negotiation.currentOffer.partnerGives);
      addLog(next, `${turnPlayer.name} と ${partner.name} の交換が確定しました。`);
    } else {
      addLog(next, "公開交渉が終了しました。");
    }
    next.negotiation = null;
    return next;
  }
  if (event.type === "endTurn") {
    if (next.negotiation) return next;
    if (actor === next.turn && next.phase === "play") moveTurn(next);
    return next;
  }
  return next;
}

function tileName(tile) {
  if (tile.terrain === "desert") return "ヴォイド";
  return RESOURCES[tile.terrain].terrain;
}

function Cost({ cost }) {
  return (
    <span className="cost">
      {Object.entries(cost).map(([key, value]) => (
        <span key={key} style={{ "--dot": RESOURCES[key].color }}>
          {RESOURCES[key].name} {value}
        </span>
      ))}
    </span>
  );
}

function ResourceBundleInput({ title, value, onChange }) {
  return (
    <div className="bundleInput">
      <h3>{title}</h3>
      {RESOURCE_KEYS.map((key) => (
        <label key={key}>
          <span>{RESOURCES[key].name}</span>
          <input
            type="number"
            min="0"
            max="19"
            value={value[key] || 0}
            onChange={(event) => onChange({ ...value, [key]: Math.max(0, Number(event.target.value || 0)) })}
          />
        </label>
      ))}
    </div>
  );
}

function emptyBundle() {
  return emptyResources(0);
}

function NegotiationPanel({ state, myPlayerId, onEvent }) {
  const [partnerId, setPartnerId] = useState((myPlayerId + 1) % 4);
  const [turnGives, setTurnGives] = useState(emptyBundle);
  const [partnerGives, setPartnerGives] = useState(emptyBundle);
  const negotiation = state.negotiation;
  const me = state.players[myPlayerId];
  const isTurnPlayer = myPlayerId === state.turn;
  const draftOffer = { turnGives: cleanBundle(turnGives), partnerGives: cleanBundle(partnerGives) };
  const humanPartners = state.players.filter((player) => player.id !== myPlayerId && !player.isCpu);
  const selectedPartner = humanPartners.some((player) => player.id === partnerId) ? partnerId : humanPartners[0]?.id ?? myPlayerId;
  const canStart =
    isTurnPlayer &&
    isMainPhase(state) &&
    !negotiation &&
    selectedPartner !== myPlayerId &&
    !state.players[selectedPartner]?.isCpu &&
    canPlayerOffer(state, selectedPartner, draftOffer);

  const canCounter =
    negotiation &&
    !negotiation.decision &&
    myPlayerId === negotiation.awaiting &&
    canPlayerOffer(state, negotiation.partner, draftOffer);

  const canIntervene =
    negotiation &&
    myPlayerId !== negotiation.turnPlayer &&
    myPlayerId !== negotiation.partner &&
    canPlayerOffer(state, myPlayerId, draftOffer) &&
    isBetterOffer(draftOffer, negotiation.currentOffer, negotiation.usedCombos);
  const canShowIntervention = negotiation && canPotentiallyIntervene(state, myPlayerId);

  return (
    <div className="negotiation">
      <h2>プレイヤー間交渉</h2>
      {!negotiation && (
        <>
          <label className="partnerSelect">
            交換相手
            <select value={selectedPartner} onChange={(event) => setPartnerId(Number(event.target.value))}>
              {humanPartners.map((player) => (
                <option key={player.id} value={player.id}>
                  {player.name}
                </option>
              ))}
            </select>
          </label>
          <div className="bundleGrid">
            <ResourceBundleInput title="あなたが渡す" value={turnGives} onChange={setTurnGives} />
            <ResourceBundleInput title="相手が渡す" value={partnerGives} onChange={setPartnerGives} />
          </div>
          <button
            onClick={() => onEvent({ type: "startNegotiation", partnerId: selectedPartner, turnGives, partnerGives })}
            disabled={!canStart}
          >
            交換を申し出る
          </button>
          <p className="spaceportNote">双方が1枚以上出す必要があります。CPUは交渉に参加しません。</p>
        </>
      )}

      {negotiation && (
        <>
          <div className="currentOffer">
            <strong>{state.players[negotiation.turnPlayer].name} ⇄ {state.players[negotiation.partner].name}</strong>
            <p>{state.players[negotiation.turnPlayer].name} が渡す: {bundleText(negotiation.currentOffer.turnGives)}</p>
            <p>{state.players[negotiation.partner].name} が渡す: {bundleText(negotiation.currentOffer.partnerGives)}</p>
            {negotiation.awaiting !== null && <small>返答待ち: {state.players[negotiation.awaiting].name}</small>}
            {negotiation.decision && (
              <small>
                {negotiation.decision.type === "accepted" ? "受諾済み" : "拒否済み"}: {state.players[negotiation.decision.by].name}
              </small>
            )}
          </div>

          {!negotiation.decision && myPlayerId === negotiation.awaiting && (
            <div className="negotiationActions">
              <button className="primary" onClick={() => onEvent({ type: "acceptNegotiation" })}>
                受け入れる
              </button>
              <button onClick={() => onEvent({ type: "rejectNegotiation" })}>拒否</button>
            </div>
          )}

          {negotiation.decision && myPlayerId === negotiation.turnPlayer && (
            <button className="primary" onClick={() => onEvent({ type: "finalizeNegotiation" })}>
              交渉を確定
            </button>
          )}

          {(!negotiation.decision && myPlayerId === negotiation.awaiting || canShowIntervention) && (
            <>
              <div className="bundleGrid">
                <ResourceBundleInput title={`${state.players[negotiation.turnPlayer].name} が渡す`} value={turnGives} onChange={setTurnGives} />
                <ResourceBundleInput title={`${canShowIntervention ? me.name : state.players[negotiation.partner].name} が渡す`} value={partnerGives} onChange={setPartnerGives} />
              </div>
              {myPlayerId === negotiation.awaiting && (
                <button onClick={() => onEvent({ type: "counterNegotiation", turnGives, partnerGives })} disabled={!canCounter}>
                  条件変更を提示
                </button>
              )}
              {canShowIntervention && (
                <button onClick={() => onEvent({ type: "interveneNegotiation", turnGives, partnerGives })} disabled={!canIntervene}>
                  より良い条件で介入
                </button>
              )}
            </>
          )}

          <div className="negotiationHistory">
            {negotiation.history.map((line, index) => <p key={index}>{line}</p>)}
          </div>
        </>
      )}
    </div>
  );
}

function CriminalPanel({ state, myPlayerId, onEvent }) {
  const [discardBundle, setDiscardBundle] = useState(emptyBundle);
  const [victimId, setVictimId] = useState("");
  const need = Number(state.pendingDiscards?.[myPlayerId] || 0);
  const pendingDiscardNames = pendingDiscardEntries(state).map(([playerId, needCount]) => `${state.players[playerId].name}:${needCount}枚`);
  const pendingSteal = state.pendingSteal;
  const canDiscard = need > 0 && totalResources(discardBundle) === need && hasResources(state.players[myPlayerId], cleanBundle(discardBundle));
  const stealVictims = pendingSteal?.victims || [];
  const selectedVictim = victimId || stealVictims[0];

  if (state.action !== "discard" && state.action !== "criminal" && state.action !== "steal") return null;

  return (
    <div className="criminalPanel">
      <h2>ラヴェジャーズ</h2>
      {state.action === "discard" && (
        <>
          <p className="spaceportNote">廃棄待ち: {pendingDiscardNames.join(" / ")}</p>
          {need > 0 ? (
            <>
              <ResourceBundleInput title={`捨てる資源 ${need}枚`} value={discardBundle} onChange={setDiscardBundle} />
              <button onClick={() => onEvent({ type: "discardResources", resources: discardBundle })} disabled={!canDiscard}>
                資源を捨てる
              </button>
            </>
          ) : (
            <p className="spaceportNote">あなたは廃棄対象ではありません。</p>
          )}
        </>
      )}
      {state.action === "criminal" && (
        <p className="spaceportNote">現在地以外のタイルをクリックして移動します。移動後、隣接プレイヤーから1枚奪えます。</p>
      )}
      {state.action === "steal" && pendingSteal && (
        <>
          {pendingSteal.thief === myPlayerId ? (
            <>
              <label className="partnerSelect">
                奪う相手
                <select value={selectedVictim} onChange={(event) => setVictimId(Number(event.target.value))}>
                  {stealVictims.map((playerId) => (
                    <option key={playerId} value={playerId}>
                      {state.players[playerId].name}
                    </option>
                  ))}
                </select>
              </label>
              <button className="primary" onClick={() => onEvent({ type: "stealResource", victimId: Number(selectedVictim) })}>
                資源1枚を奪う
              </button>
            </>
          ) : (
            <p className="spaceportNote">{state.players[pendingSteal.thief].name} が奪う相手を選んでいます。</p>
          )}
        </>
      )}
    </div>
  );
}

function HelpPanel() {
  const [tab, setTab] = useState("rules");
  return (
    <div className="helpBox">
      <div className="helpTabs" role="tablist" aria-label="ルールと用語">
        <button className={tab === "rules" ? "selected" : ""} onClick={() => setTab("rules")}>
          ルール
        </button>
        <button className={tab === "terms" ? "selected" : ""} onClick={() => setTab("terms")}>
          用語
        </button>
        <button className={tab === "cards" ? "selected" : ""} onClick={() => setTab("cards")}>
          未知への旅
        </button>
      </div>

      {tab === "rules" && (
        <div className="helpContent">
          <h2>遊び方</h2>
          <p>サイコロで資源を得て、小都市、大都市、領界路を広げます。10 VPに到達したプレイヤーが勝利です。</p>
          <ul>
            <li>初期配置では各プレイヤーが小都市と領界路を2セット置きます。</li>
            <li>自分の番はサイコロ、資源獲得、メインフェーズの順に進みます。</li>
            <li>メインフェーズでは交換、建設、未知への旅、交渉を行えます。</li>
            <li>出目と同じ数字のタイルに隣接する小都市は資源1、大都市は資源2を得ます。</li>
            <li>7が出たらラヴェジャーズを移動し、そのタイルは産出しません。</li>
            <li>次元門に接する小都市か大都市があると、2:1または3:1交易が使えます。</li>
            <li>人数が足りない時はプレイヤーカードからCPUに切り替えられます。CPUは交渉に参加しません。</li>
          </ul>
          <h2>勝利点</h2>
          <p>小都市は1 VP、大都市は2 VP、勝利記録は1 VPです。最長領界路と最大TVA力はそれぞれ2 VPです。</p>
        </div>
      )}

      {tab === "terms" && (
        <div className="helpContent">
          <h2>用語対応</h2>
          <dl>
            <div><dt>小都市</dt><dd>基礎拠点。建てると隣接タイルから資源を得ます。</dd></div>
            <div><dt>大都市</dt><dd>小都市を強化した拠点。産出が2倍になります。</dd></div>
            <div><dt>領界路</dt><dd>小都市同士をつなぎ、新しい小都市を置くための接続路です。</dd></div>
            <div><dt>次元門</dt><dd>接していると通信交易が有利になります。</dd></div>
            <div><dt>ヴォイド</dt><dd>資源を産出しない特殊タイルです。</dd></div>
            <div><dt>ラヴェジャーズ</dt><dd>いるタイルの産出を止めます。</dd></div>
            <div><dt>TVA</dt><dd>使うとラヴェジャーズを動かします。</dd></div>
          </dl>
          <h2>資源</h2>
          <p>鉱物次元=レアメタル、機械次元=ナノマシン、熱帯次元=建材、大草原=皮革、肥沃な大地=穀物。</p>
        </div>
      )}

      {tab === "cards" && (
        <div className="helpContent">
          <h2>未知への旅カード</h2>
          <dl>
            <div><dt>TVA</dt><dd>ラヴェジャーズを移動します。3枚以上で最大TVA力の候補です。</dd></div>
            <div><dt>領界路開通</dt><dd>無料で領界路を2本まで建設できます。</dd></div>
            <div><dt>押収</dt><dd>選んだ資源を他プレイヤー全員から集めます。</dd></div>
            <div><dt>補給衛星</dt><dd>選んだ資源を2つ受け取ります。</dd></div>
            <div><dt>勝利記録</dt><dd>持っているだけで1 VPです。</dd></div>
          </dl>
        </div>
      )}
    </div>
  );
}

function usePeerRoom(state, setState, roomId, myPlayerId) {
  const [net, setNet] = useState({ mode: "local", status: "ローカル", share: "" });
  const peerRef = useRef(null);
  const connections = useRef([]);
  const stateRef = useRef(state);
  stateRef.current = state;

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "./vendor/peerjs.min.js";
    script.onload = () => setNet((n) => ({ ...n, status: "オンライン接続を準備できます" }));
    script.onerror = () => setNet((n) => ({ ...n, status: "オンライン同期ライブラリを読み込めませんでした" }));
    document.head.appendChild(script);
    return () => script.remove();
  }, []);

  function host() {
    if (!window.Peer) return;
    const peer = new window.Peer(`star-${roomId}-${Date.now().toString(36)}`);
    peerRef.current = peer;
    peer.on("open", (id) => {
      const url = `${location.origin}${location.pathname}#join=${id}&p=1`;
      setNet({ mode: "host", status: "ホスト中", share: url });
      history.replaceState(null, "", `#host=${id}&p=0`);
    });
    peer.on("connection", (conn) => {
      connections.current.push(conn);
      conn.on("open", () => conn.send({ type: "state", state: stateRef.current }));
      conn.on("data", (message) => {
        if (message.type === "event") {
          setState((prev) => {
            const next = reducer(prev, message.event);
            connections.current.forEach((c) => c.open && c.send({ type: "state", state: next }));
            return next;
          });
        }
      });
    });
  }

  function join(hostId) {
    if (!window.Peer || !hostId) return;
    const peer = new window.Peer();
    peerRef.current = peer;
    peer.on("open", () => {
      const conn = peer.connect(hostId);
      connections.current = [conn];
      conn.on("open", () => setNet({ mode: "guest", status: "参加中", share: location.href }));
      conn.on("data", (message) => {
        if (message.type === "state") setState(message.state);
      });
    });
  }

  function send(event) {
    if (net.mode === "guest") {
      connections.current[0]?.send({ type: "event", event: { ...event, playerId: myPlayerId } });
      return true;
    }
    return false;
  }

  useEffect(() => {
    if (net.mode === "host") connections.current.forEach((c) => c.open && c.send({ type: "state", state }));
  }, [state, net.mode]);

  useEffect(() => {
    const params = new URLSearchParams(location.hash.replace("#", ""));
    const joinId = params.get("join");
    if (joinId) {
      const timer = setInterval(() => {
        if (window.Peer) {
          clearInterval(timer);
          join(joinId);
        }
      }, 250);
      return () => clearInterval(timer);
    }
  }, []);

  return { net, host, send };
}

function Board({ state, onEvent, myPlayerId }) {
  const active = currentPlayer(state).id;
  const canClick = state.phase === "setup" ? active === myPlayerId : state.turn === myPlayerId;
  return (
    <svg viewBox="0 0 720 680" className="board" role="img" aria-label="宇宙資源盤面">
      <defs>
        <radialGradient id="space" cx="50%" cy="45%">
          <stop offset="0%" stopColor="#21324b" />
          <stop offset="65%" stopColor="#111827" />
          <stop offset="100%" stopColor="#08111f" />
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <rect width="720" height="680" fill="url(#space)" />
      {state.board.tiles.map((tile) => {
        const points = tile.corners
          .map((id) => state.board.vertices.find((v) => v.id === id))
          .map((p) => `${p.x},${p.y}`)
          .join(" ");
        const fill = tile.terrain === "desert" ? "#3b4256" : RESOURCES[tile.terrain].color;
        return (
          <g key={tile.id} onClick={() => onEvent({ type: "selectTile", tileId: tile.id })}>
            <polygon className="hex" points={points} fill={fill} opacity={state.criminalTile === tile.id ? 0.5 : 0.88} />
            <text x={tile.center.x} y={tile.center.y - 9} className="tileName">
              {tile.terrain === "desert" ? "ヴォイド" : RESOURCES[tile.terrain].terrain}
            </text>
            {tile.number && (
              <g>
                <circle cx={tile.center.x} cy={tile.center.y + 16} r="17" fill={tile.number === 6 || tile.number === 8 ? "#fee2e2" : "#f8fafc"} />
                <text x={tile.center.x} y={tile.center.y + 22} className="num">
                  {tile.number}
                </text>
              </g>
            )}
            {state.criminalTile === tile.id && (
              <text x={tile.center.x} y={tile.center.y + 47} className="criminal" filter="url(#glow)">
                RV
              </text>
            )}
          </g>
        );
      })}
      {state.board.spaceports.map((spaceport) => {
        const tint = spaceport.type ? RESOURCES[spaceport.type].color : "#4f9dbd";
        return (
          <g key={spaceport.id} className="spaceport">
            <line x1={spaceport.x} y1={spaceport.y} x2={spaceport.labelX} y2={spaceport.labelY} stroke="rgba(219,234,254,.55)" strokeWidth="2" />
            <circle cx={spaceport.labelX} cy={spaceport.labelY} r="18" fill={tint} stroke="#eaf6ff" strokeWidth="2" />
            <text x={spaceport.labelX} y={spaceport.labelY - 2} className="spaceportRate">
              {spaceport.type ? "2:1" : "3:1"}
            </text>
            <text x={spaceport.labelX} y={spaceport.labelY + 10} className="spaceportResource">
              {spaceport.type ? RESOURCES[spaceport.type].name.slice(0, 2) : "SP"}
            </text>
          </g>
        );
      })}
      {state.board.edges.map((edge) => {
        const a = state.board.vertices.find((v) => v.id === edge.a);
        const b = state.board.vertices.find((v) => v.id === edge.b);
        const route = state.routes[edge.id];
        return (
          <line
            key={edge.id}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            className={`edge ${canClick ? "clickable" : ""}`}
            stroke={route ? state.players[route.player].color : "rgba(255,255,255,.28)"}
            strokeWidth={route ? 8 : 6}
            onClick={() => canClick && onEvent({ type: "edge", edgeId: edge.id })}
          />
        );
      })}
      {state.board.vertices.map((vertex) => {
        const building = state.buildings[vertex.id];
        return (
          <g key={vertex.id} onClick={() => canClick && onEvent({ type: "vertex", vertexId: vertex.id })} className={canClick ? "clickable" : ""}>
            <circle cx={vertex.x} cy={vertex.y} r="10" fill={building ? state.players[building.player].color : "rgba(255,255,255,.22)"} stroke="#f8fafc" strokeWidth="2" />
            {building?.type === "star" && <circle cx={vertex.x} cy={vertex.y} r="5" fill="#fff7ad" />}
          </g>
        );
      })}
    </svg>
  );
}

function App() {
  const initialRoom = useMemo(() => new URLSearchParams(location.hash.replace("#", "")).get("room") || crypto.randomUUID().slice(0, 8), []);
  const [state, setState] = useState(() => createGame(initialRoom));
  const [myPlayerId, setMyPlayerId] = useState(() => Number(new URLSearchParams(location.hash.replace("#", "")).get("p") || 0));
  const [trade, setTrade] = useState({ give: "rock", take: "food" });
  const [devChoice, setDevChoice] = useState({ resource: "rock", a: "rock", b: "material" });
  const { net, host, send } = usePeerRoom(state, setState, state.id, myPlayerId);

  function act(event) {
    const owned = { ...event, playerId: myPlayerId };
    if (send(owned)) return;
    setState((prev) => reducer(prev, owned));
  }

  useEffect(() => {
    if (net.mode === "guest") return;
    const event = nextCpuEvent(state);
    if (!event) return;
    const timer = setTimeout(() => {
      setState((prev) => {
        const freshEvent = nextCpuEvent(prev);
        if (!freshEvent) return prev;
        let next = reducer(prev, freshEvent);
        if (freshEvent.follow) next = reducer(next, freshEvent.follow);
        return next;
      });
    }, state.phase === "setup" ? 550 : 850);
    return () => clearTimeout(timer);
  }, [state, net.mode]);

  const me = state.players[myPlayerId];
  const active = currentPlayer(state);
  const actionable = state.phase === "setup" ? active.id === myPlayerId : state.turn === myPlayerId;
  const mainActionable = actionable && isMainPhase(state);
  const currentTradeRate = tradeRateFor(state, myPlayerId, trade.give);
  const selectablePlayers = state.players.filter((player) => !player.isCpu || player.id === myPlayerId);

  return (
    <main>
      <section className="topbar">
        <div>
          <h1>Beyonders</h1>
          <p>小都市を広げ、大都市へ育て、10点を目指す4人用オンライン卓。</p>
        </div>
        <div className="net">
          <span>{net.status}</span>
          <button onClick={host} title="部屋を作る">
            <RadioTower size={17} /> 部屋作成
          </button>
          <button
            onClick={() => net.share && navigator.clipboard?.writeText(net.share)}
            disabled={!net.share}
            title="共有リンクをコピー"
          >
            <Copy size={17} /> 共有
          </button>
        </div>
      </section>

      <section className="layout">
        <div className="playSurface">
          <div className="statusLine">
            <span className="pill">現在: {active.name}</span>
            <span className="pill">フェーズ: {phaseLabel(state)}</span>
            <span className="pill">操作: {BUILD_LABEL[state.action] || (state.action === "criminal" ? "ラヴェジャーズ" : state.action === "discard" ? "資源廃棄" : state.action === "steal" ? "資源奪取" : state.action)}</span>
            {state.dice && <span className="pill">出目: {state.dice.join(" + ")} = {state.dice[0] + state.dice[1]}</span>}
          </div>
          <Board state={state} onEvent={act} myPlayerId={myPlayerId} />
        </div>

        <aside className="panel">
          <div className="self">
            <label>
              あなた
              <select value={myPlayerId} onChange={(e) => setMyPlayerId(Number(e.target.value))}>
                {selectablePlayers.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}{p.isCpu ? " CPU" : ""}
                  </option>
                ))}
              </select>
            </label>
            <input value={me.name} onChange={(e) => act({ type: "rename", name: e.target.value })} disabled={me.isCpu} />
          </div>

          <div className="actions">
            <button className="primary" onClick={() => act({ type: "roll" })} disabled={!actionable || state.phase !== "play" || state.rolled}>
              <Dice5 size={18} /> サイコロ
            </button>
            <button onClick={() => act({ type: "endTurn" })} disabled={!mainActionable || !!state.negotiation}>
              <Undo2 size={18} /> ターン終了
            </button>
          </div>

          <div className="tools">
            <button className={state.action === "route" ? "selected" : ""} onClick={() => act({ type: "setAction", action: "route" })}>
              <Rocket size={17} /> 領界路
            </button>
            <button className={state.action === "planet" ? "selected" : ""} onClick={() => act({ type: "setAction", action: "planet" })}>
              <Orbit size={17} /> 小都市
            </button>
            <button className={state.action === "star" ? "selected" : ""} onClick={() => act({ type: "setAction", action: "star" })}>
              <Satellite size={17} /> 大都市
            </button>
            <button className={state.action === "criminal" ? "selected" : ""} onClick={() => act({ type: "setAction", action: "criminal" })}>
              <Swords size={17} /> ラヴェジャーズ
            </button>
          </div>

          <div className="costs">
            <h2>建設コスト</h2>
            <p>領界路 <Cost cost={COSTS.route} /></p>
            <p>小都市 <Cost cost={COSTS.planet} /></p>
            <p>大都市 <Cost cost={COSTS.star} /></p>
            <p>未知への旅 <Cost cost={COSTS.frontier} /></p>
            <button onClick={() => act({ type: "buyDev" })} disabled={!mainActionable}>
              <Shuffle size={17} /> 未知への旅を獲得
            </button>
          </div>

          <div className="trade">
            <h2>通信交易 {currentTradeRate}:1</h2>
            <select value={trade.give} onChange={(e) => setTrade({ ...trade, give: e.target.value })}>
              {RESOURCE_KEYS.map((key) => <option key={key} value={key}>{RESOURCES[key].name}</option>)}
            </select>
            <span>→</span>
            <select value={trade.take} onChange={(e) => setTrade({ ...trade, take: e.target.value })}>
              {RESOURCE_KEYS.map((key) => <option key={key} value={key}>{RESOURCES[key].name}</option>)}
            </select>
            <button onClick={() => act({ type: "bankTrade", ...trade })} disabled={!mainActionable}>交換</button>
            <p className="spaceportNote">次元門: {spaceportText(state, myPlayerId)}</p>
          </div>

          <CriminalPanel state={state} myPlayerId={myPlayerId} onEvent={act} />

          <NegotiationPanel state={state} myPlayerId={myPlayerId} onEvent={act} />

          <div className="frontiers">
            <h2>手札の未知への旅</h2>
            <div className="miniControls">
              <select value={devChoice.resource} onChange={(e) => setDevChoice({ ...devChoice, resource: e.target.value })}>
                {RESOURCE_KEYS.map((key) => <option key={key} value={key}>押収: {RESOURCES[key].name}</option>)}
              </select>
              <select value={devChoice.a} onChange={(e) => setDevChoice({ ...devChoice, a: e.target.value })}>
                {RESOURCE_KEYS.map((key) => <option key={key} value={key}>補給1: {RESOURCES[key].name}</option>)}
              </select>
              <select value={devChoice.b} onChange={(e) => setDevChoice({ ...devChoice, b: e.target.value })}>
                {RESOURCE_KEYS.map((key) => <option key={key} value={key}>補給2: {RESOURCES[key].name}</option>)}
              </select>
            </div>
            <div className="cards">
              {me.hiddenNewFrontiers.map((card, index) => (
                <button
                  key={`${frontierType(card)}-${frontierBoughtTurn(card)}-${index}`}
                  onClick={() => act({ type: "playDev", card: frontierType(card), ...devChoice })}
                  disabled={!canPlayFrontier(card, state)}
                >
                  {DEV_NAMES[frontierType(card)]}{!canPlayFrontier(card, state) && frontierType(card) !== "point" ? " 次ターン" : ""}
                </button>
              ))}
              {!me.hiddenNewFrontiers.length && <span className="muted">なし</span>}
            </div>
          </div>

          <HelpPanel />
        </aside>
      </section>

      <section className="players">
        {state.players.map((player) => (
          <article key={player.id} style={{ "--player": player.color }} className={player.id === active.id ? "active" : ""}>
            <div>
              <strong>
                {player.name}
                {player.isCpu && <span className="badge cpuBadge">CPU</span>}
                {player.bonus.longest && <span className="badge">最長領界路</span>}
                {player.bonus.largestTv && <span className="badge">最大TVA力</span>}
              </strong>
              <span>{getVp(state, player.id)} VP</span>
            </div>
            <p>{visibleResourceText(player, myPlayerId)}</p>
            <small>TVA {player.playedTv} / 未知への旅 {player.hiddenNewFrontiers.length}枚 / 公開済み: {publicPlayedFrontiers(player)} / {spaceportText(state, player.id)}</small>
            <button
              className="cpuToggle"
              onClick={() => act({ type: "setCpu", targetId: player.id, isCpu: !player.isCpu })}
              disabled={player.id === myPlayerId || net.mode === "guest"}
              title={player.id === myPlayerId ? "自分の席はCPUにできません" : "CPUを切り替え"}
            >
              {player.isCpu ? "CPU解除" : "CPUにする"}
            </button>
          </article>
        ))}
      </section>

      <section className="log">
        <h2>航行ログ</h2>
        {state.winner !== null && <div className="winner">{state.players[state.winner].name} の勝利</div>}
        {(state.privateMessages || []).filter((message) => message.to === myPlayerId).map((message, index) => <p className="privateLog" key={`private-${index}`}>{message.text}</p>)}
        {state.log.map((line, index) => <p key={index}>{line}</p>)}
      </section>
    </main>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
