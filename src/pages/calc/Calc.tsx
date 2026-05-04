import CalcButton from './ui/buttons/CalcButton';
import { CalcButtonTypes } from './ui/buttons/CalcButtonTypes';
import { Text, useWindowDimensions, View } from "react-native";
import CalcStyle from './ui/CalcStyle';
import { useState } from 'react';

/*
Д.З. Реалізувати масштабування тексту-результату в залежності
від кількості цифр\пробілів\коми - бажано щоб у будь-якому
складі результат займав однакове місце (при переповненні)
*/

export default function Calc() {
    const [expression, setExpression] = useState<string>("");
    const [result, setResult] = useState<string>("0");
    const {width, height} = useWindowDimensions();
    const dotSymbol = ',';

    const digitPress = (title:string) => {
        let res = result;
        if(res == "0") {
            res = "";
        }
        showResult(res + title);
    };

    const showResult = (res:string|number) => {
        if(typeof res == 'number') {
            res = res.toString().replace('.', dotSymbol);
        }
        res = res.replaceAll(' ', '');
        let fracPart = '';
        let d = res.indexOf(dotSymbol);
        if(d != -1) {
            fracPart = res.substring(d);
            res = res.substring(0,d);
        }
        let n = res.length;
        let i = n % 3;
        let arr = [res.substring(0,i)];
        while(i < n) {
            arr.push(res.substring(i,i+3));
            i += 3;
        }
        res = arr.join(' ') + fracPart;
        setResult(res);
    }

    const invPress = () => {
        showResult( 1.0 / res2num(result) );
    };

    const res2num = (res:string) => {
        return Number(res.replaceAll(' ', '').replace(dotSymbol, '.'));
    };

    const dotPress = () => {
        if(!result.includes(dotSymbol)) {
            showResult(result + dotSymbol);
        }
    };

    const clearPress = () => {
        setResult("0");
        setExpression("");
    };

    const portraitView = () => <View style={CalcStyle.container}>
        <Text style={CalcStyle.title}>Calculator</Text>
        <Text style={CalcStyle.expression}>{expression}</Text>
        <Text style={[CalcStyle.result, {
            fontSize: result.length <= 12 ? 48.0 : 12 * 48.0 / result.length,
        }]}>{result}</Text>

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
                <CalcButton buttonType={CalcButtonTypes.operation} title={"\u00B9/\u{1D465}"} action={invPress}/>
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
                <CalcButton buttonType={CalcButtonTypes.digit} title={'\u2e34'} action={dotPress}/>
                <CalcButton buttonType={CalcButtonTypes.equal} title={'\uff1d'}/>
            </View>            
        </View>
    </View> ;

    const landscapeView = () => <View style={CalcStyle.container}>
        <View style={CalcStyle.topRow}>
            <View style={CalcStyle.topCol}>
                <Text style={CalcStyle.expression}>{expression}</Text>
                <View style={CalcStyle.memory}>
                    <Text>Memory buttons row</Text>
                </View>
            </View>
            <Text style={CalcStyle.result}>{result}</Text>
        </View>

        <View style={CalcStyle.keyboard}>
            <View style={CalcStyle.kbRow}>
                <CalcButton buttonType={CalcButtonTypes.operation} title={"ln \u{1D465}"}/>
                <CalcButton buttonType={CalcButtonTypes.operation} title="%"/>
                <CalcButton buttonType={CalcButtonTypes.digit} title='7' action={digitPress}/>
                <CalcButton buttonType={CalcButtonTypes.digit} title='8' action={digitPress}/>
                <CalcButton buttonType={CalcButtonTypes.digit} title='9' action={digitPress}/>
                <CalcButton buttonType={CalcButtonTypes.operation} title={"\u00F7"} />
                <CalcButton buttonType={CalcButtonTypes.operation} title={"\u232B"}/>
            </View>
            <View style={CalcStyle.kbRow}>
                <CalcButton buttonType={CalcButtonTypes.operation} title={"sin \u{1D465}"}/>
                <CalcButton buttonType={CalcButtonTypes.operation} title={"\u00B9/\u{1D465}"} />
                <CalcButton buttonType={CalcButtonTypes.digit} title='4' action={digitPress}/>
                <CalcButton buttonType={CalcButtonTypes.digit} title='5' action={digitPress}/>
                <CalcButton buttonType={CalcButtonTypes.digit} title='6' action={digitPress}/>
                <CalcButton buttonType={CalcButtonTypes.operation} title={"\u00D7"}/>
                <CalcButton buttonType={CalcButtonTypes.operation} title="C" action={clearPress}/>                
            </View>
            <View style={CalcStyle.kbRow}>
                <CalcButton buttonType={CalcButtonTypes.operation} title={"tg \u{1D465}"}/>
                <CalcButton buttonType={CalcButtonTypes.operation} title={"\u{1D465}\u00B2"} />
                <CalcButton buttonType={CalcButtonTypes.digit} title='1' action={digitPress}/>
                <CalcButton buttonType={CalcButtonTypes.digit} title='2' action={digitPress}/>
                <CalcButton buttonType={CalcButtonTypes.digit} title='3' action={digitPress}/>
                <CalcButton buttonType={CalcButtonTypes.operation} title={"\u2212"}/>
                <CalcButton buttonType={CalcButtonTypes.operation} title="CE"/>
            </View>
            <View style={CalcStyle.kbRow}>
                <CalcButton buttonType={CalcButtonTypes.operation} title={"e\u{02E3}"}/>
                <CalcButton buttonType={CalcButtonTypes.operation} title={"\u221A\u{1D465}\u0305"} />
                <CalcButton buttonType={CalcButtonTypes.digit} title={'\u207A/\u208B'}/>
                <CalcButton buttonType={CalcButtonTypes.digit} title='0' action={digitPress}/>
                <CalcButton buttonType={CalcButtonTypes.digit} title={'\u2e34'}/>
                <CalcButton buttonType={CalcButtonTypes.operation} title={"\uFF0B"}/>
                <CalcButton buttonType={CalcButtonTypes.equal} title={'\uff1d'}/>
            </View>            
        </View>
        

        

    </View>;

    return width > height ? landscapeView() : portraitView();
}
/*
Д.З. Кнопки управління пам'яттю
- ввести кілька типів для позначення кнопок: active, passive / enabled, disabled
- реалізувати компонент-кнопку з стилізацією для різних типів 
- заповнити рядок у калькуляторі
До звіту додати скріншот
*/