import { StyleSheet } from "react-native";
import Colors from "../../../features/theme/Colors";

const GameStyle = StyleSheet.create({
    container: {
        // justifyContent: "center",
        alignItems: "center",
    },
    topBlock: {
        flexDirection: "row",
        justifyContent: "space-between",
        height: 60.0,
    },
    logo: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    logoText: {
        color: Colors.onPrimary,
    },
    topNav: {
        flex: 2,
        flexDirection: "column",
        justifyContent: "space-between",
    },
    topScoreLine: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    topScore: {
        flex: 2,
        backgroundColor: "#3C3A33",
        color: Colors.onPrimary,
    },
    topBtnLine: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    topBtn: {
        flex: 1,
        backgroundColor: "#F65E3D",
    },
    topBtnText: {
        color: Colors.onPrimary,
    },
    label: {
        color: Colors.onPrimary,
        marginVertical: 10.0,
    },
    field: {
        backgroundColor: "#A49381",
        borderRadius: 5.0,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
        alignItems: "center",
        alignContent: "space-evenly",
    },
    tile: {
        borderRadius: 5.0,
        alignItems: "center",
        justifyContent: "center",
    },
    tileText: {
        fontWeight: 900,
    },
});

export default GameStyle;
