// Describes posts feed

// Core
import React, { Component } from 'react';
import { string } from 'prop-types';

// Components
import { StatusBar } from 'components/StatusBar';
import { Composer } from 'components/Composer';
import { Post } from 'components/Post';
import { Spinner } from 'components/Spinner';
import { Catcher } from 'components/Catcher';
import { withProfile } from 'components/HOC/withProfile';

// Instruments
import Styles from './styles.m.css';
import { removeById, delay, getUniqueID } from 'instruments';
import { api, TOKEN, GROUP_ID } from 'config/api';
import { socket } from 'socket/init';

@withProfile
export class Feed extends Component {
    static propTypes = {
        currentUserFirstName: string.isRequired,
        currentUserLastName:  string.isRequired,
    }

    state = {
        posts:      [],
        isSpinning: false,
    }

    componentDidMount() {
        const { currentUserFirstName, currentUserLastName } = this.props;

        this._fetchPosts();

        socket.emit('join', GROUP_ID);

        socket.on('create', (postJSON) => {
            const { data: createdPost, meta } = JSON.parse(postJSON);

            if (
                `${currentUserFirstName} ${currentUserLastName}`
                !== `${meta.authorFirstName} ${meta.authorLastName}`
            ) {
                this.setState(({ posts }) => ({
                    posts: [ createdPost, ...posts ],
                }));
            }
        });

        socket.on('remove', (postJSON) => {
            const { data: removedPost, meta } = JSON.parse(postJSON);

            if (
                `${currentUserFirstName} ${currentUserLastName}`
                !== `${meta.authorFirstName} ${meta.authorLastName}`
            ) {
                this.setState(({ posts }) => ({
                    posts: posts.filter((post) => post.id !== removedPost.id),
                }));
            }
        });
    }

    componentWillUnmount() {
        socket.removeListener('create');
        socket.removeListener('remove');
    }

    _createPost = async (comment) => {
        this._setSpinnerState(true);

        const response = await fetch(api, {
            method:  'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization:  TOKEN,
            },
            body: JSON.stringify({ comment }),
        });

        const { data: post } = await response.json();

        this.setState(({posts}) => ({
            posts:      [ post, ...posts ],
            isSpinning: false,
        }));
    }

    _deletePost = async (id) => {
        this._setSpinnerState(true);

        await fetch(`${api}/${id}`, {
            method:  'DELETE',
            headers: {
                Authorization: TOKEN,
            },

        });

        this.setState(({posts}) => ({
            posts:      removeById(posts, id),
            isSpinning: false,
        }));
    }

    _setSpinnerState = (state) => {
        this.setState(() => ({
            isSpinning: state,
        }));
    }

    _fetchPosts = async () => {
        this._setSpinnerState(true);

        const response = await fetch(api, {
            method: 'GET',
        });

        const { data: posts } = await response.json();

        this.setState(() => ({
            posts,
            isSpinning: false,
        }));
    }

    _likePost = async (id) => {
        const { currentUserFirstName, currentUserLastName } = this.props;

        this._setSpinnerState(true);

        await delay(1200);

        const newPosts = this.state.posts.map((post) => {
            if (post.id === id) {
                return {
                    ...post,
                    likes: [
                        {
                            id:        getUniqueID(),
                            firstName: currentUserFirstName,
                            lastName:  currentUserLastName,
                        },
                    ],
                };
            }

            return post;
        });

        this.setState(() => ({
            posts:      newPosts,
            isSpinning: false,
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
                        _likePost = { this._likePost }
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
