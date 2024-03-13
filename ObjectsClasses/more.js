class Laptop {

    info = {
        producer: "",
        age: 0,
        brand: ""
    };
    quality = 0;
    isOn = false;

    turnOn = function () {
        this.quality--;
        this.isOn = true;
    }
    turnOff = function () {
        this.quality--;
        this.isOn = false;
    }

    showInfo = function () {
        return JSON.stringify(this.info);
    }

    get price() {
        return (800 - (this.info.age * 2) + (this.quality * 0.5));
    }

    constructor(info, quality) {
        this.info = info;
        this.quality = quality;
    }
};

// let info = {producer: "Lenovo", age: 1, brand: "Legion"}
// let laptop = new Laptop(info, 10)
// laptop.turnOn()
// console.log(laptop.showInfo())
// laptop.turnOff()
// laptop.turnOn()
// laptop.turnOff()
// console.log(laptop.isOn);

function flight(input) {
    let flightSectors = input.shift();
    let flightStatuses = input.shift();
    let statusDesired = input.shift().toString();

    let flights = [];

    for (let flightSector of flightSectors) {
        flightSector = flightSector.split(' ');
        let sector = flightSector.shift();
        let destination = flightSector.join(' ');

        flights.push({ sector: sector, destination: destination, status: 'Ready to fly' });
    }

    for (let sectorStatus of flightStatuses) {
        sectorStatus = sectorStatus.split(' ');

        for (let flight of flights) {
            if (flight.sector === sectorStatus[0]) {
                flight.status = sectorStatus[1];
            }
        }
    }

    let output = [];

    for (let flight of flights) {
        if (statusDesired === flight.status) {
            output.push({ Destination: flight.destination, Status: flight.status });
        }
    }

    for (let out of output) {
        console.log(out);
    }

}

// flight([['WN269 Delaware',
// 'FL2269 Oregon',
//  'WN498 Las Vegas',
//  'WN3145 Ohio',
//  'WN612 Alabama',
//  'WN4010 New York',
//  'WN1173 California',
//  'DL2120 Texas',
//  'KL5744 Illinois',
//  'WN678 Pennsylvania'],
//  ['DL2120 Cancelled',
//  'WN612 Cancelled',
//  'WN1173 Cancelled',
//  'SK330 Cancelled'],
//  ['Ready to fly']
// ]);

function schoolRegister(input) {

    class Students {

        studentInfo = {
            name: "",
            grade: 0,
            average: 0
        }

        students = [];

        annual = [];

        constructor(input) {

            this.extract(input);
            this.nextGrades();

        }

        extract(input) {
            for (let student of input) {
                let studentInfo = student.split(": ");
                studentInfo.shift(); // Removing "Student name"
                this.studentInfo.name = studentInfo[0].split(',')[0]; // Getting the name of the student
                this.studentInfo.grade = Number(studentInfo[1].split(',')[0]) + 1; // Getting the grade of the student, add 1 for the next grade
                this.studentInfo.average = Number(studentInfo.pop()); // Getting the last element which is the average                

                this.students.push(this.studentInfo);
                this.studentInfo = {}; // Reset object, so we can store new values in the next iteration
            }
        }

        nextGrades() {

            //Sorting
            this.students = this.students.sort(this.compareByGrade);

            // Organizing by average and grades
            let grades = this.students[0].grade;
            let annualAverage = 0;
            let annualCounter = 0;
            let annualStudents = [];

            for (let student of this.students) {

                if (student.grade === grades) {
                    if (student.average >= 3) {
                        annualCounter++;
                        annualAverage += student.average;
                        annualStudents.push(student.name);
                    }
                } else {
                    // Push to annual register
                    if (annualCounter > 0) { // At least one student
                        this.annual.push({ grade: grades, average: (annualAverage / annualCounter).toFixed(2), names: annualStudents.join(', ') });
                    }
                    // Reset
                    annualStudents = [];
                    annualAverage = 0;
                    annualCounter = 0;

                    // The next grade
                    grades = student.grade;
                    if (student.average >= 3) {
                        annualCounter++;
                        annualAverage += student.average;
                        annualStudents.push(student.name);
                    }
                }
            }
            // Push to annual register ( 12 grade)
            if (annualCounter > 0) { // At least one student
                this.annual.push({ grade: grades, average: (annualAverage / annualCounter).toFixed(2), names: annualStudents.join(', ') });
            }

        }

        compareByGrade(a, b) {
            if (a.grade < b.grade) {
                return -1;
            } else if (a.grade > b.grade) {
                return 1;
            }
            return 0;
        }

        print() {

            for (let ann of this.annual) {
                console.log(`${ann.grade} Grade`);
                console.log(`List of students: ${ann.names}`);
                console.log(`Average annual score from last year: ${ann.average}`);
                console.log(``);
            }
        }
    }

    const students = new Students(input);
    students.print();
}

