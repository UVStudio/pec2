import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import login from './auth';
import profile from './profile';
import avatar from './avatar';

export default combineReducers({ alert, auth, login, profile, avatar });
