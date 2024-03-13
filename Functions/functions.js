function smallestOfThreeNumbers(first, second, third) {

    const smaller = (first, second) => {
        return first > second ? second : first;
    }

    console.log(smaller(smaller(first, second), third));
}

// smallestOfThreeNumbers(1,5,3);

function addSubtract(first, second, third) {

    function add(first, second) {
        return first + second;
    }

    function subtract(first, second) {
        return first - second;
    }

    console.log(subtract(add(first, second), third));

}

function charsInRange(first, second) {

    const output = (input) => {
        return input.join(" ")
    }

    const range = (first, second) => {

        let output = [];

        if (first.charCodeAt(0) > second.charCodeAt(0)) {
            for (let i = second.charCodeAt(0) + 1; i < first.charCodeAt(0); i++) {
                output.push(String.fromCharCode(i));
            }
        } else {
            for (let i = first.charCodeAt(0) + 1; i < second.charCodeAt(0); i++) {
                output.push(String.fromCharCode(i));
            }
        }



        return output;
    }
    console.log(output(range(first, second)));
}

// charsInRange('#',
// ':');

function sumOfEvenAndOdd(input) {

    let numbersArr = (input) => {
        return input.toString().split("").map(Number);
    }


    let numbers = numbersArr(input);
    let even = 0;
    let odd = 0;

    for (let number of numbers) {
        number % 2 === 0 ? even += number : odd += number;
    }

    console.log(`Odd sum = ${odd}, Even sum = ${even}`);
}

// sumOfEvenAndOdd(3495892137259234);

function palindromeNumbers(input) {

    let stringNumbers = input.map((elem) => { return elem.toString() });
    let isPalindrome = false;
    for (let elem of stringNumbers) {
        for (let i = 0; i <= elem.length / 2; i++) {
            if (elem[i] === elem[elem.length - (i + 1)]) {
                isPalindrome = true;
            } else {
                isPalindrome = false;
                break;
            }
        }
        console.log(isPalindrome);
    }
}

// palindromeNumbers([32, 2, 232, 1010]);

function passwordValidator(password) {

    // Messages
    let passwordRangeMsg = "Password must be between 6 and 10 characters";
    let passwordLettersAndDigitsOnlyMsg = "Password must consist only of letters and digits";
    let passwordAtLeastTwoDigitsMsg = "Password must have at least 2 digits";
    let passwordValid = "Password is valid";

    let isValid = false;

    if (password.length >= 6 && password.length <= 10) {
        isValid = true;
    } else {
        console.log(passwordRangeMsg);
        isValid = false;
    }

    if (/^[a-zA-Z0-9]+$/.test(password)) {
        isValid ? isValid = true : null;
    } else {
        console.log(passwordLettersAndDigitsOnlyMsg);
        isValid = false;
    }

    if (/^(?=.*\d.*\d).*/.test(password)) {
        isValid ? isValid = true : null;
    } else {
        console.log(passwordAtLeastTwoDigitsMsg);
        isValid = false;
    }

    if (isValid) {
        console.log(passwordValid);
    }
}

// passwordValidator('testa1');

function nxn(input) {
    let line = [];
    for (let i = 1; i <= input; i++) {
        for (let j = 1; j <= input; j++) {
            line.push(input);
        }
        console.log(line.join(' '));
        line = [];
    }
}

// nxn(5);

function perfectNumber(input) {
    let perfect = "We have a perfect number!";
    let nonPerfect = "It's not so perfect.";

    let isPerfect = false;

    let divisors = [];
    let sum = 0;

    for (let i = 0; i < input; i++) {
        if (input % i === 0) {
            divisors.push(i);
        }
    }

    sum = divisors.reduce((acc, current) => {
        return acc + current;
    });

    if (sum === input) {
        console.log(perfect);
    } else {
        console.log(nonPerfect);
    }
}

// perfectNumber(6);

function loadingBar(input) {
    let progress = (input / 10);
    let bar = Array.from({ length: 10 }, (_, index) => (index < progress) ? "%" : ".");

    if (input === 100) {
        console.log(`100% Complete!`);
        console.log(`[${bar.join('')}]`);
    } else {
        console.log(`${progress * 10}% [${bar.join('')}]`);
        console.log('Still loading...');
    }
}

// loadingBar(20);

function factorialDivision(first, second) {

    function factorial(number) {
        if (number === 0 || number === 1) {
            return 1;
        } else {
            return factorial(number - 1) * number;
        }
    }

    let sumFirst = factorial(first);
    let sumSecond = factorial(second);

    let division = sumFirst / sumSecond;
    console.log(division.toFixed(2));

}

