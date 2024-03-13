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
                element = element.substring(3, element.length);
                element = element.split(',');

                g.info.push(element);
                isAlreadyExist = true;
            }
        }

        if (!isAlreadyExist) {
            garage.id = Number(element[0]);
            element = element.substring(3, element.length).trim();

            garage.info = element;

            garages.push(garage);
            garage = {};
        }
        isAlreadyExist = false;
    }

    console.log(garages);

}

garage(['1 - color: blue, fuel type: diesel', '1 - color: red, manufacture: Audi', '2 - fuel type: petrol', '4 - color: dark blue, fuel type: diesel, manufacture: Fiat']);