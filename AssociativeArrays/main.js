function wordTracker(input) {

    let trackingWordsArr = input.shift();
    trackingWordsArr = trackingWordsArr.split(' ');

    let trackingWords = {};

    for (let word of trackingWordsArr) {
        trackingWords[word] = 0;
    }

    for (let word of input) {
        if (word in trackingWords) {
            trackingWords[word]++;
        }
    }

    let entries = Object.entries(trackingWords).sort(compareByCount);

    function compareByCount(a, b) {
        return b[1] - a[1];
    }

    for (let [word, occurences] of entries) {
        console.log(`${word} - ${occurences}`);
    }

}

// wordTracker([
//     'is the', 
//     'first', 'sentence', 'Here', 'is', 'another', 'the', 'And', 'finally', 'the', 'the', 'sentence']);


function oddOccurences(input) {

    let occurences = input.toLowerCase().split(' ');

    let wordsCounter = new Map(); // The order of the keys matter

    for (let occ of occurences) {

        if (wordsCounter.has(occ)) {
            wordsCounter.set(occ, wordsCounter.get(occ) + 1);
        } else {
            wordsCounter.set(occ, 1);
        }

    }

    let output = [];

    for (let occ of wordsCounter) {
        occ[1] % 2 !== 0 ? output.push(occ[0]) : null;
    }

    console.log(output.join(' '));
}

// oddOccurences('Cake IS SWEET is
// Soft CAKE sweet Food');


// function piccolo(input) {

//     register = [];
//     parking = [];

//     for (let item of input) {
//         item = item.split(', ');

//         register.push({ direction: item[0], number: item[1] });
//     }

//     for (let reg of register) {
//         if (reg.direction === 'IN') {
//             parking.push(reg.number);
//         } else if (reg.direction === 'OUT') {

//             if (parking.includes(reg.number)) {
//                 parking.splice(parking.indexOf(reg.number), 1);
//             }
//         }
//     }

//     let numbers = [];

//     for (let reg of parking) {
//         numbers.push({ begin: reg.substr(0, 2), end: reg.substr(6, 2), number: Number(reg.substr(2, 4)) });
//     }

//     numbers.sort((a, b) => a.number - b.number);

//     parking = [];

//     for (let n of numbers) {
//         parking.push(n.begin + n.number + n.end);
//     }

//     if (parking.length > 0) {
//         for (let slot of parking) {
//             console.log(slot);
//         }
//     } else {
//         console.log(`Parking Lot is Empty`);
//     }
// }

// function piccolo(input) {

//     let parkingLot = [];

//     for (let i = 0; i < input.length; i++) {

//         let [direction, car] = input[i].split(', ')

//         switch (direction) {
//             case 'IN':
//                 parkingLot.push(car); break;

//             case 'OUT':
//                 let index = parkingLot.indexOf(car);
//                 parkingLot.splice(index, 1); break;
//         }
//     }

//     if (parkingLot.length === 0) {
//         console.log('Parking Lot is Empty');
//     } else {

//         let sortedParking = parkingLot.sort((a, b) => a[0].localeCompare(b[0]) || a[0] - b[0]);
//         sortedParking.map(car => {
//             console.log(car);
//         })

//     }
// }

function piccolo(input) {

    let parking = new Map();
    for (let slot of input) {
        let car = slot.split(', ');
        if (car[0] === 'IN') {
            parking.set(car[1], 1);
        } else if (car[0] === 'OUT') {
            if (parking.has(car[1])) {
                parking.delete(car[1]);
            }
        }
    }

    if (parking.size === 0) {
        console.log('Parking Lot is Empty');
    } else {
        let sortedArr = Array.from(parking.entries()).sort((a, b) => a[0].localeCompare(b[0]) || a[0] - b[0]);
        for (let registration of sortedArr) {
            console.log(registration[0]);
        }
    }
}

// piccolo(['IN, CA2844AA',
//     'IN, CA1234TA',
//     'OUT, CA2844AA',
//     'IN, CA9999TT',
//     'IN, CA2866HI',
//     'OUT, CA1234TA',
//     'IN, CA2844AA',
//     'OUT, CA2866HI',
//     'IN, CA9876HH',
//     'IN, CA2822UU']);

// piccolo(['IN, CA2844AA',
//     'IN, CA1234TA',
//     'OUT, CA2844AA',
//     'OUT, CA1234TA']);

