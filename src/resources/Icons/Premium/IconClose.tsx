import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function IconClose(props) {
  return (
    <Svg
      width={11}
      height={11}
      viewBox='0 0 11 11'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}>
      <Path
        d='M3.25.09l2.2 3.719h.085L7.745.09h2.605L7.02 5.545 10.426 11H7.771L5.535 7.277h-.086L3.212 11H.57l3.415-5.455L.635.091h2.614z'
        fill='#ECE9E9'
      />
    </Svg>
  );
}

export default IconClose;
