// Core
import React from 'react';
import { string } from 'prop-types';

// Instruments
import Styles from './styles.m.css';
import { withProfile } from 'components/HOC/withProfile';

let Postman = ({ avatar, currentUserFirstName }) => {
    return (
        <section className = { Styles.postman }>
            <img src = { avatar } />
            <span>Welcome online, { currentUserFirstName }</span>
        </section>
    );
};

Postman.propTypes = {
    avatar:               string.isRequired,
    currentUserFirstName: string.isRequired,
};

Postman = withProfile(Postman);

export { Postman };
