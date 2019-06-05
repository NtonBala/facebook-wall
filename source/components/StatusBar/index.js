//Component that follows online status with the help of web sockets
import React, { Component } from 'react';

import Styles from './styles.m.css';

export class StatusBar extends Component {
    render() {
        return (
            <section className = { Styles.statusBar }/>
        );
    }
}
