import * as React from 'react';
import Svg, { G, Mask, Path } from 'react-native-svg';

function NextIcon(props) {
  return (
    <Svg
      width={47}
      height={47}
      viewBox='0 0 47 47'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}>
      <Mask
        id='a'
        style={{
          maskType: 'alpha',
        }}
        maskUnits='userSpaceOnUse'
        x={0}
        y={0}
        width={47}
        height={47}>
        <Path fill='#D9D9D9' d='M0 0H47V47H0z' />
      </Mask>
      <G mask='url(#a)'>
        <Path
          d='M4.896 35.25v-23.5L22.521 23.5 4.896 35.25zm19.583 0v-23.5L42.104 23.5 24.48 35.25zM8.813 27.906L15.47 23.5l-6.658-4.406v8.812zm19.583 0l6.658-4.406-6.658-4.406v8.812z'
          fill='#fff'
        />
      </G>
    </Svg>
  );
}

export default NextIcon;
