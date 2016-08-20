import { combineReducers } from 'redux';
import message from './message';
import ui from './ui';
import session from './session';

export default combineReducers({message, ui, session});
