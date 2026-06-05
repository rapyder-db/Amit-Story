class CloudQuestGame {
  constructor(canvas, ui) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.ui = ui;
    this.width = 960;
    this.height = 540;
    this.dpr = 1;
    this.petSprites = {};
    this.heroSprites = {};
    this.keys = { left: false, right: false, jump: false, interact: false };
    this.levelIndex = 0;
    this.cameraX = 0;
    this.paused = true;
    this.storyOpen = true;
    this.lastTime = 0;
    this.lives = 3;
    this.trust = 0;
    this.petUnlocked = false;
    this.message = "";
    this.messageTimer = 0;
    this.resizeCanvas();
    window.addEventListener("resize", () => {
      this.resizeCanvas();
      this.render();
    });
    this.loadLevel(0);
  }

  resizeCanvas() {
    const nextDpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 2));
    if (this.dpr === nextDpr && this.canvas.width === this.width * nextDpr) return;
    this.dpr = nextDpr;
    this.canvas.width = Math.round(this.width * this.dpr);
    this.canvas.height = Math.round(this.height * this.dpr);
    this.canvas.style.aspectRatio = `${this.width} / ${this.height}`;
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    this.ctx.imageSmoothingEnabled = true;
    this.ctx.textRendering = "geometricPrecision";
  }

  setPetSprites(sprites) {
    this.petSprites = sprites || {};
    this.render();
  }

  setHeroSprites(sprites) {
    this.heroSprites = sprites || {};
    this.render();
  }

  getHeroVictorySrc(levelId = this.level.id) {
    const srcByLevel = {
      rapyder: "./src/hero/Rapyder_Victory.png",
      cloudeva: "./src/hero/CloudEva_Victory.png",
      onelenz: "./src/hero/OneLenz_Victory.png",
    };
    return srcByLevel[levelId] || "";
  }

  loadLevel(index) {
    this.levelIndex = index;
    this.level = window.RCQ_LEVELS[index];
    this.cameraX = 0;
    this.player = {
      x: this.level.start.x,
      y: this.level.start.y,
      w: 34,
      h: 58,
      vx: 0,
      vy: 0,
      grounded: false,
      facing: 1,
      invuln: 0,
    };
    this.pet = { x: this.player.x - 42, y: this.player.y - 24, bob: 0 };
    this.collectibles = this.level.collectibles.map((item) => ({ ...item, taken: false }));
    this.hazards = this.level.hazards.map((item, i) => ({ ...item, phase: i * 0.8 }));
    this.npcs = this.level.npcs.map((item) => ({ ...item, talked: false }));
    this.message = "";
    this.messageTimer = 0;
    this.updateHud();
    this.ui.onLevelChange?.(this.level.id, this.levelIndex);
  }

  startLevel() {
    this.paused = false;
    this.storyOpen = false;
    this.lastTime = performance.now();
    requestAnimationFrame((time) => this.loop(time));
  }

  pause(toggle = true) {
    if (this.storyOpen) return;
    this.paused = toggle ? !this.paused : true;
    if (!this.paused) {
      this.lastTime = performance.now();
      requestAnimationFrame((time) => this.loop(time));
    }
  }

  restart() {
    this.lives = 3;
    this.trust = 0;
    this.petUnlocked = false;
    this.loadLevel(0);
    this.paused = true;
    this.storyOpen = true;
    this.ui.showStory(window.RCQ_STORY.intro);
  }

  setKey(name, value) {
    if (name in this.keys) {
      this.keys[name] = value;
    }
  }

  loop(time) {
    if (this.paused || this.storyOpen) return;
    const dt = Math.min((time - this.lastTime) / 1000, 0.032);
    this.lastTime = time;
    this.update(dt);
    this.render();
    requestAnimationFrame((next) => this.loop(next));
  }

  update(dt) {
    const speed = 250;
    const jump = 560;
    const gravity = 1480;

    this.player.vx = 0;
    if (this.keys.left) {
      this.player.vx = -speed;
      this.player.facing = -1;
    }
    if (this.keys.right) {
      this.player.vx = speed;
      this.player.facing = 1;
    }
    if (this.keys.jump && this.player.grounded) {
      this.player.vy = -jump;
      this.player.grounded = false;
    }

    this.player.vy += gravity * dt;
    this.movePlayer(dt);
    this.updatePet(dt);
    this.checkCollectibles();
    this.checkHazards(dt);
    this.checkNpc();
    this.checkGoal();

    this.cameraX = Math.max(0, Math.min(this.player.x - 280, this.level.goal.x - 730));
    if (this.messageTimer > 0) {
      this.messageTimer -= dt;
    }
    this.updateHud();
  }

  movePlayer(dt) {
    const p = this.player;
    p.x += p.vx * dt;
    this.resolveCollisions("x");
    p.y += p.vy * dt;
    p.grounded = false;
    this.resolveCollisions("y");

    if (p.y > 620) {
      this.damage("You fell below the cloud path.");
    }
  }

  resolveCollisions(axis) {
    const p = this.player;
    for (const block of this.level.platforms) {
      if (!this.intersects(p, block)) continue;

      if (axis === "x") {
        if (p.vx > 0) p.x = block.x - p.w;
        if (p.vx < 0) p.x = block.x + block.w;
        p.vx = 0;
      } else {
        if (p.vy > 0) {
          p.y = block.y - p.h;
          p.vy = 0;
          p.grounded = true;
        } else if (p.vy < 0) {
          p.y = block.y + block.h;
          p.vy = 0;
        }
      }
    }

    p.x = Math.max(0, Math.min(p.x, this.level.goal.x + 120));
  }

  updatePet(dt) {
    this.pet.bob += dt * 5;
    const targetX = this.player.x - 54 * this.player.facing;
    const targetY = this.player.y - 34 + Math.sin(this.pet.bob) * 8;
    this.pet.x += (targetX - this.pet.x) * 0.08;
    this.pet.y += (targetY - this.pet.y) * 0.08;
  }

  checkCollectibles() {
    for (const item of this.collectibles) {
      if (item.taken) continue;
      const box = { x: item.x, y: item.y, w: 38, h: 38 };
      if (this.intersects(this.player, box)) {
        item.taken = true;
        this.trust += 10;
        this.flash(`${item.label} signal collected`);
      }
    }
  }

  checkHazards(dt) {
    if (this.player.invuln > 0) {
      this.player.invuln -= dt;
      return;
    }

    for (const hazard of this.hazards) {
      const box = {
        x: hazard.x,
        y: hazard.y + Math.sin(performance.now() / 260 + hazard.phase) * 5,
        w: hazard.w,
        h: hazard.h,
      };
      if (this.intersects(this.player, box)) {
        this.damage(this.petUnlocked ? "Hazard hit. EVA pulled you back." : "Hazard hit. Return to the last cloud path.");
        break;
      }
    }
  }

  checkNpc() {
    const nearNpc = this.npcs.find((npc) => Math.abs(this.player.x - npc.x) < 80 && Math.abs(this.player.y - npc.y) < 95);
    if (nearNpc && this.keys.interact) {
      nearNpc.talked = true;
      this.trust += 2;
      this.flash(nearNpc.text, 4.2);
      this.keys.interact = false;
    } else if (nearNpc && this.messageTimer <= 0) {
      this.flash("Press Talk near " + nearNpc.label, 1.1);
    }
  }

  checkGoal() {
    const allCollected = this.collectibles.every((item) => item.taken);
    const goalBox = { x: this.level.goal.x - 28, y: this.level.goal.y, w: 98, h: 154 };
    if (!this.intersects(this.player, goalBox)) return;

    if (!allCollected) {
      this.flash("Collect every signal before the gate opens.", 1.8);
      return;
    }

    const story = window.RCQ_STORY.levels[this.levelIndex];
    const unlockedPetNow = this.levelIndex === 0 && !this.petUnlocked;
    if (unlockedPetNow) {
      this.petUnlocked = true;
    }
    this.player.victory = true;
    this.render();

    if (this.levelIndex < window.RCQ_LEVELS.length - 1) {
      this.paused = true;
      this.storyOpen = true;
      this.ui.showStory({
        kicker: "Level Clear",
        title: story.title,
        body: story.complete,
        action: "Next level",
        heroSrc: this.getHeroVictorySrc(),
        heroAlt: `${this.level.name} victory pose`,
        showMascot: this.petUnlocked,
      });
    } else {
      this.paused = true;
      this.storyOpen = true;
      this.ui.showStory({
        ...window.RCQ_STORY.ending,
        heroSrc: this.getHeroVictorySrc(),
        heroAlt: `${this.level.name} victory pose`,
        showMascot: this.petUnlocked,
      });
    }
  }

  nextLevelOrRestart() {
    if (this.levelIndex < window.RCQ_LEVELS.length - 1) {
      this.loadLevel(this.levelIndex + 1);
      const story = window.RCQ_STORY.levels[this.levelIndex];
      this.ui.showStory({ ...story, action: "Start level", showMascot: this.petUnlocked });
    } else {
      this.restart();
    }
  }

  damage(text) {
    this.lives -= 1;
    this.player.invuln = 1.4;
    this.flash(text, 1.6);
    if (this.lives <= 0) {
      this.lives = 3;
      this.trust = Math.max(0, this.trust - 15);
      this.loadLevel(this.levelIndex);
      this.flash("Checkpoint reset. Try the route again.", 2);
    } else {
      this.player.x = Math.max(24, this.player.x - 140);
      this.player.y = this.level.start.y;
      this.player.vy = 0;
    }
  }

  flash(text, seconds = 1.4) {
    this.message = text;
    this.messageTimer = seconds;
  }

  updateHud() {
    const taken = this.collectibles.filter((item) => item.taken).length;
    this.ui.levelName.textContent = this.level.name;
    this.ui.signalCount.textContent = `${taken} / ${this.collectibles.length}`;
    this.ui.trustScore.textContent = this.trust;
    this.ui.lifeCount.textContent = this.lives;
  }

  intersects(a, b) {
    return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
  }

  render() {
    const ctx = this.ctx;
    const t = this.level.theme;
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    ctx.clearRect(0, 0, this.width, this.height);
    this.drawBackground(ctx, t);
    ctx.save();
    ctx.translate(-Math.round(this.cameraX), 0);
    this.drawPlatforms(ctx, t);
    this.drawProps(ctx, t);
    this.drawCollectibles(ctx, t);
    this.drawHazards(ctx, t);
    this.drawGoal(ctx, t);
    this.drawNpc(ctx, t);
    this.drawPlayer(ctx);
    this.drawPet(ctx, t);
    ctx.restore();
    this.drawMessage(ctx);
  }

  drawBackground(ctx, t) {
    ctx.fillStyle = t.sky;
    ctx.fillRect(0, 0, this.width, this.height);
    const skyGradient = ctx.createLinearGradient(0, 0, 0, this.height);
    skyGradient.addColorStop(0, "rgba(255,255,255,0.32)");
    skyGradient.addColorStop(0.5, "rgba(255,255,255,0.04)");
    skyGradient.addColorStop(1, "rgba(0,0,0,0.14)");
    ctx.fillStyle = skyGradient;
    ctx.fillRect(0, 0, this.width, this.height);
    ctx.fillStyle = t.far;
    for (let i = 0; i < 8; i += 1) {
      const x = (i * 210 - (this.cameraX * 0.25) % 210) - 80;
      this.rect(ctx, x, 92 + (i % 2) * 34, 88, 28);
      this.rect(ctx, x + 24, 70 + (i % 2) * 34, 42, 24);
    }
    ctx.fillStyle = "rgba(255,255,255,0.12)";
    for (let x = -80; x < this.width + 120; x += 96) {
      this.rect(ctx, x - (this.cameraX * 0.12) % 96, 0, 2, this.height);
    }
    ctx.fillStyle = "rgba(8,16,32,0.09)";
    for (let y = 18; y < this.height; y += 42) {
      this.rect(ctx, 0, y, this.width, 1);
    }
  }

  drawPlatforms(ctx, t) {
    for (const p of this.level.platforms) {
      if (p.type === "ground") {
        ctx.fillStyle = t.ground;
        this.rect(ctx, p.x, p.y, p.w, p.h);
        ctx.fillStyle = t.grass;
        this.rect(ctx, p.x, p.y, p.w, 16);
        ctx.fillStyle = "rgba(255,255,255,0.22)";
        this.rect(ctx, p.x, p.y + 3, p.w, 3);
        ctx.fillStyle = "rgba(0,0,0,0.18)";
        for (let x = p.x; x < p.x + p.w; x += 36) {
          this.rect(ctx, x, p.y + 28, 18, 10);
          this.rect(ctx, x + 21, p.y + 58, 10, 7);
        }
      } else {
        ctx.fillStyle = p.type === "cloud" ? t.water : t.block;
        this.rect(ctx, p.x, p.y, p.w, p.h);
        ctx.fillStyle = "rgba(255,255,255,0.25)";
        this.rect(ctx, p.x + 8, p.y + 6, p.w - 16, 5);
        ctx.fillStyle = "rgba(0,0,0,0.12)";
        for (let x = p.x + 10; x < p.x + p.w - 8; x += 34) {
          this.rect(ctx, x, p.y + 20, 18, 4);
        }
      }
      ctx.strokeStyle = "#081020";
      ctx.lineWidth = 4;
      ctx.strokeRect(p.x, p.y, p.w, p.h);
    }
  }

  drawProps(ctx, t) {
    ctx.fillStyle = t.accent;
    for (let x = 250; x < this.level.goal.x; x += 480) {
      this.rect(ctx, x, 404, 42, 40);
      this.rect(ctx, x - 9, 390, 60, 18);
    }
    ctx.fillStyle = "#fff7de";
    ctx.font = "700 18px Arial, sans-serif";
    ctx.textBaseline = "alphabetic";
    ctx.fillText("?", 372, 352);
    ctx.fillText("?", 1044, 362);
  }

  drawCollectibles(ctx, t) {
    for (const item of this.collectibles) {
      if (item.taken) continue;
      ctx.fillStyle = "#ffd84d";
      this.rect(ctx, item.x, item.y, 38, 38);
      ctx.strokeStyle = "#081020";
      ctx.lineWidth = 4;
      ctx.strokeRect(item.x, item.y, 38, 38);
      ctx.fillStyle = "#081020";
      ctx.font = "700 10px Arial, sans-serif";
      ctx.fillText(item.label.slice(0, 5), item.x + 5, item.y + 23);
    }
  }

  drawHazards(ctx, t) {
    for (const hazard of this.hazards) {
      const y = hazard.y + Math.sin(performance.now() / 260 + hazard.phase) * 5;
      ctx.fillStyle = hazard.type === "leak" ? "#111827" : "#e51f2f";
      this.rect(ctx, hazard.x, y, hazard.w, hazard.h);
      ctx.fillStyle = hazard.type === "bot" ? t.accent : "#ffd84d";
      this.rect(ctx, hazard.x + 8, y + 7, hazard.w - 16, 8);
    }
  }

  drawGoal(ctx, t) {
    const g = this.level.goal;
    ctx.fillStyle = "#081020";
    this.rect(ctx, g.x, g.y, 10, 144);
    ctx.fillStyle = t.accent;
    this.rect(ctx, g.x + 10, g.y + 8, 72, 46);
    ctx.fillStyle = "#fff7de";
    ctx.font = "800 22px Arial, sans-serif";
    ctx.fillText(g.label, g.x + 24, g.y + 38);
  }

  drawNpc(ctx) {
    for (const npc of this.npcs) {
      ctx.fillStyle = "#fff7de";
      this.rect(ctx, npc.x, npc.y, 36, 62);
      ctx.fillStyle = "#081020";
      this.rect(ctx, npc.x + 8, npc.y + 10, 20, 12);
      ctx.font = "700 13px Arial, sans-serif";
      ctx.fillText(npc.label, npc.x - 4, npc.y - 10);
    }
  }

  getHeroSprite() {
    const themeSprites = this.heroSprites[this.level.id] || {};
    if (this.player.victory && themeSprites.victory) return themeSprites.victory;
    if (!this.player.grounded && themeSprites.jump) return themeSprites.jump;
    return themeSprites.run || themeSprites.victory || null;
  }

  drawPlayer(ctx) {
    const p = this.player;
    if (p.invuln > 0 && Math.floor(performance.now() / 100) % 2 === 0) return;

    const sprite = this.getHeroSprite();
    if (!sprite || !sprite.complete) {
      return;
    }

    const drawH = 126;
    const drawW = drawH * (sprite.naturalWidth / sprite.naturalHeight);
    const drawX = p.x + p.w / 2 - drawW / 2;
    const drawY = p.y + p.h - drawH + 7;

    ctx.save();
    ctx.fillStyle = "rgba(255, 216, 77, 0.28)";
    ctx.beginPath();
    ctx.ellipse(p.x + p.w / 2, p.y + p.h + 4, 34, 8, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    ctx.save();
    ctx.shadowColor = "rgba(0, 0, 0, 0.34)";
    ctx.shadowBlur = 16;
    ctx.shadowOffsetY = 9;
    if (p.facing < 0) {
      ctx.translate(drawX + drawW, drawY);
      ctx.scale(-1, 1);
      ctx.drawImage(sprite, 0, 0, drawW, drawH);
    } else {
      ctx.drawImage(sprite, drawX, drawY, drawW, drawH);
    }
    ctx.restore();
  }

  drawPet(ctx, t) {
    if (!this.petUnlocked) {
      return;
    }

    const x = this.pet.x;
    const y = this.pet.y;
    const sprite = this.petSprites.side || this.petSprites.front;

    if (!sprite || !sprite.complete) {
      return;
    }

    const drawW = 82;
    const drawH = 82;
    ctx.save();
    ctx.shadowColor = "rgba(0, 0, 0, 0.35)";
    ctx.shadowBlur = 14;
    ctx.shadowOffsetY = 8;
    if (this.player.facing < 0) {
      ctx.translate(x + drawW, y);
      ctx.scale(-1, 1);
      ctx.drawImage(sprite, 0, -14, drawW, drawH);
    } else {
      ctx.drawImage(sprite, x, y - 14, drawW, drawH);
    }
    ctx.restore();

    ctx.save();
    ctx.strokeStyle = "rgba(255, 255, 255, 0.72)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(x + 40, y + 28, 47, 33, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }

  drawMessage(ctx) {
    if (this.messageTimer <= 0 || !this.message) return;
    ctx.fillStyle = "rgba(8,16,32,0.88)";
    this.rect(ctx, 24, 24, this.width - 48, 72);
    ctx.strokeStyle = "#ffd84d";
    ctx.lineWidth = 4;
    ctx.strokeRect(24, 24, this.width - 48, 72);
    ctx.fillStyle = "#fff7de";
    ctx.font = "700 18px Arial, sans-serif";
    ctx.textBaseline = "alphabetic";
    this.wrapText(ctx, this.message, 44, 54, this.width - 92, 22);
  }

  rect(ctx, x, y, w, h) {
    ctx.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h));
  }

  wrapText(ctx, text, x, y, maxWidth, lineHeight) {
    const words = text.split(" ");
    let line = "";
    for (const word of words) {
      const test = line + word + " ";
      if (ctx.measureText(test).width > maxWidth && line) {
        ctx.fillText(line, x, y);
        line = word + " ";
        y += lineHeight;
      } else {
        line = test;
      }
    }
    ctx.fillText(line, x, y);
  }
}

window.CloudQuestGame = CloudQuestGame;
