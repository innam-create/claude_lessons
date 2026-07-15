/* @ds-bundle: {"format":3,"namespace":"SnCMuseumDesignSystem_42b720","components":[],"sourceHashes":{"ui_kits/website/data.jsx":"836e61ad54a8","ui_kits/website/primitives.jsx":"136bf194e00e"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.SnCMuseumDesignSystem_42b720 = window.SnCMuseumDesignSystem_42b720 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// ui_kits/website/data.jsx
try { (() => {
/* SnC Museum — sample exhibit data for the UI kit (facts drawn from public sources). */
window.EXHIBITS = [{
  id: 'apple-ii',
  name: 'Apple II',
  year: 1977,
  era: '1970s',
  cat: 'Personal computers',
  works: true,
  tag: 'SNC#102766715',
  maker: 'Apple Computer',
  blurb: 'One of the first highly successful mass-produced microcomputers, designed by Steve Wozniak.',
  specs: [['CPU', 'MOS 6502 · 1 MHz'], ['RAM', '4–48 KB'], ['Display', '40×24 text, color'], ['Origin', 'Cupertino, USA']]
}, {
  id: 'osborne-1',
  name: 'Osborne 1',
  year: 1981,
  era: '1980s',
  cat: 'Portable',
  works: true,
  tag: 'SNC#102740118',
  maker: 'Osborne Computer',
  blurb: 'The first commercially successful portable computer — a luggable 12 kg with a 5-inch screen.',
  specs: [['CPU', 'Zilog Z80 · 4 MHz'], ['RAM', '64 KB'], ['Weight', '10.7 kg'], ['Origin', 'USA']]
}, {
  id: 'bbc-micro',
  name: 'BBC Micro',
  year: 1981,
  era: '1980s',
  cat: 'Personal computers',
  works: true,
  tag: 'SNC#102655420',
  maker: 'Acorn Computers',
  blurb: 'Built for the BBC’s Computer Literacy Project — a generation learned to code on it.',
  specs: [['CPU', 'MOS 6502 · 2 MHz'], ['RAM', '16–32 KB'], ['Made for', 'BBC, UK'], ['Origin', 'Cambridge, UK']]
}, {
  id: 'amiga-600',
  name: 'Commodore Amiga 600',
  year: 1992,
  era: '1990s',
  cat: 'Personal computers',
  works: true,
  tag: 'SNC#102703311',
  maker: 'Commodore',
  blurb: 'A compact 16-bit multimedia home computer, beloved for its graphics and sound.',
  specs: [['CPU', 'Motorola 68000 · 7 MHz'], ['RAM', '1 MB'], ['Chipset', 'ECS'], ['Origin', 'USA']]
}, {
  id: 'newton',
  name: 'Apple Newton MessagePad',
  year: 1993,
  era: '1990s',
  cat: 'Portable',
  works: true,
  tag: 'SNC#102621890',
  maker: 'Apple Computer',
  blurb: 'A “personal digital assistant” on Newton OS — long before the words “PDA” and “tablet”.',
  specs: [['CPU', 'ARM 610 · 20 MHz'], ['Input', 'Stylus, handwriting'], ['OS', 'Newton OS'], ['Origin', 'USA']]
}, {
  id: 'odyssey',
  name: 'Magnavox Odyssey',
  year: 1972,
  era: '1970s',
  cat: 'Game consoles',
  works: true,
  tag: 'SNC#102612009',
  maker: 'Magnavox',
  blurb: 'The first commercial home video game console — overlays taped to your TV screen.',
  specs: [['Type', 'Analog, no CPU'], ['Games', '~28 on cards'], ['Display', 'TV overlays'], ['Origin', 'USA']]
}, {
  id: 'stuntmaster',
  name: 'VictorMaxx StuntMaster',
  year: 1995,
  era: '1990s',
  cat: 'Game consoles',
  works: false,
  tag: 'SNC#102788450',
  maker: 'VictorMaxx',
  blurb: 'One of the first commercial “VR” headsets — compatible with SNES and Sega Genesis.',
  specs: [['Type', 'Head-mounted display'], ['Works with', 'SNES, Genesis'], ['Resolution', 'Low'], ['Origin', 'USA']]
}, {
  id: 'hololens',
  name: 'Microsoft HoloLens',
  year: 2016,
  era: '2010s',
  cat: 'Wearable / AR',
  works: true,
  tag: 'SNC#102901774',
  maker: 'Microsoft',
  blurb: 'A self-contained mixed-reality headset projecting holograms into the room.',
  specs: [['CPU', 'Intel + HPU'], ['Display', 'See-through holographic'], ['OS', 'Windows'], ['Origin', 'USA']]
}, {
  id: 'poisk',
  name: 'Poisk',
  year: 1989,
  era: 'Soviet era',
  cat: 'Soviet era',
  works: true,
  tag: 'SNC#102766714',
  maker: 'ElectronMash, Kyiv',
  blurb: 'A Ukrainian-made IBM PC compatible — part of unique ex-USSR computing history.',
  specs: [['CPU', 'КМ1810ВМ88 (8088)'], ['RAM', '128 KB'], ['Made in', 'Kyiv, USSR'], ['Origin', 'Ukraine']]
}, {
  id: 'iphone-1',
  name: 'iPhone (1st gen)',
  year: 2007,
  era: '2000s',
  cat: 'Portable',
  works: true,
  tag: 'SNC#102855120',
  maker: 'Apple',
  blurb: 'The phone that folded the computer, the iPod and the internet into one glass slab.',
  specs: [['CPU', 'Samsung ARM · 412 MHz'], ['Display', '3.5″ multi-touch'], ['OS', 'iPhone OS 1'], ['Origin', 'USA']]
}, {
  id: 'jibo',
  name: 'Jibo Social Robot',
  year: 2017,
  era: '2010s',
  cat: 'Robots',
  works: true,
  tag: 'SNC#102910044',
  maker: 'Jibo, Inc.',
  blurb: 'A friendly desktop social robot — our visitors’ favourite to say hello to.',
  specs: [['Sensors', 'Cameras, mics'], ['Motion', '3-axis body'], ['Voice', 'Conversational'], ['Origin', 'USA']]
}, {
  id: 'amiga-cd',
  name: 'Magnavox / Soviet calculators',
  year: 1985,
  era: 'Soviet era',
  cat: 'Soviet era',
  works: true,
  tag: 'SNC#102599821',
  maker: 'Various, USSR',
  blurb: 'A shelf of Soviet programmable calculators — the home computers of their day.',
  specs: [['Type', 'Programmable'], ['Logic', 'RPN'], ['Made in', 'USSR'], ['Origin', 'Ukraine']]
}];
window.CATEGORIES = ['All', 'Personal computers', 'Portable', 'Game consoles', 'Soviet era', 'Wearable / AR', 'Robots'];
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/data.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/primitives.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* SnC UI kit — primitives. Exports to window for cross-file use. */
const {
  useState,
  useEffect,
  useRef
} = React;

