import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function Playicon(props) {
  return (
    <Svg
      width={24}
      height={40}
      viewBox='0 0 43 49'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}>
      <Path
        d='M41.5 21.9019C43.5 23.0566 43.5 25.9434 41.5 27.0981L4.75 48.3157C2.75 49.4704 0.250001 48.027 0.250001 45.7176L0.25 3.28238C0.25 0.972981 2.75 -0.470398 4.75 0.684302L41.5 21.9019Z'
        fill='#ECE9E9'
      />
    </Svg>
  );
}

export default Playicon;
