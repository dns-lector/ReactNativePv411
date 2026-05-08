// DAO - Data Access Object

import INbuRate from "../model/INbuRate";

export default class NbuDao {
    static loadRates():Promise<Array<INbuRate>> {
        const url = "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json";
        return new Promise((resolve, reject) => {
            fetch(url)
            .then(r => r.json())
            .then(resolve)
            .catch(reject);
        });
    }
};
