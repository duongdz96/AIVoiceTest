import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function IconPremium(props) {
  return (
    <Svg
      width={13}
      height={12}
      viewBox='0 0 13 12'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}>
      <Path
        d='M9.159 0l.725 1.375 1.359.733-1.359.734-.725 1.374-.725-1.374-1.359-.734 1.36-.733L9.158 0zM4.213 1.737l1.465 2.78L8.426 6 5.678 7.483l-1.465 2.78-1.465-2.78L0 6l2.748-1.483 1.465-2.78zm6.411 6.672L9.71 6.672l-.916 1.737-1.718.927 1.718.927L9.709 12l.915-1.737 1.718-.927-1.718-.927z'
        fill='#fff'
      />
    </Svg>
  );
}

export default IconPremium;
