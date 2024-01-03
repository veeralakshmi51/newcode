import React, { useEffect, useState } from "react";
import LoginImage from "../../assets/images/login.png";
import { useNavigate } from "react-router-dom";
import { getOrganization, handleLogin } from "../../slices/thunk";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [orgName, setOrgName] = useState("");
  const { organization: modalOrganizations } = useSelector(
    (state: any) => state.Access
  );
  useEffect(() => {
    getOrganization(dispatch);
  }, [dispatch]);

  const triggerLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body = {
      username,
      password,
      organization: orgName,
    };
    handleLogin(dispatch, body, navigate);
  };

  return (
    <div className="container-fluid">
    <div className="row">
      <div className="col-md-7 d-flex align-items-stretch">
        <img
          src={LoginImage}
          alt="LogIn Image"
          className="img-fluid"
          style={{ objectFit:"cover", height: '100vh', paddingBottom: "10px" }}
        />
      </div>
      <div className="col-md-5 d-md-flex align-items-md-center justify-content-md-center">
        <form className="rounded" style={{ border: '1px solid #0f3995', padding: '30px' }} onSubmit={triggerLogin}>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="floatingInput">Username</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="floatingInput"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="floatingInput">Password</label>
          </div>
          <div className="form-floating p-1">
            <select
              className="form-select"
              id="sel1"
              name="sellist"
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
              style={{ width: "100%" }}
            >
              <option value="" disabled hidden>
                Select Organization
              </option>
              {modalOrganizations.map((org: any) => (
                <option key={org.id} value={org.id}>
                  {org.name}
                </option>
              ))}
            </select>

            <label htmlFor="sel1" className="form-label">
              Organization:
            </label>
          </div>
          <br></br>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />

            <label className="form-check-label" htmlFor="exampleCheck1">
              Remember Me
            </label>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: "100%" }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default Login;