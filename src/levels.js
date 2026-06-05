window.RCQ_LEVELS = [
  {
    id: "rapyder",
    name: "Rapyder Ridge",
    theme: {
      sky: "#61b9ff",
      far: "#a6ddff",
      ground: "#7a4724",
      grass: "#35c85d",
      block: "#d67532",
      accent: "#e51f2f",
      water: "#28d6d2",
    },
    start: { x: 64, y: 332 },
    goal: { x: 2520, y: 300, label: "AWS" },
    platforms: [
      { x: 0, y: 444, w: 2860, h: 96, type: "ground" },
      { x: 360, y: 360, w: 170, h: 30, type: "brick" },
      { x: 650, y: 315, w: 220, h: 30, type: "brick" },
      { x: 1020, y: 370, w: 190, h: 30, type: "brick" },
      { x: 1360, y: 320, w: 250, h: 30, type: "cloud" },
      { x: 1780, y: 360, w: 220, h: 30, type: "brick" },
      { x: 2140, y: 315, w: 280, h: 30, type: "cloud" },
    ],
    collectibles: [
      { x: 420, y: 316, label: "INFRA" },
      { x: 720, y: 270, label: "CUST" },
      { x: 1100, y: 326, label: "CLOUD" },
      { x: 1450, y: 276, label: "AWS" },
      { x: 1880, y: 316, label: "SCALE" },
      { x: 2260, y: 270, label: "TRUST" },
    ],
    hazards: [
      { x: 560, y: 416, w: 46, h: 28, type: "spark" },
      { x: 1260, y: 416, w: 52, h: 28, type: "spark" },
      { x: 2070, y: 416, w: 58, h: 28, type: "spark" },
    ],
    npcs: [
      {
        x: 1510,
        y: 382,
        label: "Amit",
        text:
          "Amit: Start with infrastructure reality, but keep customer value as the flag. Cloud must work for the business.",
      },
    ],
  },
  {
    id: "cloudeva",
    name: "Decision Loop Lagoon",
    theme: {
      sky: "#18263d",
      far: "#2d4064",
      ground: "#2b3857",
      grass: "#26d0a5",
      block: "#42577f",
      accent: "#8fffe0",
      water: "#1bb7ff",
    },
    start: { x: 64, y: 332 },
    goal: { x: 2590, y: 300, label: "EVA" },
    platforms: [
      { x: 0, y: 444, w: 2940, h: 96, type: "ground" },
      { x: 310, y: 370, w: 170, h: 30, type: "cloud" },
      { x: 620, y: 318, w: 230, h: 30, type: "brick" },
      { x: 990, y: 380, w: 210, h: 30, type: "cloud" },
      { x: 1350, y: 325, w: 230, h: 30, type: "brick" },
      { x: 1740, y: 365, w: 230, h: 30, type: "cloud" },
      { x: 2160, y: 315, w: 290, h: 30, type: "brick" },
    ],
    collectibles: [
      { x: 380, y: 326, label: "OWNER" },
      { x: 700, y: 274, label: "WHY" },
      { x: 1060, y: 336, label: "RISK" },
      { x: 1435, y: 280, label: "AUDIT" },
      { x: 1830, y: 320, label: "EVA" },
      { x: 2300, y: 270, label: "ACT" },
    ],
    hazards: [
      { x: 520, y: 416, w: 48, h: 28, type: "bot" },
      { x: 1260, y: 416, w: 60, h: 28, type: "bot" },
      { x: 2010, y: 416, w: 66, h: 28, type: "bot" },
    ],
    npcs: [
      {
        x: 880,
        y: 382,
        label: "Amit",
        text:
          "Amit: After cloud adoption, the next challenge is decision quality. Teams need explainable action, not silent automation.",
      },
      {
        x: 1580,
        y: 382,
        label: "EVA",
        text:
          "EVA: Explain, verify, advise, act. No silent magic. Every cloud decision needs a trail.",
      },
    ],
  },
  {
    id: "onelenz",
    name: "Revenue Signal Ruins",
    theme: {
      sky: "#f4d389",
      far: "#ffdca8",
      ground: "#6e3c30",
      grass: "#28b970",
      block: "#bb6252",
      accent: "#111827",
      water: "#e51f2f",
    },
    start: { x: 64, y: 332 },
    goal: { x: 2700, y: 300, label: "1" },
    platforms: [
      { x: 0, y: 444, w: 3080, h: 96, type: "ground" },
      { x: 340, y: 360, w: 210, h: 30, type: "brick" },
      { x: 720, y: 315, w: 180, h: 30, type: "brick" },
      { x: 1050, y: 375, w: 250, h: 30, type: "cloud" },
      { x: 1500, y: 330, w: 220, h: 30, type: "brick" },
      { x: 1900, y: 365, w: 210, h: 30, type: "cloud" },
      { x: 2280, y: 315, w: 300, h: 30, type: "brick" },
    ],
    collectibles: [
      { x: 410, y: 316, label: "MAIL" },
      { x: 775, y: 270, label: "CRM" },
      { x: 1150, y: 330, label: "MEET" },
      { x: 1580, y: 285, label: "DEAL" },
      { x: 1980, y: 320, label: "SIGNAL" },
      { x: 2420, y: 270, label: "LENZ" },
    ],
    hazards: [
      { x: 610, y: 416, w: 48, h: 28, type: "leak" },
      { x: 1370, y: 416, w: 58, h: 28, type: "leak" },
      { x: 2190, y: 416, w: 64, h: 28, type: "leak" },
    ],
    npcs: [
      {
        x: 1260,
        y: 382,
        label: "Amit",
        text:
          "Amit: Business value appears when signals become action. One view helps teams move from activity to outcomes.",
      },
      {
        x: 1720,
        y: 382,
        label: "Buyer",
        text:
          "Buyer: I do not need more dashboards. I need the signal tied to the deal I can act on.",
      },
    ],
  },
];
