// Core
import React, { Component } from 'react';
import { string, func, arrayOf, shape } from 'prop-types';
import cx from 'classnames';

// Instruments
import Styles from './styles.m.css';

// Components
import { withProfile } from 'components/HOC/withProfile';

@withProfile
export class Like extends Component {
    static propTypes = {
        _likePost:            func.isRequired,
        _unlikePost:          func.isRequired,
        currentUserFirstName: string.isRequired,
        currentUserLastName:  string.isRequired,
        postId:               string.isRequired,
        likes:                arrayOf(shape({
            id:        string.isRequired,
            firstName: string.isRequired,
            lastName:  string.isRequired,
        })),
    }

    state = {
        showLikers: false,
    }

    _showLikers = () => {
        this.setState(() => ({
            showLikers: true,
        }));
    }

    _hideLikers = () => {
        this.setState(() => ({
            showLikers: false,
        }));
    }

    _getLikersList = () => {
        const { showLikers } = this.state;
        const { likes } = this.props;

        const likesJSX = likes.map(({ firstName, lastName, id }) => (
            <li key = { id }>
                { `${firstName} ${lastName}` }
            </li>
        ));

        return likes.length && showLikers ? <ul>{ likesJSX }</ul> : null;
    }

    _getLikedByMe = () => {
        const { currentUserFirstName, currentUserLastName, likes } = this.props;

        return likes.some(({ firstName, lastName }) => {
            return (
                `${firstName} ${lastName}` === `${currentUserFirstName} ${currentUserLastName}`
            );
        });
    }

    _getLikeStyles = () => {
        const likedByMe = this._getLikedByMe();

        return cx(Styles.icon, {
            [ Styles.liked ]: likedByMe,
        });
    }

    _handleLikePostClick = () => {
        const { _likePost, _unlikePost, postId } = this.props;

        if (this._getLikedByMe()) {
            _unlikePost(postId);
        } else {
            _likePost(postId);
        }
    }

    _getLikesDescription = () => {
        const { likes, currentUserFirstName, currentUserLastName } = this.props;

        const likedByMe = this._getLikedByMe();

        if (likes.length === 1 && likedByMe) {
            return `${currentUserFirstName} ${currentUserLastName}`;
        } else if (likes.length === 2 && likedByMe) {
            return `You and ${likes.length - 1} other`;
        } else if (likedByMe) {
            return `You and ${likes.length - 1} others`;
        }

        return likes.length;
    }

    render() {
        const likeStyles = this._getLikeStyles();
        const likersList = this._getLikersList();
        const likesDescription = this._getLikesDescription();

        return (
            <section className = { Styles.like }>
                <button
                    className = { likeStyles }
                    onClick = { this._handleLikePostClick }>
                    Like
                </button>
                <div>
                    { likersList }
                    <span
                        onMouseEnter = { this._showLikers }
                        onMouseLeave = { this._hideLikers }>
                        {likesDescription}
                    </span>
                </div>
            </section>
        );
    }
}
