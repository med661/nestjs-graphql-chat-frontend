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
      console.log(action);
      state.error = action.payload;
    },
    loginRequest(state) {
      state.loading = true;
    },
    loginSuccess(state, action) {
      state.isAuthenticated = true;
      console.log("loginSuccess")
      console.log({ action });
      console.log({ state });

      state.loading = false;
      state.user = action.payload.data;
      state.token = action.payload.data.token;
      state.error = null;
    },
    loginFailed(state, action) {
      state.loading = false;
      state.user = null;
      console.log("loginFailed")
      console.log({ action });
      console.log({ state })
      state.error = action.payload;
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
    console.log('registerAsync');
    console.log(password, email, name);
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
    console.log('loginAsync');
    const newuser = await login(email, password);
    await dispatch(loginSuccess({ data: { user: newuser } }));

  }
  catch (error) {
    console.log({ error: "errr login" })
    dispatch(loginFailed(error));
  }
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
  logout




} = authSlice.actions;

export default authSlice.reducer;
