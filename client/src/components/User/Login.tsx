import { ChangeEvent, FormEvent, useContext, useState } from "react";
import API_LOCAL_URL from "../../Utils/API_URL";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PrivateFetch from "../../services/PrivateFetch";
import './user.css'
import { isLoggedInContext } from "../../hooks/useIsLoggedIn";

interface ILoginUser {
  username: string;
  password: string;
}

// {setToken}: {setToken?: Function}
function Login() {
  const navigate = useNavigate();

  const {token, setToken} = useContext<IToken>(isLoggedInContext)

  const [isLoggedInError, setIsLoggedInError] = useState<string>("");


  const [formData, setFormData] = useState<ILoginUser>({
    username: "",
    password: "",
  });

  async function submit(e: FormEvent) {
    e.preventDefault();
    const res = await PrivateFetch("POST", "members/authenticate", formData);
    if(!res.success) {
      setIsLoggedInError("Invalid username or password");
      return;
    }

    localStorage.setItem("token", res.access_token);
    setToken(res.access_token);
    window.location.reload();
    navigate("/");
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const newFormData: ILoginUser = { ...formData };
    newFormData[e.target.id as keyof ILoginUser] = e.target.value;
    setFormData(newFormData);
  }

  return (
    <div className="wrapper">

    <div className="form-container">
        <p>{isLoggedInError}</p>
        <form onSubmit={submit}>
            {/* <legend>Member Login</legend> */}
            <div className="form-group">
            <h2>Login</h2>
            <label>Username</label>
            <input
              type="text"
              onChange={handleChange}
              value={formData.username}
              className="form-control"
              id="username"
              placeholder="Enter Username"
            />
            <label>Password</label>
            <input
              type="password"
              onChange={handleChange}
              value={formData.password}
              className="form-control"
              id="password"
              placeholder="Enter Password"
            />

          <button type="submit" className="btn">
            Login
          </button>
          <p className="message">Not registered? <Link to="/register">Create an account.</Link></p>
          </div>
        </form>
        </div>
        </div>
  );
}

export default Login;
