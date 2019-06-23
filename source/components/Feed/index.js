// Describes posts feed

// Core
import React, { Component } from 'react';

// Components
import { StatusBar } from 'components/StatusBar';
import { Composer } from 'components/Composer';
import { Post } from 'components/Post';
import { Spinner } from 'components/Spinner';
import { Catcher } from 'components/Catcher';

// Instruments
import Styles from './styles.m.css';
import { getUniqueID, removeById } from 'instruments';
import moment from 'moment';

export class Feed extends Component {
    state = {
        posts: [
            {id: '123', comment: 'Hi there!', created: moment.utc(1526825076849) },
            {id: '124', comment: 'Hello!', created: moment.utc(1526825076855)},
        ],
        isSpinning: false,
    }

    _createPost = (comment) => {
        const post = {
            id:      getUniqueID(),
            created: moment.utc(),
            comment,
        };

        this.setState(({posts}) => ({
            posts: [ post, ...posts ],
        }));
    }

    _deletePost = (id) => {
        this.setState(({posts}) => ({
            posts: removeById(posts, id),
        }));
    }

    render() {
        const { posts, isSpinning } = this.state;

        const postsJSX = posts.map((post) => {
            return (
                <Catcher key = { post.id }>
                    <Post
                        { ...post }
                        _deletePost = { this._deletePost }
                    />
                </Catcher>
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
