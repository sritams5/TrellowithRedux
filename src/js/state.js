import { createStore } from 'redux';
import reducer from './reducer';

const store = createStore(reducer, { selectedBoardId: -999, boards: [] });

export default store;
