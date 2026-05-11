import { Alert, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import RateStyle from "./ui/RateStyle";
import { useEffect, useState } from "react";
import NbuDao from "../../entities/nbu/api/NbuDao";
import INbuRate from "../../entities/nbu/model/INbuRate";
import DatePicker from 'react-native-date-picker';


export default function Rate() {
    const [rates, setRates] = useState<Array<INbuRate>>([]);
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)

    useEffect(() => {
        // fetch() - bad practice
        NbuDao    // good practice
        .loadRates()
        .then(setRates)
        .catch(console.error);
    }, []);

    useEffect(() => {
        if(rates.length > 0) {            
            setDate( Date.fromDotted(rates[0].exchangedate) );
        }
    }, [rates]);

    return <View style={RateStyle.container}>
        <View style={RateStyle.titleRow}>
            <View style={RateStyle.searchView}>
                <Image 
                    source={require("../../features/assets/img/search.png")}
                    style={RateStyle.searchImg} />
                <TextInput 
                    style={RateStyle.searchInput} />    
            </View>
            <Text style={RateStyle.pageTitle}>Курси НБУ</Text>
            <TouchableOpacity  style={RateStyle.rateDateBtn} onPress={() => setOpen(true)}>
                <Text style={RateStyle.rateDate}>{date.toDotted()}</Text>
            </TouchableOpacity>
        </View>
        
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

        <DatePicker
            modal
            mode="date"
            open={open}
            date={date}
            onConfirm={(date) => {
                setOpen(false);
                setDate(date);
            }}
            onCancel={() => {
                setOpen(false);
            }}
        />
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
Д.З. Реалізувати обмеження на введення дати для курсів валют:
курси змінюються о 16:00, до цього часу можна вибрати максимум
  сьогоднішню дату
АЛЕ вихідні дні пропускаються і курс встановлюєтья на наступний 
  робочий день. Тобто після 16:00 Пт можна вибирати дати до 
  наступного понеділка  
Додавати скріншоти результатів    
*/