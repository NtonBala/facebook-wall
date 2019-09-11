// React
import React, { Component } from 'react';

import { getDisplayName } from '../helpers';

export const withState = (WrappedComponent) => {
    class WithState extends Component {
        state = {
            apples: 0,
        }

        _yieldApples = () => {
            this.setState((state) => {
                return {
                    apples: state.apples + 1,
                };
            });
        }

        render() {
            return (
                <WrappedComponent
                    { ...this.props }
                    { ...this.state }
                    _yieldApples = { this._yieldApples }
                />
            );
        }
    }

    WithState.displayName = `WithState(${getDisplayName(WrappedComponent)})`;

    return WithState;
};
