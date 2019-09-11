// React
import React from 'react';

import { Container, Button, Heading, Message } from '../styled';

import { withState } from './withState';

const Farm = (props) => {
    // To open Emoji widget on Mac press 'Cmd + Ctrl + Space'
    const applesJSX = Array(props.apples).fill('🍎');

    return (
        <Container>
            <Heading>🏠 Farm 🐦</Heading>

            <div>
                <Message>Harvest:</Message>
                <Message>{applesJSX}</Message>
            </div>

            <Button onClick = { props._yieldApples }>Harvest the grain 🍎</Button>
        </Container>
    );
};

export default withState({
    stateName:        'apples',
    stateValue:       5,
    stateUpdaterName: '_yieldApples',
    stateUpdater:     (state) => {
        return {
            apples: state.apples + 1,
        };
    },
})(Farm);