// piccolo(['IN, CA2844AA',
//     'IN, CA1234TA',
//     'OUT, CA2844AA',
//     'IN, CA9999TT',
//     'IN, CA2866HI',
//     'OUT, CA1234TA',
//     'IN, CA2844AA',
//     'OUT, CA2866HI',
//     'IN, CA9876HH',
//     'IN, CA2822UU']);

// piccolo(['IN, CA2844AA',
// 'IN, CA1234TA',
// 'OUT, CA2844AA',
// 'OUT, CA1234TA']);

function partyTime(input) {

    let reserveList = input.slice(0, input.indexOf('PARTY'));

    let vip = [];
    let regular = [];

    for (let guest of reserveList) {

        if (!isNaN(Number(guest[0]))) {
            vip.push(guest);
        } else {
            regular.push(guest);
        }
    }

    reserveList = []; // Reset
    reserveList.push(vip);
    reserveList.push(regular);

    reserveList = reserveList.flat(); // [ ['7IK9Yo0h', '9NoBUajQ' ], [ 'Ce8vwPmE', 'SVQXQCbc', 'tSzE5t0p' ] ] transforms to [ '7IK9Yo0h', '9NoBUajQ', 'Ce8vwPmE', 'SVQXQCbc', 'tSzE5t0p' ]

    let guests = input.slice(input.indexOf('PARTY') + 1, input.length);

    for (let guest of guests) {
        if (reserveList.includes(guest)) {
            reserveList.splice(reserveList.indexOf(guest), 1);
        }
    }

    console.log(reserveList.length);
    for (let guest of reserveList) {
        console.log(guest);
    }
}

function partyTimeModified(input) {
    // let vipList = {};
    // let regularList = {};

    let vipList = [];
    let regularList = [];

    let guestNumber = input.shift();

    while (guestNumber !== 'PARTY') {
        let isVip = !isNaN(guestNumber[0])
        if (isVip) {
            // vipList[guestNumber] = 1
            vipList.push(guestNumber)
        } else {
            // regularList[guestNumber] = 1
            regularList.push(guestNumber)
        }
        guestNumber = input.shift()
    }

    for (let comingGuest of input) {
        // if (vipList.hasOwnProperty(comingGuest)) {
        //     vipList[comingGuest]++
        // } else if (regularList.hasOwnProperty(comingGuest)) {
        //     regularList[comingGuest]++
        // }

        if (vipList.includes(comingGuest)) {
            vipList.splice(vipList.indexOf(comingGuest), 1)
        } else if (regularList.includes(comingGuest)) {
            regularList.splice(regularList.indexOf(comingGuest), 1)
        }
    }

    // let filteredVipList = Object.entries(vipList).filter(([number, count]) => {
    //     if (count === 1) {
    //         return number;
    //     }
    // }).map(el => el[0]);

    // let filteredRegularList = Object.entries(regularList).filter(([number, count]) => {
    //     if (count === 1) {
    //         return number;
    //     }
    // }).map(el => el[0]);

    // console.log(filteredRegularList.length + filteredVipList.length);

    console.log(regularList.length + vipList.length);

    // console.log(filteredVipList.join('\n'));
    // console.log(filteredRegularList.join('\n'));

    console.log(vipList.join('\n'));
    console.log(regularList.join('\n'));
}

// partyTime(['7IK9Yo0h',
//     '9NoBUajQ',
//     'Ce8vwPmE',
//     'SVQXQCbc',
//     'tSzE5t0p',
//     'PARTY',
//     '9NoBUajQ',
//     'Ce8vwPmE',
//     'SVQXQCbc'
// ]);

// partyTime(['m8rfQBvl',
//     'fc1oZCE0',
//     'UgffRkOn',
//     '7ugX7bm0',
//     '9CQBGUeJ',
//     '2FQZT3uC',
//     'dziNz78I',
//     'mdSGyQCJ',
//     'LjcVpmDL',
//     'fPXNHpm1',
//     'HTTbwRmM',
//     'B5yTkMQi',
//     '8N0FThqG',
//     'xys2FYzn',
//     'MDzcM9ZK',
//     'PARTY',
//     '2FQZT3uC',
//     'dziNz78I',
//     'mdSGyQCJ',
//     'LjcVpmDL',
//     'fPXNHpm1',
//     'HTTbwRmM',
//     'B5yTkMQi',
//     '8N0FThqG',
//     'm8rfQBvl',
//     'fc1oZCE0',
//     'UgffRkOn',
//     '7ugX7bm0',
//     '9CQBGUeJ'
// ]);

