function revealWords(idle, stack) {
    let idles = idle.split(', ');

    for (let word of idles) {
        let starTemplate = '*'.repeat(word.length);
        stack = stack.replace(starTemplate, word);
    }

    console.log(stack);
}

// revealWords('great',
//     'softuni is ***** place for learning new programming languages');

function replaceRepeatingChars(str) {

    let output = '';

    for (let idx in str) {
        if (str[idx] != str[idx - 1]) {
            output += str[idx];
        }
    }

    console.log(output);
}

// replaceRepeatingChars('aaaaabbbbbcdddeeeedssaa');

function modernTimes(text) {

    let words = text.split(' ');
    let pattern = /\b[A-Za-z]+\b/;
    let hashtags = words.filter(word => word.startsWith('#') && word.length > 1 && pattern.test(word));


    for (let hashtag of hashtags) {
        console.log(hashtag.slice(1));
    }
}

// modernTimes('Nowadays everyone uses # to tag a #special word in #socialMedia #123asdf #asdf123');

function passwordGenerator(input) {

    let joined = input[0] + input[1];
    let replacement = input[2];
    let idx = 0;

    for (let letter of joined) {
        if (/[aeiou]/.test(letter)) {
            joined = joined.replace(letter, replacement[idx++].toUpperCase());
        }

        idx >= replacement.length ? idx = 0 : null;
    }

    console.log(`Your generated password is ${joined.split('').reverse().join('')}`);

}

// passwordGenerator([
//     'ilovepizza', 'ihatevegetables',
//     'orange'
// ]);



function extractFile(input) {

    let dotIndex = input.lastIndexOf('.');
    let slashes = input.lastIndexOf('\\');

    let filename = input.substring(slashes + 1, dotIndex);
    let extension = input.substring(dotIndex + 1, input.length);

    console.log(`File name: ${filename}`);
    console.log(`File extension: ${extension}`);

}

// extractFile('C:\\Internal\\training-internal\\Temp.late.pptx');
// extractFile('C:\\Internal\\training-internal\\LinkedList.cs');

function strSubstring(idle, stack) {
    stack = stack.toLowerCase();
    stack = stack.split(' ');
    idle = idle.toLowerCase();

    let isFound = false;

    for (let word of stack) {
        if (word == idle) {
            console.log(idle);
            isFound = true;
            break;
        }
    }

    if (!isFound) {
        console.log(`${idle} not found!`);
    }
}

// strSubstring('javascript',
// 'JavaScript is the best programming language');
// strSubstring('python',
// 'JavaScript is the best programming language');

function pascalCaseSplitter(input) {
    let output = "";

    for (let idx in input) {
        if (input[idx] == input[idx].toUpperCase()) {
            output += " ";
            output += input[idx];
        } else {
            output += input[idx];
        }
    }
    output = output.split(' ');
    output.shift()
    console.log(output.join(', '));
}

// pascalCaseSplitter('SplitMeIfYouCanHaHaYouCantOrYouCan');
// pascalCaseSplitter('HoldTheDoor');

function cutAndReverse(input) {
    console.log(input.substring(0, input.length / 2).split('').reverse().join(''));
    console.log(input.substring((input.length / 2), input.length).split('').reverse().join(''));
}

// cutAndReverse('tluciffiDsIsihTgnizamAoSsIsihT');

function hardWords(input) {

    let text = input[0];
    let words = input[1];


    let underscoreCounter = 0;

    for (let idx in text) {

        if (text[Number(idx)] == `_`) {
            underscoreCounter++;
        } else {
            if (underscoreCounter > 0) {
                let replaceWord = words.filter(element => element.length == underscoreCounter)[0];

                text = text.replace('_'.repeat(underscoreCounter), replaceWord);
            }
            underscoreCounter = 0;
        }
    }
    console.log(text);
}

// hardWords(['Hi, grandma! I\'m so ____ to write to you. ______ the winter vacation, so _______ things happened. My dad bought me a sled. Mom started a new job as a __________. My brother\'s ankle is ________, and now it bothers me even more. Every night Mom cooks ___ on your recipe because it is the most delicious. I hope this year Santa will _____ me a robot.',
// ['pie', 'bring', 'glad', 'During', 'amazing', 'pharmacist', 'sprained']]);

function lettersChangeNumbers(input) {

    let numbers = input.split(/\s+/);

    let firstLetterPosition = 0;
    let secondLetterPosition = 0;

    let firstLetterOperation = false;
    let secondLetterOperation = false;

    let sums = [];

    let currentSum = 0;

    for (let element of numbers) {

        //Check if first letter is capital/small 
        if (element[0] == element[0].toLowerCase()) { // small
            firstLetterPosition = element[0].charCodeAt(0) - 96; // 97 --- 122 [a-z] range
            firstLetterOperation = true; // multiply
        } else if (element[0] == element[0].toUpperCase()) { // capital
            firstLetterPosition = element[0].charCodeAt(0) - 64; // 65 --- 90 [A-Z] range
            firstLetterOperation = false; // divide
        }

        //Check if second letter is capital/small
        if (element[element.length - 1] == element[element.length - 1].toLowerCase()) { // small
            secondLetterPosition = element[element.length - 1].charCodeAt(0) - 96; // 97 --- 122 [a-z] range
            secondLetterOperation = true; //adding
        } else if (element[element.length - 1] == element[element.length - 1].toUpperCase()) { // capital
            secondLetterPosition = element[element.length - 1].charCodeAt(0) - 64; // 65 --- 90 [A-Z] range
            secondLetterOperation = false; //subtracting
        }

        element = element.split('');
        element.shift(); // remove first letter
        element.pop(); // remove second letter

        element = Number(element.join(''));

        if (firstLetterOperation) { // multiply
            currentSum = element * firstLetterPosition;
        } else { // divide
            currentSum = element / firstLetterPosition;
        }

        if (secondLetterOperation) { // adding
            currentSum += secondLetterPosition;
        } else { // subtracting
            currentSum -= secondLetterPosition;
        }

        sums.push(currentSum);
        currentSum = 0; // Reset
    }

    let output = sums.reduce((a, c) => a + c);
    console.log(output.toFixed(2));
}

lettersChangeNumbers('A12b s17G');
lettersChangeNumbers('P34562Z q2576f   H456z');
lettersChangeNumbers('a1A');