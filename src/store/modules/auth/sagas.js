/* eslint-disable object-curly-newline */
import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from '~/services/api';

import { loginSuccess, loginFailure } from './actions';

export function* login({ payload }) {
  const { id } = payload;
  try {
    const response = yield call(api.get, `deliveryman/${id}`);

    const {
      courier: { name, email },
    } = response.data;

    yield put(loginSuccess(id, name));

    Alert.alert(name, email);

    // history.push('/deliveries');
  } catch (err) {
    Alert.alert('ERRO!', 'ID informado nao consta na base de dados.');
    yield put(loginFailure());
  }
}

export function setID({ payload }) {
  if (!payload) return;

  const { id } = payload.auth;

  //   if (id) {
  //   }
}

export function signOut() {
  // history.push('/');
}

export default all([
  takeLatest('persist/REHYDRATE', setID),
  takeLatest('@auth/LOGIN_REQUEST', login),
  takeLatest('@auth/SIGN_OUT', signOut),
]);
