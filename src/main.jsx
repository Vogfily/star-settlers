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
  rock: { name: "岩石", terrain: "岩石惑星", color: "#a3544a" },
  rare: { name: "レアメタル", terrain: "鉱石惑星", color: "#64748b" },
  material: { name: "資材", terrain: "資材工場", color: "#2f855a" },
  nano: { name: "ナノマシン", terrain: "ナノマシン工場", color: "#7c9a3e" },
  food: { name: "食料", terrain: "水耕栽培", color: "#d5a11e" },
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

const DEV_DECK = [
  ...Array(14).fill("tv"),
  ...Array(2).fill("route"),
  ...Array(2).fill("collect"),
  ...Array(2).fill("plenty"),
  ...Array(5).fill("point"),
];

const DEV_NAMES = {
  tv: "TV",
  route: "航路整備",
  collect: "徴収",
  plenty: "補給衛星",
  point: "勝利記録",
};

const SPACEPORT_TYPES = [null, null, null, null, ...RESOURCE_KEYS];

const BUILD_LABEL = {
  route: "星間航路",
  planet: "惑星",
  star: "恒星",
  frontier: "新天地",
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
const NUMBERS = [5, 2, 6, 3, 8, 10, 9, 12, 11, 4, 8, 10, 9, 4, 5, 6, 3, 11];
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

function spaceportName(type) {
  return type ? `${RESOURCES[type].name} 2:1` : "3:1";
}

function makeBoard(seedText) {
  const random = mulberry32(hashString(seedText));
  const terrains = shuffle(TILE_SETUP, random);
  const nums = shuffle(NUMBERS, random);
  let numIndex = 0;
  const vertices = new Map();
  const edges = new Map();
  const tiles = HEX_COORDS.map((coord, index) => {
    const center = hexToPixel(coord.q, coord.r);
    const terrain = terrains[index];
    const number = terrain === "desert" ? null : nums[numIndex++];
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
    return { id: index, ...coord, center, terrain, number, corners };
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
  const shuffledPorts = shuffle(SPACEPORT_TYPES, random);
  const outerEdges = edgeList
    .filter((edge) => edge.tiles.length === 1)
    .map((edge) => {
      const a = vertices.get(edge.a);
      const b = vertices.get(edge.b);
      const x = (a.x + b.x) / 2;
      const y = (a.y + b.y) / 2;
      return { ...edge, x, y, angle: Math.atan2(y - CENTER.y, x - CENTER.x) };
    })
    .sort((a, b) => a.angle - b.angle);
  const spaceports = outerEdges
    .filter((_, index) => index % 2 === 0)
    .slice(0, 9)
    .map((edge, index) => {
      const type = shuffledPorts[index];
      const dx = edge.x - CENTER.x;
      const dy = edge.y - CENTER.y;
      const length = Math.hypot(dx, dy) || 1;
      return {
        id: `spaceport-${index}`,
        edgeId: edge.id,
        vertices: [edge.a, edge.b],
        type,
        x: edge.x,
        y: edge.y,
        labelX: edge.x + (dx / length) * 42,
        labelY: edge.y + (dy / length) * 42,
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
      resources: emptyResources(),
      hiddenNewFrontiers: [],
      playedTv: 0,
      bonus: { longest: false, largestTv: false },
    })),
    buildings: {},
    routes: {},
    deck: shuffle(DEV_DECK, mulberry32(hashString(`${roomId}:deck`))),
    discard: [],
    turn: 0,
    phase: "setup",
    setupStep: 0,
    setupOrder: [0, 1, 2, 3, 3, 2, 1, 0],
    setupPendingVertex: null,
    action: "planet",
    dice: null,
    rolled: false,
    criminalTile: neutron,
    selectedTile: neutron,
    log: ["宇宙航路の準備が整いました。惑星と星間航路を初期配置してください。"],
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
  if (!ports.length) return "スペースポートなし";
  return ports.map((port) => spaceportName(port.type)).join(" / ");
}

function currentPlayer(state) {
  const active = state.phase === "setup" ? state.setupOrder[state.setupStep] : state.turn;
  return state.players[active];
}

function addLog(state, text) {
  state.log = [text, ...state.log].slice(0, 8);
}

function getVp(state, playerId) {
  const planets = Object.values(state.buildings).filter((b) => b.player === playerId && b.type === "planet").length;
  const stars = Object.values(state.buildings).filter((b) => b.player === playerId && b.type === "star").length;
  const points = state.players[playerId].hiddenNewFrontiers.filter((card) => card === "point").length;
  const bonus = (state.players[playerId].bonus.longest ? 2 : 0) + (state.players[playerId].bonus.largestTv ? 2 : 0);
  return planets + stars * 2 + points + bonus;
}

function distanceRule(state, vertexId) {
  return !state.board.adjacency[vertexId].some((next) => state.buildings[next]);
}

function routeTouchesOwnNetwork(state, edge, playerId) {
  return [edge.a, edge.b].some((vertexId) => {
    const building = state.buildings[vertexId];
    if (building?.player === playerId) return true;
    return state.board.incidentEdges[vertexId].some((edgeId) => state.routes[edgeId]?.player === playerId);
  });
}

function canBuildRoute(state, edgeId, playerId, free = false) {
  if (state.routes[edgeId]) return false;
  const edge = state.board.edges.find((item) => item.id === edgeId);
  if (!edge) return false;
  if (state.phase === "setup") return state.setupPendingVertex && [edge.a, edge.b].includes(state.setupPendingVertex);
  return (free || canAfford(state.players[playerId], COSTS.route)) && routeTouchesOwnNetwork(state, edge, playerId);
}

function canBuildPlanet(state, vertexId, playerId) {
  if (state.buildings[vertexId] || !distanceRule(state, vertexId)) return false;
  if (state.phase === "setup") return !state.setupPendingVertex;
  if (!canAfford(state.players[playerId], COSTS.planet)) return false;
  return state.board.incidentEdges[vertexId].some((edgeId) => state.routes[edgeId]?.player === playerId);
}

function refreshBonuses(state) {
  state.players.forEach((player) => {
    player.bonus.longest = false;
    player.bonus.largestTv = false;
  });
  let tvLeader = null;
  state.players.forEach((player) => {
    if (player.playedTv >= 3 && (!tvLeader || player.playedTv > tvLeader.playedTv)) tvLeader = player;
  });
  if (tvLeader) tvLeader.bonus.largestTv = true;

  const routeCounts = state.players.map((player) => ({
    id: player.id,
    count: Object.values(state.routes).filter((route) => route.player === player.id).length,
  }));
  const routeLeader = routeCounts.sort((a, b) => b.count - a.count)[0];
  if (routeLeader?.count >= 5) state.players[routeLeader.id].bonus.longest = true;
}

function produce(state, total) {
  if (total === 7) {
    addLog(state, "7が出ました。ユニヴァース クリミナルを任意のタイルへ移動できます。");
    state.action = "criminal";
    state.selectedTile = state.criminalTile;
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
  state.rolled = false;
  state.dice = null;
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
  if (event.type === "setAction") {
    next.action = event.action;
    return next;
  }
  if (event.type === "selectTile") {
    next.selectedTile = event.tileId;
    if (next.action === "criminal") {
      next.criminalTile = event.tileId;
      addLog(next, `ユニヴァース クリミナルが${tileName(next.board.tiles[event.tileId])}へ移動しました。`);
      next.action = next.rolled ? "build" : "roll";
    }
    return next;
  }
  if (event.type === "roll") {
    if (actor !== next.turn || next.rolled || next.phase !== "play") return next;
    const d1 = Math.floor(Math.random() * 6) + 1;
    const d2 = Math.floor(Math.random() * 6) + 1;
    next.dice = [d1, d2];
    next.rolled = true;
    next.action = "build";
    produce(next, d1 + d2);
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
      addLog(next, `${player.name} が惑星を配置しました。星間航路を接続してください。`);
      return next;
    }
    if (actor !== next.turn || !next.rolled) return next;
    if (next.action === "planet" && canBuildPlanet(next, vertexId, actor)) {
      pay(player, COSTS.planet);
      next.buildings[vertexId] = { player: actor, type: "planet" };
      addLog(next, `${player.name} が惑星を建設しました。`);
    } else if (next.action === "star") {
      const building = next.buildings[vertexId];
      if (building?.player === actor && building.type === "planet" && canAfford(player, COSTS.star)) {
        pay(player, COSTS.star);
        building.type = "star";
        addLog(next, `${player.name} が惑星を恒星へ強化しました。`);
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
        next.action = "roll";
        addLog(next, "初期配置完了。最初のプレイヤーからサイコロを振ります。");
      } else {
        next.action = "planet";
        addLog(next, `${next.players[next.setupOrder[next.setupStep]].name} が惑星を配置します。`);
      }
      return next;
    }
    if (actor !== next.turn || !next.rolled || !canBuildRoute(next, edgeId, actor, free)) return next;
    if (!free) pay(player, COSTS.route);
    next.routes[edgeId] = { player: actor };
    if (next.action === "freeRoute") {
      next.freeRoutesLeft = Math.max(0, (next.freeRoutesLeft || 1) - 1);
      if (next.freeRoutesLeft === 0) next.action = "build";
    }
    addLog(next, `${player.name} が星間航路を建設しました。`);
    refreshBonuses(next);
    return next;
  }
  if (event.type === "buyDev") {
    if (actor !== next.turn || !next.rolled || !canAfford(player, COSTS.frontier) || next.deck.length === 0) return next;
    pay(player, COSTS.frontier);
    const card = next.deck.pop();
    player.hiddenNewFrontiers.push(card);
    addLog(next, `${player.name} が新天地を獲得しました。`);
    return next;
  }
  if (event.type === "playDev") {
    if (actor !== next.turn || !player.hiddenNewFrontiers.includes(event.card) || event.card === "point") return next;
    player.hiddenNewFrontiers.splice(player.hiddenNewFrontiers.indexOf(event.card), 1);
    next.discard.push(event.card);
    if (event.card === "tv") {
      player.playedTv += 1;
      next.action = "criminal";
      addLog(next, `${player.name} がTVを起動。ユニヴァース クリミナルを移動します。`);
    }
    if (event.card === "route") {
      next.action = "freeRoute";
      next.freeRoutesLeft = 2;
      addLog(next, `${player.name} が航路整備を実行。無料で2本まで建設できます。`);
    }
    if (event.card === "collect") {
      const key = event.resource || RESOURCE_KEYS[0];
      let total = 0;
      next.players.forEach((other) => {
        if (other.id === actor) return;
        total += other.resources[key] || 0;
        other.resources[key] = 0;
      });
      player.resources[key] += total;
      addLog(next, `${player.name} が徴収で${RESOURCES[key].name}${total}を集めました。`);
    }
    if (event.card === "plenty") {
      addRes(player.resources, event.a || "rock", 1);
      addRes(player.resources, event.b || "material", 1);
      addLog(next, `${player.name} が補給衛星から資源を受け取りました。`);
    }
    refreshBonuses(next);
    return next;
  }
  if (event.type === "bankTrade") {
    const rate = tradeRateFor(next, actor, event.give);
    if (actor !== next.turn || !next.rolled || (player.resources[event.give] || 0) < rate) return next;
    player.resources[event.give] -= rate;
    player.resources[event.take] += 1;
    addLog(next, `${player.name} が${rate}:1通信交易を行いました。`);
    return next;
  }
  if (event.type === "endTurn") {
    if (actor === next.turn && next.phase === "play") moveTurn(next);
    return next;
  }
  return next;
}

function tileName(tile) {
  if (tile.terrain === "desert") return "中性子星";
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
          新天地
        </button>
      </div>

      {tab === "rules" && (
        <div className="helpContent">
          <h2>遊び方</h2>
          <p>サイコロで資源を得て、惑星、恒星、星間航路を広げます。10 VPに到達したプレイヤーが勝利です。</p>
          <ul>
            <li>初期配置では各プレイヤーが惑星と星間航路を2セット置きます。</li>
            <li>自分の番はサイコロ、交易、建設、新天地の順に進められます。</li>
            <li>出目と同じ数字のタイルに隣接する惑星は資源1、恒星は資源2を得ます。</li>
            <li>7が出たらユニヴァース クリミナルを移動し、そのタイルは産出しません。</li>
            <li>スペースポートに接する惑星か恒星があると、2:1または3:1交易が使えます。</li>
          </ul>
          <h2>勝利点</h2>
          <p>惑星は1 VP、恒星は2 VP、勝利記録は1 VPです。最長航路と最大TVはそれぞれ2 VPです。</p>
        </div>
      )}

      {tab === "terms" && (
        <div className="helpContent">
          <h2>用語対応</h2>
          <dl>
            <div><dt>惑星</dt><dd>開拓地。建てると隣接タイルから資源を得ます。</dd></div>
            <div><dt>恒星</dt><dd>都市。惑星を強化し、産出が2倍になります。</dd></div>
            <div><dt>星間航路</dt><dd>街道。新しい惑星を置くための接続路です。</dd></div>
            <div><dt>スペースポート</dt><dd>港。接していると通信交易が有利になります。</dd></div>
            <div><dt>中性子星</dt><dd>砂漠。資源は産出しません。</dd></div>
            <div><dt>ユニヴァース クリミナル</dt><dd>盗賊。いるタイルの産出を止めます。</dd></div>
            <div><dt>TV</dt><dd>騎士。使うとユニヴァース クリミナルを動かします。</dd></div>
          </dl>
          <h2>資源</h2>
          <p>岩石惑星=岩石、鉱石惑星=レアメタル、資材工場=資材、ナノマシン工場=ナノマシン、水耕栽培=食料。</p>
        </div>
      )}

      {tab === "cards" && (
        <div className="helpContent">
          <h2>新天地カード</h2>
          <dl>
            <div><dt>TV</dt><dd>ユニヴァース クリミナルを移動します。3枚以上で最大TVの候補です。</dd></div>
            <div><dt>航路整備</dt><dd>無料で星間航路を2本まで建設できます。</dd></div>
            <div><dt>徴収</dt><dd>選んだ資源を他プレイヤー全員から集めます。</dd></div>
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
              {tile.terrain === "desert" ? "中性子星" : RESOURCES[tile.terrain].terrain}
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
                UC
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

  const me = state.players[myPlayerId];
  const active = currentPlayer(state);
  const actionable = state.phase === "setup" ? active.id === myPlayerId : state.turn === myPlayerId;
  const currentTradeRate = tradeRateFor(state, myPlayerId, trade.give);

  return (
    <main>
      <section className="topbar">
        <div>
          <h1>Star Settlers</h1>
          <p>惑星を広げ、恒星へ育て、10点を目指す4人用オンライン卓。</p>
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
            <span className="pill">フェーズ: {state.phase === "setup" ? "初期配置" : state.rolled ? "交易・建設" : "サイコロ"}</span>
            <span className="pill">操作: {BUILD_LABEL[state.action] || (state.action === "criminal" ? "ユニヴァース クリミナル" : state.action)}</span>
            {state.dice && <span className="pill">出目: {state.dice.join(" + ")} = {state.dice[0] + state.dice[1]}</span>}
          </div>
          <Board state={state} onEvent={act} myPlayerId={myPlayerId} />
        </div>

        <aside className="panel">
          <div className="self">
            <label>
              あなた
              <select value={myPlayerId} onChange={(e) => setMyPlayerId(Number(e.target.value))}>
                {state.players.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </label>
            <input value={me.name} onChange={(e) => act({ type: "rename", name: e.target.value })} />
          </div>

          <div className="actions">
            <button className="primary" onClick={() => act({ type: "roll" })} disabled={!actionable || state.phase !== "play" || state.rolled}>
              <Dice5 size={18} /> サイコロ
            </button>
            <button onClick={() => act({ type: "endTurn" })} disabled={!actionable || state.phase !== "play"}>
              <Undo2 size={18} /> ターン終了
            </button>
          </div>

          <div className="tools">
            <button className={state.action === "route" ? "selected" : ""} onClick={() => act({ type: "setAction", action: "route" })}>
              <Rocket size={17} /> 星間航路
            </button>
            <button className={state.action === "planet" ? "selected" : ""} onClick={() => act({ type: "setAction", action: "planet" })}>
              <Orbit size={17} /> 惑星
            </button>
            <button className={state.action === "star" ? "selected" : ""} onClick={() => act({ type: "setAction", action: "star" })}>
              <Satellite size={17} /> 恒星
            </button>
            <button className={state.action === "criminal" ? "selected" : ""} onClick={() => act({ type: "setAction", action: "criminal" })}>
              <Swords size={17} /> ユニヴァース
            </button>
          </div>

          <div className="costs">
            <h2>建設コスト</h2>
            <p>星間航路 <Cost cost={COSTS.route} /></p>
            <p>惑星 <Cost cost={COSTS.planet} /></p>
            <p>恒星 <Cost cost={COSTS.star} /></p>
            <p>新天地 <Cost cost={COSTS.frontier} /></p>
            <button onClick={() => act({ type: "buyDev" })} disabled={!actionable || !state.rolled}>
              <Shuffle size={17} /> 新天地を獲得
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
            <button onClick={() => act({ type: "bankTrade", ...trade })}>交換</button>
            <p className="spaceportNote">スペースポート: {spaceportText(state, myPlayerId)}</p>
          </div>

          <div className="frontiers">
            <h2>手札の新天地</h2>
            <div className="miniControls">
              <select value={devChoice.resource} onChange={(e) => setDevChoice({ ...devChoice, resource: e.target.value })}>
                {RESOURCE_KEYS.map((key) => <option key={key} value={key}>徴収: {RESOURCES[key].name}</option>)}
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
                <button key={`${card}-${index}`} onClick={() => act({ type: "playDev", card, ...devChoice })} disabled={card === "point"}>
                  {DEV_NAMES[card]}
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
              <strong>{player.name}</strong>
              <span>{getVp(state, player.id)} VP</span>
            </div>
            <p>{resourceText(player.resources)}</p>
            <small>TV {player.playedTv} / 新天地 {player.hiddenNewFrontiers.length} / {spaceportText(state, player.id)} {player.bonus.longest ? " / 最長航路" : ""}{player.bonus.largestTv ? " / 最大TV" : ""}</small>
          </article>
        ))}
      </section>

      <section className="log">
        <h2>航行ログ</h2>
        {state.winner !== null && <div className="winner">{state.players[state.winner].name} の勝利</div>}
        {state.log.map((line, index) => <p key={index}>{line}</p>)}
      </section>
    </main>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
