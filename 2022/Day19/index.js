console.clear();
const fs = require('fs');

let input;

function formatFile() {
    input = fs.readFileSync("input.txt", { encoding: 'utf8', flag: 'r' });
    input = input.replaceAll("\r","").split("\n");
}

function part1() {
    formatFile();
    for (let line of input) {
        line = line.split(".")
        console.log(line);
        break;
    }
}

function part2() {
    formatFile();
}

console.log(part1(), part2());

class Simulation {
    time = 24;
    collectingBots = [new OreBot()];
    constructingBot;
    useless = false;

    resources = {
        "ore": 0,
        "clay": 0,
        "obsidian": 0,
        "geode": 0,
    }

    tick() {
        if (this.useless) return;
        // Begin Construct
            // Here is the interesting part. Need to decide which one to build. This will generate multiple tracks
            // None, OreBot, ClayBot, ObsidianBot, GeodeBot
        // Collect
        for (let bot of this.collectingBots) {
            bot.collect(resources);
        }
        // Finalize Construct
        if (this.constructingBot) {
            if (this.constructingBot.failedCreate) this.useless = true;
            this.collectingBots.push(this.constructingBot);
            this.constructingBot = undefined;
        }
    }
}

class Robot {
    oreCost = 0;
    clayCost = 0;
    obsidianCost = 0;
    oreProd = 0;
    clayProd = 0;
    obsidianProd = 0;
    geodeProd = 0;
    failedCreate = false;

    constructor(resources) {
        // Not enough resources so we fail fast (don't subtract resources and fail the construct)
        if (resources.ore < this.oreCost || resources.clay < this.clayCost || resources.obsidian < this.obsidianCost) return this.failedCreate = true;
        
        resources.ore -= this.oreCost;
        resources.clay -= this.clayCost;
        resources.obsidian -= this.obsidianCost;
    }

    collect(resources) {
        resources.ore += this.oreCost;
        resources.clay += this.clayCost;
        resources.obsidian += this.obsidianCost;
    }
}

class OreBot extends Robot {
    constructor(oreCost) {
        this.oreCost = oreCost;
        this.oreProd = 1;
    }
}
class ClayBot extends Robot {
    constructor(oreCost) {
        this.oreCost = oreCost;
        this.clayProd = 1;
    }
}
class ObsidianBot extends Robot {
    constructor(oreCost, clayCost) {
        this.oreCost = oreCost;
        this.clayCost = clayCost;
        this.obsidianProd = 1;
    }
}
class GeodeBot extends Robot {
    constructor(oreCost, obsidianCost) {
        this.oreCost = oreCost;
        this.obsidianCost = obsidianCost;
        this.geodeProd = 1;
    }
}