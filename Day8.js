//Imports (including the data file)
const fs = require("fs");
const readline = require("readline");
const stream = fs.createReadStream("./Advent8.txt");
const rl = readline.createInterface({ input: stream });

//Variables and data structures
/*------------------------------------*/
let data = []
let rowMaxes = []
let colMaxes = []
let visible = 0;
/*------------------------------------*/
//Part 1 function
const findVisible = (i, j) => {
    let num = data[i][j];
    for (let left = j - 1; left >= 0; left--) {
        if (left === 0 && data[i][j] > data[i][left]) return true;
        if (data[i][j] <= data[i][left]) break;
    }
    for (let right = j+1; right < data[0].length; right++) {
        if (right === data[0].length - 1 && data[i][j] > data[i][right]) return true;
        if (data[i][j] <= data[i][right]) break;
    }
    for (let up = i - 1; up >= 0; up--) {
        if (up === 0 && data[i][j] > data[up][j]) return true;
        if (data[i][j] <= data[up][j]) break;
    }
    for (let down = i + 1; down < data.length; down++) {
        if (down === data.length - 1 && data[i][j] > data[down][j]) return true;
        if (data[i][j] <= data[down][j]) break;
    }
    return false;
}
//Part 2 function
const calculateScore = (i, j) => {
    let num = data[i][j];
    let upM = 0, downM = 0, rightM = 0, leftM = 0;
    for (let left = j - 1; left >= 0; left--) {
        leftM++;
        if (num <= data[i][left]) break;
    }
    for (let right = j+1; right < data[0].length; right++) {
        rightM++;
        if (num <= data[i][right]) break;
    }
    for (let up = i - 1; up >= 0; up--) {
        upM++;
        if (num <= data[up][j]) break;
    }
    for (let down = i + 1; down < data.length; down++) {
        downM++;
        if (data[i][j] <= data[down][j]) break;
    }
    return upM * downM * leftM * rightM;
}
//on file open. Here, read all of the data into memory to make it easier to manipulate
rl.on("line", (row) => {
    data.push([]);
    for (let i = 0; i < row.length; i++) {
        data[data.length - 1].push(parseInt(row.charAt(i)));
    }
})

//On file close. Do analysis after preprocessing.
rl.on("close", () => {
    for (let i = 0; i < data.length; i++) {
        rowMaxes.push([]);
        for (let j = 0; j < data[i].length; j++) {
            let parsed = data[i][j];
            if (j === 0) {
                rowMaxes[i].push(parsed);
            } else {
                rowMaxes[i].push(Math.max(parsed, rowMaxes[i][j-1]));
            }
            if (colMaxes.length <= j) {
                colMaxes.push([])
                colMaxes[j][0] = data[i][j];
            } else {
                colMaxes[j].push(Math.max(parsed, colMaxes[j][i-1]));
            }
            if (i > 0 && j > 0 && i <= data.length - 1 && j <= data[0].length - 1) {
                visible = Math.max(visible, calculateScore(i, j));
            }
        }
    }
    console.log(visible);
})