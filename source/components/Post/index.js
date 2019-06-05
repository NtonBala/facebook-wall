import React, { Component } from 'react';
import moment from 'moment';

import avatar from 'theme/assets/lisa';

import Styles from './styles.m.css';

export class Post extends Component {
    render() {
        return (
            <section className = { Styles.post }>
                <img src = { avatar } />
                <a>Lisa Simpson</a>
                <time>{moment().format('MMMM D h:mm:ss a')}</time>
                <p>Howdy!</p>
            </section>
        );
    }
}
