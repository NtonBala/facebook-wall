// Core
import React from 'react';
import { mount } from 'enzyme';

// Component
import { WeakComposer as Composer } from './';

const props = {
    _createPost:          jest.fn(),
    avatar:               '/images/homer.png',
    currentUserFirstName: 'Homer',
};

const comment = 'Merry christmas';

const initialState = {
    comment: '',
};

const updatedState = {
    comment,
};

const result = mount(<Composer { ...props } />);

const _updateCommentSpy = jest.spyOn(result.instance(), '_updateComment');
const _submitCommentSpy = jest.spyOn(result.instance(), '_submitComment');
const _handleFormSubmitSpy = jest.spyOn(result.instance(), '_handleFormSubmit');
const _submitOnEnterSpy = jest.spyOn(result.instance(), '_submitOnEnter');

const submitBtnText = 'Post';
const textareaPlaceholder = `What's on your mind, ${props.currentUserFirstName}?`;

describe('component Composer:', () => {
    test('should have 1 <section> element', () => {
        expect(result.find('section')).toHaveLength(1);
    });

    test('should have 1 <form> element', () => {
        expect(result.find('form')).toHaveLength(1);
    });

    test('should have 1 <textarea> element', () => {
        expect(result.find('textarea')).toHaveLength(1);
    });

    test(`<textarea> placeholder should be "${textareaPlaceholder}"`, () => {
        expect(result.find('textarea').prop('placeholder')).toBe(textareaPlaceholder);
    });

    test('should have 1 <input> element', () => {
        expect(result.find('input')).toHaveLength(1);
    });

    test(`<input> element should be of type "submit" and have value of ${submitBtnText}`, () => {
        expect(result.find('input').prop('type')).toBe('submit');
        expect(result.find('input').prop('value')).toBe(submitBtnText);
    });

    test('<textarea> and <input> elements should not be initially disabled', () => {
        expect(result.find('textarea').prop('disabled')).not.toBe(true);
        expect(result.find('input').prop('disabled')).not.toBe(true);
    });

    test('should have 1 <img> element', () => {
        expect(result.find('img')).toHaveLength(1);
    });

    test('<img> element should have valid "src" attribute', () => {
        expect(result.find('img').prop('src')).toBe(props.avatar);
    });

    test('should have valid initial state', () => {
        expect(result.state()).toEqual(initialState);
    });

    test('<textarea> value should be empty initially', () => {
        expect(result.find('textarea').text()).toBe('');
    });

    test('should respond to state change properly', () => {
        result.setState({ comment });

        expect(result.state()).toEqual(updatedState);
        expect(result.find('textarea').text()).toBe(comment);

        result.setState({ comment: '' });

        expect(result.state()).toEqual(initialState);
        expect(result.find('textarea').text()).toBe('');
    });

    test('_createPost prop should not be called if trying to submit form with empty comment message', () => {
        result.find('form').simulate('submit');

        expect(props._createPost).not.toHaveBeenCalled();

        _handleFormSubmitSpy.mockClear();
        _submitCommentSpy.mockClear();
    });

    test('should handle textarea "change" event', () => {
        result.find('textarea').simulate('change', {
            target: {
                value: comment,
            },
        });

        expect(_updateCommentSpy).toHaveBeenCalledTimes(1);
        expect(result.state()).toEqual(updatedState);
        expect(result.find('textarea').text()).toBe(comment);
    });

    test('should handle form "submit" event', () => {
        result.find('form').simulate('submit');

        expect(_handleFormSubmitSpy).toHaveBeenCalledTimes(1);
        expect(_submitCommentSpy).toHaveBeenCalledTimes(1);
        expect(props._createPost).toHaveBeenCalledTimes(1);
        expect(result.state()).toEqual(initialState);

        _handleFormSubmitSpy.mockClear();
        _submitCommentSpy.mockClear();
        props._createPost.mockClear();
    });

    test('should handle form submission on <textarea> Enter "keypress" event', () => {
        result.find('textarea').simulate('change', {
            target: {
                value: comment,
            },
        });
        result.find('textarea').simulate('keypress', { key: 'Enter' });

        expect(_submitOnEnterSpy).toHaveBeenCalledTimes(1);
        expect(_submitCommentSpy).toHaveBeenCalledTimes(1);

        _submitOnEnterSpy.mockClear();
        _submitCommentSpy.mockClear();
        props._createPost.mockClear();
    });
});
