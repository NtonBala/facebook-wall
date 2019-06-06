//Component that follows online status with the help of web sockets

//Core
import React, { Component } from 'react';

//Components
import { Consumer } from 'components/HOC/withProfile';

//Instruments
import Styles from './styles.m.css';

export class StatusBar extends Component {
    render() {
        return (
            <Consumer>
                {(context) => (
                    <section className = { Styles.statusBar }>
                        <button>
                            <img src = { context.avatar }/>
                            <span>{ context.currentUserFirstName }</span>
                                &#160;
                            <span>{ context.currentUserLastName }</span>
                        </button>
                    </section>
                )}
            </Consumer>
        );
    }
}
