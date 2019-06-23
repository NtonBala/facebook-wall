//Component that follows online status with the help of web sockets

//Core
import React, { Component } from 'react';
import PropTypes from 'prop-types';

//Components
import { withProfile } from 'components/HOC/withProfile';

//Instruments
import Styles from './styles.m.css';

@withProfile
export class StatusBar extends Component {
    static propTypes = {
        avatar:               PropTypes.string.isRequired,
        currentUserFirstName: PropTypes.string.isRequired,
        currentUserLastName:  PropTypes.string.isRequired,
    };

    render() {
        const { avatar, currentUserFirstName, currentUserLastName } = this.props;

        return (
            <section className = { Styles.statusBar }>
                <button>
                    <img src = { avatar }/>
                    <span>{ currentUserFirstName }</span>
                        &#160;
                    <span>{ currentUserLastName }</span>
                </button>
            </section>
        );
    }
}
