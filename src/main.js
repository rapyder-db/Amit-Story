const canvas = document.querySelector("#gameCanvas");
const modal = document.querySelector("#storyModal");
const storyKicker = document.querySelector("#storyKicker");
const storyTitle = document.querySelector("#storyTitle");
const storyText = document.querySelector("#storyText");
const storyAction = document.querySelector("#storyAction");
const modalHero = document.querySelector("#modalHero");
const pauseButton = document.querySelector("#pauseButton");
const restartButton = document.querySelector("#restartButton");

const ui = {
  levelName: document.querySelector("#levelName"),
  signalCount: document.querySelector("#signalCount"),
  trustScore: document.querySelector("#trustScore"),
  lifeCount: document.querySelector("#lifeCount"),
  onLevelChange: null,
  showStory(story) {
    storyKicker.textContent = story.kicker;
    storyTitle.textContent = story.title;
    storyText.textContent = story.body;
    storyAction.textContent = story.action || "Continue";
    if (story.heroSrc) {
      modalHero.src = story.heroSrc;
      modalHero.alt = story.heroAlt || "";
      modalHero.classList.add("is-visible");
    } else {
      modalHero.removeAttribute("src");
      modalHero.alt = "";
      modalHero.classList.remove("is-visible");
    }
    modal.classList.add("is-open");
  },
  hideStory() {
    modal.classList.remove("is-open");
  },
};

const game = new window.CloudQuestGame(canvas, ui);
const heroSprites = {};
const loadedHeroThemes = new Set();
const HERO_SOURCES = {
  rapyder: {
    run: "./src/hero/Rapyder_Run.png",
    jump: "./src/hero/Rapyder_Jump.png",
    victory: "./src/hero/Rapyder_Victory.png",
  },
  cloudeva: {
    run: "./src/hero/Cloudeva_Run.png",
    jump: "./src/hero/CloudEva_Jump.png",
    victory: "./src/hero/CloudEva_Victory.png",
  },
  onelenz: {
    run: "./src/hero/OneLenz_Run.png",
    jump: "./src/hero/OneLenz_Jump.png",
    victory: "./src/hero/OneLenz_Victory.png",
  },
};

const LEVEL_ORDER = ["rapyder", "cloudeva", "onelenz"];

function loadMascotSprites() {
  const sprites = {
    front: new Image(),
    side: new Image(),
    celebrating: new Image(),
  };

  sprites.front.src = "./mascot/Mascot_Front_Look.png";
  sprites.side.src = "./mascot/Mascot_Side_Look.png";
  sprites.celebrating.src = "./mascot/mascot_celebrating.png";

  Object.values(sprites).forEach((sprite) => {
    sprite.addEventListener("load", () => game.setPetSprites(sprites), { once: true });
  });
}

function loadHeroTheme(levelId) {
  if (loadedHeroThemes.has(levelId) || !HERO_SOURCES[levelId]) return;

  loadedHeroThemes.add(levelId);
  heroSprites[levelId] = heroSprites[levelId] || {};

  Object.entries(HERO_SOURCES[levelId]).forEach(([pose, src]) => {
    const sprite = new Image();
    sprite.decoding = "async";
    sprite.src = src;
    sprite.addEventListener("load", () => game.setHeroSprites(heroSprites), { once: true });
    heroSprites[levelId][pose] = sprite;
  });
}

function loadCurrentAndNextHeroTheme(levelId) {
  loadHeroTheme(levelId);
  const nextLevel = LEVEL_ORDER[LEVEL_ORDER.indexOf(levelId) + 1];
  if (nextLevel) {
    window.setTimeout(() => loadHeroTheme(nextLevel), 900);
  }
}

loadMascotSprites();
ui.onLevelChange = loadCurrentAndNextHeroTheme;
loadCurrentAndNextHeroTheme("rapyder");
ui.showStory(window.RCQ_STORY.intro);
game.render();

storyAction.addEventListener("click", () => {
  ui.hideStory();
  if (storyAction.textContent === "Next level") {
    game.nextLevelOrRestart();
    return;
  }
  if (storyAction.textContent === "Play again") {
    game.restart();
    return;
  }
  game.startLevel();
});

pauseButton.addEventListener("click", () => {
  game.pause();
  pauseButton.textContent = game.paused ? "Resume" : "Pause";
});

restartButton.addEventListener("click", () => {
  pauseButton.textContent = "Pause";
  game.restart();
});

const keyMap = {
  ArrowLeft: "left",
  KeyA: "left",
  ArrowRight: "right",
  KeyD: "right",
  ArrowUp: "jump",
  Space: "jump",
  KeyW: "jump",
  KeyE: "interact",
  Enter: "interact",
};

window.addEventListener("keydown", (event) => {
  const key = keyMap[event.code];
  if (!key) return;
  event.preventDefault();
  game.setKey(key, true);
});

window.addEventListener("keyup", (event) => {
  const key = keyMap[event.code];
  if (!key) return;
  event.preventDefault();
  game.setKey(key, false);
});

document.querySelectorAll("[data-control]").forEach((button) => {
  const control = button.dataset.control;
  const start = (event) => {
    event.preventDefault();
    game.setKey(control, true);
  };
  const end = (event) => {
    event.preventDefault();
    game.setKey(control, false);
  };
  button.addEventListener("pointerdown", start);
  button.addEventListener("pointerup", end);
  button.addEventListener("pointercancel", end);
  button.addEventListener("pointerleave", end);
});
