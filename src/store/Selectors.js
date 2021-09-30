import { createSelector } from 'reselect';

const getState = state => state;

//  General getters
export const getQuotes = createSelector(getState, state => state.quotes);
export const getSavedQuotes = createSelector(getState, state => state.saved);

//	Specific getters
export const getQuote = id => createSelector(getState, state => state.quotes.filter(q => parseInt(q.id) === parseInt(id))[0]);