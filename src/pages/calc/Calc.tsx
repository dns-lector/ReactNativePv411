import CalcButton from './ui/buttons/CalcButton';
import { CalcButtonTypes } from './ui/buttons/CalcButtonTypes';
import { Text, View } from "react-native";
import CalcStyle from './ui/CalcStyle';
import { useState } from 'react';

export default function Calc() {
    const [expression, setExpression] = useState<string>("");
    const [result, setResult] = useState<string>("0");

    const digitPress = (title:string) => {
        let res = result;
        if(res == "0") {
            res = "";
        }
        setResult(res + title);
    };

    const clearPress = () => {
        setResult("0");
        setExpression("");
    };

    return <View style={CalcStyle.container}>
        <Text style={CalcStyle.title}>Calculator</Text>
        <Text style={CalcStyle.expression}>{expression}</Text>
        <Text style={CalcStyle.result}>{result}</Text>

        <View style={CalcStyle.memory}>
            <Text>Memory buttons row</Text>
        </View>

        <View style={CalcStyle.keyboard}>
            <View style={CalcStyle.kbRow}>
                <CalcButton buttonType={CalcButtonTypes.operation} title="%"/>
                <CalcButton buttonType={CalcButtonTypes.operation} title="CE"/>
                <CalcButton buttonType={CalcButtonTypes.operation} title="C" action={clearPress}/>
                <CalcButton buttonType={CalcButtonTypes.operation} title={"\u232B"}/>
            </View>
            <View style={CalcStyle.kbRow}>
                <CalcButton buttonType={CalcButtonTypes.operation} title={"\u00B9/\u{1D465}"} />
                <CalcButton buttonType={CalcButtonTypes.operation} title={"\u{1D465}\u00B2"} />
                <CalcButton buttonType={CalcButtonTypes.operation} title={"\u221A\u{1D465}\u0305"} />
                <CalcButton buttonType={CalcButtonTypes.operation} title={"\u00F7"} />
            </View>
            <View style={CalcStyle.kbRow}>
                <CalcButton buttonType={CalcButtonTypes.digit} title='7' action={digitPress}/>
                <CalcButton buttonType={CalcButtonTypes.digit} title='8' action={digitPress}/>
                <CalcButton buttonType={CalcButtonTypes.digit} title='9' action={digitPress}/>
                <CalcButton buttonType={CalcButtonTypes.operation} title={"\u00D7"}/>
            </View>
            <View style={CalcStyle.kbRow}>
                <CalcButton buttonType={CalcButtonTypes.digit} title='4' action={digitPress}/>
                <CalcButton buttonType={CalcButtonTypes.digit} title='5' action={digitPress}/>
                <CalcButton buttonType={CalcButtonTypes.digit} title='6' action={digitPress}/>
                <CalcButton buttonType={CalcButtonTypes.operation} title={"\u2212"}/>
            </View>
            <View style={CalcStyle.kbRow}>
                <CalcButton buttonType={CalcButtonTypes.digit} title='1' action={digitPress}/>
                <CalcButton buttonType={CalcButtonTypes.digit} title='2' action={digitPress}/>
                <CalcButton buttonType={CalcButtonTypes.digit} title='3' action={digitPress}/>
                <CalcButton buttonType={CalcButtonTypes.operation} title={"\uFF0B"}/>
            </View>
            <View style={CalcStyle.kbRow}>
                <CalcButton buttonType={CalcButtonTypes.digit} title={'\u207A/\u208B'}/>
                <CalcButton buttonType={CalcButtonTypes.digit} title='0' action={digitPress}/>
                <CalcButton buttonType={CalcButtonTypes.digit} title={'\u2e34'}/>
                <CalcButton buttonType={CalcButtonTypes.equal} title={'\uff1d'}/>
            </View>            
        </View>
        
        
    </View> ;
}
/*
Д.З. Кнопки управління пам'яттю
- ввести кілька типів для позначення кнопок: active, passive / enabled, disabled
- реалізувати компонент-кнопку з стилізацією для різних типів 
- заповнити рядок у калькуляторі
До звіту додати скріншот
*/