// Lucide icon → re-renders <i data-lucide> into svg after mount
function Icon({
  name,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("i", _extends({
    "data-lucide": name
  }, rest));
}
function useIcons(dep) {
  useEffect(() => {
    if (window.lucide) window.lucide.createIcons();
  });
}
function Button({
  variant = 'primary',
  size,
  icon,
  iconRight,
  children,
  onClick,
  href
}) {
  const cls = `btn btn-${variant}${size === 'sm' ? ' btn-sm' : ''}`;
  const inner = /*#__PURE__*/React.createElement(React.Fragment, null, icon && /*#__PURE__*/React.createElement(Icon, {
    name: icon
  }), children, iconRight && /*#__PURE__*/React.createElement(Icon, {
    name: iconRight
  }));
  if (href) return /*#__PURE__*/React.createElement("a", {
    className: cls,
    href: href,
    onClick: onClick
  }, inner);
  return /*#__PURE__*/React.createElement("button", {
    className: cls,
    onClick: onClick
  }, inner);
}
function Eyebrow({
  children
}) {
  return /*#__PURE__*/React.createElement("p", {
    className: "eyebrow"
  }, children);
}

// The signature square-grid motif (decorative)
function GridMotif() {
  return /*#__PURE__*/React.createElement("div", {
    className: "motif",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("div", {
    className: "t"
  }), /*#__PURE__*/React.createElement("div", {
    className: "t s2"
  }), /*#__PURE__*/React.createElement("div", {
    className: "t b"
  }), /*#__PURE__*/React.createElement("div", {
    className: "t"
  }), /*#__PURE__*/React.createElement("div", {
    className: "t s3"
  }), /*#__PURE__*/React.createElement("div", {
    className: "t y"
  }), /*#__PURE__*/React.createElement("div", {
    className: "t"
  }), /*#__PURE__*/React.createElement("div", {
    className: "t"
  }), /*#__PURE__*/React.createElement("div", {
    className: "t"
  }), /*#__PURE__*/React.createElement("div", {
    className: "t"
  }), /*#__PURE__*/React.createElement("div", {
    className: "t s2"
  }), /*#__PURE__*/React.createElement("div", {
    className: "t"
  }), /*#__PURE__*/React.createElement("div", {
    className: "t"
  }));
}

// On-brand placeholder standing in for exhibit photography
function PhotoPlaceholder({
  exhibit,
  alt
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: `ph${exhibit.id.length % 2 ? ' alt' : ''}`
  }, /*#__PURE__*/React.createElement("span", {
    className: "ptag"
  }, exhibit.tag), /*#__PURE__*/React.createElement("div", {
    className: "pgrid",
    "aria-hidden": "true"
  }, Array.from({
    length: 8
  }).map((_, i) => /*#__PURE__*/React.createElement("i", {
    key: i
  }))), /*#__PURE__*/React.createElement("span", {
    className: "pyr"
  }, exhibit.year));
}
function Status({
  works
}) {
  return works ? /*#__PURE__*/React.createElement("span", {
    className: "status ok"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot"
  }), "Still works") : /*#__PURE__*/React.createElement("span", {
    className: "status no"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot"
  }), "On display");
}
Object.assign(window, {
  Icon,
  useIcons,
  Button,
  Eyebrow,
  GridMotif,
  PhotoPlaceholder,
  Status
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/primitives.jsx", error: String((e && e.message) || e) }); }

})();