// schoolRegister([
//     'Student name: George, Grade: 5, Graduated with an average score: 2.75',
//     'Student name: Alex, Grade: 9, Graduated with an average score: 3.66',
//     'Student name: Peter, Grade: 8, Graduated with an average score: 2.83',
//     'Student name: Boby, Grade: 5, Graduated with an average score: 4.20',
//     'Student name: John, Grade: 9, Graduated with an average score: 2.90',
//     'Student name: Steven, Grade: 2, Graduated with an average score: 4.90',
//     'Student name: Darsy, Grade: 1, Graduated with an average score: 5.15'
// ]);

function browserHistory(browserInfo, commands) {

    let browserName = browserInfo["Browser Name"];
    let openTabs = browserInfo["Open Tabs"];
    let recentlyClosed = browserInfo["Recently Closed"];
    let browserLogs = browserInfo["Browser Logs"];

    let commandsInfo = [];

    for (let command of commands) {
        command = command.split(' ');
        let comm = command.shift();
        let site = command.join(' ');
        commandsInfo.push({ command: comm, site: site });
    }

    let openTabsNew = JSON.parse(JSON.stringify(openTabs));
    let recentlyClosedNew = JSON.parse(JSON.stringify(recentlyClosed));
    let browserLogsNew = JSON.parse(JSON.stringify(browserLogs));

    for (let command of commandsInfo) {

        if (command.command === 'Close') {
            if (openTabs.includes(command.site)) {
                openTabsNew.splice(openTabsNew.indexOf(command.site), 1);
                recentlyClosedNew.push(command.site);
                browserLogsNew.push([command.command, command.site].join(' '));
            }
        } else if (command.command === 'Open') {
            openTabsNew.push(command.site);
            browserLogsNew.push([command.command, command.site].join(' '));
        } else if (command.command === 'Clear') {

            browserLogsNew = [];
            openTabsNew = [];
            recentlyClosedNew = [];

        }
    }

    openTabs = openTabsNew;
    recentlyClosed = recentlyClosedNew;
    browserLogs = browserLogsNew;

    console.log(browserName);
    console.log(`Open Tabs: ${openTabs.join(', ')}`);
    console.log(`Recently Closed: ${recentlyClosed.join(', ')}`);
    console.log(`Browser Logs: ${browserLogs.join(', ')}`);

}

// browserHistory({"Browser Name":"Mozilla Firefox",
// "Open Tabs":["YouTube"],
// "Recently Closed":["Gmail", "Dropbox"],
// "Browser Logs":["Open Gmail", "Close Gmail", "Open Dropbox", "Open YouTube", "Close Dropbox"]},
// ["Open Wikipedia", "Clear History and Cache", "Open Twitter"]
// );

function sequences(input) {

    let arrays = [];

    for (let arr of input) {
        arr = JSON.parse(arr);
        arrays.push(arr.sort((a, b) => { return a - b;}).reverse());
    }

    let newArrays = JSON.parse(JSON.stringify(arrays));

    let isUnique = false;
    let Idx = 0;
    for (let i = 0; i < arrays.length - 1; i++) {

        for(let j = i + 1; j < arrays.length; j++){

            if(arrays[i].length === arrays[j].length){

                for(let elem of arrays[i]){
                    if(!arrays[j].includes(elem)){
                        isUnique = true;
                        break;
                    }
                }

                if(!isUnique){
                    newArrays.splice(j-Idx, 1); // removing the duplicate
                    Idx++;
                }

                isUnique = false;
            }

        }

        arrays = newArrays;
        Idx = 0;
    }

    arrays.reverse();

    for(let arr of arrays){
        console.log(`[${arr.join(', ')}]`);
    }

}

sequences(["[-3, -2, -1, 0, 1, 2, 3, 4]",
"[10, 1, -17, 0, 2, 13]",
"[4, -3, 3, -2, 2, -1, 1, 0]"]);