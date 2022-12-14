//Imports (including the data file)
const fs = require("fs");
const readline = require("readline");
const stream = fs.createReadStream("./Input.txt");
const rl = readline.createInterface({ input: stream });

//Variables and data structures
/*------------------------------------*/
let paths = []
let minCol = 600
let maxCol = 0
let maxRow = 0
let matrix = []
let sand = 0;
let canFall = true;
/*------------------------------------*/

const printMatrix = () => {
    for (let i = 0; i < maxRow + 1; i++) {
        let str = ""
        for (let j = 0; j < maxCol - minCol + 1; j++) {
            str = str + matrix[i][j];
        }
        console.log(str);
    }
}

const dropSand = (offset) => {
    let unit = [0, 500 - offset];
    canFall = false;
    //fall down
    let canMove = true;
    while (canMove) {
        canMove = false;
        if (unit[0] < maxRow && matrix[unit[0] + 1][unit[1]] === ".") {
            unit[0]++;
            canFall = true;
            canMove = true;
            if (unit[0] === maxRow) {
                canMove = false;
                canFall = false;
            }
        }
        //fall left
        else if (unit[0] < maxRow && unit[1] >= 0 && matrix[unit[0] + 1][unit[1] - 1] === ".") {
            unit[0]++;
            unit[1]--;
            canFall = true;
            canMove = true;
            if (unit[1] === 0) {
                canMove = false;
                canFall = false;
            }
        }
        //fall right
        else if (unit[0] < maxRow && unit[1] < (maxCol - offset) - 1 && matrix[unit[0] + 1][unit[1] + 1] === ".") {
            unit[0]++;
            unit[1]++;
            canFall = true;
            canMove = true;
            if (unit[1] === maxCol - offset - 1) {
                canMove = false;
                canFall = false;
            }
        }
    }
    if (unit[0] === maxRow || unit[1] === 0 || unit[1] === maxCol - offset - 1) {
        canFall = false;
    }
    if (canFall) {
        matrix[unit[0]][unit[1]] = "O"
        sand++;
    }
}
rl.on("line", (row) => {
  row = row.split(" -> ")
  let path = []
  row.forEach((pair) => {
    pair = pair.split(",");
    let left = parseInt(pair[0]);
    let right = parseInt(pair[1]);
    path.push([left, right]);
    if (maxCol < left) maxCol = left;
    if (minCol > left) minCol = left;
    if (maxRow < right) maxRow = right;
  });
  paths.push(path);
});

//On file close. Do analysis after preprocessing.
rl.on("close", () => {
    maxCol += 400;
    minCol -= 400;
    maxRow += 2;
    let width = maxCol - minCol + 1;
    let height = maxRow + 1;
    let offset = minCol;
    //Init matrix
    for (let i = 0; i < height; i++) {
        matrix.push([])
        for (let j = 0; j < width; j++) {
            matrix[i].push(".")
        }
    }
    paths.forEach((path) => {
      for (let i = 0; i < path.length - 1; i++) {
        if (path[i][0] !== path[i+1][0]) {
            if (path[i][0] > path[i+1][0]) {
                for (let j = path[i][0]; j >= path[i+1][0]; j--) {
                    matrix[path[i][1]][j - offset] = "#";
                }
            } else {
                for (let j = path[i+1][0]; j >= path[i][0]; j--) {
                    matrix[path[i][1]][j - offset] = "#";
                }
            }
        }
        else {
            if (path[i][1] < path[i+1][1]) {
                for (let j = path[i][1]; j <= path[i+1][1]; j++) {
                    matrix[j][path[i][0] - offset] = "#";
                }
            }
            else {
                for (let j = path[i+1][1]; j <= path[i][1]; j++) {
                    matrix[j][path[i][0] - offset] = "#";
                }
            }
        }
      }
    })
    for (let i = minCol; i <= maxCol; i++) {
        matrix[maxRow][i - offset] = "#"
    }
    matrix[0][500 - offset] = "+"
    while (canFall) {
        dropSand(offset);
    }
    //console.log(printMatrix());
    console.log("Number of sands dropped: " + sand);
});
