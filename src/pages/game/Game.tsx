import { GestureResponderEvent, Pressable, Text, TouchableOpacity, TouchableWithoutFeedback, useWindowDimensions, View } from "react-native";
import GameStyle from "./ui/GameStyle";
import { ReactNode, useRef, useState } from "react";

export default function Game() {
    const {width, height} = useWindowDimensions();
    const shortestSide = width < height ? width : height;
    const fieldSize = shortestSide * 0.95;
    const [label, setLabel] = useState<string>("Hello");

    const onSwipeLeft = () => {
        setLabel("горизонтальний ліворуч");
    };
    const onSwipeRight = () => {
        setLabel("горизонтальний праворуч");
    }; 
    const onSwipeTop = () => {
        setLabel("вертикальний вгору");
    }; 
    const onSwipeBottom = () => {
        setLabel("вертикальний вниз");
    };
    

    return <View style={GameStyle.container}>
        <View style={GameStyle.topBlock}>
            <View style={GameStyle.logo}>
                <Text style={GameStyle.logoText}>2048</Text>
            </View>
            <View style={GameStyle.topNav}>
                <View style={GameStyle.topScoreLine}>
                    <Text style={GameStyle.topScore}>SCORE{"\n"}532</Text>
                    <Text style={GameStyle.topScore}>BEST{"\n"}69.6k</Text>
                </View>
                <View style={GameStyle.topBtnLine}>
                    <Pressable style={GameStyle.topBtn}><Text style={GameStyle.topBtnText}>NEW</Text></Pressable>
                    <TouchableOpacity style={GameStyle.topBtn}><Text style={GameStyle.topBtnText}>UNDO</Text></TouchableOpacity>
                </View>
            </View>
        </View>

        <Text  style={GameStyle.label}>{label}</Text>

        <Swipeable onSwipeBottom={onSwipeBottom} onSwipeLeft={onSwipeLeft} onSwipeRight={onSwipeRight}
                   onSwipeTop={onSwipeTop} onUnrecognized={setLabel}>
            <View style={[GameStyle.field, {width: fieldSize, height: fieldSize}]}></View>
        </Swipeable> 
    
    </View>;
};

/*
Д.З. Додати до елемента Swipeable опціональний параметр onPress,
який буде запускатись за умови малої відстані між точками початку 
та кінця жестів з тривалістю не більше 300 мс. 
*/

function Swipeable({onSwipeLeft, onSwipeRight, onSwipeTop, onSwipeBottom, onUnrecognized, children}:
{
    onSwipeLeft?: () => void, 
    onSwipeRight?: () => void, 
    onSwipeTop?: () => void, 
    onSwipeBottom?: () => void, 
    onUnrecognized?: (reason:string) => void,
    children: ReactNode
}) {
    const minSwipeLength = 50.0;
    const minSwipeSpeed = minSwipeLength / 400.0;
    const startEvent = useRef<GestureResponderEvent|null>(null);
    const onGestureStart = (event: GestureResponderEvent) => {
        // console.log(event);
        startEvent.current = event;
    };
    const onGestureFinish = (event: GestureResponderEvent) => {
        if(startEvent.current == null) return;
        const dx = event.nativeEvent.pageX - startEvent.current.nativeEvent.pageX;
        const dy = event.nativeEvent.pageY - startEvent.current.nativeEvent.pageY;
        const dt = event.timeStamp - startEvent.current.timeStamp;
        console.log(dx, dy, dt);

        // Початкове розрізнення - за орієнтацією
        const adx = Math.abs(dx);
        const ady = Math.abs(dy);
        if(adx > 2 * ady) {   // аналізуємо як горизонтальне проведення (2 * -- через прямокутність пристрою)
            // визначившись з орієнтацією продовжуємо аналіз лише однієї координати
            if(adx < minSwipeLength) {  // занадто короткий жест
                if(onUnrecognized) onUnrecognized("HorizontalShort");
            }
            else if(adx/dt < minSwipeSpeed) { // занадто повільний
                if(onUnrecognized) onUnrecognized("HorizontalSlow");
            }
            else if(dx > 0) {  // розрізнення напрямку жесту - за знаком відстані             
                if(onSwipeRight) onSwipeRight();
            }
            else {
                if(onSwipeLeft) onSwipeLeft();
            }
        }
        else if(ady > 2 * adx)  { // аналізуємо як вертикальне проведення 
            if(ady < minSwipeLength) {  // занадто короткий жест
                if(onUnrecognized) onUnrecognized("VerticalShort");
            }
            else if(ady/dt < minSwipeSpeed) { // занадто повільний
                if(onUnrecognized) onUnrecognized("VerticalSlow");
            }
            else if(dy > 0) {
                if(onSwipeBottom) onSwipeBottom();
            }
            else {
                if(onSwipeTop) onSwipeTop();
            }
        }
        else {  // невизначена орієнтація (близько до діагоналі)
            if(onUnrecognized) onUnrecognized("Diagonal");
        }
        startEvent.current = null;
    }; 

    return <TouchableWithoutFeedback onPressIn={onGestureStart} onPressOut={onGestureFinish}>
        {children}
    </TouchableWithoutFeedback>;
}

