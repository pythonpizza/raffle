import * as React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import classnames from 'classnames';

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
        selectedEntriesCount: 0,
        isShaking: false,
    };

    handleRaffle = () => {
        const { entries, onSelect } = this.props;
        const { selectedEntriesCount } = this.state;

        if (!entries.length) {
            return false;
        }

        const selectedEntry = entries[Math.round(Math.random() * (entries.length - 1))];

        this.setState(
            {
                selectedEntry,
                selectedEntriesCount: selectedEntriesCount + 1,
                isShaking: true,
            },
            () => setTimeout(() => this.setState({ isShaking: false }), 300)
        );
        onSelect(selectedEntry);

        return true;
    };

    render() {
        const { entries } = this.props;
        const { selectedEntry, selectedEntriesCount, isShaking } = this.state;

        const pizzaSuffix = selectedEntriesCount % 17;
        const buttonClasses = classnames('raffle--button', {
            'raffle--button--1-bite': pizzaSuffix === 1,
            [`raffle--button--${pizzaSuffix}-bites`]: pizzaSuffix > 1,
            'raffle--button--shaking': isShaking,
        });

        return (
            <div className="raffle">
                <TransitionGroup className="raffle--selected-entry-wrapper">
                    {selectedEntry && (
                        <EntryTransition key={`entry--${selectedEntry}`}>
                            <span className="raffle--selected-entry">{selectedEntry}</span>
                        </EntryTransition>
                    )}
                </TransitionGroup>
                <button className={buttonClasses} onClick={this.handleRaffle} />
            </div>
        );
    }
}
