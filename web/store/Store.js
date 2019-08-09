import { createStore } from 'redux';
// import reducer from './reducer';
import rootReducer from '../reducers/Index'

const store = createStore(rootReducer);

export default store;