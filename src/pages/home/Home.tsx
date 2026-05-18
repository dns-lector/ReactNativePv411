import './ui/HomeStyle';
import { Image, Text, TouchableOpacity, View } from "react-native";
import HomeStyle from './ui/HomeStyle';
import { useContext } from 'react';
import AppContext from '../../features/context/AppContext';

export default function Home() {
    const {navigate} = useContext(AppContext);

    return <View style={HomeStyle.container}>

        <TouchableOpacity style={HomeStyle.item} onPress={() => navigate("calc")}>
            <Image
                style={HomeStyle.img}
                source={require("../../features/assets/img/calc.png")} />
            <Text style={HomeStyle.text}>
                Калькулятор
            </Text>
        </TouchableOpacity>

        <TouchableOpacity style={HomeStyle.item} onPress={() => navigate("rate")}>
            <Image
                style={HomeStyle.img}
                source={require("../../features/assets/img/rate.png")} />
            <Text style={HomeStyle.text}>
                Курси валют
            </Text>
        </TouchableOpacity>

        <TouchableOpacity style={HomeStyle.item} onPress={() => navigate("anim")}>
            <Image
                style={HomeStyle.img}
                source={require("../../features/assets/img/anim.png")} />
            <Text style={HomeStyle.text}>
                Анімації
            </Text>
        </TouchableOpacity>

        <TouchableOpacity style={HomeStyle.item} onPress={() => navigate("game")}>
            <Image
                style={HomeStyle.img}
                source={require("../../features/assets/img/game.jpg")} />
            <Text style={HomeStyle.text}>
                Жести. Гра.
            </Text>
        </TouchableOpacity>

    </View>;
}