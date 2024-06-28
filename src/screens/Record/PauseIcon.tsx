import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function Playicon(props) {
  return (
    <Svg
      width={18}
      height={35}
      viewBox='0 0 18 35'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}>
      <Path fill='#fff' d='M0 0H5.94286V34.6667H0z' />
      <Path fill='#fff' d='M11.8857 0H17.82856V34.6667H11.8857z' />
    </Svg>
  );
}

export default Playicon;
