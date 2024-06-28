import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function IconLock(props) {
  return (
    <Svg
      width="15"
      height="19"
      viewBox="0 0 15 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M12.1875 6.65V4.75C12.1875 2.09 10.125 0 7.5 0C4.875 0 2.8125 2.09 2.8125 4.75V6.65C1.21875 6.65 0 7.885 0 9.5V16.15C0 17.765 1.21875 19 2.8125 19H12.1875C13.7812 19 15 17.765 15 16.15V9.5C15 7.885 13.7812 6.65 12.1875 6.65ZM4.6875 4.75C4.6875 3.135 5.90625 1.9 7.5 1.9C9.09375 1.9 10.3125 3.135 10.3125 4.75V6.65H4.6875V4.75Z"
        fill="white" />
    </Svg>

  );
}

export default IconLock;
