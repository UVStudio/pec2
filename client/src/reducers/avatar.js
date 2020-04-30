import {
  AVATAR_ERROR,
  AVATAR_SERVED,
  AVATAR_UPLOADED,
  AVATAR_UPLOAD_ERROR,
} from '../actions/types';

const initialState = {};

export default function (state = initialState, action) {
  const { type, payload } = action;
  //action.type action.payload
  switch (type) {
    case AVATAR_SERVED:
    case AVATAR_UPLOADED:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case AVATAR_ERROR:
    case AVATAR_UPLOAD_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
