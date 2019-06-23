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
        created:              PropTypes.number.isRequired,
        _deletePost:          PropTypes.func.isRequired,
        avatar:               PropTypes.string.isRequired,
        firstName:            PropTypes.string.isRequired,
        lastName:             PropTypes.string.isRequired,
        currentUserFirstName: PropTypes.string.isRequired,
        currentUserLastName:  PropTypes.string.isRequired,
    };

    _handleDelete = () => {
        const { id, _deletePost } = this.props;

        _deletePost(id);
    }

    _getCross = () => {
        const {
            firstName,
            lastName,
            currentUserFirstName,
            currentUserLastName,
        } = this.props;

        return `${firstName} ${lastName}` === `${currentUserFirstName} ${currentUserLastName}` ? (
            <button
                className = { Styles.cross }
                onClick = { this._handleDelete }
            />
        ) : null;
    }

    render() {
        const {
            comment,
            created,
            avatar,
            firstName,
            lastName,
        } = this.props;

        const cross = this._getCross();

        return (
            <section className = { Styles.post }>
                <img src = { avatar } />
                <a>{ `${firstName} ${lastName}` }</a>
                <time>{moment.unix(created).format('MMMM D h:mm:ss a')}</time>
                <p>{ comment }</p>
                { cross }
            </section>
        );
    }
}
