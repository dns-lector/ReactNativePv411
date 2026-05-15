import { StyleSheet } from "react-native";
import Colors from "../../../features/theme/Colors";

const AnimStyle = StyleSheet.create({
    container: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around",
    },
    block: {
        padding: 10.0,
        margin: 25.0,
    },
    square: {
        backgroundColor: Colors.onSecondary,
        width: 100.0,
        height: 100.0,
    },
    title: {
        color: Colors.onPrimary,
        textAlign: "center",
    },
});

export default AnimStyle;
