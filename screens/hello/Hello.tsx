import React, { useEffect } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { StackHeaderLeftButtonProps } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

// import MenuIcon from '../../components/MenuIcon/MenuIcon'
import CustomHeader from '../../components/CustomHeader/CustomHeader';
import { Colors } from '../../constants/Colors';

const HelloScreen = (props) => {
  const navigation = useNavigation();

  // useEffect(() => {
  //   navigation.setOptions({
  //     headerLeft: (props: StackHeaderLeftButtonProps) => (<MenuIcon />)
  //   });
  // }, []);

  return (
    <ScrollView>
      {/* <CustomHeader title="Hello Screen" isHome={false} /> */}
      <View style={styles.screen}>
        <Text>It is home screen ! Do whatever you want to do</Text>
      </View>
      <View>
        {/* <Button
          buttonStyle={styles.button}
          containerStyle={styles.containerButton}
          title="Go to product screen"
          onPress={() => navigation.navigate('Product')}
          icon={
            <Icon
              name="arrow-right"
              size={15}
              color="white"
              style={{ paddingRight: 10 }}
            />
          }
        /> */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
  },
  button: {
    backgroundColor: Colors.primary,
  },
  containerButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});

export default HelloScreen;
