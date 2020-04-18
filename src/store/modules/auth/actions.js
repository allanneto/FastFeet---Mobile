export function changeError() {
  return {
    type: '@auth/CHANGE_ERROR',
  };
}
export function loginRequest(id) {
  return {
    type: '@auth/LOGIN_REQUEST',
    payload: { id },
  };
}

export function loginSuccess(id, name) {
  return {
    type: '@auth/LOGIN_SUCCESS',
    payload: { id, name },
  };
}

export function loginFailure() {
  return {
    type: '@auth/LOGIN_FAILURE',
  };
}

export function signOut() {
  return {
    type: '@auth/SIGN_OUT',
  };
}
