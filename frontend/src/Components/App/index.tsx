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
        const loadEntriesPromise = new Promise(resolve => setTimeout(resolve, 1000 * Math.random())).then(() =>
            this.setState({
                entries: [
                    1,
                    3,
                    4,
                    7,
                    11,
                    12,
                    18,
                    24,
                    29,
                    32,
                    38,
                    47,
                    48,
                    54,
                    57,
                    64,
                    69,
                    71,
                    76,
                    83,
                    86,
                    89,
                    91,
                    99,
                    111,
                    123,
                ],
            })
        );
        const preloadPizza = i => {
            new Promise(resolve => {
                const image = new Image();
                image.onload = resolve;
                image.onerror = resolve;
                image.src = require(`Assets/images/pizza--${i}.png`);
            });
        };
        const preloadPizzasPromise = Promise.all(
            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map(i => preloadPizza(i))
        );

        Promise.all([loadEntriesPromise, preloadPizzasPromise]).then(() => this.setState({ isLoading: false }));
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
