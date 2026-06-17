function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
var _React = React,
  useEffect = _React.useEffect,
  useMemo = _React.useMemo,
  useRef = _React.useRef,
  useState = _React.useState;
function Icon(_ref) {
  var label = _ref.label;
  return /*#__PURE__*/React.createElement("span", {
    className: "icon",
    "aria-hidden": "true"
  }, label);
}
var Copy = function Copy() {
  return /*#__PURE__*/React.createElement(Icon, {
    label: "\u29C9"
  });
};
var Dice5 = function Dice5() {
  return /*#__PURE__*/React.createElement(Icon, {
    label: "\u2684"
  });
};
var Orbit = function Orbit() {
  return /*#__PURE__*/React.createElement(Icon, {
    label: "\u25CE"
  });
};
var RadioTower = function RadioTower() {
  return /*#__PURE__*/React.createElement(Icon, {
    label: "\u2301"
  });
};
var Rocket = function Rocket() {
  return /*#__PURE__*/React.createElement(Icon, {
    label: "\u2197"
  });
};
var Satellite = function Satellite() {
  return /*#__PURE__*/React.createElement(Icon, {
    label: "\u25C9"
  });
};
var Shuffle = function Shuffle() {
  return /*#__PURE__*/React.createElement(Icon, {
    label: "\u21C4"
  });
};
var Swords = function Swords() {
  return /*#__PURE__*/React.createElement(Icon, {
    label: "!"
  });
};
var Undo2 = function Undo2() {
  return /*#__PURE__*/React.createElement(Icon, {
    label: "\u2713"
  });
};
var RESOURCES = {
  rock: {
    name: "岩石",
    terrain: "岩石惑星",
    color: "#a3544a"
  },
  rare: {
    name: "レアメタル",
    terrain: "鉱石惑星",
    color: "#64748b"
  },
  material: {
    name: "資材",
    terrain: "資材工場",
    color: "#2f855a"
  },
  nano: {
    name: "ナノマシン",
    terrain: "ナノマシン工場",
    color: "#7c9a3e"
  },
  food: {
    name: "食料",
    terrain: "水耕栽培",
    color: "#d5a11e"
  }
};
var RESOURCE_KEYS = Object.keys(RESOURCES);
var PLAYERS = [{
  id: 0,
  name: "Player A",
  color: "#ff5d73"
}, {
  id: 1,
  name: "Player B",
  color: "#31b6c4"
}, {
  id: 2,
  name: "Player C",
  color: "#f6b642"
}, {
  id: 3,
  name: "Player D",
  color: "#8b7cf6"
}];
var COSTS = {
  route: {
    rock: 1,
    material: 1
  },
  planet: {
    rock: 1,
    material: 1,
    nano: 1,
    food: 1
  },
  star: {
    rare: 3,
    food: 2
  },
  frontier: {
    rare: 1,
    nano: 1,
    food: 1
  }
};
var DEV_DECK = [].concat(_toConsumableArray(Array(14).fill("tv")), _toConsumableArray(Array(2).fill("route")), _toConsumableArray(Array(2).fill("collect")), _toConsumableArray(Array(2).fill("plenty")), _toConsumableArray(Array(5).fill("point")));
var DEV_NAMES = {
  tv: "TV",
  route: "航路整備",
  collect: "徴収",
  plenty: "補給衛星",
  point: "勝利記録"
};
var FIXED_SPACEPORTS = [{
  tileNumber: 3,
  side: "upperLeft",
  type: null
}, {
  tileNumber: 8,
  side: "left",
  type: null
}, {
  tileNumber: 16,
  side: "right",
  type: null
}, {
  tileNumber: 19,
  side: "lowerRight",
  type: null
}, {
  tileNumber: 2,
  side: "upperLeft",
  type: "rare"
}, {
  tileNumber: 4,
  side: "upperLeft",
  type: "nano"
}, {
  tileNumber: 7,
  side: "right",
  type: "nano"
}, {
  tileNumber: 13,
  side: "lowerLeft",
  type: "material"
}, {
  tileNumber: 18,
  side: "lowerLeft",
  type: "rock"
}];
var HEX_SIDE_INDEX = {
  right: 0,
  lowerRight: 1,
  lowerLeft: 2,
  left: 3,
  upperLeft: 4,
  upperRight: 5
};
var BUILD_LABEL = {
  route: "星間航路",
  planet: "惑星",
  star: "恒星",
  frontier: "新天地"
};
var TILE_SETUP = ["material", "nano", "rock", "food", "rare", "rock", "food", "material", "nano", "desert", "material", "rare", "material", "food", "nano", "rock", "rare", "food", "nano"];
var NUMBERS = [5, 2, 6, 3, 8, 10, 9, 12, 11, 4, 8, 10, 9, 4, 5, 6, 3, 11];
var HEX_COORDS = [];
for (var q = -2; q <= 2; q += 1) {
  var r1 = Math.max(-2, -q - 2);
  var r2 = Math.min(2, -q + 2);
  for (var r = r1; r <= r2; r += 1) HEX_COORDS.push({
    q: q,
    r: r
  });
}
var HEX_SIZE = 54;
var CENTER = {
  x: 360,
  y: 340
};
var EPS = 8;
function mulberry32(seed) {
  return function random() {
    var t = seed += 0x6d2b79f5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
function hashString(input) {
  var hash = 2166136261;
  for (var i = 0; i < input.length; i += 1) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}
function shuffle(items, random) {
  var next = _toConsumableArray(items);
  for (var i = next.length - 1; i > 0; i -= 1) {
    var j = Math.floor(random() * (i + 1));
    var _ref2 = [next[j], next[i]];
    next[i] = _ref2[0];
    next[j] = _ref2[1];
  }
  return next;
}
function hexToPixel(q, r) {
  return {
    x: CENTER.x + HEX_SIZE * Math.sqrt(3) * (q + r / 2),
    y: CENTER.y + HEX_SIZE * 1.5 * r
  };
}
function pointKey(point) {
  return "".concat(Math.round(point.x / EPS), ":").concat(Math.round(point.y / EPS));
}
function edgeKey(a, b) {
  return [a, b].sort().join("|");
}
function addRes(target, key, amount) {
  if (!key || key === "desert") return;
  target[key] = (target[key] || 0) + amount;
}
function emptyResources() {
  var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  return Object.fromEntries(RESOURCE_KEYS.map(function (key) {
    return [key, value];
  }));
}
function totalResources(resources) {
  return RESOURCE_KEYS.reduce(function (sum, key) {
    return sum + Number(resources[key] || 0);
  }, 0);
}
function hasResources(player, resources) {
  return RESOURCE_KEYS.every(function (key) {
    return (player.resources[key] || 0) >= Number(resources[key] || 0);
  });
}
function moveResources(from, to, resources) {
  RESOURCE_KEYS.forEach(function (key) {
    var amount = Number(resources[key] || 0);
    from.resources[key] -= amount;
    to.resources[key] += amount;
  });
}
function cleanBundle(resources) {
  return Object.fromEntries(RESOURCE_KEYS.map(function (key) {
    return [key, Math.max(0, Number(resources[key] || 0))];
  }));
}
function bundleText(resources) {
  var parts = RESOURCE_KEYS.filter(function (key) {
    return Number(resources[key] || 0) > 0;
  }).map(function (key) {
    return "".concat(RESOURCES[key].name).concat(resources[key]);
  });
  return parts.length ? parts.join(" + ") : "なし";
}
function bundleSignature(resources) {
  return RESOURCE_KEYS.filter(function (key) {
    return Number(resources[key] || 0) > 0;
  }).join("+") || "none";
}
function offerSignature(offer) {
  return "".concat(bundleSignature(offer.turnGives), "=>").concat(bundleSignature(offer.partnerGives));
}
function isGiftOffer(offer) {
  return totalResources(offer.turnGives) === 0 || totalResources(offer.partnerGives) === 0;
}
function isBetterOffer(candidate, current) {
  var usedCombos = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var candidateTurnGives = totalResources(candidate.turnGives);
  var candidatePartnerGives = totalResources(candidate.partnerGives);
  var currentTurnGives = totalResources(current.turnGives);
  var currentPartnerGives = totalResources(current.partnerGives);
  var sameTurnCost = candidateTurnGives === currentTurnGives;
  var samePartnerPay = candidatePartnerGives === currentPartnerGives;
  var lowerTurnCost = candidateTurnGives < currentTurnGives;
  var higherPartnerPay = candidatePartnerGives > currentPartnerGives;
  var newCombo = !usedCombos.includes(offerSignature(candidate));
  if (samePartnerPay && lowerTurnCost) return true;
  if (sameTurnCost && higherPartnerPay) return true;
  return newCombo && candidateTurnGives <= currentTurnGives && candidatePartnerGives >= currentPartnerGives && (lowerTurnCost || higherPartnerPay);
}
function canPlayerOffer(state, partnerId, offer) {
  var turnPlayer = state.players[state.turn];
  var partner = state.players[partnerId];
  return !isGiftOffer(offer) && hasResources(turnPlayer, offer.turnGives) && hasResources(partner, offer.partnerGives);
}
function canPotentiallyIntervene(state, playerId) {
  var negotiation = state.negotiation;
  if (!negotiation || playerId === negotiation.turnPlayer || playerId === negotiation.partner) return false;
  var current = negotiation.currentOffer;
  var turnPlayer = state.players[negotiation.turnPlayer];
  var player = state.players[playerId];
  var turnCost = totalResources(current.turnGives);
  var partnerPay = totalResources(current.partnerGives);
  var playerCards = totalResources(player.resources);
  if (turnCost > 1 && hasResources(turnPlayer, current.turnGives) && hasResources(player, current.partnerGives)) return true;
  if (playerCards > partnerPay && hasResources(turnPlayer, current.turnGives)) return true;
  return false;
}
function spaceportName(type) {
  return type ? "".concat(RESOURCES[type].name, " 2:1") : "3:1";
}
function visualTileNumberMap() {
  return new Map([].concat(HEX_COORDS).sort(function (a, b) {
    return a.r === b.r ? hexToPixel(a.q, a.r).x - hexToPixel(b.q, b.r).x : a.r - b.r;
  }).map(function (coord, index) {
    return ["".concat(coord.q, ":").concat(coord.r), index + 1];
  }));
}
function makeBoard(seedText) {
  var random = mulberry32(hashString(seedText));
  var terrains = shuffle(TILE_SETUP, random);
  var nums = shuffle(NUMBERS, random);
  var boardNumbers = visualTileNumberMap();
  var numIndex = 0;
  var vertices = new Map();
  var edges = new Map();
  var tiles = HEX_COORDS.map(function (coord, index) {
    var center = hexToPixel(coord.q, coord.r);
    var terrain = terrains[index];
    var number = terrain === "desert" ? null : nums[numIndex++];
    var corners = Array.from({
      length: 6
    }, function (_, i) {
      var angle = Math.PI / 180 * (60 * i - 30);
      var point = {
        x: center.x + HEX_SIZE * Math.cos(angle),
        y: center.y + HEX_SIZE * Math.sin(angle)
      };
      var key = pointKey(point);
      if (!vertices.has(key)) vertices.set(key, {
        id: key,
        x: point.x,
        y: point.y,
        tiles: []
      });
      vertices.get(key).tiles.push(index);
      return key;
    });
    for (var i = 0; i < 6; i += 1) {
      var key = edgeKey(corners[i], corners[(i + 1) % 6]);
      if (!edges.has(key)) edges.set(key, {
        id: key,
        a: corners[i],
        b: corners[(i + 1) % 6],
        tiles: []
      });
      edges.get(key).tiles.push(index);
    }
    return _objectSpread(_objectSpread({
      id: index,
      boardNumber: boardNumbers.get("".concat(coord.q, ":").concat(coord.r))
    }, coord), {}, {
      center: center,
      terrain: terrain,
      number: number,
      corners: corners
    });
  });
  var vertexList = _toConsumableArray(vertices.values());
  var edgeList = _toConsumableArray(edges.values());
  var adjacency = {};
  var incidentEdges = {};
  vertexList.forEach(function (v) {
    adjacency[v.id] = new Set();
    incidentEdges[v.id] = [];
  });
  edgeList.forEach(function (e) {
    adjacency[e.a].add(e.b);
    adjacency[e.b].add(e.a);
    incidentEdges[e.a].push(e.id);
    incidentEdges[e.b].push(e.id);
  });
  var spaceports = FIXED_SPACEPORTS.map(function (spaceport, index) {
    var tile = tiles.find(function (item) {
      return item.boardNumber === spaceport.tileNumber;
    });
    var sideIndex = HEX_SIDE_INDEX[spaceport.side];
    var aId = tile.corners[sideIndex];
    var bId = tile.corners[(sideIndex + 1) % 6];
    var edge = edges.get(edgeKey(aId, bId));
    var type = spaceport.type;
    var a = vertices.get(edge.a);
    var b = vertices.get(edge.b);
    var x = (a.x + b.x) / 2;
    var y = (a.y + b.y) / 2;
    var dx = x - CENTER.x;
    var dy = y - CENTER.y;
    var length = Math.hypot(dx, dy) || 1;
    return {
      id: "spaceport-".concat(index),
      edgeId: edge.id,
      vertices: [edge.a, edge.b],
      type: type,
      tileNumber: spaceport.tileNumber,
      side: spaceport.side,
      x: x,
      y: y,
      labelX: x + dx / length * 42,
      labelY: y + dy / length * 42
    };
  });
  return {
    tiles: tiles,
    vertices: vertexList,
    edges: edgeList,
    spaceports: spaceports,
    adjacency: Object.fromEntries(Object.entries(adjacency).map(function (_ref3) {
      var _ref4 = _slicedToArray(_ref3, 2),
        k = _ref4[0],
        v = _ref4[1];
      return [k, _toConsumableArray(v)];
    })),
    incidentEdges: incidentEdges
  };
}
function createGame() {
  var _board$tiles$find$id, _board$tiles$find;
  var roomId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : crypto.randomUUID().slice(0, 8);
  var board = makeBoard(roomId);
  var neutron = (_board$tiles$find$id = (_board$tiles$find = board.tiles.find(function (tile) {
    return tile.terrain === "desert";
  })) === null || _board$tiles$find === void 0 ? void 0 : _board$tiles$find.id) !== null && _board$tiles$find$id !== void 0 ? _board$tiles$find$id : 9;
  return {
    id: roomId,
    board: board,
    players: PLAYERS.map(function (player) {
      return _objectSpread(_objectSpread({}, player), {}, {
        resources: emptyResources(),
        hiddenNewFrontiers: [],
        playedNewFrontiers: [],
        playedTv: 0,
        bonus: {
          longest: false,
          largestTv: false
        }
      });
    }),
    buildings: {},
    routes: {},
    deck: shuffle(DEV_DECK, mulberry32(hashString("".concat(roomId, ":deck")))),
    discard: [],
    turn: 0,
    turnCount: 0,
    phase: "setup",
    setupStep: 0,
    setupOrder: [0, 1, 2, 3, 3, 2, 1, 0],
    setupPendingVertex: null,
    action: "planet",
    dice: null,
    rolled: false,
    criminalTile: neutron,
    selectedTile: neutron,
    negotiation: null,
    log: ["宇宙航路の準備が整いました。惑星と星間航路を初期配置してください。"],
    winner: null
  };
}
function canAfford(player, cost) {
  return Object.entries(cost).every(function (_ref5) {
    var _ref6 = _slicedToArray(_ref5, 2),
      key = _ref6[0],
      amount = _ref6[1];
    return (player.resources[key] || 0) >= amount;
  });
}
function pay(player, cost) {
  Object.entries(cost).forEach(function (_ref7) {
    var _ref8 = _slicedToArray(_ref7, 2),
      key = _ref8[0],
      amount = _ref8[1];
    player.resources[key] -= amount;
  });
}
function resourceText(resources) {
  return RESOURCE_KEYS.map(function (key) {
    return "".concat(RESOURCES[key].name).concat(resources[key] || 0);
  }).join(" / ");
}
function visibleResourceText(player, viewerId) {
  if (player.id === viewerId) return resourceText(player.resources);
  return "\u8CC7\u6E90 ".concat(totalResources(player.resources), "\u679A");
}
function frontierType(card) {
  return typeof card === "string" ? card : card.type;
}
function frontierBoughtTurn(card) {
  return typeof card === "string" ? -1 : card.boughtTurn;
}
function canPlayFrontier(card, state) {
  return frontierType(card) !== "point" && frontierBoughtTurn(card) < state.turnCount;
}
function publicPlayedFrontiers(player) {
  var played = player.playedNewFrontiers || [];
  if (!played.length) return "使用済みなし";
  var counts = played.reduce(function (acc, type) {
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});
  return Object.entries(counts).map(function (_ref9) {
    var _ref0 = _slicedToArray(_ref9, 2),
      type = _ref0[0],
      count = _ref0[1];
    return "".concat(DEV_NAMES[type]).concat(count);
  }).join(" / ");
}
function playerSpaceports(state, playerId) {
  return state.board.spaceports.filter(function (spaceport) {
    return spaceport.vertices.some(function (vertexId) {
      var _state$buildings$vert;
      return ((_state$buildings$vert = state.buildings[vertexId]) === null || _state$buildings$vert === void 0 ? void 0 : _state$buildings$vert.player) === playerId;
    });
  });
}
function tradeRateFor(state, playerId, give) {
  var ports = playerSpaceports(state, playerId);
  if (ports.some(function (port) {
    return port.type === give;
  })) return 2;
  if (ports.some(function (port) {
    return port.type === null;
  })) return 3;
  return 4;
}
function spaceportText(state, playerId) {
  var ports = playerSpaceports(state, playerId);
  if (!ports.length) return "スペースポートなし";
  return ports.map(function (port) {
    return spaceportName(port.type);
  }).join(" / ");
}
function currentPlayer(state) {
  var active = state.phase === "setup" ? state.setupOrder[state.setupStep] : state.turn;
  return state.players[active];
}
function addLog(state, text) {
  state.log = [text].concat(_toConsumableArray(state.log)).slice(0, 8);
}
function getVp(state, playerId) {
  var planets = Object.values(state.buildings).filter(function (b) {
    return b.player === playerId && b.type === "planet";
  }).length;
  var stars = Object.values(state.buildings).filter(function (b) {
    return b.player === playerId && b.type === "star";
  }).length;
  var points = state.players[playerId].hiddenNewFrontiers.filter(function (card) {
    return frontierType(card) === "point";
  }).length;
  var bonus = (state.players[playerId].bonus.longest ? 2 : 0) + (state.players[playerId].bonus.largestTv ? 2 : 0);
  return planets + stars * 2 + points + bonus;
}
function distanceRule(state, vertexId) {
  return !state.board.adjacency[vertexId].some(function (next) {
    return state.buildings[next];
  });
}
function routeTouchesOwnNetwork(state, edge, playerId) {
  return [edge.a, edge.b].some(function (vertexId) {
    var building = state.buildings[vertexId];
    if ((building === null || building === void 0 ? void 0 : building.player) === playerId) return true;
    return state.board.incidentEdges[vertexId].some(function (edgeId) {
      var _state$routes$edgeId;
      return ((_state$routes$edgeId = state.routes[edgeId]) === null || _state$routes$edgeId === void 0 ? void 0 : _state$routes$edgeId.player) === playerId;
    });
  });
}
function canBuildRoute(state, edgeId, playerId) {
  var free = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (state.routes[edgeId]) return false;
  var edge = state.board.edges.find(function (item) {
    return item.id === edgeId;
  });
  if (!edge) return false;
  if (state.phase === "setup") return state.setupPendingVertex && [edge.a, edge.b].includes(state.setupPendingVertex);
  return (free || canAfford(state.players[playerId], COSTS.route)) && routeTouchesOwnNetwork(state, edge, playerId);
}
function canBuildPlanet(state, vertexId, playerId) {
  if (state.buildings[vertexId] || !distanceRule(state, vertexId)) return false;
  if (state.phase === "setup") return !state.setupPendingVertex;
  if (!canAfford(state.players[playerId], COSTS.planet)) return false;
  return state.board.incidentEdges[vertexId].some(function (edgeId) {
    var _state$routes$edgeId2;
    return ((_state$routes$edgeId2 = state.routes[edgeId]) === null || _state$routes$edgeId2 === void 0 ? void 0 : _state$routes$edgeId2.player) === playerId;
  });
}
function refreshBonuses(state) {
  state.players.forEach(function (player) {
    player.bonus.longest = false;
    player.bonus.largestTv = false;
  });
  var tvLeader = null;
  state.players.forEach(function (player) {
    if (player.playedTv >= 3 && (!tvLeader || player.playedTv > tvLeader.playedTv)) tvLeader = player;
  });
  if (tvLeader) tvLeader.bonus.largestTv = true;
  var routeCounts = state.players.map(function (player) {
    return {
      id: player.id,
      count: Object.values(state.routes).filter(function (route) {
        return route.player === player.id;
      }).length
    };
  });
  var routeLeader = routeCounts.sort(function (a, b) {
    return b.count - a.count;
  })[0];
  if ((routeLeader === null || routeLeader === void 0 ? void 0 : routeLeader.count) >= 5) state.players[routeLeader.id].bonus.longest = true;
}
function produce(state, total) {
  if (total === 7) {
    addLog(state, "7が出ました。ユニヴァース クリミナルを任意のタイルへ移動できます。");
    state.action = "criminal";
    state.selectedTile = state.criminalTile;
    return;
  }
  var gained = [];
  state.board.tiles.forEach(function (tile) {
    if (tile.number !== total || tile.id === state.criminalTile || tile.terrain === "desert") return;
    tile.corners.forEach(function (vertexId) {
      var building = state.buildings[vertexId];
      if (!building) return;
      var amount = building.type === "star" ? 2 : 1;
      addRes(state.players[building.player].resources, tile.terrain, amount);
      gained.push("".concat(state.players[building.player].name, "+").concat(RESOURCES[tile.terrain].name).concat(amount));
    });
  });
  addLog(state, gained.length ? "\u7523\u51FA ".concat(total, ": ").concat(gained.join(", ")) : "\u7523\u51FA ".concat(total, ": \u4F55\u3082\u751F\u307E\u308C\u307E\u305B\u3093\u3067\u3057\u305F\u3002"));
}
function moveTurn(state) {
  refreshBonuses(state);
  var winner = state.players.find(function (player) {
    return getVp(state, player.id) >= 10;
  });
  if (winner) {
    state.winner = winner.id;
    addLog(state, "".concat(winner.name, " \u304C10\u70B9\u306B\u5230\u9054\u3057\u307E\u3057\u305F\u3002"));
    return;
  }
  state.turn = (state.turn + 1) % 4;
  state.turnCount = (state.turnCount || 0) + 1;
  state.rolled = false;
  state.dice = null;
  state.action = "roll";
  addLog(state, "".concat(state.players[state.turn].name, " \u306E\u30BF\u30FC\u30F3\u3067\u3059\u3002"));
}
function reducer(state, event) {
  var _event$playerId;
  var next = structuredClone(state);
  var actor = (_event$playerId = event.playerId) !== null && _event$playerId !== void 0 ? _event$playerId : currentPlayer(next).id;
  var player = next.players[actor];
  if (next.winner && event.type !== "reset") return next;
  if (event.type === "reset") return createGame(event.roomId || crypto.randomUUID().slice(0, 8));
  if (event.type === "rename") {
    next.players[actor].name = event.name.slice(0, 18) || "Player ".concat(actor + 1);
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
      addLog(next, "\u30E6\u30CB\u30F4\u30A1\u30FC\u30B9 \u30AF\u30EA\u30DF\u30CA\u30EB\u304C".concat(tileName(next.board.tiles[event.tileId]), "\u3078\u79FB\u52D5\u3057\u307E\u3057\u305F\u3002"));
      next.action = next.rolled ? "build" : "roll";
    }
    return next;
  }
  if (event.type === "roll") {
    if (actor !== next.turn || next.rolled || next.phase !== "play") return next;
    var d1 = Math.floor(Math.random() * 6) + 1;
    var d2 = Math.floor(Math.random() * 6) + 1;
    next.dice = [d1, d2];
    next.rolled = true;
    next.action = "build";
    produce(next, d1 + d2);
    return next;
  }
  if (event.type === "vertex") {
    var vertexId = event.vertexId;
    if (next.phase === "setup") {
      var active = next.setupOrder[next.setupStep];
      if (actor !== active || next.action !== "planet" || !canBuildPlanet(next, vertexId, actor)) return next;
      next.buildings[vertexId] = {
        player: actor,
        type: "planet"
      };
      next.setupPendingVertex = vertexId;
      next.action = "route";
      addLog(next, "".concat(player.name, " \u304C\u60D1\u661F\u3092\u914D\u7F6E\u3057\u307E\u3057\u305F\u3002\u661F\u9593\u822A\u8DEF\u3092\u63A5\u7D9A\u3057\u3066\u304F\u3060\u3055\u3044\u3002"));
      return next;
    }
    if (actor !== next.turn || !next.rolled) return next;
    if (next.action === "planet" && canBuildPlanet(next, vertexId, actor)) {
      pay(player, COSTS.planet);
      next.buildings[vertexId] = {
        player: actor,
        type: "planet"
      };
      addLog(next, "".concat(player.name, " \u304C\u60D1\u661F\u3092\u5EFA\u8A2D\u3057\u307E\u3057\u305F\u3002"));
    } else if (next.action === "star") {
      var building = next.buildings[vertexId];
      if ((building === null || building === void 0 ? void 0 : building.player) === actor && building.type === "planet" && canAfford(player, COSTS.star)) {
        pay(player, COSTS.star);
        building.type = "star";
        addLog(next, "".concat(player.name, " \u304C\u60D1\u661F\u3092\u6052\u661F\u3078\u5F37\u5316\u3057\u307E\u3057\u305F\u3002"));
      }
    }
    refreshBonuses(next);
    return next;
  }
  if (event.type === "edge") {
    var edgeId = event.edgeId;
    var free = event.free || next.action === "freeRoute";
    if (next.phase === "setup") {
      var _active = next.setupOrder[next.setupStep];
      if (actor !== _active || next.action !== "route" || !canBuildRoute(next, edgeId, actor)) return next;
      next.routes[edgeId] = {
        player: actor
      };
      if (next.setupStep >= 4) {
        var _next$board$vertices$;
        (_next$board$vertices$ = next.board.vertices.find(function (v) {
          return v.id === next.setupPendingVertex;
        })) === null || _next$board$vertices$ === void 0 || _next$board$vertices$.tiles.forEach(function (tileId) {
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
        addLog(next, "".concat(next.players[next.setupOrder[next.setupStep]].name, " \u304C\u60D1\u661F\u3092\u914D\u7F6E\u3057\u307E\u3059\u3002"));
      }
      return next;
    }
    if (actor !== next.turn || !next.rolled || !canBuildRoute(next, edgeId, actor, free)) return next;
    if (!free) pay(player, COSTS.route);
    next.routes[edgeId] = {
      player: actor
    };
    if (next.action === "freeRoute") {
      next.freeRoutesLeft = Math.max(0, (next.freeRoutesLeft || 1) - 1);
      if (next.freeRoutesLeft === 0) next.action = "build";
    }
    addLog(next, "".concat(player.name, " \u304C\u661F\u9593\u822A\u8DEF\u3092\u5EFA\u8A2D\u3057\u307E\u3057\u305F\u3002"));
    refreshBonuses(next);
    return next;
  }
  if (event.type === "buyDev") {
    if (actor !== next.turn || !next.rolled || !canAfford(player, COSTS.frontier) || next.deck.length === 0) return next;
    pay(player, COSTS.frontier);
    var card = next.deck.pop();
    player.hiddenNewFrontiers.push({
      type: card,
      boughtTurn: next.turnCount || 0
    });
    addLog(next, "".concat(player.name, " \u304C\u65B0\u5929\u5730\u3092\u7372\u5F97\u3057\u307E\u3057\u305F\u3002"));
    return next;
  }
  if (event.type === "playDev") {
    var cardIndex = player.hiddenNewFrontiers.findIndex(function (card) {
      return frontierType(card) === event.card && canPlayFrontier(card, next);
    });
    if (actor !== next.turn || cardIndex < 0) return next;
    var _card = player.hiddenNewFrontiers.splice(cardIndex, 1)[0];
    var type = frontierType(_card);
    player.playedNewFrontiers = player.playedNewFrontiers || [];
    player.playedNewFrontiers.push(type);
    next.discard.push(type);
    if (type === "tv") {
      player.playedTv += 1;
      next.action = "criminal";
      addLog(next, "".concat(player.name, " \u304CTV\u3092\u8D77\u52D5\u3002\u30E6\u30CB\u30F4\u30A1\u30FC\u30B9 \u30AF\u30EA\u30DF\u30CA\u30EB\u3092\u79FB\u52D5\u3057\u307E\u3059\u3002"));
    }
    if (type === "route") {
      next.action = "freeRoute";
      next.freeRoutesLeft = 2;
      addLog(next, "".concat(player.name, " \u304C\u822A\u8DEF\u6574\u5099\u3092\u5B9F\u884C\u3002\u7121\u6599\u30672\u672C\u307E\u3067\u5EFA\u8A2D\u3067\u304D\u307E\u3059\u3002"));
    }
    if (type === "collect") {
      var key = event.resource || RESOURCE_KEYS[0];
      var total = 0;
      next.players.forEach(function (other) {
        if (other.id === actor) return;
        total += other.resources[key] || 0;
        other.resources[key] = 0;
      });
      player.resources[key] += total;
      addLog(next, "".concat(player.name, " \u304C\u5FB4\u53CE\u3067").concat(RESOURCES[key].name).concat(total, "\u3092\u96C6\u3081\u307E\u3057\u305F\u3002"));
    }
    if (type === "plenty") {
      addRes(player.resources, event.a || "rock", 1);
      addRes(player.resources, event.b || "material", 1);
      addLog(next, "".concat(player.name, " \u304C\u88DC\u7D66\u885B\u661F\u304B\u3089\u8CC7\u6E90\u3092\u53D7\u3051\u53D6\u308A\u307E\u3057\u305F\u3002"));
    }
    refreshBonuses(next);
    return next;
  }
  if (event.type === "bankTrade") {
    var rate = tradeRateFor(next, actor, event.give);
    if (actor !== next.turn || !next.rolled || (player.resources[event.give] || 0) < rate) return next;
    player.resources[event.give] -= rate;
    player.resources[event.take] += 1;
    addLog(next, "".concat(player.name, " \u304C").concat(rate, ":1\u901A\u4FE1\u4EA4\u6613\u3092\u884C\u3044\u307E\u3057\u305F\u3002"));
    return next;
  }
  if (event.type === "startNegotiation") {
    var offer = {
      turnGives: cleanBundle(event.turnGives),
      partnerGives: cleanBundle(event.partnerGives)
    };
    var partnerId = Number(event.partnerId);
    if (actor !== next.turn || !next.rolled || next.negotiation || partnerId === actor || !next.players[partnerId]) return next;
    if (!canPlayerOffer(next, partnerId, offer)) return next;
    next.negotiation = {
      id: crypto.randomUUID(),
      turnPlayer: actor,
      partner: partnerId,
      offeredBy: actor,
      awaiting: partnerId,
      currentOffer: offer,
      usedCombos: [offerSignature(offer)],
      history: ["".concat(next.players[actor].name, " \u304C ").concat(next.players[partnerId].name, " \u306B\u4EA4\u63DB\u3092\u7533\u3057\u51FA\u307E\u3057\u305F\u3002")]
    };
    addLog(next, "".concat(next.players[actor].name, " \u304C\u516C\u958B\u4EA4\u6E09\u3092\u958B\u59CB\u3057\u307E\u3057\u305F\u3002"));
    return next;
  }
  if (event.type === "counterNegotiation") {
    var negotiation = next.negotiation;
    if (!negotiation || actor !== negotiation.awaiting) return next;
    var _offer = {
      turnGives: cleanBundle(event.turnGives),
      partnerGives: cleanBundle(event.partnerGives)
    };
    if (!canPlayerOffer(next, negotiation.partner, _offer)) return next;
    negotiation.currentOffer = _offer;
    negotiation.offeredBy = actor;
    negotiation.awaiting = actor === negotiation.turnPlayer ? negotiation.partner : negotiation.turnPlayer;
    negotiation.usedCombos = _toConsumableArray(new Set([].concat(_toConsumableArray(negotiation.usedCombos), [offerSignature(_offer)])));
    negotiation.history = ["".concat(next.players[actor].name, " \u304C\u6761\u4EF6\u5909\u66F4\u3092\u63D0\u793A\u3057\u307E\u3057\u305F\u3002")].concat(_toConsumableArray(negotiation.history)).slice(0, 8);
    return next;
  }
  if (event.type === "interveneNegotiation") {
    var _negotiation = next.negotiation;
    if (!_negotiation || actor === _negotiation.turnPlayer || actor === _negotiation.partner) return next;
    var _offer2 = {
      turnGives: cleanBundle(event.turnGives),
      partnerGives: cleanBundle(event.partnerGives)
    };
    if (!canPlayerOffer(next, actor, _offer2) || !isBetterOffer(_offer2, _negotiation.currentOffer, _negotiation.usedCombos)) return next;
    var previousPartner = _negotiation.partner;
    _negotiation.partner = actor;
    _negotiation.offeredBy = actor;
    _negotiation.awaiting = _negotiation.turnPlayer;
    _negotiation.decision = null;
    _negotiation.currentOffer = _offer2;
    _negotiation.usedCombos = _toConsumableArray(new Set([].concat(_toConsumableArray(_negotiation.usedCombos), [offerSignature(_offer2)])));
    _negotiation.history = ["".concat(next.players[actor].name, " \u304C ").concat(next.players[previousPartner].name, " \u3088\u308A\u6709\u5229\u306A\u6761\u4EF6\u3067\u4ECB\u5165\u3057\u307E\u3057\u305F\u3002")].concat(_toConsumableArray(_negotiation.history)).slice(0, 8);
    addLog(next, "".concat(next.players[actor].name, " \u304C\u516C\u958B\u4EA4\u6E09\u306B\u4ECB\u5165\u3057\u307E\u3057\u305F\u3002"));
    return next;
  }
  if (event.type === "acceptNegotiation") {
    var _negotiation2 = next.negotiation;
    if (!_negotiation2 || _negotiation2.decision || actor !== _negotiation2.awaiting) return next;
    if (!canPlayerOffer(next, _negotiation2.partner, _negotiation2.currentOffer)) return next;
    _negotiation2.decision = {
      type: "accepted",
      by: actor
    };
    _negotiation2.awaiting = null;
    _negotiation2.history = ["".concat(next.players[actor].name, " \u304C\u4EA4\u63DB\u3092\u53D7\u3051\u5165\u308C\u307E\u3057\u305F\u3002\u4ECB\u5165\u304C\u306A\u3051\u308C\u3070\u78BA\u5B9A\u3067\u304D\u307E\u3059\u3002")].concat(_toConsumableArray(_negotiation2.history)).slice(0, 8);
    addLog(next, "".concat(next.players[actor].name, " \u304C\u4EA4\u63DB\u3092\u53D7\u3051\u5165\u308C\u307E\u3057\u305F\u3002"));
    return next;
  }
  if (event.type === "rejectNegotiation") {
    var _negotiation3 = next.negotiation;
    if (!_negotiation3 || _negotiation3.decision || actor !== _negotiation3.awaiting) return next;
    _negotiation3.decision = {
      type: "rejected",
      by: actor
    };
    _negotiation3.awaiting = null;
    _negotiation3.history = ["".concat(next.players[actor].name, " \u304C\u4EA4\u63DB\u3092\u62D2\u5426\u3057\u307E\u3057\u305F\u3002\u4ECB\u5165\u304C\u306A\u3051\u308C\u3070\u7D42\u4E86\u3067\u304D\u307E\u3059\u3002")].concat(_toConsumableArray(_negotiation3.history)).slice(0, 8);
    addLog(next, "".concat(next.players[actor].name, " \u304C\u4EA4\u63DB\u3092\u62D2\u5426\u3057\u307E\u3057\u305F\u3002"));
    return next;
  }
  if (event.type === "finalizeNegotiation") {
    var _negotiation4 = next.negotiation;
    if (!_negotiation4 || !_negotiation4.decision || actor !== _negotiation4.turnPlayer) return next;
    if (_negotiation4.decision.type === "accepted") {
      if (!canPlayerOffer(next, _negotiation4.partner, _negotiation4.currentOffer)) return next;
      var turnPlayer = next.players[_negotiation4.turnPlayer];
      var partner = next.players[_negotiation4.partner];
      moveResources(turnPlayer, partner, _negotiation4.currentOffer.turnGives);
      moveResources(partner, turnPlayer, _negotiation4.currentOffer.partnerGives);
      addLog(next, "".concat(turnPlayer.name, " \u3068 ").concat(partner.name, " \u306E\u4EA4\u63DB\u304C\u78BA\u5B9A\u3057\u307E\u3057\u305F\u3002"));
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
  if (tile.terrain === "desert") return "中性子星";
  return RESOURCES[tile.terrain].terrain;
}
function Cost(_ref1) {
  var cost = _ref1.cost;
  return /*#__PURE__*/React.createElement("span", {
    className: "cost"
  }, Object.entries(cost).map(function (_ref10) {
    var _ref11 = _slicedToArray(_ref10, 2),
      key = _ref11[0],
      value = _ref11[1];
    return /*#__PURE__*/React.createElement("span", {
      key: key,
      style: {
        "--dot": RESOURCES[key].color
      }
    }, RESOURCES[key].name, " ", value);
  }));
}
function ResourceBundleInput(_ref12) {
  var title = _ref12.title,
    value = _ref12.value,
    _onChange = _ref12.onChange;
  return /*#__PURE__*/React.createElement("div", {
    className: "bundleInput"
  }, /*#__PURE__*/React.createElement("h3", null, title), RESOURCE_KEYS.map(function (key) {
    return /*#__PURE__*/React.createElement("label", {
      key: key
    }, /*#__PURE__*/React.createElement("span", null, RESOURCES[key].name), /*#__PURE__*/React.createElement("input", {
      type: "number",
      min: "0",
      max: "19",
      value: value[key] || 0,
      onChange: function onChange(event) {
        return _onChange(_objectSpread(_objectSpread({}, value), {}, _defineProperty({}, key, Math.max(0, Number(event.target.value || 0)))));
      }
    }));
  }));
}
function emptyBundle() {
  return emptyResources(0);
}
function NegotiationPanel(_ref13) {
  var _state$players$find$i, _state$players$find;
  var state = _ref13.state,
    myPlayerId = _ref13.myPlayerId,
    onEvent = _ref13.onEvent;
  var _useState = useState((myPlayerId + 1) % 4),
    _useState2 = _slicedToArray(_useState, 2),
    partnerId = _useState2[0],
    setPartnerId = _useState2[1];
  var _useState3 = useState(emptyBundle),
    _useState4 = _slicedToArray(_useState3, 2),
    turnGives = _useState4[0],
    setTurnGives = _useState4[1];
  var _useState5 = useState(emptyBundle),
    _useState6 = _slicedToArray(_useState5, 2),
    partnerGives = _useState6[0],
    setPartnerGives = _useState6[1];
  var negotiation = state.negotiation;
  var me = state.players[myPlayerId];
  var isTurnPlayer = myPlayerId === state.turn;
  var draftOffer = {
    turnGives: cleanBundle(turnGives),
    partnerGives: cleanBundle(partnerGives)
  };
  var selectedPartner = state.players[partnerId] ? partnerId : (_state$players$find$i = (_state$players$find = state.players.find(function (player) {
    return player.id !== myPlayerId;
  })) === null || _state$players$find === void 0 ? void 0 : _state$players$find.id) !== null && _state$players$find$i !== void 0 ? _state$players$find$i : 0;
  var canStart = isTurnPlayer && state.phase === "play" && state.rolled && !negotiation && selectedPartner !== myPlayerId && canPlayerOffer(state, selectedPartner, draftOffer);
  var canCounter = negotiation && !negotiation.decision && myPlayerId === negotiation.awaiting && canPlayerOffer(state, negotiation.partner, draftOffer);
  var canIntervene = negotiation && myPlayerId !== negotiation.turnPlayer && myPlayerId !== negotiation.partner && canPlayerOffer(state, myPlayerId, draftOffer) && isBetterOffer(draftOffer, negotiation.currentOffer, negotiation.usedCombos);
  var canShowIntervention = negotiation && canPotentiallyIntervene(state, myPlayerId);
  return /*#__PURE__*/React.createElement("div", {
    className: "negotiation"
  }, /*#__PURE__*/React.createElement("h2", null, "\u30D7\u30EC\u30A4\u30E4\u30FC\u9593\u4EA4\u6E09"), !negotiation && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("label", {
    className: "partnerSelect"
  }, "\u4EA4\u63DB\u76F8\u624B", /*#__PURE__*/React.createElement("select", {
    value: selectedPartner,
    onChange: function onChange(event) {
      return setPartnerId(Number(event.target.value));
    }
  }, state.players.filter(function (player) {
    return player.id !== myPlayerId;
  }).map(function (player) {
    return /*#__PURE__*/React.createElement("option", {
      key: player.id,
      value: player.id
    }, player.name);
  }))), /*#__PURE__*/React.createElement("div", {
    className: "bundleGrid"
  }, /*#__PURE__*/React.createElement(ResourceBundleInput, {
    title: "\u3042\u306A\u305F\u304C\u6E21\u3059",
    value: turnGives,
    onChange: setTurnGives
  }), /*#__PURE__*/React.createElement(ResourceBundleInput, {
    title: "\u76F8\u624B\u304C\u6E21\u3059",
    value: partnerGives,
    onChange: setPartnerGives
  })), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return onEvent({
        type: "startNegotiation",
        partnerId: selectedPartner,
        turnGives: turnGives,
        partnerGives: partnerGives
      });
    },
    disabled: !canStart
  }, "\u4EA4\u63DB\u3092\u7533\u3057\u51FA\u308B"), /*#__PURE__*/React.createElement("p", {
    className: "spaceportNote"
  }, "\u53CC\u65B9\u304C1\u679A\u4EE5\u4E0A\u51FA\u3059\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059\u3002\u6301\u3063\u3066\u3044\u306A\u3044\u8CC7\u6E90\u306F\u63D0\u793A\u3067\u304D\u307E\u305B\u3093\u3002")), negotiation && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "currentOffer"
  }, /*#__PURE__*/React.createElement("strong", null, state.players[negotiation.turnPlayer].name, " \u21C4 ", state.players[negotiation.partner].name), /*#__PURE__*/React.createElement("p", null, state.players[negotiation.turnPlayer].name, " \u304C\u6E21\u3059: ", bundleText(negotiation.currentOffer.turnGives)), /*#__PURE__*/React.createElement("p", null, state.players[negotiation.partner].name, " \u304C\u6E21\u3059: ", bundleText(negotiation.currentOffer.partnerGives)), negotiation.awaiting !== null && /*#__PURE__*/React.createElement("small", null, "\u8FD4\u7B54\u5F85\u3061: ", state.players[negotiation.awaiting].name), negotiation.decision && /*#__PURE__*/React.createElement("small", null, negotiation.decision.type === "accepted" ? "受諾済み" : "拒否済み", ": ", state.players[negotiation.decision.by].name)), !negotiation.decision && myPlayerId === negotiation.awaiting && /*#__PURE__*/React.createElement("div", {
    className: "negotiationActions"
  }, /*#__PURE__*/React.createElement("button", {
    className: "primary",
    onClick: function onClick() {
      return onEvent({
        type: "acceptNegotiation"
      });
    }
  }, "\u53D7\u3051\u5165\u308C\u308B"), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return onEvent({
        type: "rejectNegotiation"
      });
    }
  }, "\u62D2\u5426")), negotiation.decision && myPlayerId === negotiation.turnPlayer && /*#__PURE__*/React.createElement("button", {
    className: "primary",
    onClick: function onClick() {
      return onEvent({
        type: "finalizeNegotiation"
      });
    }
  }, "\u4EA4\u6E09\u3092\u78BA\u5B9A"), (!negotiation.decision && myPlayerId === negotiation.awaiting || canShowIntervention) && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "bundleGrid"
  }, /*#__PURE__*/React.createElement(ResourceBundleInput, {
    title: "".concat(state.players[negotiation.turnPlayer].name, " \u304C\u6E21\u3059"),
    value: turnGives,
    onChange: setTurnGives
  }), /*#__PURE__*/React.createElement(ResourceBundleInput, {
    title: "".concat(canShowIntervention ? me.name : state.players[negotiation.partner].name, " \u304C\u6E21\u3059"),
    value: partnerGives,
    onChange: setPartnerGives
  })), myPlayerId === negotiation.awaiting && /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return onEvent({
        type: "counterNegotiation",
        turnGives: turnGives,
        partnerGives: partnerGives
      });
    },
    disabled: !canCounter
  }, "\u6761\u4EF6\u5909\u66F4\u3092\u63D0\u793A"), canShowIntervention && /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return onEvent({
        type: "interveneNegotiation",
        turnGives: turnGives,
        partnerGives: partnerGives
      });
    },
    disabled: !canIntervene
  }, "\u3088\u308A\u826F\u3044\u6761\u4EF6\u3067\u4ECB\u5165")), /*#__PURE__*/React.createElement("div", {
    className: "negotiationHistory"
  }, negotiation.history.map(function (line, index) {
    return /*#__PURE__*/React.createElement("p", {
      key: index
    }, line);
  }))));
}
function HelpPanel() {
  var _useState7 = useState("rules"),
    _useState8 = _slicedToArray(_useState7, 2),
    tab = _useState8[0],
    setTab = _useState8[1];
  return /*#__PURE__*/React.createElement("div", {
    className: "helpBox"
  }, /*#__PURE__*/React.createElement("div", {
    className: "helpTabs",
    role: "tablist",
    "aria-label": "\u30EB\u30FC\u30EB\u3068\u7528\u8A9E"
  }, /*#__PURE__*/React.createElement("button", {
    className: tab === "rules" ? "selected" : "",
    onClick: function onClick() {
      return setTab("rules");
    }
  }, "\u30EB\u30FC\u30EB"), /*#__PURE__*/React.createElement("button", {
    className: tab === "terms" ? "selected" : "",
    onClick: function onClick() {
      return setTab("terms");
    }
  }, "\u7528\u8A9E"), /*#__PURE__*/React.createElement("button", {
    className: tab === "cards" ? "selected" : "",
    onClick: function onClick() {
      return setTab("cards");
    }
  }, "\u65B0\u5929\u5730")), tab === "rules" && /*#__PURE__*/React.createElement("div", {
    className: "helpContent"
  }, /*#__PURE__*/React.createElement("h2", null, "\u904A\u3073\u65B9"), /*#__PURE__*/React.createElement("p", null, "\u30B5\u30A4\u30B3\u30ED\u3067\u8CC7\u6E90\u3092\u5F97\u3066\u3001\u60D1\u661F\u3001\u6052\u661F\u3001\u661F\u9593\u822A\u8DEF\u3092\u5E83\u3052\u307E\u3059\u300210 VP\u306B\u5230\u9054\u3057\u305F\u30D7\u30EC\u30A4\u30E4\u30FC\u304C\u52DD\u5229\u3067\u3059\u3002"), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "\u521D\u671F\u914D\u7F6E\u3067\u306F\u5404\u30D7\u30EC\u30A4\u30E4\u30FC\u304C\u60D1\u661F\u3068\u661F\u9593\u822A\u8DEF\u30922\u30BB\u30C3\u30C8\u7F6E\u304D\u307E\u3059\u3002"), /*#__PURE__*/React.createElement("li", null, "\u81EA\u5206\u306E\u756A\u306F\u30B5\u30A4\u30B3\u30ED\u3001\u4EA4\u6613\u3001\u5EFA\u8A2D\u3001\u65B0\u5929\u5730\u306E\u9806\u306B\u9032\u3081\u3089\u308C\u307E\u3059\u3002"), /*#__PURE__*/React.createElement("li", null, "\u51FA\u76EE\u3068\u540C\u3058\u6570\u5B57\u306E\u30BF\u30A4\u30EB\u306B\u96A3\u63A5\u3059\u308B\u60D1\u661F\u306F\u8CC7\u6E901\u3001\u6052\u661F\u306F\u8CC7\u6E902\u3092\u5F97\u307E\u3059\u3002"), /*#__PURE__*/React.createElement("li", null, "7\u304C\u51FA\u305F\u3089\u30E6\u30CB\u30F4\u30A1\u30FC\u30B9 \u30AF\u30EA\u30DF\u30CA\u30EB\u3092\u79FB\u52D5\u3057\u3001\u305D\u306E\u30BF\u30A4\u30EB\u306F\u7523\u51FA\u3057\u307E\u305B\u3093\u3002"), /*#__PURE__*/React.createElement("li", null, "\u30B9\u30DA\u30FC\u30B9\u30DD\u30FC\u30C8\u306B\u63A5\u3059\u308B\u60D1\u661F\u304B\u6052\u661F\u304C\u3042\u308B\u3068\u30012:1\u307E\u305F\u306F3:1\u4EA4\u6613\u304C\u4F7F\u3048\u307E\u3059\u3002")), /*#__PURE__*/React.createElement("h2", null, "\u52DD\u5229\u70B9"), /*#__PURE__*/React.createElement("p", null, "\u60D1\u661F\u306F1 VP\u3001\u6052\u661F\u306F2 VP\u3001\u52DD\u5229\u8A18\u9332\u306F1 VP\u3067\u3059\u3002\u6700\u9577\u822A\u8DEF\u3068\u6700\u5927TV\u306F\u305D\u308C\u305E\u308C2 VP\u3067\u3059\u3002")), tab === "terms" && /*#__PURE__*/React.createElement("div", {
    className: "helpContent"
  }, /*#__PURE__*/React.createElement("h2", null, "\u7528\u8A9E\u5BFE\u5FDC"), /*#__PURE__*/React.createElement("dl", null, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("dt", null, "\u60D1\u661F"), /*#__PURE__*/React.createElement("dd", null, "\u958B\u62D3\u5730\u3002\u5EFA\u3066\u308B\u3068\u96A3\u63A5\u30BF\u30A4\u30EB\u304B\u3089\u8CC7\u6E90\u3092\u5F97\u307E\u3059\u3002")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("dt", null, "\u6052\u661F"), /*#__PURE__*/React.createElement("dd", null, "\u90FD\u5E02\u3002\u60D1\u661F\u3092\u5F37\u5316\u3057\u3001\u7523\u51FA\u304C2\u500D\u306B\u306A\u308A\u307E\u3059\u3002")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("dt", null, "\u661F\u9593\u822A\u8DEF"), /*#__PURE__*/React.createElement("dd", null, "\u8857\u9053\u3002\u65B0\u3057\u3044\u60D1\u661F\u3092\u7F6E\u304F\u305F\u3081\u306E\u63A5\u7D9A\u8DEF\u3067\u3059\u3002")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("dt", null, "\u30B9\u30DA\u30FC\u30B9\u30DD\u30FC\u30C8"), /*#__PURE__*/React.createElement("dd", null, "\u6E2F\u3002\u63A5\u3057\u3066\u3044\u308B\u3068\u901A\u4FE1\u4EA4\u6613\u304C\u6709\u5229\u306B\u306A\u308A\u307E\u3059\u3002")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("dt", null, "\u4E2D\u6027\u5B50\u661F"), /*#__PURE__*/React.createElement("dd", null, "\u7802\u6F20\u3002\u8CC7\u6E90\u306F\u7523\u51FA\u3057\u307E\u305B\u3093\u3002")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("dt", null, "\u30E6\u30CB\u30F4\u30A1\u30FC\u30B9 \u30AF\u30EA\u30DF\u30CA\u30EB"), /*#__PURE__*/React.createElement("dd", null, "\u76D7\u8CCA\u3002\u3044\u308B\u30BF\u30A4\u30EB\u306E\u7523\u51FA\u3092\u6B62\u3081\u307E\u3059\u3002")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("dt", null, "TV"), /*#__PURE__*/React.createElement("dd", null, "\u9A0E\u58EB\u3002\u4F7F\u3046\u3068\u30E6\u30CB\u30F4\u30A1\u30FC\u30B9 \u30AF\u30EA\u30DF\u30CA\u30EB\u3092\u52D5\u304B\u3057\u307E\u3059\u3002"))), /*#__PURE__*/React.createElement("h2", null, "\u8CC7\u6E90"), /*#__PURE__*/React.createElement("p", null, "\u5CA9\u77F3\u60D1\u661F=\u5CA9\u77F3\u3001\u9271\u77F3\u60D1\u661F=\u30EC\u30A2\u30E1\u30BF\u30EB\u3001\u8CC7\u6750\u5DE5\u5834=\u8CC7\u6750\u3001\u30CA\u30CE\u30DE\u30B7\u30F3\u5DE5\u5834=\u30CA\u30CE\u30DE\u30B7\u30F3\u3001\u6C34\u8015\u683D\u57F9=\u98DF\u6599\u3002")), tab === "cards" && /*#__PURE__*/React.createElement("div", {
    className: "helpContent"
  }, /*#__PURE__*/React.createElement("h2", null, "\u65B0\u5929\u5730\u30AB\u30FC\u30C9"), /*#__PURE__*/React.createElement("dl", null, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("dt", null, "TV"), /*#__PURE__*/React.createElement("dd", null, "\u30E6\u30CB\u30F4\u30A1\u30FC\u30B9 \u30AF\u30EA\u30DF\u30CA\u30EB\u3092\u79FB\u52D5\u3057\u307E\u3059\u30023\u679A\u4EE5\u4E0A\u3067\u6700\u5927TV\u306E\u5019\u88DC\u3067\u3059\u3002")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("dt", null, "\u822A\u8DEF\u6574\u5099"), /*#__PURE__*/React.createElement("dd", null, "\u7121\u6599\u3067\u661F\u9593\u822A\u8DEF\u30922\u672C\u307E\u3067\u5EFA\u8A2D\u3067\u304D\u307E\u3059\u3002")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("dt", null, "\u5FB4\u53CE"), /*#__PURE__*/React.createElement("dd", null, "\u9078\u3093\u3060\u8CC7\u6E90\u3092\u4ED6\u30D7\u30EC\u30A4\u30E4\u30FC\u5168\u54E1\u304B\u3089\u96C6\u3081\u307E\u3059\u3002")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("dt", null, "\u88DC\u7D66\u885B\u661F"), /*#__PURE__*/React.createElement("dd", null, "\u9078\u3093\u3060\u8CC7\u6E90\u30922\u3064\u53D7\u3051\u53D6\u308A\u307E\u3059\u3002")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("dt", null, "\u52DD\u5229\u8A18\u9332"), /*#__PURE__*/React.createElement("dd", null, "\u6301\u3063\u3066\u3044\u308B\u3060\u3051\u30671 VP\u3067\u3059\u3002")))));
}
function usePeerRoom(state, setState, roomId, myPlayerId) {
  var _useState9 = useState({
      mode: "local",
      status: "ローカル",
      share: ""
    }),
    _useState0 = _slicedToArray(_useState9, 2),
    net = _useState0[0],
    setNet = _useState0[1];
  var peerRef = useRef(null);
  var connections = useRef([]);
  var stateRef = useRef(state);
  stateRef.current = state;
  useEffect(function () {
    var script = document.createElement("script");
    script.src = "./vendor/peerjs.min.js";
    script.onload = function () {
      return setNet(function (n) {
        return _objectSpread(_objectSpread({}, n), {}, {
          status: "オンライン接続を準備できます"
        });
      });
    };
    script.onerror = function () {
      return setNet(function (n) {
        return _objectSpread(_objectSpread({}, n), {}, {
          status: "オンライン同期ライブラリを読み込めませんでした"
        });
      });
    };
    document.head.appendChild(script);
    return function () {
      return script.remove();
    };
  }, []);
  function host() {
    if (!window.Peer) return;
    var peer = new window.Peer("star-".concat(roomId, "-").concat(Date.now().toString(36)));
    peerRef.current = peer;
    peer.on("open", function (id) {
      var url = "".concat(location.origin).concat(location.pathname, "#join=").concat(id, "&p=1");
      setNet({
        mode: "host",
        status: "ホスト中",
        share: url
      });
      history.replaceState(null, "", "#host=".concat(id, "&p=0"));
    });
    peer.on("connection", function (conn) {
      connections.current.push(conn);
      conn.on("open", function () {
        return conn.send({
          type: "state",
          state: stateRef.current
        });
      });
      conn.on("data", function (message) {
        if (message.type === "event") {
          setState(function (prev) {
            var next = reducer(prev, message.event);
            connections.current.forEach(function (c) {
              return c.open && c.send({
                type: "state",
                state: next
              });
            });
            return next;
          });
        }
      });
    });
  }
  function join(hostId) {
    if (!window.Peer || !hostId) return;
    var peer = new window.Peer();
    peerRef.current = peer;
    peer.on("open", function () {
      var conn = peer.connect(hostId);
      connections.current = [conn];
      conn.on("open", function () {
        return setNet({
          mode: "guest",
          status: "参加中",
          share: location.href
        });
      });
      conn.on("data", function (message) {
        if (message.type === "state") setState(message.state);
      });
    });
  }
  function send(event) {
    if (net.mode === "guest") {
      var _connections$current$;
      (_connections$current$ = connections.current[0]) === null || _connections$current$ === void 0 || _connections$current$.send({
        type: "event",
        event: _objectSpread(_objectSpread({}, event), {}, {
          playerId: myPlayerId
        })
      });
      return true;
    }
    return false;
  }
  useEffect(function () {
    if (net.mode === "host") connections.current.forEach(function (c) {
      return c.open && c.send({
        type: "state",
        state: state
      });
    });
  }, [state, net.mode]);
  useEffect(function () {
    var params = new URLSearchParams(location.hash.replace("#", ""));
    var joinId = params.get("join");
    if (joinId) {
      var timer = setInterval(function () {
        if (window.Peer) {
          clearInterval(timer);
          join(joinId);
        }
      }, 250);
      return function () {
        return clearInterval(timer);
      };
    }
  }, []);
  return {
    net: net,
    host: host,
    send: send
  };
}
function Board(_ref14) {
  var state = _ref14.state,
    onEvent = _ref14.onEvent,
    myPlayerId = _ref14.myPlayerId;
  var active = currentPlayer(state).id;
  var canClick = state.phase === "setup" ? active === myPlayerId : state.turn === myPlayerId;
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 720 680",
    className: "board",
    role: "img",
    "aria-label": "\u5B87\u5B99\u8CC7\u6E90\u76E4\u9762"
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("radialGradient", {
    id: "space",
    cx: "50%",
    cy: "45%"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: "#21324b"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "65%",
    stopColor: "#111827"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: "#08111f"
  })), /*#__PURE__*/React.createElement("filter", {
    id: "glow"
  }, /*#__PURE__*/React.createElement("feGaussianBlur", {
    stdDeviation: "3",
    result: "coloredBlur"
  }), /*#__PURE__*/React.createElement("feMerge", null, /*#__PURE__*/React.createElement("feMergeNode", {
    "in": "coloredBlur"
  }), /*#__PURE__*/React.createElement("feMergeNode", {
    "in": "SourceGraphic"
  })))), /*#__PURE__*/React.createElement("rect", {
    width: "720",
    height: "680",
    fill: "url(#space)"
  }), state.board.tiles.map(function (tile) {
    var points = tile.corners.map(function (id) {
      return state.board.vertices.find(function (v) {
        return v.id === id;
      });
    }).map(function (p) {
      return "".concat(p.x, ",").concat(p.y);
    }).join(" ");
    var fill = tile.terrain === "desert" ? "#3b4256" : RESOURCES[tile.terrain].color;
    return /*#__PURE__*/React.createElement("g", {
      key: tile.id,
      onClick: function onClick() {
        return onEvent({
          type: "selectTile",
          tileId: tile.id
        });
      }
    }, /*#__PURE__*/React.createElement("polygon", {
      className: "hex",
      points: points,
      fill: fill,
      opacity: state.criminalTile === tile.id ? 0.5 : 0.88
    }), /*#__PURE__*/React.createElement("text", {
      x: tile.center.x,
      y: tile.center.y - 9,
      className: "tileName"
    }, tile.terrain === "desert" ? "中性子星" : RESOURCES[tile.terrain].terrain), tile.number && /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("circle", {
      cx: tile.center.x,
      cy: tile.center.y + 16,
      r: "17",
      fill: tile.number === 6 || tile.number === 8 ? "#fee2e2" : "#f8fafc"
    }), /*#__PURE__*/React.createElement("text", {
      x: tile.center.x,
      y: tile.center.y + 22,
      className: "num"
    }, tile.number)), state.criminalTile === tile.id && /*#__PURE__*/React.createElement("text", {
      x: tile.center.x,
      y: tile.center.y + 47,
      className: "criminal",
      filter: "url(#glow)"
    }, "UC"));
  }), state.board.spaceports.map(function (spaceport) {
    var tint = spaceport.type ? RESOURCES[spaceport.type].color : "#4f9dbd";
    return /*#__PURE__*/React.createElement("g", {
      key: spaceport.id,
      className: "spaceport"
    }, /*#__PURE__*/React.createElement("line", {
      x1: spaceport.x,
      y1: spaceport.y,
      x2: spaceport.labelX,
      y2: spaceport.labelY,
      stroke: "rgba(219,234,254,.55)",
      strokeWidth: "2"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: spaceport.labelX,
      cy: spaceport.labelY,
      r: "18",
      fill: tint,
      stroke: "#eaf6ff",
      strokeWidth: "2"
    }), /*#__PURE__*/React.createElement("text", {
      x: spaceport.labelX,
      y: spaceport.labelY - 2,
      className: "spaceportRate"
    }, spaceport.type ? "2:1" : "3:1"), /*#__PURE__*/React.createElement("text", {
      x: spaceport.labelX,
      y: spaceport.labelY + 10,
      className: "spaceportResource"
    }, spaceport.type ? RESOURCES[spaceport.type].name.slice(0, 2) : "SP"));
  }), state.board.edges.map(function (edge) {
    var a = state.board.vertices.find(function (v) {
      return v.id === edge.a;
    });
    var b = state.board.vertices.find(function (v) {
      return v.id === edge.b;
    });
    var route = state.routes[edge.id];
    return /*#__PURE__*/React.createElement("line", {
      key: edge.id,
      x1: a.x,
      y1: a.y,
      x2: b.x,
      y2: b.y,
      className: "edge ".concat(canClick ? "clickable" : ""),
      stroke: route ? state.players[route.player].color : "rgba(255,255,255,.28)",
      strokeWidth: route ? 8 : 6,
      onClick: function onClick() {
        return canClick && onEvent({
          type: "edge",
          edgeId: edge.id
        });
      }
    });
  }), state.board.vertices.map(function (vertex) {
    var building = state.buildings[vertex.id];
    return /*#__PURE__*/React.createElement("g", {
      key: vertex.id,
      onClick: function onClick() {
        return canClick && onEvent({
          type: "vertex",
          vertexId: vertex.id
        });
      },
      className: canClick ? "clickable" : ""
    }, /*#__PURE__*/React.createElement("circle", {
      cx: vertex.x,
      cy: vertex.y,
      r: "10",
      fill: building ? state.players[building.player].color : "rgba(255,255,255,.22)",
      stroke: "#f8fafc",
      strokeWidth: "2"
    }), (building === null || building === void 0 ? void 0 : building.type) === "star" && /*#__PURE__*/React.createElement("circle", {
      cx: vertex.x,
      cy: vertex.y,
      r: "5",
      fill: "#fff7ad"
    }));
  }));
}
function App() {
  var initialRoom = useMemo(function () {
    return new URLSearchParams(location.hash.replace("#", "")).get("room") || crypto.randomUUID().slice(0, 8);
  }, []);
  var _useState1 = useState(function () {
      return createGame(initialRoom);
    }),
    _useState10 = _slicedToArray(_useState1, 2),
    state = _useState10[0],
    setState = _useState10[1];
  var _useState11 = useState(function () {
      return Number(new URLSearchParams(location.hash.replace("#", "")).get("p") || 0);
    }),
    _useState12 = _slicedToArray(_useState11, 2),
    myPlayerId = _useState12[0],
    setMyPlayerId = _useState12[1];
  var _useState13 = useState({
      give: "rock",
      take: "food"
    }),
    _useState14 = _slicedToArray(_useState13, 2),
    trade = _useState14[0],
    setTrade = _useState14[1];
  var _useState15 = useState({
      resource: "rock",
      a: "rock",
      b: "material"
    }),
    _useState16 = _slicedToArray(_useState15, 2),
    devChoice = _useState16[0],
    setDevChoice = _useState16[1];
  var _usePeerRoom = usePeerRoom(state, setState, state.id, myPlayerId),
    net = _usePeerRoom.net,
    host = _usePeerRoom.host,
    send = _usePeerRoom.send;
  function act(event) {
    var owned = _objectSpread(_objectSpread({}, event), {}, {
      playerId: myPlayerId
    });
    if (send(owned)) return;
    setState(function (prev) {
      return reducer(prev, owned);
    });
  }
  var me = state.players[myPlayerId];
  var active = currentPlayer(state);
  var actionable = state.phase === "setup" ? active.id === myPlayerId : state.turn === myPlayerId;
  var currentTradeRate = tradeRateFor(state, myPlayerId, trade.give);
  return /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement("section", {
    className: "topbar"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", null, "Star Settlers"), /*#__PURE__*/React.createElement("p", null, "\u60D1\u661F\u3092\u5E83\u3052\u3001\u6052\u661F\u3078\u80B2\u3066\u300110\u70B9\u3092\u76EE\u6307\u30594\u4EBA\u7528\u30AA\u30F3\u30E9\u30A4\u30F3\u5353\u3002")), /*#__PURE__*/React.createElement("div", {
    className: "net"
  }, /*#__PURE__*/React.createElement("span", null, net.status), /*#__PURE__*/React.createElement("button", {
    onClick: host,
    title: "\u90E8\u5C4B\u3092\u4F5C\u308B"
  }, /*#__PURE__*/React.createElement(RadioTower, {
    size: 17
  }), " \u90E8\u5C4B\u4F5C\u6210"), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      var _navigator$clipboard;
      return net.share && ((_navigator$clipboard = navigator.clipboard) === null || _navigator$clipboard === void 0 ? void 0 : _navigator$clipboard.writeText(net.share));
    },
    disabled: !net.share,
    title: "\u5171\u6709\u30EA\u30F3\u30AF\u3092\u30B3\u30D4\u30FC"
  }, /*#__PURE__*/React.createElement(Copy, {
    size: 17
  }), " \u5171\u6709"))), /*#__PURE__*/React.createElement("section", {
    className: "layout"
  }, /*#__PURE__*/React.createElement("div", {
    className: "playSurface"
  }, /*#__PURE__*/React.createElement("div", {
    className: "statusLine"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pill"
  }, "\u73FE\u5728: ", active.name), /*#__PURE__*/React.createElement("span", {
    className: "pill"
  }, "\u30D5\u30A7\u30FC\u30BA: ", state.phase === "setup" ? "初期配置" : state.rolled ? "交易・建設" : "サイコロ"), /*#__PURE__*/React.createElement("span", {
    className: "pill"
  }, "\u64CD\u4F5C: ", BUILD_LABEL[state.action] || (state.action === "criminal" ? "ユニヴァース クリミナル" : state.action)), state.dice && /*#__PURE__*/React.createElement("span", {
    className: "pill"
  }, "\u51FA\u76EE: ", state.dice.join(" + "), " = ", state.dice[0] + state.dice[1])), /*#__PURE__*/React.createElement(Board, {
    state: state,
    onEvent: act,
    myPlayerId: myPlayerId
  })), /*#__PURE__*/React.createElement("aside", {
    className: "panel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "self"
  }, /*#__PURE__*/React.createElement("label", null, "\u3042\u306A\u305F", /*#__PURE__*/React.createElement("select", {
    value: myPlayerId,
    onChange: function onChange(e) {
      return setMyPlayerId(Number(e.target.value));
    }
  }, state.players.map(function (p) {
    return /*#__PURE__*/React.createElement("option", {
      key: p.id,
      value: p.id
    }, p.name);
  }))), /*#__PURE__*/React.createElement("input", {
    value: me.name,
    onChange: function onChange(e) {
      return act({
        type: "rename",
        name: e.target.value
      });
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "actions"
  }, /*#__PURE__*/React.createElement("button", {
    className: "primary",
    onClick: function onClick() {
      return act({
        type: "roll"
      });
    },
    disabled: !actionable || state.phase !== "play" || state.rolled
  }, /*#__PURE__*/React.createElement(Dice5, {
    size: 18
  }), " \u30B5\u30A4\u30B3\u30ED"), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return act({
        type: "endTurn"
      });
    },
    disabled: !actionable || state.phase !== "play" || !!state.negotiation
  }, /*#__PURE__*/React.createElement(Undo2, {
    size: 18
  }), " \u30BF\u30FC\u30F3\u7D42\u4E86")), /*#__PURE__*/React.createElement("div", {
    className: "tools"
  }, /*#__PURE__*/React.createElement("button", {
    className: state.action === "route" ? "selected" : "",
    onClick: function onClick() {
      return act({
        type: "setAction",
        action: "route"
      });
    }
  }, /*#__PURE__*/React.createElement(Rocket, {
    size: 17
  }), " \u661F\u9593\u822A\u8DEF"), /*#__PURE__*/React.createElement("button", {
    className: state.action === "planet" ? "selected" : "",
    onClick: function onClick() {
      return act({
        type: "setAction",
        action: "planet"
      });
    }
  }, /*#__PURE__*/React.createElement(Orbit, {
    size: 17
  }), " \u60D1\u661F"), /*#__PURE__*/React.createElement("button", {
    className: state.action === "star" ? "selected" : "",
    onClick: function onClick() {
      return act({
        type: "setAction",
        action: "star"
      });
    }
  }, /*#__PURE__*/React.createElement(Satellite, {
    size: 17
  }), " \u6052\u661F"), /*#__PURE__*/React.createElement("button", {
    className: state.action === "criminal" ? "selected" : "",
    onClick: function onClick() {
      return act({
        type: "setAction",
        action: "criminal"
      });
    }
  }, /*#__PURE__*/React.createElement(Swords, {
    size: 17
  }), " \u30E6\u30CB\u30F4\u30A1\u30FC\u30B9")), /*#__PURE__*/React.createElement("div", {
    className: "costs"
  }, /*#__PURE__*/React.createElement("h2", null, "\u5EFA\u8A2D\u30B3\u30B9\u30C8"), /*#__PURE__*/React.createElement("p", null, "\u661F\u9593\u822A\u8DEF ", /*#__PURE__*/React.createElement(Cost, {
    cost: COSTS.route
  })), /*#__PURE__*/React.createElement("p", null, "\u60D1\u661F ", /*#__PURE__*/React.createElement(Cost, {
    cost: COSTS.planet
  })), /*#__PURE__*/React.createElement("p", null, "\u6052\u661F ", /*#__PURE__*/React.createElement(Cost, {
    cost: COSTS.star
  })), /*#__PURE__*/React.createElement("p", null, "\u65B0\u5929\u5730 ", /*#__PURE__*/React.createElement(Cost, {
    cost: COSTS.frontier
  })), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return act({
        type: "buyDev"
      });
    },
    disabled: !actionable || !state.rolled
  }, /*#__PURE__*/React.createElement(Shuffle, {
    size: 17
  }), " \u65B0\u5929\u5730\u3092\u7372\u5F97")), /*#__PURE__*/React.createElement("div", {
    className: "trade"
  }, /*#__PURE__*/React.createElement("h2", null, "\u901A\u4FE1\u4EA4\u6613 ", currentTradeRate, ":1"), /*#__PURE__*/React.createElement("select", {
    value: trade.give,
    onChange: function onChange(e) {
      return setTrade(_objectSpread(_objectSpread({}, trade), {}, {
        give: e.target.value
      }));
    }
  }, RESOURCE_KEYS.map(function (key) {
    return /*#__PURE__*/React.createElement("option", {
      key: key,
      value: key
    }, RESOURCES[key].name);
  })), /*#__PURE__*/React.createElement("span", null, "\u2192"), /*#__PURE__*/React.createElement("select", {
    value: trade.take,
    onChange: function onChange(e) {
      return setTrade(_objectSpread(_objectSpread({}, trade), {}, {
        take: e.target.value
      }));
    }
  }, RESOURCE_KEYS.map(function (key) {
    return /*#__PURE__*/React.createElement("option", {
      key: key,
      value: key
    }, RESOURCES[key].name);
  })), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return act(_objectSpread({
        type: "bankTrade"
      }, trade));
    }
  }, "\u4EA4\u63DB"), /*#__PURE__*/React.createElement("p", {
    className: "spaceportNote"
  }, "\u30B9\u30DA\u30FC\u30B9\u30DD\u30FC\u30C8: ", spaceportText(state, myPlayerId))), /*#__PURE__*/React.createElement(NegotiationPanel, {
    state: state,
    myPlayerId: myPlayerId,
    onEvent: act
  }), /*#__PURE__*/React.createElement("div", {
    className: "frontiers"
  }, /*#__PURE__*/React.createElement("h2", null, "\u624B\u672D\u306E\u65B0\u5929\u5730"), /*#__PURE__*/React.createElement("div", {
    className: "miniControls"
  }, /*#__PURE__*/React.createElement("select", {
    value: devChoice.resource,
    onChange: function onChange(e) {
      return setDevChoice(_objectSpread(_objectSpread({}, devChoice), {}, {
        resource: e.target.value
      }));
    }
  }, RESOURCE_KEYS.map(function (key) {
    return /*#__PURE__*/React.createElement("option", {
      key: key,
      value: key
    }, "\u5FB4\u53CE: ", RESOURCES[key].name);
  })), /*#__PURE__*/React.createElement("select", {
    value: devChoice.a,
    onChange: function onChange(e) {
      return setDevChoice(_objectSpread(_objectSpread({}, devChoice), {}, {
        a: e.target.value
      }));
    }
  }, RESOURCE_KEYS.map(function (key) {
    return /*#__PURE__*/React.createElement("option", {
      key: key,
      value: key
    }, "\u88DC\u7D661: ", RESOURCES[key].name);
  })), /*#__PURE__*/React.createElement("select", {
    value: devChoice.b,
    onChange: function onChange(e) {
      return setDevChoice(_objectSpread(_objectSpread({}, devChoice), {}, {
        b: e.target.value
      }));
    }
  }, RESOURCE_KEYS.map(function (key) {
    return /*#__PURE__*/React.createElement("option", {
      key: key,
      value: key
    }, "\u88DC\u7D662: ", RESOURCES[key].name);
  }))), /*#__PURE__*/React.createElement("div", {
    className: "cards"
  }, me.hiddenNewFrontiers.map(function (card, index) {
    return /*#__PURE__*/React.createElement("button", {
      key: "".concat(frontierType(card), "-").concat(frontierBoughtTurn(card), "-").concat(index),
      onClick: function onClick() {
        return act(_objectSpread({
          type: "playDev",
          card: frontierType(card)
        }, devChoice));
      },
      disabled: !canPlayFrontier(card, state)
    }, DEV_NAMES[frontierType(card)], !canPlayFrontier(card, state) && frontierType(card) !== "point" ? " 次ターン" : "");
  }), !me.hiddenNewFrontiers.length && /*#__PURE__*/React.createElement("span", {
    className: "muted"
  }, "\u306A\u3057"))), /*#__PURE__*/React.createElement(HelpPanel, null))), /*#__PURE__*/React.createElement("section", {
    className: "players"
  }, state.players.map(function (player) {
    return /*#__PURE__*/React.createElement("article", {
      key: player.id,
      style: {
        "--player": player.color
      },
      className: player.id === active.id ? "active" : ""
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", null, player.name, player.bonus.longest && /*#__PURE__*/React.createElement("span", {
      className: "badge"
    }, "\u6700\u9577\u661F\u9593\u822A\u8DEF"), player.bonus.largestTv && /*#__PURE__*/React.createElement("span", {
      className: "badge"
    }, "\u6700\u5927TV\u529B")), /*#__PURE__*/React.createElement("span", null, getVp(state, player.id), " VP")), /*#__PURE__*/React.createElement("p", null, visibleResourceText(player, myPlayerId)), /*#__PURE__*/React.createElement("small", null, "TV ", player.playedTv, " / \u65B0\u5929\u5730 ", player.hiddenNewFrontiers.length, "\u679A / \u516C\u958B\u6E08\u307F: ", publicPlayedFrontiers(player), " / ", spaceportText(state, player.id)));
  })), /*#__PURE__*/React.createElement("section", {
    className: "log"
  }, /*#__PURE__*/React.createElement("h2", null, "\u822A\u884C\u30ED\u30B0"), state.winner !== null && /*#__PURE__*/React.createElement("div", {
    className: "winner"
  }, state.players[state.winner].name, " \u306E\u52DD\u5229"), state.log.map(function (line, index) {
    return /*#__PURE__*/React.createElement("p", {
      key: index
    }, line);
  })));
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(App, null));