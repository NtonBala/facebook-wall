import React, { Component } from 'react';
import moment from 'moment';

import avatar from 'theme/assets/lisa';

export class Post extends Component {
    render() {
        return (
            <section>
                <img src = { avatar } />
                <a>Lisa Simpson</a>
                <time>{moment().format('MMMM D h:mm:ss a')}</time>
                <p>Howdy!</p>
            </section>
        );
    }
}
