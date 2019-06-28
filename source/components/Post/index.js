// Core
import React, { Component } from 'react';
import moment from 'moment';
import { string, number, func, array } from 'prop-types';

// Components
import { withProfile } from 'components/HOC/withProfile';
import { Like } from 'components/Like';


// Instruments
import Styles from './styles.m.css';

@withProfile
export class Post extends Component {
    static propTypes = {
        id:                   string.isRequired,
        comment:              string.isRequired,
        created:              number.isRequired,
        likes:                array.isRequired,
        _deletePost:          func.isRequired,
        _likePost:            func.isRequired,
        avatar:               string.isRequired,
        firstName:            string.isRequired,
        lastName:             string.isRequired,
        currentUserFirstName: string.isRequired,
        currentUserLastName:  string.isRequired,
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
            id,
            comment,
            created,
            avatar,
            firstName,
            lastName,
            likes,
            _likePost,
        } = this.props;

        const cross = this._getCross();

        return (
            <section className = { Styles.post }>
                <img src = { avatar } />
                <a>{ `${firstName} ${lastName}` }</a>
                <time>{moment.unix(created).format('MMMM D h:mm:ss a')}</time>
                <p>{ comment }</p>
                <Like
                    _likePost = { _likePost }
                    likes = { likes }
                    postId = { id }
                />
                { cross }
            </section>
        );
    }
}
