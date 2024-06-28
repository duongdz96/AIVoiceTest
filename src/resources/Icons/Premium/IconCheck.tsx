import * as React from 'react';
import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg';

function IconCheck(props) {
  return (
    <Svg
      width={22}
      height={22}
      viewBox='0 0 22 22'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}>
      <Path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M11 22a11 11 0 100-22 11 11 0 000 22zm-.284-6.551l6.112-7.333L14.95 6.55l-5.255 6.306-2.72-2.721-1.728 1.728 3.667 3.667.946.946.856-1.028z'
        fill='url(#paint0_linear_10_6762)'
      />
      <Defs>
        <LinearGradient
          id='paint0_linear_10_6762'
          x1={11}
          y1={0}
          x2={11}
          y2={22}
          gradientUnits='userSpaceOnUse'>
          <Stop stopColor='#E8849A' />
          <Stop offset={1} stopColor='#A84BB5' />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}

export default IconCheck;
