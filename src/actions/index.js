import api      from './api';
import * as types from 'statics/actions';

const appTestAction = val => ({ type: types.APP_TEST_ACTION, val });

const appInit       = _ => ({type: types.APP_INIT});

export default {
    appTestAction,
    appInit,
    ...api,
};