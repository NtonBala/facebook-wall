// Core
import React, { Component, Fragment } from 'react';
import { hot } from 'react-hot-loader';
import { Switch, Route, Redirect } from 'react-router-dom';

// Components
import { Feed } from 'components/Feed';
import { Profile } from 'components/Profile';
import { Login } from 'components/Login';
import { Provider } from 'components/HOC/withProfile';
import { Catcher } from 'components/Catcher';
import { StatusBar } from 'components/StatusBar';

// Instruments
import avatar from 'theme/assets/bart';

const options = {
    currentUserFirstName: 'Антон',
    currentUserLastName:  'Балашов',
    avatar,
};

const haveAccess = !!JSON.parse(localStorage.getItem('haveAccess'));

@hot(module)
export default class App extends Component {
    constructor() {
        super();

        this._toggleAccess = () => {
            this.setState(
                (state) => {
                    return {
                        haveAccess: !state.haveAccess,
                    };
                },
                () => {
                    localStorage.setItem('haveAccess', JSON.stringify(this.state.haveAccess));
                },
            );
        };

        this.state = {
            haveAccess:    haveAccess,
            _toggleAccess: this._toggleAccess,
        };
    }

    _renderPublicRoutes () {
        return (
            <Switch>

                <Route
                    component = { Login }
                    path = '/login'
                />

                <Redirect to = '/login' />

            </Switch>
        );
    }

    _renderPrivateRoutes () {
        return (
            <Switch>

                <Route
                    component = { Feed }
                    path = '/feed'
                />

                <Route
                    component = { Profile }
                    path = '/profile'
                />

                <Redirect to = '/feed' />

            </Switch>
        );
    }

    render() {
        const { haveAccess, _toggleAccess } = this.state;

        const profileContext = {
            ...options,
            haveAccess,
            _toggleAccess,
        };

        return (
            <Catcher>

                <Provider value = { profileContext }>
                    { haveAccess && <StatusBar /> }

                    {haveAccess
                        ? this._renderPrivateRoutes()
                        : this._renderPublicRoutes()
                    }

                </Provider>

            </Catcher>
        );
    }
}
