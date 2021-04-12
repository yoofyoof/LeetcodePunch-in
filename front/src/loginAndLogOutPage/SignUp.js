import React, { useState } from "react";
import "./css/sign_up.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import * as loginToken from "../Components/loginTokenAndSignOff";
import { useHistory } from "react-router-dom";

function SignUp() {
  const history = useHistory();
  const [signUpInfo, setSignUpInfo] = useState({
    email: "",
    password: "",
    name: "",
  });

  //updating input value
  const handleSignUpInput = (event) => {
    const str = event.target.value;
    setSignUpInfo({
      ...signUpInfo,
      [event.target.name]: str.toLowerCase(),
    });
  };

  // check if user is already in db ,
  //if no then insert signupinfo to the database ,
  //if yes, inform user
  const checkUserInDb = async () => {
    const data = await fetch("/if_user_exist", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: signUpInfo.email.toLowerCase() }),
    });

    const str = await data.json();

    // str.result == false user dont exit in database else .. exist
    if (str.result === false) {
      createUserInTheDataBase();
      await loginToken.getLogin({ email: signUpInfo.email.toLowerCase() });

      localStorage.setItem("current-user", signUpInfo.email);
      history.push("/home");
    } else {
      swal("You already have an account, please sign in", { button: false });
    }
  };

  // create user in the database
  const createUserInTheDataBase = async () => {
    await fetch("/insert_user", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signUpInfo),
    });
  };

  return (
    <div>
      <div className="SignUp">
        <div className="container-fluid d-flex justify-content-center">
          <div className="signcard-signup">
            <div className="card-header">
              <h3>Sign Up</h3>
            </div>
            <div className="card-body">
              <form>
                <div className="form-group">
                  <label for="name">Username</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-control"
                    placeholder=" "
                    onChange={handleSignUpInput}
                  />
                </div>
                <div className="form-group">
                  <label for="email">Email</label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    className="form-control"
                    placeholder=" "
                    onChange={handleSignUpInput}
                  />
                </div>

                <div className="form-group">
                  <label for="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="form-control"
                    placeholder=""
                    onChange={handleSignUpInput}
                  />
                </div>

                <div className="form-group">
                  <input
                    className="btn btn-dark btn-sm"
                    style={{
                      marginTop: "10px",
                      width: "100px",
                      padding: "8px",
                    }}
                    value="Sign Up"
                    onClick={checkUserInDb}
                  />
                </div>

                <div className="form-group">
                  Already an user?{" "}
                  <Link className="card-footerText" to="/signin">
                    Sign In
                  </Link>
                  <br />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
