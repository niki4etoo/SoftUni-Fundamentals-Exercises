function employees(names) {

    let employee = {};
    let list = [];

    for (let name of names) {
        employee.name = name;
        employee.personalNumber = name.length;
        list.push(employee);
        employee = {};
    }

    for (let employee of list) {
        console.log(`Name: ${employee.name} -- Personal Number: ${employee.personalNumber}`);
    }
}

// employees([
//     'Samuel Jackson',
//     'Will Smith',
//     'Bruce Willis',
//     'Tom Holland'
//     ]);

function towns(cities) {
    let towns = [];

    for (let city of cities) {
        let [town, latitude, longitude] = city.split(' | ');
        towns.push({ town: town, latitude: Number(latitude).toFixed(2), longitude: Number(longitude).toFixed(2) });
    }

    for (let town of towns) {
        console.log(town);
    }
}

// towns(['Sofia | 42.696552 | 23.32601',
// 'Beijing | 39.913818 | 116.363625']);

function storeProvision(stock, products) {

    let output = {};
    for (let i = 0; i < stock.length - 1; i += 2) {
        output[stock[i]] = Number(stock[i + 1]);
    }

    for (let i = 0; i < products.length - 1; i += 2) {
        if (output.hasOwnProperty(products[i])) {
            output[products[i]] = output[products[i]] + Number(products[i + 1]);
        } else {
            output[products[i]] = Number(products[i + 1]);
        }
    }

    for (let out of Object.entries(output)) {
        console.log(`${out[0]} -> ${out[1]}`);
    }
}

// storeProvision([
//     'Chips', '5', 'CocaCola', '9', 'Bananas', '14', 'Pasta', '4', 'Beer', '2'
// ],
//     [
//         'Flour', '44', 'Oil', '12', 'Pasta', '7', 'Tomatoes', '70', 'Bananas', '30'
//     ]);

function movies(input) {

    let movies = [];
    let moviesJSON = [];

    for (let command of input) {
        command = command.split(' ');
        extract(command);
    }

    for (let movie of movies) {
        if (movie.hasOwnProperty('name') && movie.hasOwnProperty('director') && movie.hasOwnProperty('date')) {
            moviesJSON.push(JSON.stringify(movie));
        }
    }

    for (let movies of moviesJSON) {
        console.log(movies);
    }

    function extract(input) {

        if (input[0] === 'addMovie') {

            // Remove the command
            input.shift();

            let movie = input.join(' ');
            movies.push({ name: movie });
        }

        if (input.indexOf('directedBy') > 0) {

            let movie = [];
            let director = [];

            let pos = input.indexOf('directedBy');
            if (pos > 0) {
                for (let i = 0; i < pos; ++i) {
                    movie.push(input[i]);
                }

                for (let i = pos + 1; i < input.length; ++i) {
                    director.push(input[i]);
                }
            }

            movie = movie.join(' ');
            director = director.join(' ');

            for (let mov of movies) {
                if (mov.name === movie) {
                    mov.director = director;
                }
            }
        }

        if (input.indexOf('onDate') > 0) {

            let movie = [];
            let date = '';

            let pos = input.indexOf('onDate');

            for (let i = 0; i < pos; ++i) {
                movie.push(input[i]);
            }

            for (let i = pos + 1; i < input.length; ++i) {
                date = input[i];
            }

            movie = movie.join(' ');

            for (let mov of movies) {
                if (mov.name === movie) {
                    mov.date = date;
                }
            }
        }
    }

}

// movies([
//     'addMovie Fast and Furious',
//     'addMovie Godfather',
//     'Inception directedBy Christopher Nolan',
//     'Godfather directedBy Francis Ford Coppola',
//     'Godfather onDate 29.07.2018',
//     'Fast and Furious onDate 30.07.2018',
//     'Batman onDate 01.08.2018',
//     'Fast and Furious directedBy Rob Cohen'
//     ]);

function inventory(input) {

    let heroesInventory = [];

    for (let tokens of input) {
        let heroesInfo = tokens.split('/');
        heroesInfo[2] = heroesInfo[2].trim();
        heroesInventory.push({ Hero: heroesInfo[0], level: Number(heroesInfo[1]), items: heroesInfo[2] });
    }

    heroesInventory.sort(compareByLevel);

    for (let obj of heroesInventory) {
        for (let [key, value] of Object.entries(obj)) {
            if (key === 'Hero') {
                console.log(`${key}: ${value}`);
            } else {
                console.log(`${key} => ${value}`);
            }

        }
    }

    function compareByLevel(a, b) {
        return a.level - b.level;
    }
}

// inventory([
//     'Isacc / 25 / Apple, GravityGun',
//     'Derek / 12 / BarrelVest, DestructionSword',
//     'Hes / 1 / Desolator, Sentinel, Antara'
//     ]);

