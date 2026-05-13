// DAO - Data Access Object

import INbuRate from "../model/INbuRate";

interface ICacheItem {
    url: string,
    data: object,
    moment: number,
    expires?: number,
};

export default class NbuDao {
    static cache:Array<ICacheItem> = [];

    static loadRates(date?:Date|undefined):Promise<Array<INbuRate>> {
                    //  "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json&date=20200302"
        const api_url = "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json";
                       
        return new Promise((resolve, reject) => {
            let url = api_url;
            if(date) {
                url += `&date=${date.getFullYear()}${(date.getMonth()+1).pad2()}${date.getDate().pad2()}`;
            }
            console.log(url);
            const cacheItemIndex = NbuDao.cache.findIndex(c => c.url == url);
            const cacheItem = cacheItemIndex != -1 ? NbuDao.cache[cacheItemIndex] : null;
            // console.log(NbuDao.cache);
            // console.log(cacheItem);
            if(cacheItem) {
                if(cacheItem.expires && cacheItem.expires < new Date().getTime()) {
                    console.log("loadRates: cache removed");
                    NbuDao.cache.splice(cacheItemIndex, 1);
                }
                else {
                    console.log("loadRates: cache returned");
                    resolve(cacheItem.data as Array<INbuRate>);
                    return;
                }
            }
            console.log("loadRates: fetch started");
            fetch(url)
            .then(r => r.json())
            .then(j => {
                const t = new Date().getTime();
                NbuDao.cache.push({
                    url: url,
                    data: j,
                    moment: t,
                    // задача: розрахувати кількість секунд до найближчого
                    // часу 15:30 та взяти цю кількість (х1000) як expires 
                    expires: t + 1000 * 25 // перевіряти чи є у відповіді дані про кешування, якщо ні, то встановлювати власні обмеження
                });
                resolve(j);
            })
            .catch(reject);            
        });
    }
};
