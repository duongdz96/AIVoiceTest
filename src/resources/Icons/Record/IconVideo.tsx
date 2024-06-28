import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function IconVideo(props) {
  return (
    <Svg
      width={12}
      height={9}
      viewBox='0 0 12 9'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}>
      <Path
        d='M8.143 9H.857a.837.837 0 01-.606-.264A.923.923 0 010 8.1V.9C0 .661.09.432.251.264A.837.837 0 01.857 0h7.286c.227 0 .445.095.606.264C8.909.432 9 .66 9 .9v1.827L11.323.986a.416.416 0 01.614.13c.04.07.063.152.063.234v6.3a.467.467 0 01-.063.233.437.437 0 01-.17.165.411.411 0 01-.444-.034L9 6.274V8.1c0 .239-.09.468-.251.636A.837.837 0 018.143 9z'
        fill='#fff'
      />
    </Svg>
  );
}

export default IconVideo;
