export const FETCH_USERS = 'fetch_users';

export const fetchUsers = () => async (dispatch, getState, api) => {
	//api is an axios instance created with custom options and passed to redux-think which is passed to all action creators
  const res = await api.get('/users');

  dispatch({
    type: FETCH_USERS,
    payload: res
  });
}
