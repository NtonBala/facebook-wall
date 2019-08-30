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

@hot(module)
export default class App extends Component {
    state = {
        haveAccess: true,
    }

    _renderPublicRoutes () {
        return (
            <Fragment>

                <Route
                    component = { Login }
                    path = '/login'
                />

                <Redirect to = '/login' />

            </Fragment>
        );
    }

    _renderPrivateRoutes () {
        return (
            <Fragment>

                <Route
                    component = { Feed }
                    path = '/feed'
                />

                <Route
                    component = { Profile }
                    path = '/profile'
                />

                <Redirect to = '/feed' />

            </Fragment>
        );
    }

    render() {
        const { haveAccess } = this.state;

        return (
            <Catcher>

                <Provider value = { options }>
                    { haveAccess && <StatusBar /> }

                    <Switch>
                        {haveAccess
                            ? this._renderPrivateRoutes()
                            : this._renderPublicRoutes()
                        }
                    </Switch>

                </Provider>

            </Catcher>
        );
    }
}
