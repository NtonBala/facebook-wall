//Describes posts feed
import React, { Component } from 'react';

import { Composer } from 'components/Composer';
import { Post } from 'components/Post';

export class Feed extends Component {
    render() {
        return (
            <section>
                <Composer />
                <Post />
            </section>
        );
    }
}