function cardGame(input) {

    let personInfo = {
        name: "",
        deck: new Set()
    };

    let players = [];
    let isAlreadyAPlayer = false;

    for (let str of input) {

        let [name, deck] = str.split(': ');

        personInfo.name = name;
        personInfo.deck = new Set(deck.split(', ')); // We need a set, because the cards must be unique

        if (players.length > 0) {
            for (let player of players) {
                if (personInfo.name === player.name) { // The player is already in the players

                    for (let card of personInfo.deck) {
                        player.deck.add(card);
                    }
                    isAlreadyAPlayer = true;
                }
            }

            if (!isAlreadyAPlayer) { // New player
                players.push(personInfo);
                isAlreadyAPlayer = false;
            }
        } else {
            players.push(personInfo); // First player in players
        }
        personInfo = {}; // Reset
    }

    // Points
    let power = {
        "1": 1,
        "2": 2,
        "3": 3,
        "4": 4,
        "5": 5,
        "6": 6,
        "7": 7,
        "8": 8,
        "9": 9,
        "10": 10,
        "J": 11,
        "Q": 12,
        "K": 13,
        "A": 14,
    };

    let type = {
        "S": 4,
        "H": 3,
        "D": 2,
        "C": 1
    };


    for (let player of players) {
        let sum = 0;
        for (let card of player.deck) {
            if (card.length === 3) { // because of the 10 
                sum += power[card[0] + card[1]] * type[card[2]];
            } else {
                sum += power[card[0]] * type[card[1]];
            }
        }
        console.log(`${player.name}: ${sum}`);
    }
}

cardGame([
    'John: 2C, 4H, 9H, AS, QS',
    'Slav: 3H, 10S, JC, KD, 5S, 10S',
    'Alex: 6H, 7S, KC, KD, 5S, 10C',
    'Thomas: QH, QC, JS, JD, JC',
    'Slav: 6H, 7S, KC, KD, 5S, 10C',
    'Thomas: QH, QC, JS, JD, JC',
    'Alex: 6H, 7S, KC, KD, 5S, 10C',
    'Thomas: QH, QC, JS, JD, JC',
    'John: JD, JD, JD, JD'
    ]);

function minorTask(input) {

    let resources = {};

    for (let i = 0; i < input.length; i += 2) {
        if (resources.hasOwnProperty(input[i])) {
            resources[input[i]] += Number(input[i + 1]);
        } else {
            resources[input[i]] = Number(input[i + 1]);
        }
    }

    for (let res in resources) {
        console.log(`${res} -> ${resources[res]}`);
    }

}

// minorTask([
//     'gold',
//     '155',
//     'silver',
//     '10',
//     'copper',
//     '17',
//     'gold',
//     '15'
//     ]
//     );



function companyUsers(input) {

    let companiesEmployees = {};

    for (let command of input) {
        let [company, id] = command.split(' -> ');

        if (company in companiesEmployees) {
            if (!companiesEmployees[company].includes(id)) {
                companiesEmployees[company].push(id);
            }
        } else {
            companiesEmployees[company] = [id];
        }
    }

    let entries = Object.entries(companiesEmployees).sort((a, b) => a[0].localeCompare(b[0]));

    for (let [company, employeeIds] of entries) {
        console.log(company);

        for (let id of employeeIds) {
            console.log(`-- ${id}`);
        }
    }

}

// companyUsers([
//     'SoftUni -> AA12345',
//     'SoftUni -> BB12345',
//     'Microsoft -> CC12345',
//     'HP -> BB12345'
// ]);

