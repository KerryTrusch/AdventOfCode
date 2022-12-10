//Imports (including the data file)
const fs = require("fs");
const readline = require("readline");
const stream = fs.createReadStream("./Advent10.txt");
const rl = readline.createInterface({ input: stream });

//Variables and data structures
/*------------------------------------*/
let clockCycle = 0;
let regX = 1;
let line = ""
/*------------------------------------*/
//on file open. Here, read all of the data into memory to make it easier to manipulate
const check = () => {
    if ((clockCycle % 40) >= (regX - 1) && (clockCycle % 40) <= (regX + 1)) {
        line += "#"
    } else {
        line += "."
    }
    if ((clockCycle + 1) % 40 === 0) {
        console.log(line);
        line = ""
    }
}
rl.on("line", (row) => {
    let op = row.split(" ");
    if (op[0] === "noop") {
        //START
        //DURING
            check();
        //END
        clockCycle++;
    } else {
        //START
           //begin execution
        //DURING
            check();
        //END
            clockCycle++;

        //START

        //DURING
            check();
        //END
            regX += parseInt(op[1]);
            clockCycle++;
    }
})

//On file close. Do analysis after preprocessing.
rl.on("close", () => {
    
})