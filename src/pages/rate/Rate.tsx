import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import RateStyle from "./ui/RateStyle";
import { useEffect, useState } from "react";
import NbuDao from "../../entities/nbu/api/NbuDao";
import INbuRate from "../../entities/nbu/model/INbuRate";

export default function Rate() {
    const [rates, setRates] = useState<Array<INbuRate>>([]);

    useEffect(() => {
        // fetch() - bad practice
        NbuDao    // good practice
        .loadRates()
        .then(setRates)
        .catch(console.error);
    }, []);

    return <View style={RateStyle.container}>
        <Text style={RateStyle.pageTitle}>Курси НБУ</Text>
        <ScrollView style={RateStyle.ratesContainer}>
            {rates.map((r,i) => 
            <TouchableOpacity 
                key={r.cc} 
                style={[
                    RateStyle.rateItem, 
                    (i % 2 == 0 ? RateStyle.rateItemEven : RateStyle.rateItemOdd),
                ]}
                onPress={() => {Alert.alert(
                    r.txt, 
                    `Скорочення: ${r.cc}\nКод R-030: ${r.r030}\nКурс:\n  1 ${r.cc} = ${r.rate} HRN\n  1 HRN = ${(1.0 / r.rate).toPrecision(5)} ${r.cc}\nСпец позначка: ${r.special || '--'}\nДата: ${r.exchangedate}`,
                    [
                        {text: 'OK', onPress: () => {}},
                    ]
                )}}>

                <Text style={RateStyle.rateItemCc}>{r.cc}</Text>
                <Text style={RateStyle.rateItemTxt}>{r.txt}</Text>
                <Text style={RateStyle.rateItemRate}>{r.rate}</Text>
            </TouchableOpacity>)}
        </ScrollView>
    </View>;
}

/*
Порядок роботи з мережею:
- створюємо директорію для ORM (entites/[name]/model)
- створюємо шар доступу (DAL) - entites/[name]/api
   який братиме на себе запит до АРІ та обробку результатів
- звертаємось до DAL у представленні (компоненті)

!! поганою практикою вважається прямі запити до мережі/БД
   з компонента, який відповідає за представлення (UI)
*/
/*
Д.З. Реалізувати адаптивне масштабування курсів, що 
виводяться у повідомленні:
 - якщо курс валюти дуже малий, то підбирати масштабний множник (кратний 10: 100, 1000)
    (1 грн = 0.0211 дол --> 100 грн = 2.11 дол)
 - при протилежному відношенні масштабувати іншу валюту
Додавати скріншоти результатів    
*/