function legendaryFarming(str) {

    let arr = str.split(' ');

    let keyMaterialsQtys = {
        shards: 0,
        fragments: 0,
        motes: 0
    };

    let junkMaterialsQtys = {};

    let legendaries = { shards: 'Shadowmourne', fragments: 'Valanyr', motes: 'Dragonwrath' };

    for (let i = 0; i < arr.length; i += 2) {
        let qty = Number(arr[i]);
        let material = arr[i + 1].toLowerCase();

        if (material in keyMaterialsQtys) {
            keyMaterialsQtys[material] += qty;

            if (keyMaterialsQtys[material] >= 250) {
                let legendary = legendaries[material];
                console.log(`${legendary} obtained!`);
                keyMaterialsQtys[material] -= 250;
                break;
            }
        } else {
            if (material in junkMaterialsQtys) {
                junkMaterialsQtys[material] += qty;
            } else {
                junkMaterialsQtys[material] = qty;
            }
        }
    }

    let keyMaterialsEntries = Object.entries(keyMaterialsQtys).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
    let junkMaterialsEntries = Object.entries(junkMaterialsQtys).sort((a, b) => a[0].localeCompare(b[0]));

    for (let [keyMaterial, qty] of keyMaterialsEntries) {
        console.log(`${keyMaterial}: ${qty}`);
    }

    for (let [junkMaterial, qty] of junkMaterialsEntries) {
        console.log(`${junkMaterial}: ${qty}`);
    }
}

// legendaryFarming('3 Motes 5 stones 5 Shards 6 leathers 255 fragments 7 Shards');

// function maxNumber(numbers)
// {
//     let x = numbers.toSorted()
//     let newNum = x.slice(x.length - 3)
//     console.log(newNum.toReversed());
// }
// maxNumber([7, 1, 4, 3, 2])

function travelTime(input) {

    let destinations = [];
    let isCountryAlreadyIn = false;
    let isCityAlreadIn = false;

    for (let destination of input) {

        let [country, city, price] = destination.split(' > ');

        isCountryAlreadyIn = false;
        for (let dest of destinations) {

            //Country checker
            if (dest.country === country) {

                //City checker
                isCityAlreadIn = false;
                for (let cities of dest.cities) {
                    if (cities.city === city) {

                        if (cities.price > Number(price)) { // Getting smaller price of the same city
                            cities.price = Number(price);
                        }
                        isCityAlreadIn = true;
                    }
                }

                if (!isCityAlreadIn) {
                    dest.cities.push({ city, price: Number(price) });
                    isCityAlreadIn = false;
                }

                isCountryAlreadyIn = true;
            }
        }

        if (!isCountryAlreadyIn) {
            destinations.push({ country, cities: [{ city, price: Number(price) }] });
        }
    }

    destinations.sort(compareByNames);

    function compareByNames(a, b) {
        return (a.country).localeCompare(b.country);
    }

    function compareByPrice(a, b) {
        return a.price - b.price;
    }

    for (let destination of destinations) {
        destination.cities.sort(compareByPrice);
    }

    let destination = "";

    for (let dest of destinations) {
        destination = dest.country + " -> "
        for (let cities of dest.cities) {
            destination += cities.city + " -> " + cities.price;
            destination += " ";
        }
        console.log(destination);
        destination = ""; // Reset
    }
}

// travelTime([
//     "Bulgaria > Sofia > 500",
//     "Bulgaria > Sopot > 800",
//     "France > Paris > 2000",
//     "Albania > Tirana > 1000",
//     "Bulgaria > Sofia > 200"
// ]);

// travelTime([
//     'Bulgaria > Sofia > 25000',
//     'Bulgaria > Sofia > 25000',
//     'Kalimdor > Orgrimar > 25000',
//     'Albania > Tirana > 25000',
//     'Bulgaria > Varna > 25010',
//     'Bulgaria > Lukovit > 10'
// ]);


