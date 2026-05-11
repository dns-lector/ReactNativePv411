// DAO - Data Access Object

import INbuRate from "../model/INbuRate";

interface ICacheItem {
    url: string,
    data: object,
    moment: number,
};

export default class NbuDao {
    static cache:Array<ICacheItem> = [];

    static loadRates():Promise<Array<INbuRate>> {
        const url = "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json";
                       
        return new Promise((resolve, reject) => {
            const cacheItem = NbuDao.cache.find(c => c.url == url);
            // console.log(NbuDao.cache);
            // console.log(cacheItem);
            if(cacheItem) {
                console.log("loadRates: cache returned");
                resolve(cacheItem.data as Array<INbuRate>);
            }
            else {
                fetch(url)
                .then(r => r.json())
                .then(j => {
                    NbuDao.cache.push({
                        url: url,
                        data: j,
                        moment: new Date().getTime()
                    });
                    resolve(j);
                })
                .catch(reject);
            }
        });
    }
};
