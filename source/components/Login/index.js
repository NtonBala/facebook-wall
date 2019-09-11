// Core
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Components
import { withProfile } from 'components/HOC/withProfile';

// Instruments
import Styles from './styles.m.css';

@withProfile
export class Login extends Component {
    static propTypes = {
        _login: PropTypes.func.isRequired,
    }

    render() {
        return (
            <section className = { Styles.login }>

                <button onClick = { this.props._login }>Login</button>

            </section>
        );
    }
}
