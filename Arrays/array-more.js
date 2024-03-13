function nth(input) {

    let step = Number(input[input.length - 1]);
    let output = [];
    for (let i = 0; i < input.length - 1; i += step) {
        output.push(input[i]);
    }
    console.log(output.join(" "));
}

// nth(['5', '20', '31', '4', '20', '2']);

function addRemove(commands) {

    let initial = 1;
    let output = [];

    for (let i = 0; i < commands.length; i++) {
        commands[i] === 'add' ? output.push(initial) : output.pop();
        initial++;
    }

    output.length === 0 ? console.log(`Empty`) : console.log(output.join(" "));

}

// addRemove(['remove', 'remove', 'remove']);

function rotate(arr) {
    let rotations = Number(arr.pop());

    while (rotations > 0) {
        arr.unshift(arr.pop());
        rotations--;
    }

    console.log(arr.join(" "));
}

// rotate(['1', '2', '3', '4', '2']);

function nonDecreasingSubset(arr) {

    let output = [arr[0]];
    let currentMax = arr[0];

    for (let i = 1; i < arr.length; i++) {
        if (currentMax <= arr[i]) {
            currentMax = arr[i];
            output.push(currentMax);
        }
    }
    console.log(output.join(" "));
}

// nonDecreasingSubset([1, 3, 8, 4, 10, 12, 3, 2, 24]);

function tseam(tseamAccount) {
    let account = tseamAccount.shift();

    account = account.split(" ");

    function install(game, arr) {
        return !arr.includes(game) ? arr.push(game) : null;
    }
    
    function uninstall(game, arr) {
        return arr.includes(game) ? arr.splice(arr.indexOf(game), 1) : null;
    }
    
    function update(game, arr) {
        if (arr.includes(game)) {
            arr.splice(arr.indexOf(game), 1);
            arr.push(game);
        }
    }
    
    function expansion(game, arr) {
        let gameExpansion = "";
        let tokens = game.split("");
        let idx = tokens.indexOf('-');
        let name = tokens.slice(0, idx).join("");
        let expansion = tokens.slice(idx + 1, tokens.length).join("");
    
        gameExpansion = `${name}:${expansion}`;
        
        if (arr.includes(name)) {
            arr.splice(arr.indexOf(name) + 1, 0, gameExpansion);
        }
    }

    function accountActions(account, commands, isPlay) {

        let command = commands.shift();
    
        if (command !== 'Play!') {
            let name = commands.shift();
            switch (command) {
                case 'Install':
                    install(name, account);
                    break;
                case 'Uninstall':
                    uninstall(name, account);
                    break;
                case 'Update':
                    update(name, account);
                    break;
                case 'Expansion':
                    expansion(name, account);
                    break;
                default:
            }
    
        } else {
            isPlay = true;
            return;
        }
    }

    let commands = [];
    let isPlay = false;

    for (let elem of tseamAccount) {
        commands = elem.split(" ");
        accountActions(account, commands, isPlay);
        if (isPlay) break;
    }

    console.log(account.join(" "));
}

tseam(['CS WoW Diablo',
    'Uninstall XCOM',
    'Update PeshoGame',
    'Update WoW',
    'Expansion Civ-V',
    'Play!']);