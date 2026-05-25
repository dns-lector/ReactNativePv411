import { Animated, GestureResponderEvent, Pressable, Text, TouchableOpacity, TouchableWithoutFeedback, useWindowDimensions, View } from "react-native";
import GameStyle from "./ui/GameStyle";
import { ReactNode, useEffect, useRef, useState } from "react";
import GameColors from "./ui/GameColors";
import RNFS from "react-native-fs";
import Base64 from "../../shared/base64/Base64";

const Directions = {
  left:   "left",
  right:  "right",
  top:    "top",  
  bottom: "bottom",  
} as const;

type Directions = typeof Directions[keyof typeof Directions]

const TileAnimations = {
  none:     "none",
  spawn:    "spawn",
  collapse: "collapse",
} as const;

type TileAnimations = typeof TileAnimations[keyof typeof TileAnimations]



interface IGameState {
    label: string,
    score: number,
    field: Array<number>,
    prevField: Array<number>|null,
    bestScore: number,
    anim: Array<TileAnimations>, 
}

const opacityValues = Array.from({length:16}, () => new Animated.Value(1.0));
const scaleValues = Array.from({length:16}, () => new Animated.Value(1.0));

export default function Game() {
    const {width, height} = useWindowDimensions();
    const shortestSide = width < height ? width : height;
    const fieldSize = shortestSide * 0.95;
    const N = 4;   // розмірність поля
    const [gameState, setGameState] = useState<IGameState>({
        label: "Hello",
        score: 0,
        bestScore: 200,
        field: [
            0, 0, 2, 0,
            2, 0, 2, 2,
            0, 2, 0, 2,
            2, 2, 2, 2
        ],
        prevField: null,
        anim: Array.from({length:N*N}, () => TileAnimations.none),
    });

    const encryptScore = (score:number):string => {
        // захист: обчислюємо код числа (base64 або хеш)
        // додаємо разом з числом через роздільний знак
        // перетворюємо з паролем
        let str = score.toString();
        str += ' ' + Base64.encode(str);
        str = Base64.encode(str);
        return str;
    };
    const decryptScore = (enc:string):number|null => {
        let str = Base64.decode(enc);
        let parts = str.split(' ');
        if(parts.length != 2) return null;
        if(Base64.encode(parts[0]) != parts[1]) return null;
        return Number(parts[0]);
    }

    const loadBestScore = async () => {
        const path = RNFS.DocumentDirectoryPath + "/best.score";
        if(await RNFS.exists(path)) {
            const content = await RNFS.readFile(path, 'utf8');
            // console.log(content);
            const score = decryptScore(content);
            if(score) {
                setGameState({...gameState, bestScore: score});
            }
        }
        else {
            let str = encryptScore(gameState.bestScore);
            RNFS.writeFile(path, str, 'utf8');
        }
    };

    useEffect(() => {
        loadBestScore();
    }, []);

    const spawnTile = () => {
        // збираємо інформацію про індекси всіх порожніх комірок
        const freeTiles = [];
        for(let i=0; i < N*N; i++) {
            if(gameState.field[i] == 0) {
                freeTiles.push(i);
            }
        }
        // перевіряємо що хоч щось знайшлось, інакше - кінець гри
        if(freeTiles.length == 0) {
            return;
        }
        // вибираємо випадковий елемент масиву
        const rndIndex = freeTiles[Math.floor( Math.random() * freeTiles.length )];
        // встановлюємо йому значення: 2 з імовірністю 0.9, 4 - 0.1
        gameState.field[rndIndex] = Math.random() < 0.1 ? 4 : 2;
        // запускаємо анімацію появи на елементі з індексом rndIndex
        gameState.anim[rndIndex] = TileAnimations.spawn;
    }

    const animateField = () => {
        for(let i = 0; i < N * N; i++) {
            if(gameState.anim[i] == TileAnimations.spawn) {
                Animated.sequence([
                    Animated.timing(opacityValues[i], {
                        toValue: 0.1,
                        duration: 0,
                        useNativeDriver: true,
                    }),
                    Animated.timing(opacityValues[i], {
                        toValue: 1.0,
                        duration: 300,
                        useNativeDriver: true,
                    }),
                ]).start();
            }
            else if(gameState.anim[i] == TileAnimations.collapse) {
                Animated.sequence([
                    Animated.timing(scaleValues[i], {
                        toValue: 1.15,
                        duration: 150,
                        useNativeDriver: true,
                    }),
                    Animated.timing(scaleValues[i], {
                        toValue: 1.0,
                        duration: 150,
                        useNativeDriver: true,
                    })
                ]).start();
            }
            gameState.anim[i] = TileAnimations.none;
        }
    }

    const shift = (index1:number, index2:number):boolean => {
        if(gameState.field[index1] == 0 && gameState.field[index2] != 0) {
            gameState.field[index1] = gameState.field[index2];
            gameState.field[index2] = 0;
            gameState.anim[index1] = gameState.anim[index2];
            gameState.anim[index2] = TileAnimations.none;
            return true;
        }
        return false;
    }

    const collapse = (index1:number, index2:number):number => {
        if(gameState.field[index1] != 0 && gameState.field[index2] == gameState.field[index1]) {
            gameState.field[index1] += gameState.field[index2];
            gameState.field[index2] = 0;
            gameState.anim[index1] = TileAnimations.collapse;
            return gameState.field[index1];
        }
        return 0;
    }

    const canMove = (direction:Directions):boolean => {
        switch(direction) {
            case Directions.left:   return canMoveLeft();
            case Directions.right:  return canMoveRight();
            case Directions.top:    return canMoveTop();
            case Directions.bottom: return canMoveBottom();
        }
        throw "Unknown direction";
    }
    const moveScore = (direction:Directions):number => {
        switch(direction) {
            case Directions.left:   return moveLeft();
            case Directions.right:  return moveRight();
            case Directions.top:    return moveTop();
            case Directions.bottom: return moveBottom();
        }
        throw "Unknown direction";  
    }
    const move = (direction:Directions) => {
        if(canMove(direction)) {
            const prevField = [...gameState.field];
            gameState.score += moveScore(direction);            
            spawnTile();
            animateField();
            setGameState({...gameState,
                label: "move " + direction,
                prevField
            });
        } 
        else setGameState({...gameState, label: "NO MOVE " + direction});
    }

    const canMoveLeft = ():boolean => {
        // рух можливий якщо ліворуч від хоч одної ненульової комірки є або ноль або таке ж значення
        for(let r = 0; r < N; r++) {
            for(let c = 1; c < N; c++) {
                let i = r * N + c;
                if(gameState.field[i] != 0 && (
                    gameState.field[i-1] == gameState.field[i] || 
                    gameState.field[i-1] == 0)
                ) {
                    return true;
                }
            }
        }
        return false;
    };
    const shiftLeft = ():void => {
        let wasMove:boolean;
        let i:number;  // індекс у загальному масиві (за рядком та колонкою)

        for(let r = 0; r < N; r++) { 
            do {       
                wasMove = false;     
                for(let c = 0; c < N-1; c++) {
                    i = r * N + c;
                    wasMove ||= shift(i, i+1);
                }
            } while(wasMove);
        }
    }
    const moveLeft = ():number => {
        // [0020] -> [2000]
        // [2200] -> [4000]
        // [2002] -> [4000]
        // [2220] -> [4200]
        // [2022] -> [4200]
        // [2222] -> [4400]
        // [2000] -> no move
        let collapsed = 0;
        // 1. Переміщуємо усе "ліворуч"
        shiftLeft();
        for(let r = 0; r < N; r++) {  // проходимо по кожному рядку окремо (r - рядок)   
            // 2. Виконуємо злиття
            for(let c = 0; c < N-1; c++) {
                let i = r * N + c;
                collapsed += collapse(i, i+1);
            }
        }
        // 3. Переміщуємо усе "ліворуч" після злиття
        if(collapsed > 0) {
            shiftLeft();
        }
        return collapsed;
    };

    const canMoveRight = ():boolean => {
        // рух можливий якщо праворуч від хоч одної ненульової комірки є або ноль або таке ж значення
        for(let r = 0; r < N; r++) {
            for(let c = 0; c < N-1; c++) {
                let i = r * N + c;
                if(gameState.field[i] != 0 && (
                    gameState.field[i+1] == gameState.field[i] || 
                    gameState.field[i+1] == 0)
                ) {
                    return true;
                }
            }
        }
        return false;
    };
    const shiftRight = ():void => {
        let wasMove:boolean;
        let i:number;
        for(let r = 0; r < N; r++) { 
            do {       
                wasMove = false;     
                for(let c = 1; c < N; c++) {
                    i = r * N + c;
                    wasMove ||= shift(i, i-1);
                }
            } while(wasMove);
        }
    }
    const moveRight = ():number => {
        let collapsed = 0;
        shiftRight();
        for(let r = 0; r < N; r++) { 
            for(let c = N-1; c > 0; c--) {   // [0222] -> [0024]
                let i = r * N + c;
                collapsed += collapse(i, i-1);
            }
        }
        if(collapsed > 0) {
            shiftRight();
        }
        return collapsed;
    }; 
    
    const canMoveTop = ():boolean => {
        // рух можливий якщо з гори від хоч одної ненульової комірки є або ноль або таке ж значення
        for(let r = 1; r < N; r++) {
            for(let c = 0; c < N; c++) {
                let i = r * N + c;
                if(gameState.field[i] != 0 && (
                    gameState.field[i-N] == gameState.field[i] || 
                    gameState.field[i-N] == 0)
                ) {
                    return true;
                }
            }
        }
        return false;
    };
    const shiftTop = ():void => {
        let wasMove:boolean;
        let i:number;
        for(let c = 0; c < N; c++) { 
            do {       
                wasMove = false;     
                for(let r = 1; r < N; r++) {
                    i = r * N + c;
                    wasMove ||= shift(i-N, i);  // shift( ind(r-1,c), ind(r,c) )
                }
            } while(wasMove);
        }
    }
    const moveTop = ():number => {
        let collapsed = 0;
        shiftTop();
        for(let c = 0; c < N; c++) {
            for(let r = 1; r < N; r++) {
                let i = r * N + c;
                collapsed += collapse(i-N, i);
            }
        }
        if(collapsed > 0) {
            shiftTop();
        }
        return collapsed;
    };
    
    const canMoveBottom = ():boolean => {
        for(let r = 0; r < N-1; r++) {
            for(let c = 0; c < N; c++) {
                let i = r * N + c;
                if(gameState.field[i] != 0 && (
                    gameState.field[i+N] == gameState.field[i] || 
                    gameState.field[i+N] == 0)
                ) {
                    return true;
                }
            }
        }
        return false;
    };
    const shiftBottom = ():void => {
        let wasMove:boolean;
        let i:number;
        for(let c = 0; c < N; c++) { 
            do {       
                wasMove = false;     
                for(let r = N-1; r > 0; r--) {
                    i = r * N + c;
                    wasMove ||= shift(i, i-N);  // shift( ind(r-1,c), ind(r,c) )
                }
            } while(wasMove);
        }
    }
    const moveBottom = ():number => {
        let collapsed = 0;
        shiftBottom();
        for(let c = 0; c < N; c++) {
            for(let r = N-1; r > 0; r--) {
                let i = r * N + c;
                collapsed += collapse(i, i-N);
            }
        }
        if(collapsed > 0) {
            shiftBottom();
        }
        return collapsed;
    };


    return <View style={GameStyle.container}>
        <View style={GameStyle.topBlock}>
            <View style={GameStyle.logo}>
                <Text style={GameStyle.logoText}>2048</Text>
            </View>
            <View style={GameStyle.topNav}>
                <View style={GameStyle.topScoreLine}>
                    <Text style={GameStyle.topScore}>SCORE{"\n" + gameState.score}</Text>
                    <Text style={GameStyle.topScore}>BEST{"\n" + gameState.bestScore}</Text>
                </View>
                <View style={GameStyle.topBtnLine}>
                    <Pressable style={GameStyle.topBtn}><Text style={GameStyle.topBtnText}>NEW</Text></Pressable>
                    <TouchableOpacity style={GameStyle.topBtn}><Text style={GameStyle.topBtnText}>UNDO</Text></TouchableOpacity>
                </View>
            </View>
        </View>

        <Text  style={GameStyle.label}>{gameState.label}</Text>

        <Swipeable 
                onSwipeBottom={ () => move(Directions.bottom)} 
                onSwipeLeft={ () => move(Directions.left)} 
                onSwipeRight={ () => move(Directions.right)}
                onSwipeTop={ () => move(Directions.top)}>

            <View style={[GameStyle.field, {width: fieldSize, height: fieldSize}]}>
                {gameState.field.map((num, index) => <Animated.View key={index}
                    style={[GameStyle.tile, {
                        backgroundColor: GameColors.bgColor(num),
                        width: 0.21 * fieldSize,
                        height: 0.21 * fieldSize,
                        opacity: opacityValues[index],
                        transform: [{scale: scaleValues[index]}],
                    }]}>
                    <Text style={[GameStyle.tileText, {
                        color: GameColors.fgColor(num),
                        fontSize: num < 10 ? fieldSize * 0.12
                        : num < 100 ? fieldSize * 0.10
                        : num < 1000 ? fieldSize * 0.08
                        : num < 10000 ? fieldSize * 0.07
                        : fieldSize * 0.06,
                    }]}>{num}</Text>
                </Animated.View>)}
            </View>
        </Swipeable> 
    
    </View>;
};

/*
Д.З. Реалізувати стилізацію кнопки UNDO в залежності від можливості
відновлення попереднього стану поля. 
* реалізувати роботу кнопки UNDO
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

/*
Д.З. Реалізувати збереження інформації про час, що пройшов 
після виходу з гри. 
Додати хук руйнування елементу, в ньому зберегти мітку часу. 
При створенні елемента зчитувати збережену мітку та виводити
(label) повідомлення: 
ви були поза грою протягом хх днів, хх годин, хх хвилин
*/
/*
Д.З. Реалізувати функцію, що визначає загальний індекс комірки
за її рядком та колонкою. Модифікувати вирази програми з 
використанням нової ф-ції
shift(i-N, i) -> shift( ind(r-1,c), ind(r,c) )
*/
