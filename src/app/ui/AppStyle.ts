import { StyleSheet } from "react-native";
import Colors from "../../features/theme/Colors";

const AppStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
});

export default AppStyle;
/*
Д.З. Створити сторінку "Не знайдено / 404"
(як окрему сторінку), додати до інтерфейсу
кнопку переходу на таку сторінку. 
* Модифікувати навігатор щоб він не додавав
до історії цю сторінку. 
*/