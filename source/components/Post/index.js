// Core
import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

// Components
import { withProfile } from 'components/HOC/withProfile';

// Instruments
import Styles from './styles.m.css';

@withProfile
export class Post extends Component {
    static propTypes = {
        id:                   PropTypes.string.isRequired,
        comment:              PropTypes.string.isRequired,
        created:              PropTypes.object.isRequired,
        _deletePost:          PropTypes.func.isRequired,
        avatar:               PropTypes.string.isRequired,
        currentUserFirstName: PropTypes.string.isRequired,
        currentUserLastName:  PropTypes.string.isRequired,
    };

    _handleDelete = () => {
        const { id, _deletePost } = this.props;

        _deletePost(id);
    }

    render() {
        const { comment, created } = this.props;
        const { avatar, currentUserFirstName, currentUserLastName } = this.props;

        return (
            <section className = { Styles.post }>
                <img src = { avatar } />
                <a>
                    { `${currentUserFirstName} ${
                        currentUserLastName}` }
                </a>
                <time>{moment.unix(created).format('MMMM D h:mm:ss a')}</time>
                <p>{ comment }</p>
                <button
                    className = 'cross'
                    onClick = { this._handleDelete }
                />
            </section>
        );
    }
}
