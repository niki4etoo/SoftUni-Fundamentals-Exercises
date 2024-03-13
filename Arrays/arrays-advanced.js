function bombNumbers(sequence, bomb) {

    let [bombNumber, power] = bomb;

    let leftIdx = 0;
    let rightIdx = 0;

    let currentPosition = 0;

    while (sequence.includes(bombNumber)) {

        currentPosition = sequence.indexOf(bombNumber);

        // To the left detonation

        leftIdx = currentPosition - power;

        if (leftIdx < 0) {
            leftIdx = 0;
        }

        // To the right detonation

        rightIdx = currentPosition;

        if (rightIdx + power > sequence.length - 1) {
            rightIdx = sequence.length - 1;
        } else {
            rightIdx += power;
        }

        sequence.splice(leftIdx, rightIdx - leftIdx + 1);

        // Reset
        leftIdx = 0;
        rightIdx = 0;
    }

    let sum = 0;
    for (let num of sequence) {
        sum += num;
    }
    console.log(sum);
}

function bombNumbers2(arr, bomb) {

    let bombNumber = bomb[0];
    let bombPower = bomb[1];


    while (arr.includes(bombNumber)) {
        let bombIndex = arr.indexOf(bombNumber);

        let startIndex = Math.max(0, bombIndex - bombPower);
        let endIndex = Math.min(arr.length - 1, bombIndex + bombPower);

        arr.splice(startIndex, endIndex - startIndex + 1);
    }

    let sum = 0;

    for (let num1 of arr) {
        sum += num1;
    }

    console.log(sum);

}

// bombNumbers([1, 1, 2, 1, 1, 1, 2, 1, 1, 1],
//     [2, 1]);

function searchNumber(stack, needle) {
    let [elementsCount, deleteCount, searchingNumber] = needle;

    stack = stack.slice(0, elementsCount);
    stack.splice(0, deleteCount);

    let occurences = stack.filter((val) => { return val === searchingNumber });
    console.log(`Number ${searchingNumber} occurs ${occurences.length} times.`);
}

// searchNumber([1,2,3,4,5,6,5], [8, 1, 5]);

function arrayManipulator(stack, commands) {

    for (let command of commands) {
        command = command.split(' ');
        manipulations(command);
    }

    function manipulations(command) {

        let token = command.shift();

        switch (token) {
            case 'add':
                add(command.map(Number));
                break;
            case 'addMany':
                addMany(command.map(Number));
                break;
            case 'contains':
                contains(Number(command));
                break;
            case 'remove':
                remove(Number(command));
                break;
            case 'shift':
                shift(Number(command));
                break;
            case 'sumPairs':
                sumPairs();
                break;
            case 'print':
                print();
                break;
            default:
        }
    }

    function add(elements) {
        let [index, element] = elements;
        stack.splice(index, 0, element);
    }

    function addMany(elements){

        let index = elements.shift();

        for(let item of elements){
            stack.splice(index, 0, item);
            index++;
        }

    }

    function contains(element){
        console.log(stack.indexOf(element));
    }

    function remove(index){
        stack.splice(index, 1);
    }

    function shift(positions){
        for(let currRot = 1; currRot <= positions; currRot++){
            stack.push(stack.shift());
        }
    }

    function sumPairs(){
        let output = [];
        for(let i = 0; i < stack.length; i += 2){
            i + 1 > stack.length ? output.push(stack[i]) : output.push(stack[i] + stack[i + 1]);
        }
        stack = output;
    }

    function print(){
        console.log(`[ ${stack.join(', ')} ]`);
    }

}

function arrayManipulator2(nums, commands){
    for (let command of commands){
        let tokens = command.split(' ');
        let action = tokens.shift();

        if(action === 'add'){
            let idx = Number(tokens.shift());
            let element = Number(tokens.shift());

            nums.splice(idx, 0, element);
        } else if(action === 'addMany'){
            let idx = Number(tokens.shift());
            
            for(let item of tokens){
                nums.splice(idx, 0, Number(item));
                idx++;
            }

        } else if(action === 'contains'){
            console.log(nums.indexOf(Number(tokens.shift())));
        } else if(action === 'remove'){
            let idx = Number(tokens.shift());

            nums.splice(idx, 1);
        } else  if(action === 'shift') {
            let rotations = Number(tokens.shift());

            for(let currRotation = 1; currRotation <= rotations; currRotation++){
                nums.push(nums.shift());
            }
        } else if(action === 'sumPairs'){
            let pairs = [];
            for(let i = 0; i < nums.length; i += 2){
                if(i + 1 < nums.length){
                    pairs.push(nums[i] + nums[i + 1]);
                } else {
                    pairs.push(nums[i]);
                }
            }

            nums = pairs;
        } else if (action === 'print'){
            console.log(`[ ${nums.join(', ')} ]`);
        }
    }
}

arrayManipulator([1, 2, 3, 4, 5],
    ['addMany 5 9 8 7 6 5', 'contains 15', 'remove 3', 'shift 1', 'print']);