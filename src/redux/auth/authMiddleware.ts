// authMiddleware.ts
import { Middleware } from "redux";
import { login, logout, register } from "./authActions";
import {
  loginSuccess,
  loginFailure,
  logoutSuccess,
  registerSuccess,
} from "./authSlice";
import axios from "../../utils/axiosConfig";
import { handleError, handleSuccess } from "../../utils/notificationConfig";
import { loading } from "../additional/additionalSlice";

const authMiddleware: Middleware = (store) => (next) => async (action) => {
  if (login.match(action)) {
    let timer;
    try {
      const { email, password, navigate } = action.payload;

      timer = setTimeout(() => {
        store.dispatch(loading(true));
      }, 250);

      const response = await axios.post(`/user/login`, {
        email,
        password,
      });

      store.dispatch(loading(false));
      clearTimeout(timer);

      if (response.status === 200) {
        store.dispatch(
          loginSuccess({
            token: response.data.access_token,
            email: response.data.email,
            full_name: response.data.full_name,
            role: response.data.role,
          })
        );
        handleSuccess(response, store.dispatch);
        navigate("/ship");
      } else {
        store.dispatch(loginFailure());
      }
    } catch (error) {
      handleError(error, store.dispatch);
    } finally {
      store.dispatch(loading(false));
      clearTimeout(timer);
    }
  } else if (logout.match(action)) {
    let timer;
    try {
      const { navigate } = action.payload;

      timer = setTimeout(() => {
        store.dispatch(loading(true));
      }, 250);

      const response = await axios.post(`/user/logout`);

      store.dispatch(loading(false));
      clearTimeout(timer);

      if (response.status === 200) {
        store.dispatch(logoutSuccess());
        localStorage.removeItem("authState");
        handleSuccess(response, store.dispatch);
        navigate("/auth");
      } else if (response.status === 401) {
        localStorage.removeItem("authState");
        navigate("/auth");
        return;
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        store.dispatch(logoutSuccess());
        localStorage.removeItem("authState");
      } else {
        handleError(error, store.dispatch);
        localStorage.removeItem("authState");
      }
    } finally {
      store.dispatch(loading(false));
      clearTimeout(timer);
    }
  } else if (register.match(action)) {
    let timer;
    try {
      const { full_name, email, password, navigate } = action.payload;

      timer = setTimeout(() => {
        store.dispatch(loading(true));
      }, 250);

      const response = await axios.post(`/user/register`, {
        email,
        password,
        full_name,
      });

      store.dispatch(loading(false));
      clearTimeout(timer);

      if (response.status === 200) {
        store.dispatch(
          registerSuccess({
            full_name: response.data.full_name,
            token: response.data.access_token,
            email: response.data.email,
            role: response.data.role,
          })
        );
        handleSuccess(response, store.dispatch);
        navigate("/ship");
      } else {
        store.dispatch(loginFailure());
      }
    } catch (error) {
      handleError(error, store.dispatch);
    } finally {
      store.dispatch(loading(false));
      clearTimeout(timer);
    }
  }
  return next(action);
};

export default authMiddleware;
