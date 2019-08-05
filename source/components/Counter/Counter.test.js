// Core
import React from 'react';
import { Counter } from './';
import renderer from 'react-test-renderer';

const renderTree = renderer.create(<Counter count = { 3 }/>).toJSON();

describe('component Counter:', () => {
    test('component Counter should correspond to its snapshot counterpart', () => {
        expect(renderTree).toMatchSnapshot();
    });
});
