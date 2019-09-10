// React
import React from 'react';

import { Container, Button, Heading, Message } from '../styled';

const Farm = (props) => {
    return (
        <Container>
            <Heading>&#127968; Farm &#128038;</Heading>

            <div>
                <Message>Harvest:</Message>
            </div>

            <Button>Harvest the grain &#127822;</Button>
        </Container>
    );
};

export default Farm;
