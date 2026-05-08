import { Image, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import LayoutStyle from "./LayoutStyle";
import { useContext } from "react";
import AppContext from "../../features/context/AppContext";
import Home from "../../pages/home/Home";
import Calc from "../../pages/calc/Calc";
import Rate from "../../pages/rate/Rate";

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
            : activeRoute.page == "calc" ? <Calc />
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

        </View>
    }
    </>;
}