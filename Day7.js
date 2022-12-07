const fs = require("fs");
const readline = require("readline");
const stream = fs.createReadStream("./Advent7.txt");
const rl = readline.createInterface({ input: stream });

class DirNode {
    constructor(name, parent) {
        this.subDirs = new Map();
        this.parent = parent;
        this.name = name;
        this.size = 0;
    }
    addFile(size) {
        this.size += size;
    }
}

const calculateSizes = (root) => {
    //base case
    if (root.subDirs.size === 0) {
        if (root.size <= 100000) {
            sums += root.size;
        }
        root.parent.size += root.size;
        return;
    }
    root.subDirs.forEach((val) => {
        calculateSizes(val);
    })
    if (root.parent != null) {
        root.parent.size += root.size;
    }
    if (root.size <= 100000) {
        sums += root.size;
    }
}

const findMinDirToDelete = (currDir) => {
    if (TOTAL_SPACE - root.size + currDir.size >= 30000000) {
        minDir = Math.min(currDir.size, minDir);
    }
    currDir.subDirs.forEach((val) => {
        findMinDirToDelete(val);
    })
}
let sums = 0;
let root = new DirNode("/", null);
let iterator = root;
let currentDirectory = "/";
let minDir = 70000000;
let TOTAL_SPACE = 70000000;
rl.on("line", (row) => {
        const split = row.split(" ");
        if (split[0] === "$") {
            switch (split[1]) {
                case "cd":
                    if (split[2] === "..") {
                        iterator = iterator.parent;
                    } else {
                        currentDirectory = split[2];
                        if (iterator.subDirs.get(currentDirectory) === undefined) {
                            iterator.subDirs.set(currentDirectory, new DirNode(currentDirectory, iterator));
                        }
                        iterator = iterator.subDirs.get(currentDirectory);   
                    }
                    break;
                case "ls":
                    break;
            }
        } else {
            if (split[0] === "dir") {
                iterator.subDirs.set(split[1], new DirNode(split[1], iterator));
            } else {
                iterator.addFile(parseInt(split[0]));
            }
        }
})

rl.on("close", () => {
    let tempDir = root;
    calculateSizes(tempDir);
    findMinDirToDelete(root);
    console.log(minDir);
})