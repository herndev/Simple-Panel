import { React, useEffect } from "react";

import firebase from "firebase";
import "firebase/firestore";

import { useCollectionData } from "react-firebase-hooks/firestore";

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyAIWJre3fG5Y3YESzGP8_7YOgoD6X5toyQ",
    authDomain: "test-d23da.firebaseapp.com",
    projectId: "test-d23da",
    storageBucket: "test-d23da.appspot.com",
    messagingSenderId: "569110691850",
    appId: "1:569110691850:web:2cb3186fd63ccfa40ddff3",
  });
} else {
  firebase.app(); // if already initialized, use that one
}

const firestore = firebase.firestore();

function Login() {
  var isAuthorized = false;
  const dataRef = firestore.collection("users");
  const [users] = useCollectionData(dataRef, { idField: "id" });

  // Attempt to log in
  var attemptLogin = async (e) => {
    e.preventDefault();

    var username = e.target[0]["value"];
    var password = e.target[1]["value"];

    // Authentication matching user credentials
    users.map(async (ele) => {
      if (username === ele["username"] && password === ele["password"]) {
        var _key = ele["id"];
        var _type = ele["type"];
        window.sessionStorage.setItem("authenticated", true);
        window.sessionStorage.setItem("key", _key);
        isAuthorized = true;

        // await dataRef.doc(_key).update({
        //   lastlog: time,
        // });

        window.open(_type, "_self");
      }

      return 0;
    });

    if (!isAuthorized) {
      alert("Invalid credentials");
    }

    e.target.reset();
    isAuthorized = false;
  };

  useEffect(() => {
    if (window.sessionStorage.getItem("authenticated") !== null) {
      var _key = window.sessionStorage.getItem("key");
      if (users !== undefined) {
        users.map(async (ele) => {
          if (_key === ele["id"]) {
            var _type = ele["type"];
            window.open(_type, "_self");
          }

          return 0;
        });
      }
    }
  });

  return (
    <div id="login">
      <div className="container">
        <div className="row">
          <div className="col-md-4 offset-md-4">
            <div className="card crv-25 p-4 bg-green">
              <h4 className="text-lime mb-3">Login</h4>
              <form
                onSubmit={attemptLogin}
                method="post"
                className="form-group"
              >
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="ion-person"></i>
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Username"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                </div>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="ion-android-lock"></i>
                    </span>
                  </div>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    aria-label="Password"
                    aria-describedby="basic-addon1"
                  />
                </div>
                <button className="btn crv-25 btn-warning btn-block">
                  Sign-in
                </button>
              </form>
            </div>

            <div className="w-100 text-center mt-3 font-italic">
              <small>
                Copyright all rights reserved @ <strong>Hernie Jabien</strong>{" "}
                2021
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
