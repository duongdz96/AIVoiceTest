import * as React from 'react';
import Svg, { G, Mask, Path } from 'react-native-svg';

function PreIcon(props) {
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
          d='M42.104 35.25L24.48 23.5l17.625-11.75v23.5zm-19.583 0L4.896 23.5 22.52 11.75v23.5zm-3.917-7.344v-8.812L11.946 23.5l6.658 4.406zm19.584 0v-8.812L31.529 23.5l6.659 4.406z'
          fill='#fff'
        />
      </G>
    </Svg>
  );
}

export default PreIcon;
