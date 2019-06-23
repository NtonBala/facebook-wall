// Describes posts feed

// Core
import React, { Component } from 'react';

// Components
import { StatusBar } from 'components/StatusBar';
import { Composer } from 'components/Composer';
import { Post } from 'components/Post';
import { Spinner } from 'components/Spinner';

// Instruments
import Styles from './styles.m.css';
import { getUniqueID, removeById } from 'instruments';
import moment from 'moment';

export class Feed extends Component {
    constructor() {
        super();

        this._createPost = this._createPost.bind(this);
        this._deletePost = this._deletePost.bind(this);
    }

    state = {
        posts: [
            {id: '123', comment: 'Hi there!', created: moment.utc(1526825076849) },
            {id: '124', comment: 'Hello!', created: moment.utc(1526825076855)},
        ],
        isSpinning: false,
    }

    _createPost(comment) {
        const post = {
            id:      getUniqueID(),
            created: moment.utc(),
            comment,
        };

        this.setState(({posts}) => ({
            posts: [ post, ...posts ],
        }));
    }

    _deletePost(id) {
        this.setState(({posts}) => ({
            posts: removeById(posts, id),
        }));
    }

    render() {
        const { posts, isSpinning } = this.state;

        const postsJSX = posts.map((post) => {
            return (
                <Post
                    key = { post.id }
                    { ...post }
                    _deletePost = { this._deletePost }
                />
            );
        });

        return (
            <section className = { Styles.feed }>
                <Spinner isSpinning = { isSpinning }/>
                <StatusBar/>
                <Composer _createPost = { this._createPost }/>
                {postsJSX}
            </section>
        );
    }
}
