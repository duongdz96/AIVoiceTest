import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function GenerateVoice(props) {
  return (
    <Svg
      width={14}
      height={14}
      viewBox='0 0 14 14'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}>
      <Path
        d='M7 0a.778.778 0 01.772.687l.006.09v12.446a.778.778 0 01-1.55.091l-.006-.091V.778A.778.778 0 017 0zM3.889 2.333a.778.778 0 01.778.778v7.779a.778.778 0 01-1.556 0V3.11a.778.778 0 01.778-.778zm6.222 0a.778.778 0 01.778.778v7.779a.778.778 0 01-1.556 0V3.11a.778.778 0 01.778-.778zM.778 4.667a.778.778 0 01.778.778v3.111a.778.778 0 01-1.556 0V5.445a.778.778 0 01.778-.778zm12.444 0a.778.778 0 01.773.687l.005.09v3.112a.778.778 0 01-1.55.091l-.006-.09V5.444a.778.778 0 01.778-.778z'
        fill='#F0F7FF'
      />
    </Svg>
  );
}

export default GenerateVoice;
