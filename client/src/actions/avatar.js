import axios from 'axios';
import {
  AVATAR_UPLOADED,
  AVATAR_UPLOAD_ERROR,
  AVATAR_SERVED,
  AVATAR_ERROR,
} from './types';
import { setAlert } from './alert';

//POST user avatar
export const avatarUpload = (formData) => async (dispatch) => {
  try {
    const res = await axios.post('/api/avatar/upload', formData);
    dispatch({
      type: AVATAR_UPLOADED,
      payload: res.data,
    });
    dispatch(setAlert('Avatar Uploaded', 'success'));
  } catch (err) {
    dispatch({
      type: AVATAR_UPLOAD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//GET avatar
export const getAvatar = (avatarId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/avatar/image/${avatarId}`);
    dispatch({
      type: AVATAR_SERVED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AVATAR_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