function makeDictionary(inputJSON) {

    let parsed = JSON.stringify(inputJSON);
    parsed = JSON.parse(parsed);

    let dictionary = [];

    for (let items of parsed) {
        items = items.replace(/"/g, "");
        items = items.substring(1, items.length - 1);
        let tokens = items.split(":");

        for (let i = 0; i < dictionary.length; ++i) {
            if (dictionary[i].Term === tokens[0]) {
                dictionary.splice(i, 1);
            }
        }

        dictionary.push({ Term: tokens[0], Definition: tokens[1] });

        dictionary.sort(function (a, b) {
            if (a.Term < b.Term) {
                return -1;
            } else if (a.Term > b.Term) {
                return 1;
            }
            return 0;
        })
    }

    for (let dict of dictionary) {
        console.log(`Term: ${dict.Term} => Definition: ${dict.Definition}`);
    }
}

// makeDictionary([
//     '{"Coffee":"A hot drink made from the roasted and ground seeds (coffee beans) of a tropical shrub."}',
//     '{"Bus":"A large motor vehicle carrying passengers by road, typically one serving the public on a fixed route and for a fare."}',
//     '{"Boiler":"A fuel-burning apparatus or container for heating water."}',
//     '{"Tape":"A narrow strip of material, typically used to hold or fasten something."}',
//     '{"Tape":"A narrow strip of material, typically used to hold or fasten something and welcome to Jamaika."}',
//     '{"Microphone":"An instrument for converting sound waves into electrical energy variations which may then be amplified, transmitted, or recorded."}'
//     ]);

class Vehicle {
    type = "";
    model = "";
    parts = {
        engine: 0,
        power: 0
    };
    fuel = 0;
    drive = function (loss) {
        return this.fuel -= loss;
    }

    constructor(type, model, parts, fuel) {
        parts.quality = parts.engine * parts.power;
        this.type = type;
        this.model = model;
        this.parts = parts;
        this.fuel = fuel;
    }
};

// let parts = {engine: 9, power: 500};
// let vehicle = new Vehicle('l', 'k', parts, 840);
// vehicle.drive(20);
// console.log(vehicle.fuel);

class Storage {

    capacity = 0;
    storage = [];

    totalCost = 0;

    addProduct(product) {
        this.capacity -= product.quantity;

        this.totalCost += (product.quantity * product.price);
        this.totalCost = this.totalCost.toFixed(1);
        this.totalCost = Number(this.totalCost);
        if (this.capacity > 0) {
            this.storage.push(product);
        }
    }

    getProducts() {
        let output = "";
        for (let product of this.storage) {
            output += JSON.stringify(product);
            output += "\n";
        }

        return output.trim();
    }

    constructor(capacity) {
        this.capacity = capacity;
    }

};

// let productOne = {name: 'Cucamber', price: 1.50, quantity: 15};
// let productTwo = {name: 'Tomato', price: 0.90, quantity: 25};
// let productThree = {name: 'Bread', price: 1.10, quantity: 8};
// let storage = new Storage(50);
// storage.addProduct(productOne);
// storage.addProduct(productTwo);
// storage.addProduct(productThree);
// console.log(storage.getProducts());
// console.log(storage.capacity);
// console.log(storage.totalCost);



function catalogue(input) {

    class Catalogue {

        sorted = [];
        unsorted = [];

        constructor(products) {

            this.extract(products);
            this.sorting();
            this.print();

        }

        extract(products) {
            let props = [];
            let price = 0;
            let name = "";

            for (let product of products) {
                props = product.split(':');
                name = props[0];
                price = Number(props[1]);
                this.unsorted.push({ name: name, price: price });
            }
        }

        sorting() {
            this.sorted = this.unsorted.sort((a, b) => {
                if (a.name < b.name) {
                    return -1;
                } else if (a.name > b.name) {
                    return 1;
                }
                return 0;
            });
        }

        print() {
            let letter = "";
            let firstTime = true;
            for (let product of this.sorted) {
                if (product.name[0] !== letter) {
                    firstTime = true;
                }

                letter = product.name[0];
                if (letter === product.name[0]) {
                    if (firstTime) {
                        console.log(letter);
                        firstTime = false;
                    }
                    console.log(`  ${product.name.trim()}: ${product.price}`);
                } else {
                    letter = product.name[0];
                    console.log(letter);
                    console.log(`  ${product.name.trim()}: ${product.price}`);
                }
            }
        }
    };

    new Catalogue(input);
}

catalogue([
    'Appricot : 20.4',
    'Fridge : 1500',
    'TV : 1499',
    'Deodorant : 10',
    'Boiler : 300',
    'Apple : 1.25',
    'Anti-Bug Spray : 15',
    'T-Shirt : 10'
]);