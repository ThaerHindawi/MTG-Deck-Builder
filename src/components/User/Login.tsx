import { ChangeEvent, FormEvent, useState } from "react";
import API_LOCAL_URL from "../../Utils/API_URL";

function Login() {
  async function checkLogin() {
    const res = await fetch(API_LOCAL_URL("checkLogin"), {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log(data);
  }

  const [formData, setFormData] = useState<IUser>({
    username: "",
    password: "",
  });

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
  
    console.log(await res.json());
    checkLogin();
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const newFormData: IUser = { ...formData };
    newFormData[e.target.id as keyof IUser] = e.target.value;
    setFormData(newFormData);
  }

  return (
    <div className="container">
      <div className="row justify-content-md-center">
        <form onSubmit={submit}>
          <div className="form-group mb-2">
            <label>Username</label>
            <input
              type="text"
              onChange={handleChange}
              value={formData.username}
              className="form-control"
              id="username"
              placeholder="Enter Username"
            />
          </div>

          <div className="form-group mb-2">
            <label>Password</label>
            <input
              type="password"
              onChange={handleChange}
              value={formData.password}
              className="form-control"
              id="password"
              placeholder="Enter Password"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
