// Core
import React from 'react';
import { string } from 'prop-types';
import { Transition } from 'react-transition-group';
import { fromTo } from 'gsap';

// Instruments
import Styles from './styles.m.css';
import { withProfile } from 'components/HOC/withProfile';

let Postman = ({ avatar, currentUserFirstName }) => {
    const animatePostmanEnter = (postman) => {
        fromTo(postman, 1, { x: 280 }, { x: 0 });
    };

    const animatePostmanLeave = (postman) => {
        fromTo(postman, 1, { x: 0 }, { x: 280 });
    };

    return (
        <Transition
            appear
            in
            timeout = { 4000 }
            onEntered = { animatePostmanLeave }
            onEntering = { animatePostmanEnter }>
            <section className = { Styles.postman }>
                <img src = { avatar } />
                <span>Welcome online, { currentUserFirstName }</span>
            </section>
        </Transition>
    );
};

Postman.propTypes = {
    avatar:               string.isRequired,
    currentUserFirstName: string.isRequired,
};

Postman = withProfile(Postman);

export { Postman };
