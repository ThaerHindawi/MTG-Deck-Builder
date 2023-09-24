import React from 'react'
import {Navigate, Route, RouteProps, useLocation} from 'react-router-dom'
import {useIsLoggedIn} from '../hooks/useIsLoggedIn';

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const isLoggedIn = useIsLoggedIn();
  let location = useLocation();
  console.log("isLoggedIn.username: " + isLoggedIn.username)
  if (isLoggedIn.username) {
    return children;
  } else {
    return <Navigate to="/login" state={{ from: location }} />
  }
}

export default RequireAuth;