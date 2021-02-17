import * as React from 'react';
import { useCallback } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { GestureResponderEvent } from "react-native";
import IoIcon from 'react-native-vector-icons/Ionicons';
import { DrawerActions, useNavigation } from '@react-navigation/native';


import { mainNavigate } from '../../navigation/AppNavigator';


export type onPressFunc = (event: GestureResponderEvent) => void;


export default function MenuIcon(props) {
  const { isNotWithDrawer } = props;
  const navigation = useNavigation();

  const openDrawer = useCallback(() => {
    console.log("OPEN")
    if (isNotWithDrawer) {
      navigation.goBack();
    } else {
      navigation.dispatch(DrawerActions.toggleDrawer());
    }
  }, [navigation]);

  return (
    <TouchableOpacity onPress={openDrawer} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ margin: 5, padding:0,  flex: 1, alignItems: 'center', justifyContent: 'center', height: 40 }}>
        <IoIcon.Button
          name={isNotWithDrawer ? "arrow-back" : "menu"}
          size={23}
          backgroundColor="#c2c2c2"
          onPress={() => openDrawer()}
          style={{ width: 30, height: 30, padding: 2, paddingRight: 0, margin: 0, alignSelf:'center', justifyContent: 'center', alignItems: 'center' }}
        >
        </IoIcon.Button>
      </View>
    </TouchableOpacity>
  );
};