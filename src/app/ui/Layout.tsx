import { Text, TouchableOpacity, View } from "react-native";
import LayoutStyle from "./LayoutStyle";
import { useContext } from "react";
import AppContext from "../../features/context/AppContext";
import Home from "../../pages/home/Home";
import Calc from "../../pages/calc/Calc";

export default function Layout() {
    const {navigate, activeRoute} = useContext(AppContext);

    return <>
        <View style={LayoutStyle.topBar}>
            <TouchableOpacity onPress={() => navigate("-1")}>
                <Text style={LayoutStyle.topBarBack}>〈</Text>
            </TouchableOpacity>
            <Text style={LayoutStyle.topBarText}>React Native Intro</Text>
            <Text>  </Text>
        </View>

        <View style={LayoutStyle.content}>
            { activeRoute.page == "home" ? <Home />
            : activeRoute.page == "calc" ? <Calc />
            : <Text>Not found</Text>
            }
        </View>

        <View style={LayoutStyle.bottomBar}>
            <TouchableOpacity onPress={() => navigate("home")}>
                <Text>Home</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigate("calc")}>
                <Text>Calc</Text>
            </TouchableOpacity>

        </View>
    </>;
}