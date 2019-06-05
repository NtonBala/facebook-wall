//Component that follows online status with the help of web sockets

//Core
import React, { Component } from 'react';

//Instruments
import Styles from './styles.m.css';
import avatar from 'theme/assets/lisa';

export class StatusBar extends Component {
    render() {
        return (
            <section className = { Styles.statusBar }>
                <button>
                    <img src = { avatar }/>
                    <span>Lisa</span>
                    &nbsp;
                    <span>Simpson</span>
                </button>
            </section>
        );
    }
}
