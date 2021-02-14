import * as React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { GestureResponderEvent } from "react-native";
import IoIcon from 'react-native-vector-icons/Ionicons';

import { DrawerActions, useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';

export type onPressFunc = (event: GestureResponderEvent) => void;


export default function MenuIcon() {
  const navigation = useNavigation();

  const openDrawer = useCallback(() => {
    navigation.dispatch(DrawerActions.openDrawer());
  }, [navigation]);

  return (
    <TouchableOpacity onPress={openDrawer} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ margin: 5, padding:0,  flex: 1, alignItems: 'center', justifyContent: 'center', height: 40 }}>
        <IoIcon.Button
          name="menu"
          size={23}
          backgroundColor="#c2c2c2"
          onPress={openDrawer}
          style={{ width: 30, height: 30, padding: 2, paddingRight: 0, margin: 0, alignSelf:'center', justifyContent: 'center', alignItems: 'center' }}
        >
        </IoIcon.Button>
      </View>

    </TouchableOpacity>
  );
};