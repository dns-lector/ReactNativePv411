import { Image, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import LayoutStyle from "./LayoutStyle";
import { useContext } from "react";
import AppContext from "../../features/context/AppContext";
import Home from "../../pages/home/Home";
import Calc from "../../pages/calc/Calc";
import Rate from "../../pages/rate/Rate";
import Anim from "../../pages/anim/Anim";
import Game from "../../pages/game/Game";

export default function Layout() {
    const {navigate, activeRoute} = useContext(AppContext);
    const {width, height} = useWindowDimensions();

    return <>
    {width < height && 
        <View style={LayoutStyle.topBar}>
            <TouchableOpacity onPress={() => navigate("-1")}>
                <Text style={LayoutStyle.topBarBack}>〈</Text>
            </TouchableOpacity>
            <Text style={LayoutStyle.topBarText}>React Native Intro</Text>
            <Text>  </Text>
        </View>
    }
        <View style={LayoutStyle.content}>
            { activeRoute.page == "home" ? <Home />
            : activeRoute.page == "anim" ? <Anim />
            : activeRoute.page == "calc" ? <Calc />
            : activeRoute.page == "game" ? <Game />
            : activeRoute.page == "rate" ? <Rate />
            : <Text>Not found</Text>
            }
        </View>

    {width < height &&         
        <View style={LayoutStyle.bottomBar}>
            <TouchableOpacity onPress={() => navigate("home")}>
                <Image 
                    style={LayoutStyle.bottomBarImg}
                    source={require("../../features/assets/img/home.png")} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigate("calc")}>
                <Image 
                    style={LayoutStyle.bottomBarImg}
                    source={require("../../features/assets/img/calc.png")} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigate("rate")}>
                <Image 
                    style={LayoutStyle.bottomBarImg}
                    source={require("../../features/assets/img/rate.png")} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigate("anim")}>
                <Image 
                    style={LayoutStyle.bottomBarImg}
                    source={require("../../features/assets/img/anim.png")} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigate("game")}>
                <Image 
                    style={LayoutStyle.bottomBarImg}
                    source={require("../../features/assets/img/game.jpg")} />
            </TouchableOpacity>

        </View>
    }
    </>;
}