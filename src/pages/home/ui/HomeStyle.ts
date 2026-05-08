import { StyleSheet } from "react-native";
import Colors from "../../../features/theme/Colors";

const HomeStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#444",
  },
  item: {
    borderColor: Colors.onSecondary,
    borderWidth: 1.5,
    borderRadius: 7.0,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20.0,
    marginVertical: 10.0,
  },
  img: {
    width: 42.0,
    height: 42.0,
    tintColor: Colors.onPrimary,
    marginHorizontal: 20.0,
    marginVertical: 10.0,
  },
  text: {
    color: Colors.onPrimary,
    fontSize: 20.0,
  },
});

export default HomeStyle;
