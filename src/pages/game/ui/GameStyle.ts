import { StyleSheet } from "react-native";
import Colors from "../../../features/theme/Colors";
import GameColors from "./GameColors";

const GameStyle = StyleSheet.create({
    container: {
        // justifyContent: "center",
        alignItems: "center",
    },
    topBlock: {
        flexDirection: "row",
        justifyContent: "space-between",
        height: 70.0,
        marginTop: 5.0,
    },
    logo: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: GameColors.bgColor(2048),
        borderRadius: 5.0,
        marginHorizontal: 5.0,
    },
    logoText: {
        color: GameColors.fgColor(2048),
        fontSize: 32.0,
        fontWeight: 700,
    },
    topNav: {
        flex: 2,
        flexDirection: "column",
        justifyContent: "space-between",
    },
    topScoreLine: {
        flex: 3,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    topScore: {
        flex: 1,
        backgroundColor: "#3C3A33",
        color: Colors.onPrimary,
        textAlign: "center",
        fontSize: 16.0,
        fontWeight: 700,
        borderRadius: 5.0,
        marginRight: 5.0,
    },
    topBtnLine: {
        flex: 2,
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 5.0,
    },
    topBtn: {
        flex: 1,
        backgroundColor: "#F65E3D",
        borderRadius: 5.0,
        marginRight: 5.0,
        justifyContent: "center",
    },
    topBtnText: {
        color: Colors.onPrimary,
        fontSize: 16.0,
        fontWeight: 700,
        textAlign: "center",
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
