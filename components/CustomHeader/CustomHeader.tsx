import * as React from 'react';
import { StyleSheet } from 'react-native'
import { Header } from 'react-native-elements'
import MenuIcon from '../MenuIcon/MenuIcon'

interface CustomHeaderProps {
  title: string,
  isHome?: boolean,
}

const CustomHeader: React.FC<CustomHeaderProps> = ({ title, isHome }) => {
  return (
    <Header
      placement="right"
      leftComponent={<MenuIcon />}
      centerComponent={{ text: title, style: styles.centerStyles }}
      rightComponent={{ icon: 'home', color: '#fff' }}
    />
  );
};

const styles = StyleSheet.create({
  centerStyles: {
    color: '#fff',
     justifyContent: 'center',
      alignItems: 'center'
  }
});

export default CustomHeader;