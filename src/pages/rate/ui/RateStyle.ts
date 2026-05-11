import { StyleSheet } from "react-native";
import Colors from "../../../features/theme/Colors";

const RateStyle = StyleSheet.create({
    container: {

    },
    titleRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 10.0,
    },
    searchView: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderColor: Colors.onSecondary,
        borderWidth: 1.0,
        borderRadius: 3.0,
        margin: 3.0,
        padding: 3.0,
    },
    searchImg: {
        width: 16.0,
        height: 16.0,
        tintColor: Colors.onSecondary
    },
    searchInput: {
        flex: 1,
        color: Colors.onPrimary,
        borderColor: Colors.onSecondary,
        paddingVertical: 0,
        // textAlignVertical: 'top',
    },
    pageTitle: {
        flex: 1,
        color: Colors.onPrimary,
        textAlign: "center",
        paddingVertical: 5.0,
    },
    rateDateBtn: {
        flex: 1,
    },
    rateDate: {
        color: Colors.onPrimary,
        textAlign: "right",
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