function arenaTier(input) {

    let gladiatorsPool = [];
    let isTotalsReceived = false; // flag for getting total skills for each gladiators ( once )

    while (input.length > 0) {

        let line = input.shift();

        if (line === 'Ave Cesar') {

            //Getting totals before the imperia fall
            getTotals();
            break; // The imperia has fallen
        }

        if (line.includes('->')) {

            let [name, technique, skill] = line.split(' -> ');
            skill = Number(skill);

            gladiators(name, technique, skill);

        } else if (line.includes('vs')) {

            if (!isTotalsReceived) {
                getTotals();
                isTotalsReceived = true;
            }

            let [firstGladiator, secondGladiator] = line.split(' vs ');

            fight(firstGladiator, secondGladiator);

        }

    }

    // Ordering by total skill in Descending
    gladiatorsPool.sort((a, b) => {
        return b.totalSkill - a.totalSkill;
    });

    // Ordering by technique name in Ascending
    for (let gladiator of gladiatorsPool) {
        gladiator.skillSet.sort((a, b) => {
            return b.skill - a.skill || a.technique.localeCompare(b.technique);
        })
    }

    // Print 
    for (let gladiator of gladiatorsPool) {
        console.log(`${gladiator.name}: ${gladiator.totalSkill} skill`);
        for (let skillset of gladiator.skillSet) {
            console.log(`- ${skillset.technique} <!> ${skillset.skill}`);
        }

    }

    function gladiators(name, technique, skill) {
        if (gladiatorsPool.length > 0) {

            let isNewGladiator = true;

            for (let gladiator of gladiatorsPool) {

                // Check is the gladiator already in the pool
                if (gladiator.name.localeCompare(name) === 0) {

                    // Check is the new skill points are bigger than the previous one from the gladiator's skill set
                    isNewGladiator = false;
                    let isBiggerSkill = false;
                    let isTheSameTechnique = false;

                    for (let skillSet of gladiator.skillSet) {
                        if (technique.localeCompare(skillSet.technique) === 0) { // Same technique
                            isTheSameTechnique = true;
                            if (skill >= skillSet.skill) {
                                skillSet.skill = skill; // Just updating the skill points
                                break;
                            }
                        }

                    }

                    if (!isTheSameTechnique) {
                        gladiator.skillSet.push({ technique: technique, skill: skill });
                    }

                }
            }

            // There is new gladiator, in the imperia
            if (isNewGladiator) {
                gladiatorsPool.push({ name, skillSet: [{ technique: technique, skill: skill }] });
            }

        } else {
            gladiatorsPool.push({ name, skillSet: [{ technique: technique, skill: skill }] });
        }
    }

    function fight(firstGladiator, secondGladiator) {

        let isFirstFound = false;
        let isSecondFound = false;

        for (let gladiator of gladiatorsPool) {

            if (gladiator.name === firstGladiator) {
                firstGladiator = gladiator;
                isFirstFound = true;
            } else {
                if (gladiator.name === secondGladiator) {
                    secondGladiator = gladiator;
                    isSecondFound = true;
                }
            }

            if (isFirstFound && isSecondFound) {

                // Checking techniques
                let firstTechniques = firstGladiator.skillSet;
                let secondTechniques = secondGladiator.skillSet;

                let isFightEnd = false;

                for (let fTechnique of firstTechniques) {

                    for (let sTechnique of secondTechniques) {

                        if (fTechnique.technique.localeCompare(sTechnique.technique) === 0) { // There is a fight

                            if (firstGladiator.totalSkill > secondGladiator.totalSkill) {
                                gladiatorsPool.splice(gladiatorsPool.indexOf(secondGladiator), 1); // The second was soft
                            } else {
                                gladiatorsPool.splice(gladiatorsPool.indexOf(firstGladiator), 1); // The first was soft
                            }

                            //The fight ends here
                            isFightEnd = true;
                            break;

                        }

                    }

                    if (isFightEnd) break;
                }
                break;
            }
        }

    }

    function getTotals() {
        // Get total for each gladiator
        for (let gladiator of gladiatorsPool) {

            let total = 0;
            for (let skillSet of gladiator.skillSet) {
                total += skillSet.skill;
            }

            gladiator.totalSkill = total;
        }
    }

}

// arenaTier([
//     'Peter -> BattleCry -> 400',
//     'Alex -> PowerPunch -> 300',
//     'Stefan -> Duck -> 200',
//     'Stefan -> Tiger -> 250',
//     'Ave Cesar'
// ]);

// console.log(``);

// arenaTier([
//     'Peter -> Duck -> 400',
//     'Julius -> Shield -> 150',
//     'Gladius -> Heal -> 200',
//     'Gladius -> Support -> 250',
//     'Gladius -> Shield -> 250',
//     'Peter vs Gladius',
//     'Gladius vs Julius',
//     'Gladius vs Maximilian',
//     'Ave Cesar'
// ]);

// console.log('');

// arenaTier([
//     'Peter -> Skill1 -> 100',
//     'Peter -> Skill2 -> 150',
//     'Peter -> Skill3 -> 200',
//     'Julius -> Skill1 -> 200',
//     'Julius -> Skill2 -> 150',
//     'Julius -> Skill3 -> 100',
//     'Gladius -> Skill1 -> 100',
//     'Gladius -> Skill2 -> 150',
//     'Gladius -> Skill3 -> 200',
//     'Ave Cesar'
// ]);
