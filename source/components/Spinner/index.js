// Core
import React, { Component } from 'react';
import { createPortal } from 'react-dom';

// Instruments
import Styles from './styles.m.css';

const portal = document.getElementById('spinner');

export class Spinner extends Component {
    render() {
        const { isSpinning } = this.props;

        return createPortal(<div className = { Styles.spinner }/>, portal);
    }
}