// factorialDivision(6, 2);

function carWash(input) {

    let value = 0;

    function washing(command) {
        switch (command) {
            case 'soap':
                value += 10;
                break;
            case 'water':
                value += (value * 0.2);
                break;
            case 'vacuum cleaner':
                value += (value * 0.25);
                break;
            case 'mud':
                value -= (value * 0.1);
                break;
            default:
        }
    }

    for (let command of input) {
        washing(command);
    }

    console.log(`The car is ${value.toFixed(2)}% clean.`);
}

// carWash(["soap", "water", "mud", "mud", "water", "mud", "vacuum cleaner"]);

function numberModification(number) {

    let numbers = number.toString().split("").map(Number);
    let average = 0;
    let sum = 0;

    for (let i = 0; i, numbers.length; i++) {
        sum = numbers.reduce((acc, currentVal) => acc + currentVal);

        average = sum / numbers.length;

        if (average > 5) {
            break;
        } else {
            numbers.push(9);
        }
    }

    console.log(Number(numbers.join('')));
}

// numberModification(101);

function pointsValidation(input) {
    let [x1, y1, x2, y2] = input;

    let firstDistance = Math.sqrt((-x1) ** 2 + (-y1) ** 2);
    let secondDistance = Math.sqrt((-x2) ** 2 + (-y2) ** 2);
    let thirdDistance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

    // Messages
    let firstDistValidMsg = `{${x1}, ${y1}} to {0, 0} is valid`;
    let firstDistInvalidMsg = `{${x1}, ${y1}} to {0, 0} is invalid`;

    let secondDistValidMsg = `{${x2}, ${y2}} to {0, 0} is valid`;
    let secondDistInvalidMsg = `{${x2}, ${y2}} to {0, 0} is invalid`;

    let thirdDistValidMsg = `{${x1}, ${y1}} to {${x2}, ${y2}} is valid`;
    let thirdDistInvalidMsg = `{${x1}, ${y1}} to {${x2}, ${y2}} is invalid`;

    if (firstDistance % 1 === 0) {
        console.log(firstDistValidMsg);
    } else {
        console.log(firstDistInvalidMsg);
    }

    if (secondDistance % 1 === 0) {
        console.log(secondDistValidMsg);
    } else {
        console.log(secondDistInvalidMsg);
    }

    if (thirdDistance % 1 === 0) {
        console.log(thirdDistValidMsg);
    } else {
        console.log(thirdDistInvalidMsg);
    }

}

// pointsValidation([2, 1, 1, 1]);

function radioCrystals(input) {
 
    for (let i = 1; i < input.length; i++) {
        let targetThickness = input[0];
        let startThickness = input[i];
        let currentThickness = startThickness;
 
        let cutCounter = 0;
        let lapCounter = 0;
        let grindCounter = 0;
        let etchCounter = 0;
 
        console.log(`Processing chunk ${startThickness} microns`);
 
        currentThickness = Math.floor(testCut(targetThickness, currentThickness));
        currentThickness = Math.floor(testLap(targetThickness, currentThickness));
        currentThickness = Math.floor(testGrind(targetThickness, currentThickness));
        currentThickness = Math.floor(testEtch(targetThickness, currentThickness));
 
        if (currentThickness < targetThickness) {
            currentThickness += 1;
            console.log(`X-ray x1`);
        }
 
        console.log(`Finished crystal ${currentThickness} microns`);
 
 
 
 
        function testCut(target, current) {
 
            let currentNum = current;
 
 
            while (currentNum / 4 >= target) {
                currentNum /= 4;
                cutCounter++;
            }
 
            if (cutCounter > 0) {
                console.log(`Cut x${cutCounter}`);
                console.log(`Transporting and washing`);
            }
 
            return currentNum;
        }
 
        function testLap(target, current) {
 
            let currentNum = current;
 
            while (currentNum - (currentNum * 0.2) >= target) {
                currentNum *= 0.8;
                lapCounter++;
            }
 
 
            if (lapCounter > 0) {
                console.log(`Lap x${lapCounter}`);
                console.log(`Transporting and washing`);
            }
 
            return currentNum;
        }
 
        function testGrind(target, current) {
 
            let currentNum = current;
 
 
            while (currentNum - 20 >= target) {
                currentNum -= 20;
                grindCounter++;
            }
 
            if (grindCounter > 0) {
                console.log(`Grind x${grindCounter}`);
                console.log(`Transporting and washing`);
            }
 
            return currentNum;
 
        }
 
        function testEtch(target, current) {
 
            let currentNum = current;
 
 
            while (currentNum - 2 >= target - 1) {
                currentNum -= 2;
                etchCounter++;
            }
 
            if (etchCounter > 0) {
                console.log(`Etch x${etchCounter}`);
                console.log(`Transporting and washing`);
            }
 
            return currentNum;
 
        }
    }
}

