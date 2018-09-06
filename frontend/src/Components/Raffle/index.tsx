import * as React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import './index.css';

interface EntryTransitionProps {
    children: React.ReactNode;
}
const EntryTransition: React.SFC<EntryTransitionProps> = ({ children, ...props }) => (
    <CSSTransition {...props} timeout={1500} classNames="raffle--selected-entry-">
        {children}
    </CSSTransition>
);

export interface RaffleProps {
    entries: Array<number>;
    onSelect: Function;
}

export default class Raffle extends React.Component<RaffleProps, {}> {
    state = {
        selectedEntry: null,
    };

    handleRaffle = () => {
        const { entries, onSelect } = this.props;

        if (!entries.length) {
            return false;
        }

        const selectedEntry = entries[Math.round(Math.random() * (entries.length - 1))];

        this.setState({ selectedEntry });
        onSelect(selectedEntry);

        return true;
    };

    render() {
        const { entries } = this.props;
        const { selectedEntry } = this.state;

        return (
            <div className="raffle">
                <TransitionGroup component="div" className="raffle--selected-entry-wrapper">
                    {selectedEntry && (
                        <EntryTransition key={`entry--${selectedEntry}`}>
                            <span className="raffle--selected-entry">{selectedEntry}</span>
                        </EntryTransition>
                    )}
                </TransitionGroup>
                <button onClick={this.handleRaffle}>Raffle!</button>
            </div>
        );
    }
}
