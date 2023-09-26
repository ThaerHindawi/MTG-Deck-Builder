import { ChangeEvent, FormEvent, useState } from "react";
import API_LOCAL_URL from "../../Utils/API_URL";
import { useLocation, useNavigate } from "react-router-dom";
import { checkLogin } from "../../services/checkLogin";
// import { isLoggedInContext } from "../hooks/useIsLoggedIn";
import { Link } from "react-router-dom";
import './user.css'

interface ILoginUser {
  username: string;
  password: string;
}

function Login({setToken}: {setToken?: Function}) {
  const navigate = useNavigate();

  // const {username, setUsername} = useContext<IUser>(isLoggedInContext)

  const [isLoggedInError, setIsLoggedInError] = useState<string>("");


  const [formData, setFormData] = useState<ILoginUser>({
    username: "",
    password: "",
  });

  // async function checkLogin() {
  //   const res = await fetch(API_LOCAL_URL("checkLogin"), {
  //     method: "GET",
  //     credentials: "include",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //   });

  //   const data = await res.json();
  //   console.log(data);
  //   setIsLoggedInError(() =>
  //     data.username
  //       ? "logged"
  //       : "You have entered an invalid username or password"
  //   );
  //   if (data.username) {
  //     localStorage.setItem("username", data.username);
  //     console.log("data.username: " + data.username)
  //     // setUsername(data.username);
  //     navigate(`/`);
  //   }
  // }

  async function submit(e: FormEvent) {
    e.preventDefault();
    const res = await fetch(API_LOCAL_URL("members/authenticate"), {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formData),
    });
    const data = await res.json()
    if(!data.success) {
      setIsLoggedInError("Invalid username or password");
    }
    navigate("/");
    checkLogin();
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
          <fieldset>
            <legend>Member Login</legend>
            <div className="form-group">
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

          
          </fieldset>
        </form>
        </div>
        </div>
  );
}

export default Login;
