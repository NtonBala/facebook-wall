// React
import React, { Component } from 'react';

import { getDisplayName } from '../helpers';

export const withState = ({ stateName, stateValue, stateUpdaterName, stateUpdater }) => (
    WrappedComponent,
) => {
    class WithState extends Component {
        state = {
            // Computed properties allow also to write inside [] any JS expression
            // e.g. 2 + 2 or function call...
            [ stateName ]: stateValue,
        };

        [stateUpdaterName] = () => {
            this.setState(stateUpdater);
        };

        render() {
            const updatersToForward = {
                [ stateUpdaterName ]: this[ stateUpdaterName ],
            };

            return (
                <WrappedComponent
                    { ...this.props }
                    { ...this.state }
                    { ...updatersToForward }
                />
            );
        }
    }

    WithState.displayName = `WithState(${getDisplayName(WrappedComponent)})`;

    return WithState;
};
