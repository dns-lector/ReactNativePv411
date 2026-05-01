import './CalcButtonStyle';
import { Text, TouchableOpacity } from 'react-native';
import { CalcButtonTypes } from './CalcButtonTypes';
import CalcButtonStyle from './CalcButtonStyle';

export default function CalcButton( 
    {buttonType, title, action} : 
    {
        buttonType: CalcButtonTypes,
        title: string,
        action?: (title:string) => void,
    } 
) {
    const bg = buttonType == CalcButtonTypes.digit ? CalcButtonStyle.bgDigit
    : buttonType == CalcButtonTypes.equal ? CalcButtonStyle.bgEqual
    : CalcButtonStyle.bgOperation;

    const label = buttonType == CalcButtonTypes.digit ? CalcButtonStyle.labelDigit
    : buttonType == CalcButtonTypes.equal ? CalcButtonStyle.labelEqual
    : CalcButtonStyle.labelOperation;

    return <TouchableOpacity 
                onPress={() => { if(action) action(title); } }
                style={[CalcButtonStyle.button, bg]}>
        <Text style={[CalcButtonStyle.label, label]}>{title}</Text>
    </TouchableOpacity>;
}
