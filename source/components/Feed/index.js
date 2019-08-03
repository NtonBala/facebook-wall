// Describes posts feed

// Core
import React, { Component } from 'react';
import { string } from 'prop-types';
import {
    Transition,
    CSSTransition,
    TransitionGroup,
} from 'react-transition-group';
import { fromTo } from 'gsap';

// Components
import { StatusBar } from 'components/StatusBar';
import { Composer } from 'components/Composer';
import { Post } from 'components/Post';
import { Spinner } from 'components/Spinner';
import { Catcher } from 'components/Catcher';
import { withProfile } from 'components/HOC/withProfile';
import { Postman } from 'components/Postman';

// Instruments
import Styles from './styles.m.css';
import { removeById } from 'instruments';
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

        //on create post by other user
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

        //on remove post by other user
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

        //on like post by other user
        socket.on('like', (postJSON) => {
            const { data: updatedPost, meta } = JSON.parse(postJSON);

            if (
                `${currentUserFirstName} ${currentUserLastName}`
                !== `${meta.authorFirstName} ${meta.authorLastName}`
            ) {
                this.setState(({ posts }) => ({
                    posts: posts.map((post) => {
                        if (post.id === updatedPost.id) {
                            return updatedPost;
                        }

                        return post;
                    }),
                }));
            }
        });
    }

    componentWillUnmount() {
        socket.removeListener('create');
        socket.removeListener('remove');
        socket.removeListener('like');
    }

    _createPost = async (comment) => {
        //create post by current user

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

    _removePost = async (id) => {
        //remove post by current user

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

    _likePost = async (postId) => {
        //like post by current user

        this._setSpinnerState(true);

        const response = await fetch(`${api}/${postId}`, {
            method:  'PUT',
            headers: {
                Authorization: TOKEN,
            },
        });

        const { data: newPost } = await response.json();

        const newPosts = this.state.posts.map((post) => {
            if (post.id === postId) {
                return newPost;
            }

            return post;
        });

        this.setState(() => ({
            posts:      newPosts,
            isSpinning: false,
        }));
    }

    _animateComposerEnter = (composer) => {
        fromTo(composer, 1, { opacity: 0, rotationX: 50 }, { opacity: 1, rotationX: 0 });
    }

    _animatePostmanEnter = (postman) => {
        fromTo(postman, 1, { x: 280 }, { x: 0 });
    }

    _animatePostmanEntered = (postman) => {
        fromTo(postman, 1, { x: 0 }, { x: 280 });
    }

    render() {
        const { posts, isSpinning } = this.state;

        const postsJSX = posts.map((post) => {
            return (
                <CSSTransition
                    classNames = {{
                        enter:       Styles.postInStart,
                        enterActive: Styles.postInEnd,
                        exit:        Styles.postOutStart,
                        exitActive:  Styles.postOutEnd,
                    }}
                    key = { post.id }
                    timeout = {{
                        enter: 500,
                        exit:  400,
                    }}>
                    <Catcher>
                        <Post
                            { ...post }
                            _likePost = { this._likePost }
                            _removePost = { this._removePost }
                        />
                    </Catcher>
                </CSSTransition>
            );
        });

        return (
            <section className = { Styles.feed }>

                <Spinner isSpinning = { isSpinning }/>

                <StatusBar/>

                <Transition
                    appear
                    in
                    timeout = { 1000 }
                    onEnter = { this._animateComposerEnter }>
                    <Composer _createPost = { this._createPost }/>
                </Transition>

                <Transition
                    appear
                    in
                    timeout = { 4000 }
                    onEnter = { this._animatePostmanEnter }
                    onEntered = { this._animatePostmanEntered }>
                    <Postman/>
                </Transition>

                <TransitionGroup>
                    { postsJSX }
                </TransitionGroup>

            </section>
        );
    }
}
