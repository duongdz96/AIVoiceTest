import * as React from 'react';
import Svg, { G, Mask, Path, Rect } from 'react-native-svg';

import { InjectedProps, withIcon } from '~/libs/IconDecorator';

const IconBack = ({
  width,
  height,
  style,
  fill,
}: InjectedProps): JSX.Element => {
  return (
    <Svg
      width='34'
      height='34'
      viewBox='0 0 34 34'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'>
      <G opacity='0.2'>
        <Path
          d='M33.518 17.1492C33.518 8.10892 26.1894 0.78033 17.1491 0.78033C8.10886 0.78033 0.780272 8.10892 0.780273 17.1492C0.780273 26.1895 8.10886 33.518 17.1491 33.518C26.1894 33.518 33.518 26.1895 33.518 17.1492Z'
          fill='#899CD5'
          fill-opacity='0.8'
        />
        <Path
          d='M17.1491 1.28033C25.9133 1.28033 33.018 8.38506 33.018 17.1492C33.018 25.9133 25.9133 33.018 17.1491 33.018C8.385 33.018 1.28027 25.9133 1.28027 17.1492C1.28027 8.38507 8.385 1.28033 17.1491 1.28033Z'
          stroke='#F0F7FF'
          stroke-opacity='0.8'
        />
      </G>
      <Mask
        id='mask0_1_1197'
        style='mask-type:alpha'
        maskUnits='userSpaceOnUse'
        x='9'
        y='6'
        width='14'
        height='22'>
        <Rect x='9' y='6' width='14' height='22' fill='#D9D9D9' />
      </Mask>
      <G mask='url(#mask0_1_1197)'>
        <Path
          d='M20 27L10 17L20 7L21.775 8.775L13.55 17L21.775 25.225L20 27Z'
          fill='#ECE9E9'
        />
      </G>
    </Svg>
  );
};

export default withIcon(IconBack);
