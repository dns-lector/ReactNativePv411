import { StyleSheet } from "react-native";
import Colors from "../../../features/theme/Colors";

const RateStyle = StyleSheet.create({
    container: {

    },
    pageTitle: {
        color: Colors.onPrimary,
        textAlign: "center",
        paddingVertical: 5.0,
    },
    ratesContainer: {
        paddingHorizontal: 10.0,
    },
    rateItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 5.0,
    },
    rateItemOdd: {
        backgroundColor: Colors.primary,
    },
    rateItemEven: {
        backgroundColor: Colors.secondary,
    },
    rateItemCc: {
        flex: 1,
        color: Colors.onSecondary,
        paddingLeft: 5.0,
    },
    rateItemTxt: {
        flex: 5,
        color: Colors.onSecondary,
    },
    rateItemRate: {
        flex: 2,
        color: Colors.onSecondary,
    },
});

export default RateStyle;
