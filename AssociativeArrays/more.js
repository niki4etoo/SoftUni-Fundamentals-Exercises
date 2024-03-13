function garage(input) {

    let garages = [];

    let garage = {
        id: 0,
        info: []
    };

    let isAlreadyExist = false; // the garage

    for (let element of input) {

        for (let g of garages) {
            if (Number(element[0]) == g.id) {
                element = element.substring(3, element.length).trim();

                while(element.includes(":")){
                    element = element.replace(": ", " - ");
                }

                g.info.push(element);
                isAlreadyExist = true;
            }
        }

        if (!isAlreadyExist) {
            garage.id = Number(element[0]);
            element = element.substring(3, element.length).trim();

            while(element.includes(":")){
                element = element.replace(": ", " - ");
            }

            garage.info = [element];

            garages.push(garage);
            garage = {};
        }
        isAlreadyExist = false;
    }

    for (let garage of garages) {
        console.log(`Garage № ${garage.id}`);
        for (let info of garage.info) {
            console.log(`--- ${info}`);
        }
    }

}

garage(['1 - color: blue, fuel type: diesel', '1 - color: red, manufacture: Audi', '2 - fuel type: petrol', '4 - color: dark blue, fuel type: diesel, manufacture: Fiat']);
garage(['1 - color: green, fuel type: petrol',
    '1 - color: dark red, manufacture: WV',
    '2 - fuel type: diesel',
    '3 - color: dark blue, fuel type: petrol']);