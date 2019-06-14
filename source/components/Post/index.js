// Core
import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

// Components
import { Consumer } from 'components/HOC/withProfile';

// Instruments
import Styles from './styles.m.css';

export class Post extends Component {
    static propTypes = {
        comment:     PropTypes.string.isRequired,
        created:     PropTypes.object.isRequired,
        _deletePost: PropTypes.func.isRequired,
    };

    render() {
        const { comment, created, _deletePost } = this.props;

        return (
            <Consumer>
                {(context) => (
                    <section className = { Styles.post }>
                        <img src = { context.avatar } />
                        <a>
                            { `${context.currentUserFirstName} ${
                                context.currentUserLastName}` }
                        </a>
                        <time>{moment.unix(created).format('MMMM D h:mm:ss a')}</time>
                        <p>{ comment }</p>
                        <button
                            className = 'cross'
                            onClick = { _deletePost }
                        />
                    </section>
                )}
            </Consumer>
        );
    }
}
