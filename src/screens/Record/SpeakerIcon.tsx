import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SpeakerIcon(props) {
  return (
    <Svg
      width={33}
      height={26}
      viewBox='0 0 33 26'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}>
      <Path
        d='M22.3 8.188c1.933 2.444 1.933 7.18 0 9.625m4.35-14.438c5.783 5.236 5.817 14.049 0 19.25M2 17.07V8.93c0-.79.65-1.43 1.45-1.43h5.2c.192 0 .381-.038.558-.11.176-.072.335-.177.467-.31l4.35-4.658c.913-.902 2.475-.262 2.475 1.012v19.132c0 1.284-1.58 1.918-2.488.998l-4.336-4.632a1.422 1.422 0 00-.471-.318 1.488 1.488 0 00-.567-.114H3.45c-.8 0-1.45-.64-1.45-1.431z'
        stroke='#fff'
        strokeWidth={3}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  );
}

export default SpeakerIcon;
