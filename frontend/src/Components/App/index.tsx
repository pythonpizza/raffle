import * as React from 'react';

import Raffle from '@/Components/Raffle';

import './reset.css';
import './theme.css';
import './typography.css';
import './base.css';

import firebase from '@/firebase';

export default class App extends React.Component {
    state = {
        isLoading: true,

        entries: [],
        selectedEntries: [],
    };

    componentWillMount() {
        firebase
            .firestore()
            .collection('tickets')
            .doc('EpdcIeLiUwydTtTTebmt')
            .get()
            .then(doc => {
                if (!doc.exists) {
                    return;
                }

                const data = doc.data();

                if (!data) {
                    return;
                }

                // console.log('res', data);
                // todo: do not use a for lol
                const entries = [];
                for (let i = data.min; i <= data.max; ++i) {
                    if (data.exclude.indexOf(i) !== -1) {
                        continue;
                    }

                    entries.push(i);
                }

                // console.log('entries', entries);

                this.setState({
                    entries,
                    isLoading: false,
                });
            })
            .catch(err => {
                console.error('err', err);
            });
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
                <div className="pizza-preload" />
                {isLoading && <div>Loading...</div>}
                {!isLoading && <Raffle entries={availableEntries} onSelect={this.handleEntrySelected} />}
            </div>
        );
    }
}
