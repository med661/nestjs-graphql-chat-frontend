import { createSlice } from '@reduxjs/toolkit';
import { register, login } from './authAPI';



export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    user: null,
    error: null,
    loading: false,
    token: null,

  },
  reducers: {
    registerRequest(state) {
      state.loading = true;
    },
    registerSuccess(state, action) {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload.data.user.user;
      state.token = action.payload.data.user.token;
      state.error = null;
    },
    registerFailed(state, action) {
      state.isAuthenticated = false;
      state.loading = false;
      state.user = null;
      state.error = action.payload.message;
    },
    loginRequest(state) {
      state.loading = true;
    },
    loginSuccess(state, action) {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload.data.user.user;
      state.token = action.payload.data.token;
      state.error = null;
    },
    loginFailed(state, action) {
      state.loading = false;
      state.user = null;
      state.error = action.payload.message;

    },
    resetError(state) {
      state.error = null;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
    }

  }
});

export const registerAsync = (password, email, name) => async (dispatch) => {
  try {
    dispatch(registerRequest());
    const newuser = await register(password, email, name);
    dispatch(registerSuccess({ data: { user: newuser } }));
  } catch (error) {
    dispatch(registerFailed(error));

  }
};
export const loginAsync = (email, password) => async (dispatch) => {
  try {
    dispatch(loginRequest());
    const newuser = await login(email, password);
    await dispatch(loginSuccess({ data: { user: newuser } }));

  }
  catch (error) {
    dispatch(loginFailed(error));
  }
}
export const resetErrorAsync = async (dispatch) => {
  dispatch(resetError());


}
export const logoutAsync = () => async (dispatch) => {

  dispatch(logout());
};



export const {

  registerRequest,
  registerSuccess,
  registerFailed,
  loginRequest,
  loginSuccess,
  loginFailed,
  resetError,
  logout




} = authSlice.actions;

export default authSlice.reducer;
