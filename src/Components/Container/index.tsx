import * as React from 'react';
import * as cn from 'classnames';

import './index.css';

export enum Sizes {
    small = 'small',
    medium = 'medium',
    large = 'large',
}

export interface ContainerProps {
    size?: Sizes;
    className?: string;
}

export default class Container extends React.Component<ContainerProps, {}> {
    render() {
        const { size, children, className } = this.props;

        const classes = cn(
            'container',
            `container--${size || 'medium'}`,
            className
        );

        return <div className={classes}>{children}</div>;
    }
}
