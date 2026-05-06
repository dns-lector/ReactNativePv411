import CalcButton from './ui/buttons/CalcButton';
import { CalcButtonTypes } from './ui/buttons/CalcButtonTypes';
import { Text, useWindowDimensions, View } from "react-native";
import CalcStyle from './ui/CalcStyle';
import { useState } from 'react';
import { CalcOperations } from './model/CalcOperations';

/*
Д.З. Реалізувати масштабування тексту-результату в залежності
від кількості цифр\пробілів\коми - бажано щоб у будь-якому
складі результат займав однакове місце (при переповненні)
*/
interface ICalcState {
    expression: string,
    result: string,
    isNeedClearExpression: boolean,
    isNeedClearResult: boolean,
    operation: CalcOperations|null,
    argument1: number|null,
};

const initialState:ICalcState = {
    expression: "",
    result: "0",
    isNeedClearExpression: false,
    isNeedClearResult: false,
    operation: null,
    argument1: null,
};

export default function Calc() {
    const [calcState, setCalcState] = useState<ICalcState>(initialState);
    const {width, height} = useWindowDimensions();
    const dotSymbol = ',';

    const digitPress = (title:string) => {
        let res = calcState.result;
        if(res == "0" || calcState.isNeedClearResult) {
            res = "";
        }
        let expr = calcState.isNeedClearExpression ? '' : calcState.expression;
        setCalcState({...calcState,
            expression: expr,
            result: num2res(res + title),
            isNeedClearExpression: false, 
            isNeedClearResult: false,
        });
    };

    const num2res = (res:string|number):string => {
        // TODO: врахувати знак числа
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
        return res;
    }

    const res2num = (res:string) => {
        return Number(res.replaceAll(' ', '').replace(dotSymbol, '.'));
    };

    const invPress = () => {
        // TODO: для кнопок моно-операцій перевіряти чи є збережена бінарна операція
        // і в залежності від цього формувати вираз: або v2= або 3 + v2
        let num = res2num(calcState.result);
        setCalcState({...calcState,
            expression: "1 / " + num + " =",
            result: num2res(1.0 / num),
            isNeedClearExpression: true,
            isNeedClearResult: true,
        });
    };

    const dotPress = () => {
        if(!calcState.result.includes(dotSymbol)) {
            setCalcState({...calcState,
                result: num2res(calcState.result + dotSymbol),
            });
        }
    };

    const clearPress = () => {
        setCalcState({...calcState,
            expression: "",
            result: "0",
            operation: null,
            argument1: null,
            isNeedClearExpression: false,
            isNeedClearResult: false,
        });
    };
    
    const clearEntryPress = () => {
        setCalcState({...calcState,
            expression: calcState.isNeedClearExpression ? "" : calcState.expression,
            result: "0",
            isNeedClearExpression: false,
            isNeedClearResult: false,
        });
    };


    const pmPress = () => {
        if(calcState.result == '0' || calcState.isNeedClearResult) return;

        let res = calcState.result.startsWith('-')
        ? calcState.result.substring(1)
        : '-' + calcState.result;
        
        setCalcState({...calcState,
            result: res,
        });
    };

    const sqrtPress = () => {
        let num = res2num(calcState.result);
        setCalcState({...calcState,
            expression: "\u221A" + num,
            result: (num < 0) ? "Invalid input" : num2res(Math.sqrt(num)),
            isNeedClearExpression: true,
            isNeedClearResult: true,
        });
    };

    const backspacePress = () => {
        let res = calcState.isNeedClearResult 
        ? "0" 
        : calcState.result.substring(0, calcState.result.length - 1);
        if(res == "" || res == "-") {
            res = "0";
        }
        setCalcState({...calcState,
            expression: calcState.isNeedClearExpression ? "" : calcState.expression,
            result: num2res(res),
            isNeedClearExpression: false,
            isNeedClearResult: false,
        });
    };

    const operationPress = (title:string) => {
        // TODO: перевірити чи є попередня операція, якщо є, то виконати її
        // і аргументом1 прийняти її результат
        let num =  res2num(calcState.result);
        setCalcState({...calcState,
            expression: num + ' ' + title + ' ',
            isNeedClearResult: true,
            isNeedClearExpression: false,
            operation: title == CalcOperations.add ? CalcOperations.add
            : title == CalcOperations.sub ? CalcOperations.sub
            : title == CalcOperations.mul ? CalcOperations.mul
            : CalcOperations.div,
            argument1: num,
        });
    };

    const equalPress = () => {
        if(calcState.operation == null) return;
        let num =  res2num(calcState.result);
        let res = calcState.argument1!;
        switch(calcState.operation) {
            case CalcOperations.add: res += num; break;
            case CalcOperations.sub: res -= num; break;
            case CalcOperations.mul: res *= num; break;
            case CalcOperations.div: res /= num; break;
        }
        setCalcState({...calcState,
            expression: calcState.expression + num + " =",
            result: num2res(res),
            isNeedClearResult: true,
            isNeedClearExpression: true,
            operation: null,
            argument1: null,
        });
    };

    const portraitView = () => <View style={CalcStyle.container}>
        <Text style={CalcStyle.title}>Calculator {CalcOperations.add}</Text>
        <Text style={CalcStyle.expression}>{calcState.expression}</Text>
        <Text style={[CalcStyle.result, {
            fontSize: calcState.result.length <= 12 ? 48.0 : 12 * 48.0 / calcState.result.length,
        }]}>{calcState.result}</Text>

        <View style={CalcStyle.memory}>
            <Text>Memory buttons row</Text>
        </View>

        <View style={CalcStyle.keyboard}>
            <View style={CalcStyle.kbRow}>
                <CalcButton buttonType={CalcButtonTypes.operation} title="%"/>
                <CalcButton buttonType={CalcButtonTypes.operation} title="CE" action={clearEntryPress}/>
                <CalcButton buttonType={CalcButtonTypes.operation} title="C" action={clearPress}/>
                <CalcButton buttonType={CalcButtonTypes.operation} title={"\u232B"} action={backspacePress}/>
            </View>
            <View style={CalcStyle.kbRow}>
                <CalcButton buttonType={CalcButtonTypes.operation} title={"\u00B9/\u{1D465}"} action={invPress}/>
                <CalcButton buttonType={CalcButtonTypes.operation} title={"\u{1D465}\u00B2"} />
                <CalcButton buttonType={CalcButtonTypes.operation} title={"\u221A\u{1D465}\u0305"} action={sqrtPress} />
                <CalcButton buttonType={CalcButtonTypes.operation} title={CalcOperations.div} action={operationPress} />
            </View>
            <View style={CalcStyle.kbRow}>
                <CalcButton buttonType={CalcButtonTypes.digit} title='7' action={digitPress}/>
                <CalcButton buttonType={CalcButtonTypes.digit} title='8' action={digitPress}/>
                <CalcButton buttonType={CalcButtonTypes.digit} title='9' action={digitPress}/>
                <CalcButton buttonType={CalcButtonTypes.operation} title={CalcOperations.mul} action={operationPress}/>
            </View>
            <View style={CalcStyle.kbRow}>
                <CalcButton buttonType={CalcButtonTypes.digit} title='4' action={digitPress}/>
                <CalcButton buttonType={CalcButtonTypes.digit} title='5' action={digitPress}/>
                <CalcButton buttonType={CalcButtonTypes.digit} title='6' action={digitPress}/>
                <CalcButton buttonType={CalcButtonTypes.operation} title={CalcOperations.sub} action={operationPress}/>
            </View>
            <View style={CalcStyle.kbRow}>
                <CalcButton buttonType={CalcButtonTypes.digit} title='1' action={digitPress}/>
                <CalcButton buttonType={CalcButtonTypes.digit} title='2' action={digitPress}/>
                <CalcButton buttonType={CalcButtonTypes.digit} title='3' action={digitPress}/>
                <CalcButton buttonType={CalcButtonTypes.operation} title={CalcOperations.add} action={operationPress}/>
            </View>
            <View style={CalcStyle.kbRow}>
                <CalcButton buttonType={CalcButtonTypes.digit} title={'\u207A/\u208B'} action={pmPress}/>
                <CalcButton buttonType={CalcButtonTypes.digit} title='0' action={digitPress}/>
                <CalcButton buttonType={CalcButtonTypes.digit} title={'\u2e34'} action={dotPress}/>
                <CalcButton buttonType={CalcButtonTypes.equal} title={'\uff1d'} action={equalPress}/>
            </View>            
        </View>
    </View> ;

    const landscapeView = () => <View style={CalcStyle.container}>
        <View style={CalcStyle.topRow}>
            <View style={CalcStyle.topCol}>
                <Text style={CalcStyle.expression}>{calcState.expression}</Text>
                <View style={CalcStyle.memory}>
                    <Text>Memory buttons row</Text>
                </View>
            </View>
            <Text style={CalcStyle.result}>{calcState.result}</Text>
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