import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function TextToSpeech(props) {
  return (
    <Svg
      width={14}
      height={14}
      viewBox='0 0 14 14'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}>
      <Path
        d='M7.002 0a7.004 7.004 0 016.834 5.494A6.999 6.999 0 016.88 14a7.004 7.004 0 01-3.04-.751l-.106-.057-3.19.796A.437.437 0 010 13.601v-.072l.012-.072.797-3.189-.056-.105a6.955 6.955 0 01-.726-2.526l-.022-.334L0 7a6.999 6.999 0 017.002-7zm.438 7.875H4.814l-.079.007a.438.438 0 000 .861l.079.007H7.44l.078-.007a.438.438 0 000-.86l-.078-.008zM9.19 5.25H4.814l-.079.007a.438.438 0 000 .861l.079.007H9.19l.079-.007a.438.438 0 000-.86L9.19 5.25z'
        fill='#F0F7FF'
        fillOpacity={0.8}
      />
    </Svg>
  );
}

export default TextToSpeech;
