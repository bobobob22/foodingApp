import React, { useEffect } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackHeaderLeftButtonProps } from '@react-navigation/stack';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import MenuIcon from '../../components/MenuIcon/MenuIcon'


const ContactScreen = (props) => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerLeft: (props: StackHeaderLeftButtonProps) => (<MenuIcon />)
    });
  }, []);

  return (
    <ScrollView>
      <View style={styles.screen}>
        <Text>Contact screen !</Text>
      </View>
      <View>
        <Button
          buttonStyle={styles.button}
          containerStyle={styles.containerButton}
          title="Go to hello aaa screen"
          onPress={() => props.navigation.push('TestScreeenek')}
          icon={
            <Icon
              name="arrow-right"
              size={15}
              color="white"
              style={{ paddingRight: 10 }}
            />
          }
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'red',
  },
  containerButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    color: 'red',
    backgroundColor: 'red',
  },
});

export default ContactScreen;
