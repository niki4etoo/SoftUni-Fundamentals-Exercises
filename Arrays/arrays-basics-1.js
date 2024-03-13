function addSubstract(input) {

    let sumModified = 0;
    let sumOriginal = 0;

    for (let index = 0; index < input.length; index++) {

        if (input[index] % 2 === 0) {
            sumOriginal += input[index];
            input[index] = input[index] + index;
            sumModified += input[index];

        } else {
            sumOriginal += input[index];
            input[index] = input[index] - index;
            sumModified += input[index];
        }
    }

    console.log(input);
    console.log(sumOriginal);
    console.log(sumModified);

}

//addSubstract([-5, 11, 3, 0, 2]);

function commonElements(first, second) {

    // first way

    // for (let i = 0; i < first.length; i++) {
    //     for (let j = 0; j < second.length; j++) {

    //         if (first[i] === second[j]) {
    //             console.log(first[i]);
    //         }

    //     }
    // }

    // second way

    // for(let f of first){
    //     for(let s of second){
    //         if(f === s){
    //             console.log(f);
    //         }
    //     }
    // }

    // third way

    for (let element of first) {
        if (second.includes(element)) {
            console.log(element);
        }
    }

}

// commonElements(['S', 'o', 'f', 't', 'U', 'n', 'i', ' '],
//     ['s', 'o', 'c', 'i', 'a', 'l']
// );

function mergeArrays(first, second) {

    let third = [];

    for (let i = 0; i < first.length; i++) {

        if (i % 2 !== 0) { // odd indexes

            third.push(first[i] + second[i])

        } else {           // even indexes

            third.push(Number(first[i]) + Number(second[i]))

        }
    }

    let result = third.join(' - ')
    console.log(result);
}

// mergeArrays(['5', '15', '23', '56', '35'],
//     ['17', '22', '87', '36', '11']);

function arrayRotation(arr, rotations) {

    for (let i = 0; i < rotations; i++) {
        arr.push(arr.shift());
    }

    console.log(arr.join(' '));

}

// arrayRotation([1, 2, 3, 4], 1)

function maxNumbers(input) {

    let result = [];

    for (let i = 0; i < input.length; i++) {
        let current = input[i];
        let isTop = true;

        for (let j = i + 1; j < input.length; j++) {
            let rightNumber = input[j];

            if (current <= rightNumber) {
                isTop = false;
            }
        }

        if (isTop) {
            result.push(input[i])
        }
    }

    console.log(result.join(' '));

}

// maxNumbers([1,3,2,1,6,4,5,3,2,1]);

function equalSums(input) {
    if (input.length === 1) {
        console.log(0); // The left and right sum are equal to zero -> at index 0 there are equal sums
    } else if (input.length === 2) {
        console.log(`no`); // no such index
    } else {
        let sumLeft = 0;
        let sumRight = 0;

        let leftIndex = 0;

        let mainIndex = 0;

        let maxLength = input.length - 2; // mainIndex and the right or left sum ( mainIndex + 1 and right or left sum + 1)

        for (let i = 0; i < maxLength; i++) {

            sumLeft += input[leftIndex];

            mainIndex = leftIndex + 1;

            for (let j = mainIndex + 1; j < input.length; j++) {
                sumRight += input[j];
            }

            if (sumLeft === sumRight) {
                console.log(mainIndex);
                return;
            } else {
                leftIndex++;
                sumRight = 0;
            }

            if (leftIndex === maxLength) { // left index reached the max length before the mainIndex and right sum
                console.log(`no`);
                return;
            }
        }
    }
}

// equalSums([1]);

function maxSequence(sequence) {

    let max = 0;

    let currentMax = 0;

    let index = 0;

    for (let i = sequence.length; i >= 0; i--) {
        if (sequence[i] === sequence[i - 1]) {
            currentMax++;
        } else {
            currentMax++;
            if (max <= currentMax) {
                max = currentMax;
                index = i;
            }

            currentMax = 0;
        }
    }

    let longest = [];
    for (let i = index, j = 0; i < sequence.length; i++) {
        longest.push(sequence[i])
        j++;
        if (j === max) {
            break;
        }
    }
    console.log(longest.join(" "));
}

// maxSequence([4, 4, 4, 4]);

function magicSum(arr, number) {

    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] + arr[j] === number) {
                console.log(`${arr[i]} ${arr[j]}`)
            }
        }
    }

}

// magicSum([1, 2, 3, 4, 5, 6], 6)

