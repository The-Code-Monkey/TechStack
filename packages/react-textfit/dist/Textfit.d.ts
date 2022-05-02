import PropTypes from 'prop-types';
import React from 'react';
declare function noop(): void;
export default class TextFit extends React.Component {
    static propTypes: {
        children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        text: PropTypes.Requireable<string>;
        min: PropTypes.Requireable<number>;
        max: PropTypes.Requireable<number>;
        mode: PropTypes.Requireable<string>;
        forceSingleModeWidth: PropTypes.Requireable<boolean>;
        throttle: PropTypes.Requireable<number>;
        onReady: PropTypes.Requireable<(...args: any[]) => any>;
        autoResize: PropTypes.Requireable<boolean>;
        style: PropTypes.Requireable<object>;
        forceWidth: PropTypes.Requireable<boolean>;
    };
    static defaultProps: {
        min: number;
        max: number;
        mode: string;
        forceSingleModeWidth: boolean;
        throttle: number;
        autoResize: boolean;
        onReady: typeof noop;
    };
    _child: any;
    _parent: any;
    pid: any;
    constructor(props: any);
    state: {
        fontSize: any;
        ready: boolean;
    };
    componentDidMount(): void;
    componentDidUpdate(prevProps: any): void;
    componentWillUnmount(): void;
    handleWindowResize: (context: any) => any;
    process(): void;
    render(): JSX.Element;
}
export {};
