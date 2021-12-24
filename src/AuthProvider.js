import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import io from 'socket.io-client';
import { userIsAuth } from 'selectors/users';
import { getAccessToken } from 'configs/localStorage';
import { userLogout } from 'actions/users';
import { API_ROOT } from 'configs/env-vars';

const socket = io(API_ROOT, {
  transports: ['websocket'],
});

// eslint-disable-next-line import/no-anonymous-default-export
export default props => {
  const isAuth = useSelector(userIsAuth);
  const intervalRef = useRef(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isAuth) {
      intervalRef.current = setInterval(() => {
        socket.emit('create', 'check-authentication', { accessToken: getAccessToken() }, error => {
          if (error) {
            clearInterval(intervalRef.current);
            dispatch(userLogout.request());
          }
        });
      }, 1000 * 15); // 15 seconds
    } else {
      clearInterval(intervalRef.current);
    }
  }, [dispatch, isAuth]);

  return props.children;
};
