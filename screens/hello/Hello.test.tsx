import React from 'react';
import renderer from 'react-test-renderer';
import { DrawerActions, NavigationContainer } from '@react-navigation/native';

import Hello from './Hello';

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => jest.fn(),
  useNavigationParam: jest.fn(jest.requireActual(
   '@react-navigation/native'
  ).useNavigationParam),
 }));

describe('<App />', () => {
  it('has 1 child', () => {
    const tree = renderer.create(
        <Hello />
    ).toJSON() as any
    console.log('tree', tree);

    expect(tree?.children?.length).toBe(1);
  });
});