import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function IconHome(props) {
  return (
    <Svg
      width={20}
      height={20}
      viewBox='0 0 33 33'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}>
      <Path
        d='M14.421.737a3.3 3.3 0 014.158 0l12.586 10.196A4.949 4.949 0 0133 14.773v14.928A3.3 3.3 0 0129.7 33h-4.95a3.3 3.3 0 01-3.3-3.3v-8.248a1.65 1.65 0 00-1.65-1.65h-6.6a1.65 1.65 0 00-1.65 1.65V29.7a3.3 3.3 0 01-3.3 3.3H3.3A3.3 3.3 0 010 29.7V14.778a4.949 4.949 0 011.835-3.848L14.42.737z'
        fill='#525B74'
      />
    </Svg>
  );
}

export default IconHome;
