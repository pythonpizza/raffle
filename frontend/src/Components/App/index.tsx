import * as React from 'react';

import Raffle from '@/Components/Raffle';

import './reset.css';
import './theme.css';
import './typography.css';
import './base.css';

export default class App extends React.Component {
    state = {
        isLoading: true,

        entries: [],
        selectedEntries: [],
    };

    componentWillMount() {
        setTimeout(() => {
            this.setState({
                isLoading: false,
                entries: [1, 3, 4, 7, 11, 12, 18, 24, 29, 32, 38, 47, 48, 54, 64, 69, 76, 91, 123],
            });
        }, 1000 + 1000 * Math.random());
    }

    handleEntrySelected = (e: number) => {
        this.setState({
            selectedEntries: [...this.state.selectedEntries, e],
        });
    };

    render() {
        const { isLoading, entries, selectedEntries } = this.state;
        const availableEntries = !isLoading ? entries.filter(e => selectedEntries.indexOf(e) < 0) : [];

        return (
            <div>
                {isLoading && <div>Loading...</div>}
                {!isLoading && <Raffle entries={availableEntries} onSelect={this.handleEntrySelected} />}
            </div>
        );
    }
}
