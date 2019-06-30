//Component that follows online status with the help of web sockets

//Core
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

//Components
import { withProfile } from 'components/HOC/withProfile';

//Instruments
import Styles from './styles.m.css';
import { socket } from 'socket/init';

@withProfile
export class StatusBar extends Component {
    static propTypes = {
        avatar:               PropTypes.string.isRequired,
        currentUserFirstName: PropTypes.string.isRequired,
        currentUserLastName:  PropTypes.string.isRequired,
    };

    state = {
        online: false,
    }

    componentDidMount() {
        socket.on('connect', () => {
            this.setState(() => ({
                online: true,
            }));
        });

        socket.on('disconnect', () => {
            this.setState(() => ({
                online: false,
            }));
        });
    }

    componentWillUnmount() {
        socket.removeListener('connect');
        socket.removeListener('disconnect');
    }

    render() {
        const {
            avatar,
            currentUserFirstName,
            currentUserLastName,
        } = this.props;
        const { online } = this.state;

        const statusStyle = cx(Styles.status, {
            [ Styles.online ]:  online,
            [ Styles.offline ]: !online,
        });
        const statusMessage = online ? 'Online' : 'Offline';

        return (
            <section className = { Styles.statusBar }>
                <div className = { statusStyle }>
                    <div>{ statusMessage }</div>
                    <span/>
                </div>
                <button>
                    <img src = { avatar }/>
                    <span>{ currentUserFirstName }</span>
                        &#160;
                    <span>{ currentUserLastName }</span>
                </button>
            </section>
        );
    }
}
