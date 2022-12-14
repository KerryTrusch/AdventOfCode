//Imports (including the data file)
const fs = require("fs");
const readline = require("readline");
const stream = fs.createReadStream("./Advent11.txt");
const rl = readline.createInterface({ input: stream });

//Variables and data structures
/*------------------------------------*/
let items = []
let ops = []
let tests = []
let throws = []
let currMonkey = 0;
let inspections = [];
let NUM_MONKEYS = 8;
/*------------------------------------*/
//Part 1 function

//on file open. Here, read all of the data into memory to make it easier to manipulate
const doOperation = (op, val, old) => {
    if (op === "*") {
        if (val === "old") {
            return old * old;
        } else {
            return old * parseInt(val);
        }
    } else {
        return (old + parseInt(val));
    }
}
let lineCounter = 0;
rl.on("line", (row) => {
    if (lineCounter % 7 === 0) {
        currMonkey = parseInt(row.split(" ")[1]);
        lineCounter = 0;
    } else if (lineCounter === 1) {
        row = row.split(":");
        row = row[1].split(",");
        items.push(row.map((e) => parseInt(e.trim())));
    } else if (lineCounter === 2) {
        ops.push(row.split("old ")[1]);
    } else if (lineCounter === 3) {
        tests.push(parseInt(row.split("by ")[1]));
    } else if (lineCounter === 4) {
        throws.push([parseInt(row.split("monkey ")[1])]);
    } else if (lineCounter === 5) {
        throws[currMonkey].push(parseInt(row.split("monkey ")[1]));
    }
    lineCounter++;
})

//On file close. Do analysis after preprocessing.
rl.on("close", () => {
    for (let i = 0; i < NUM_MONKEYS; i++) {
        inspections.push(0);
    }
    for (let i = 0; i < 10000; i++) {
        for (let j = 0; j < NUM_MONKEYS; j++) {
            while (items[j].length > 0) {
                let topItem = items[j].shift();
                inspections[j]++;
                let currOp = ops[j].split(" ");
                let newVal = doOperation(currOp[0], currOp[1], topItem) % 9699690; 
                //newVal = newVal / 3 | 0;
                if (newVal % tests[j] === 0) {
                    items[throws[j][0]].push(newVal);
                } else {
                    items[throws[j][1]].push(newVal);
                }
            } 
                    
        }
        if (i === 1000) {
            console.log(items);
        }   
    }
    inspections.sort((a, b) => a-b);
    console.log(inspections);
    console.log(inspections[2] * inspections[3]);
})