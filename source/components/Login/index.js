// Core
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Instruments
import Styles from './styles.m.css';

export class Login extends Component {
    render() {
        return (
            <section className = { Styles.login }>

                <Link to = '/profile'>Login</Link>

            </section>
        );
    }
}
