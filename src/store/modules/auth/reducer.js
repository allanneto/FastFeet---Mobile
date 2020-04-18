/* eslint-disable no-param-reassign */
import produce from 'immer';

const INITIAL_STATE = {
  id: null,
  signed: false,
  error: false,
  loading: false,
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@auth/CHANGE_ERROR': {
        draft.error = false;
        break;
      }
      case '@auth/LOGIN_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@auth/LOGIN_SUCCESS': {
        draft.id = action.payload.id;
        draft.signed = true;
        break;
      }
      case '@auth/LOGIN_FAILURE': {
        draft.loading = false;
        draft.error = true;
        break;
      }
      case '@auth/SIGN_OUT': {
        draft.id = null;
        draft.signed = false;
        draft.loading = false;
        break;
      }
      default:
    }
  });
}
