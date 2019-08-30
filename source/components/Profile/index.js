// Core
import React, { Component } from 'react';
import { string } from 'prop-types';

// Components
import { withProfile } from 'components/HOC/withProfile';

// Instruments
import Styles from './styles.m.css';

@withProfile
export class Profile extends Component {
    static propTypes = {
        currentUserFirstName: string.isRequired,
        currentUserLastName:  string.isRequired,
        avatar:               string.isRequired,
    }

    render() {
        const { currentUserFirstName, currentUserLastName, avatar } = this.props;

        return (
            <section className = { Styles.profile }>

                <h1>
                    Welcome, {currentUserFirstName} {currentUserLastName}
                </h1>
                <img src = { avatar } />

            </section>
        );
    }
}
