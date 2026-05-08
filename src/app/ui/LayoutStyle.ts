import { StyleSheet } from "react-native";
import Colors from "../../features/theme/Colors";

const LayoutStyle = StyleSheet.create({
    topBar: {
        width: "100%",
        height: 40.5,   // dip - density independent pixel
        backgroundColor: "#555",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    topBarBack: {
        color: Colors.onPrimary,
        fontSize: 18.0,
    },
    topBarText: {
        color: Colors.onPrimary,
    },
    content: {
        flex: 1,
        backgroundColor: Colors.primary,
    },
    bottomBar: {
        width: "100%",
        height: 50,
        backgroundColor: "#555",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
    },
    bottomBarImg: {
        height: 34.0,
        width: 34.0,
        tintColor: Colors.onPrimary,
    },
});

export default LayoutStyle;
