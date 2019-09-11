// Core
import React, { Component } from 'react';
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

@hot(module)
export default class App extends Component {
    constructor() {
        super();

        this.state = {
            avatar,
            currentUserFirstName: 'Антон',
            currentUserLastName:  'Балашов',
            isAuthenticated:      false,
            _logout:              this._logout,
        };
    }

    componentDidMount() {
        const isAuthenticated = !!JSON.parse(localStorage.getItem('isAuthenticated'));

        if (isAuthenticated) {
            this._login();
        }
    }

    _login = () => {
        this.setState({
            isAuthenticated: true,
        },
        () => {
            localStorage.setItem('isAuthenticated', JSON.stringify(this.state.isAuthenticated));
        });
    };

    _logout = () => {
        this.setState({
            isAuthenticated: false,
        },
        () => {
            localStorage.setItem('isAuthenticated', JSON.stringify(this.state.isAuthenticated));
        });
    };

    render() {
        const { isAuthenticated } = this.state;

        return (
            <Catcher>

                <Provider value = { this.state }>

                    { isAuthenticated && <StatusBar /> }

                    <Switch>

                        {!isAuthenticated && (
                            <Route
                                path = '/login'
                                render = { (props) => {
                                    return (
                                        <Login
                                            _login = { this._login }
                                            { ...props }
                                        />
                                    );
                                } }
                            />
                        )}

                        {!isAuthenticated && <Redirect to = '/login' />}

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

                </Provider>

            </Catcher>
        );
    }
}
