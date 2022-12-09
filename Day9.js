//Imports (including the data file)
const fs = require("fs");
const readline = require("readline");
const stream = fs.createReadStream("./Advent9.txt");
const rl = readline.createInterface({ input: stream });

//Variables and data structures
/*------------------------------------*/
let visited = []
let numVisited = 0;
let rope = []
const moveMap = new Map();
/*------------------------------------*/
for (let i = 0; i < 1000; i++) {
    visited.push([])
    for (let j = 0; j < 1000; j++) {
        visited[i].push(false);
    }
}
for (let i = 0; i < 10; i++) {
    rope.push([500, 500]);
}
moveMap.set("D", [-1, 0]); moveMap.set("U", [1, 0]);
moveMap.set("L", [0, -1]); moveMap.set("R", [0, 1]);
//Part 1 function
const handleMovement = (move) => {
    move = move.split(" ");
    const direction = move[0];
    let d = moveMap.get(direction);
    let steps = parseInt(move[1]);
    while (steps-- > 0) {
        head[0] += d[0];
        head[1] += d[1];
        //console.log(calculateDistance());
        if (calculateDistance() === 2) {
            tail[0] += d[0];
            tail[1] += d[1];
        } else if (calculateDistance() > 2) {
            //Head is diagonally across from tail
            //Tail will be at the previous move head took before moving in the same direction
            tail[0] = head[0] - d[0];
            tail[1] = head[1] - d[1];
        }
        visited[tail[0]][tail[1]] = true;
        console.log(head + " " + tail);
    }
}
//Part 2 function
//Generalize
const handleMovement2 = (move) => {
    move = move.split(" ");
    const direction = move[0];
    let d = moveMap.get(direction);
    let steps = parseInt(move[1]);
    for (let i = 0; i < steps; i++) {
        rope[0][0] += d[0];
        rope[0][1] += d[1];
        for (let i = 0; i < 9; i++) {
            let rope1 = rope[i];
            let rope2 = rope[i+1];
            if (calculateDistance(rope1, rope2) >= 2) {
                let diffX = rope1[0] - rope2[0];
                let diffY = rope1[1] - rope2[1];
                if (Math.abs(diffX) > 1) diffX /= Math.abs(diffX);
                if (Math.abs(diffY) > 1) diffY /= Math.abs(diffY);
                rope[i+1][0] = rope2[0] + diffX;
                rope[i+1][1] = rope2[1] + diffY; 
            }
        }
        console.log(rope[0]);
        visited[rope[9][0]][rope[9][1]] = true;
    }
}
const calculateDistance = (rope1, rope2) => {
    let x = Math.pow(rope1[0] - rope2[0], 2);
    let y = Math.pow(rope1[1] - rope2[1], 2);
    return Math.sqrt(x + y);
}
//  visited[500][500] = true;
//on file open. Here, read all of the data into memory to make it easier to manipulate
rl.on("line", (row) => {
    handleMovement2(row);
})

//On file close. Do analysis after preprocessing.
rl.on("close", () => {
    for (let i = 0; i < 1000; i++) {
        for (let j = 0; j < 1000; j++) {
            if (visited[i][j]) numVisited++;
        }
    }
    console.log(numVisited);
})