// Core
import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

// Components
import { Feed } from 'components/Feed';
import { Provider } from 'components/HOC/withProfile';
import { Catcher } from 'components/Catcher';

// Instruments
import avatar from 'theme/assets/bart';

const options = {
    currentUserFirstName: 'Антон',
    currentUserLastName:  'Балашов',
    avatar,
};

@hot(module)
export default class App extends Component {
    render() {
        return (
            <Catcher>
                <Provider value = { options }>
                    <Feed { ...options }/>
                </Provider>
            </Catcher>
        );
    }
}
