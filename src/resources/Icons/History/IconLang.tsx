import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

import { InjectedProps, withIcon } from '~/libs/IconDecorator';

const IconLang = ({
  width,
  height,
  style,
  fill,
}: InjectedProps): JSX.Element => {
  return (
    <Svg width="31" height="30" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Path d="M28 0H12V5H16V7H3C1.3 7 0 8.3 0 10V21C0 22.7 1.3 24 3 24H4V29.1L10.3 24H17V17H28C29.7 17 31 15.7 31 14V3C31 1.3 29.7 0 28 0ZM10.8 19.9L10.3 18.3H7.2L6.6 19.9H4.2L7.5 11H9.9L13.2 19.9H10.8ZM26 12V14C24.7 14 23.3 13.6 22.1 13C20.9 13.6 19.5 13.9 18.1 14L18 12C18.7 12 19.4 11.9 20.1 11.7C19.2 10.8 18.6 9.7 18.3 8.5H20.4C20.7 9.4 21.3 10.1 22 10.7C23.1 9.8 23.8 8.5 23.9 7H17.9V5H20.9V3H22.9V5H26.2L26.3 6C26.4 8.1 25.6 10.2 24.1 11.7C24.8 11.9 25.4 12 26 12Z" fill="white" />
    </Svg>
  );
};

export default withIcon(IconLang);
