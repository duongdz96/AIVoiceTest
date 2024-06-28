import * as React from 'react';
import Svg, { G, Mask, Path, Rect } from 'react-native-svg';

import { InjectedProps, withIcon } from '~/libs/IconDecorator';

const IconDropDown = ({
    width,
    height,
    style,
    fill,
}: InjectedProps): JSX.Element => {
    return (
        <Svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Mask id="mask0_10_8824" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="23" height="23">
                <Rect width="23" height="23" fill="#D9D9D9" />
            </Mask>
            <G mask="url(#mask0_10_8824)">
                <Path d="M11.4998 14.4118L6.08154 8.99359L7.09146 7.98367L11.4998 12.392L15.9081 7.98367L16.918 8.99359L11.4998 14.4118Z" fill="white" />
            </G>
        </Svg>

    );
};

export default withIcon(IconDropDown);