function radioVeronika(input) {

    let desiredThickness = input.shift();

    for (let chunk of input) {
        mainProcess(desiredThickness, chunk);
    }

    function mainProcess(desiredThickness, chunk) {

        // Proccessing current chunk
        console.log(`Processing chunk ${chunk} microns`);

        chunk = cutting(desiredThickness, chunk);
        chunk = transportingAndWashing(chunk);

        if (chunk === desiredThickness) {
            console.log(`Finished crystal ${chunk} microns`);
            return;
        }

        chunk = lapping(desiredThickness, chunk);
        chunk = transportingAndWashing(chunk);

        if (chunk === desiredThickness) {
            console.log(`Finished crystal ${chunk} microns`);
            return;
        }

        chunk = grinding(desiredThickness, chunk);
        chunk = transportingAndWashing(chunk);

        if (chunk === desiredThickness) {
            console.log(`Finished crystal ${chunk} microns`);
            return;
        }

        chunk = etch(desiredThickness, chunk);
        chunk = transportingAndWashing(chunk);

        if (chunk === desiredThickness) {
            console.log(`Finished crystal ${chunk} microns`);
            return;
        }

        chunk = xray(chunk);

        if (chunk === desiredThickness) {
            console.log(`Finished crystal ${chunk} microns`);
            return;
        }
    }

    
    let once = true; // Xray using it only once

    function cutting(desiredThickness, chunk) {
        let cutCounter = 0;
        while (chunk >= desiredThickness) {
            if (chunk / 4 >= desiredThickness) {
                chunk = chunk / 4;
                cutCounter++;
            } else {
                console.log(`Cut x${cutCounter}`);
                return chunk;
            }
        }
    }

    function lapping(desiredThickness, chunk) {
        let lapCounter = 0;
        while (chunk >= desiredThickness) {
            if (chunk - chunk * 0.2 >= desiredThickness) {
                lapCounter++;
                chunk *= 0.8;
            } else {
                console.log(`Lap x${lapCounter}`);
                return chunk;
            }
        }
    }

    function grinding(desiredThickness, chunk) {
        let grindCounter = 0;
        while (chunk >= desiredThickness) {
            if (chunk - 20 >= desiredThickness) {
                grindCounter++;
                chunk -= 20;
            } else {
                console.log(`Grind x${grindCounter}`);
                return chunk;
            }
        }
    }

    function etch(desiredThickness, chunk) {
        let etchCounter = 0;
        while (chunk >= desiredThickness) {
            if (chunk - 2 >= desiredThickness) {
                etchCounter++;
                chunk -= 2;
            } else {
                if (chunk - 2 + 1 === desiredThickness) {
                    etchCounter++;
                    chunk -= 2;
                }
                console.log(`Etch x${etchCounter}`);
                return chunk;
            }
        }
    }

    function xray(chunk) {
        if (once) {
            once = false;
            console.log(`X-ray x1`);
            return ++chunk;
        }
    }

    function transportingAndWashing(chunk) {
        console.log(`Transporting and washing`);
        return Math.floor(chunk);
    }
}

radioVeronika([1000, 4000, 8100]);

function printDNA(n) {

    let dna = 'ATCGTTAGGG';
    dna = dna.split('');

    let firstBase = '';
    let secondBase = '';

    function first(n) {
        if (n === 0) {
            return;
        } else {

            firstBase = dna.shift();
            secondBase = dna.shift();
            console.log(`**${firstBase}${secondBase}**`);
            dna.push(firstBase);
            dna.push(secondBase);

            flag = true;
            return second(n - 1, flag);
        }
    }

    function second(n, flag) {
        if (n === 0) {
            return;
        } else {

            firstBase = dna.shift();
            secondBase = dna.shift();
            console.log(`*${firstBase}--${secondBase}*`);
            dna.push(firstBase);
            dna.push(secondBase);

            if (flag) {
                return third(n - 1);
            } else {
                return first(n - 1);
            }
        }
    }

    function third(n) {
        if (n === 0) {
            return;
        } else {
            firstBase = dna.shift();
            secondBase = dna.shift();
            console.log(`${firstBase}----${secondBase}`);
            dna.push(firstBase);
            dna.push(secondBase);
            flag = false;
            return second(n - 1, flag);
        }
    }

    first(n);
}

//printDNA(9);



