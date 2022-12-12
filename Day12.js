//Imports (including the data file)
const fs = require("fs");
const readline = require("readline");
const stream = fs.createReadStream("./Advent12.txt");
const rl = readline.createInterface({ input: stream });

//Variables and data structures
/*------------------------------------*/
let matrix = [];
let startBuffer = [];
let visited = [];
let dirs = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];
let n = 0;
let m = 0;
let min = 0;
let minGlobal = 0;
let found = false;
/*------------------------------------*/
//on file open. Here, read all of the data into memory to make it easier to manipulate
const bfs = (q) => {
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
          visited[i][j]=false;
        }
    }
    while (q.length > 0) {
      let size = q.length;
      while (size-- > 0) {
        let t = q.shift();
        let i = t[0];
        let j = t[1];
        let cc = t[2];
        if (i < 0 || j < 0 || i >= n || j >= m || visited[i][j]) {
          continue;
        }
        let ce = matrix[i][j] === "E" ? "z".charCodeAt(0) : matrix[i][j].charCodeAt(0);
        if (ce - cc.charCodeAt(0) > 1) {
          continue;
        }
        if (matrix[i][j] === "E") {
          //console.log(min);
          if (minGlobal === 0) {
            minGlobal = min;
          } else {
            minGlobal = Math.min(min, minGlobal);
          }
          found = true;
          break;
        }
        visited[i][j] = true;
        dirs.forEach((d) => {
          q.push([i + d[0], j + d[1], matrix[i][j]]);
        });
      }
      if (found) break;
      min++;
    }
}
rl.on("line", (row) => {
  matrix.push(row.split(""));
});

//On file close. Do analysis after preprocessing.
rl.on("close", () => {
  n = matrix.length;
  m = matrix[0].length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (matrix[i][j] === "S" || matrix[i][j] === "a") {
        startBuffer.push([i, j, "a"]);
        matrix[i][j] = "a";
      }
    }
  }
  for (let i = 0; i < n; i++) {
    visited.push([]);
    for (let j = 0; j < m; j++) {
      visited[i].push(false);
    }
  }
  for (let k = 0; k < startBuffer.length; k++) {
    let q = [];
    min = 0;
    q.push(startBuffer[k]);
    found = false;
    bfs(q);
  }
  console.log(minGlobal);
});
