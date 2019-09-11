// React
import React from 'react';

import { Container, Button, Heading, Message } from '../styled';

import { withState } from './withState';

const stateName = 'apples';
const stateUpdaterName = '_yieldApples';

export default withState({
    stateName,
    stateValue:       5,
    stateUpdaterName: stateUpdaterName,
    stateUpdater:     (state) => {
        return {
            [ stateName ]: state[ stateName ] + 1,
        };
    },
})((props) => {
    // To open Emoji widget on Mac press 'Cmd + Ctrl + Space'
    const applesJSX = Array(props[ stateName ]).fill('🍎');

    return (
        <Container>
            <Heading>🏠 Farm 🐦</Heading>

            <div>
                <Message>Harvest:</Message>
                <Message>{applesJSX}</Message>
            </div>

            <Button onClick = { props[ stateUpdaterName ] }>Harvest the grain 🍎</Button>
        </Container>
    );
});
