import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

import { InjectedProps, withIcon } from '~/libs/IconDecorator';

const IconStar = ({
  width,
  height,
  style,
  fill,
}: InjectedProps): JSX.Element => {
  return (
    <Svg
      width='13'
      height='12'
      viewBox='0 0 13 12'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'>
      <Path
        d='M9.15878 0L9.88419 1.37491L11.2427 2.10823L9.88419 2.84155L9.15878 4.21646L8.43448 2.84155L7.07544 2.10767L8.43448 1.37491L9.15878 0ZM4.21284 1.7374L5.67849 4.51724L8.42624 6L5.67849 7.48276L4.21339 10.2626L2.74775 7.48276L0 6L2.74775 4.51724L4.21284 1.7374ZM10.6244 8.40901L9.70888 6.67161L8.79278 8.40901L7.07544 9.3358L8.79278 10.2626L9.70888 12L10.6244 10.2626L12.3418 9.3358L10.6244 8.40901Z'
        fill='white'
      />
    </Svg>
  );
};

export default withIcon(IconStar);