function dungeonestDark(arr) {

    let health = 100;
    let coins = 0;
    let bestRoom = 1;

    let roomsInfo = arr.shift();
    let rooms = roomsInfo.split("|");

    for (let room of rooms) {
        let tokens = room.split(' ')
        let command = tokens[0];
        let num = Number(tokens[1]);

        if (command === 'potion') {
            let healthHealed = num;

            if (health + healthHealed > 100) {
                healthHealed = 100 - health;
            }

            health += healthHealed;

            console.log(`You healed for ${healthHealed} hp.`);
            console.log(`Current health: ${health} hp.`);
        } else if (command === "chest") {
            coins += num;
            console.log(`You found ${num} coins.`);
        } else {
            // Num is the monster attack
            let monster = command;
            let attack = num;
            health -= attack;

            if (health > 0) {
                console.log(`You slayed ${monster}.`);
            } else {
                console.log(`You died! Killed by ${monster}.`);
                console.log(`Best room: ${bestRoom}`);
                break;
            }
        }
        bestRoom++;
    }

    if (health > 0) {
        console.log(`You've made it!`);
        console.log(`Coins: ${coins}`);
        console.log(`Health: ${health}`);
    }
}

// dungeonestDark(["rat 10|bat 20|potion 10|rat 10|chest 100|boss 70|chest 1000"]);

function ladyBugOriginal(input) {

    let fieldSize = input[0];
    let output = new Array(fieldSize).fill(0);

    //Ladybugs initial positions
    let [...initialIndices] = input[1].split(" ");

    // convert each element from string to number
    initialIndices.forEach(function (element, index, arr) {
        arr[index] = Number(element);
    })

    //populate the output with the ladybugs initial positions
    for (let i = 0; i < output.length; i++) {
        if (initialIndices[i] !== undefined) {
            output[i] = initialIndices[i];
        }
    }

    //Command extraction
    let commands = [];
    for (let i = 2; i < input.length; i++) {
        commands.push(input[i]);
    }

    commands.forEach(function (element, index, arr) {
        arr[index] = element.split(" ");
    })

    let indexInitialPosition = 0;
    let move = -1; // default move left
    let fly = 0; // how many cells are we going to fly ladybugs?

    let ladybugLands = 0;

    commands.forEach(function (element, index) {
        if (index === 0) {
            indexInitialPosition = Number(element);
        }

        if (index === 1) {
            element === 'right' ? move = 1 : null;
        }

        if (index === 2) {
            fly = element;
        }

        //Where is going to land the ladybug ( to the left or to the right, that's the question )
        move === -1 ? ladybugLands = indexInitialPosition - fly : ladybugLands = indexInitialPosition + fly;

        for (let i = 0; i < output.length; i++) {

            //Is the current cell occupied?
            if (output[i] === 1) {

                // to do
            }
        }
    })

}

// Given field size | size 3 -> [-, -, -]
// No ladybug -> 0 | Ladybug -> 1
// Given initial ladybugs indices -> size 3, indices '0  2' -> [1, 0, 1]
// Commands -> `{ladybug index} {direction} {fly length}` -> `0 right 2`
// While ladybug lands on another -> continues in the same direction with the same length
// If out of field -> it's gone
// If no ladybug on given index -> nothing happens


function ladyBug(arr) {

    let fieldSize = arr[0];
    let ladybugIdxs = arr[1].split(" ").map(Number);

    let field = [];

    for (let i = 0; i < fieldSize; i++) {
        if (ladybugIdxs.includes(i)) {
            field[i] = 1;
        } else {
            field[i] = 0;
        }
    }

    for (let j = 2; j < arr.length; j++) {
        let command = arr[j];
        let tokens = command.split(" ");

        let ladybugIdx = Number(tokens[0]);
        let direction = tokens[1];
        let flyLength = Number(tokens[2]);

        if (!field[ladybugIdx]) {
            continue;
        }

        field[ladybugIdx] = 0;

        if (direction === 'left') {
            let newIdx = ladybugIdx - flyLength;

            if(newIdx >= 0) {
                while(field[newIdx] === 1){
                    newIdx -= flyLength;
                }

                if(newIdx >= 0){
                    field[newIdx] = 1;
                }
            }
        } else {
            let newIdx = ladybugIdx + flyLength;

            if(newIdx < field.length) {
                while(field[newIdx] === 1){
                    newIdx += flyLength;
                }

                if(newIdx < field.length){
                    field[newIdx] = 1;
                }
            }
        }

    }

    console.log(field.join(" "));

}

ladyBug([3, '0 1',
    '0 right 1',
    '2 right 1']);