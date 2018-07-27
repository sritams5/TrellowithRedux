import { createStore } from 'redux';
import reducer from './reducer';

const store = createStore(reducer,{ ibdSelected: -1, boards: [] });

export default store;
