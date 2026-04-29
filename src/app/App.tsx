import { SafeAreaProvider, SafeAreaView  } from 'react-native-safe-area-context';
import Layout from './ui/Layout';
import AppStyle from './ui/AppStyle';
import { useEffect, useState } from 'react';
import IRoute from '../features/router/model/IRoute';
import { BackHandler } from 'react-native';
import AppContext from '../features/context/AppContext';

export default function App() {
  const [history, setHistory] = useState<Array<IRoute>>([]);
  const [activeRoute, setActiveRoute] = useState<IRoute>({page: "home"});

  const navigate = (route:IRoute|string) => {
    let newRoute:IRoute;
    if(typeof route == "string") {
      if(route == "-1") {
        if(history.length == 0) {
          BackHandler.exitApp();
        }
        else {
          setActiveRoute(history.pop()!);
          setHistory([...history]);
        }
        return;
      }
      else {
        newRoute = {
          page: route 
        };
      }
    }
    else {
      newRoute = route;
    }
    if(newRoute.page != activeRoute.page || newRoute.slug != activeRoute.slug) {
      setHistory([...history, activeRoute]);
      setActiveRoute(newRoute);
    }    
  };

  const backAction = () => {
    navigate("-1");
    return true;
  }; 

  useEffect(() => { console.log(history) }, [history]);

  useEffect(() => { 
    const handler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => handler.remove();
  }, [backAction]);

  return <AppContext.Provider value={{navigate, activeRoute}}>
    <SafeAreaProvider>
      <SafeAreaView style={AppStyle.container}>
        <Layout />
      </SafeAreaView>
    </SafeAreaProvider>
  </AppContext.Provider>;
}

/*
Маршрутизація. Загальні ідеї
- необхідно вести історію переходів, причому
   мати можливість не поміщувати (або вилучати)
   з неї певні сторінки (автентифікація, повідомлення
   про помилки, сторінка 404 тощо)
- опрацювання системної кнопки "назад", оскільки
   за замовчанням вона перемикає застосунки
- передача даних до сторінки (слаг або навіть
   об'єкти за посиланням)
- початкове розгалуження - перехід за хотлінками
*/