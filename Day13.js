//Imports (including the data file)
const fs = require("fs");
const readline = require("readline");
const stream = fs.createReadStream("./Advent13.txt");
const rl = readline.createInterface({ input: stream });

//Variables and data structures
/*------------------------------------*/
let leftArr = []
let rightArr = []
let lineCounter = 0;
let sum = 0;
/*------------------------------------*/

const compare = (left, right) => {
    if (!left && left !== 0) return 1;
    if (!right && right !== 0) return -1;

    if (Array.isArray(left) || Array.isArray(right)) {
        const leftTemp = Array.isArray(left) ? left : [left];
        const rightTemp = Array.isArray(right) ? right : [right];
        return compareArrays(leftTemp, rightTemp);
    }

    if (left === right) return 0;
    return left < right ? 1 : -1;
}

const compareArrays = (left, right) => {
    const maxLen = Math.max(left.length, right.length);

    for (let i = 0; i < maxLen; i++) {
        const order = compare(left[i], right[i]);
        if (order !== 0) return order;
    }
    return 0;
}


rl.on("line", (row) => {
  if (lineCounter % 3 === 0) {
    leftArr.push(JSON.parse(row));
  } else if (lineCounter % 3 === 1) {
    rightArr.push(JSON.parse(row));
  }
  lineCounter++;
});

//On file close. Do analysis after preprocessing.
rl.on("close", () => {
  for (let i = 0; i < leftArr.length; i++) {
    if (compare(leftArr[i], rightArr[i]) !== -1) {
      sum += i + 1;
    }
  }
  //part2
    let megaArr = [[[2]], [[6]]]
  for (let i = 0; i < leftArr.length; i++) {
    megaArr.push(leftArr[i]);
    megaArr.push(rightArr[i]);
  }
  megaArr.sort((a, b) => compare(b, a));
  let idx1 = 0;
  let idx2 = 0;
  for (let i = 0; i < megaArr.length; i++) {
    if (JSON.stringify(megaArr[i]) === "[[2]]") idx1 = i+1;
    if (JSON.stringify(megaArr[i]) === "[[6]]") {
        idx2 = i+1;
        break;
    }
  }
  console.log("Answer to part one: " + sum);
  console.log("Answer to part two: " + (idx1 * idx2));
});