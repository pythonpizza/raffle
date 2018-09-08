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
                entries: Array.from(Array(64).keys()).map((_, i) => i + 1),
            })
        );
        const preloadPizza = (i: number) => {
            new Promise(resolve => {
                const image = new Image();
                image.onload = resolve;
                image.onerror = resolve;
                image.src = require(`Assets/images/pizza--${i}.png`);
            });
        };
        const preloadPizzasPromise = Promise.all(Array.from(Array(17).keys()).map(i => preloadPizza(i)));

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
