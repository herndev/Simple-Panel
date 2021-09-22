import { React, useState, useEffect } from "react";

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

function Home() {
  const timestamp = Date.now(); // This would be the timestamp you want to format
  var time = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(timestamp);
  const dataRef = firestore.collection("users");
  const [users] = useCollectionData(dataRef, { idField: "id" });
  var [username, setusername] = useState("");
  var [password, setpassword] = useState("");
  var [type, settype] = useState("");
  var myButtons = [
    <button className="btn btn-primary crv-25 ml-1">Transactions</button>,
    <button className="btn btn-warning crv-25 ml-1">Payments</button>,
    <button className="btn btn-info crv-25 ml-1">Documents</button>,
    <button className="btn btn-success crv-25 ml-1">Grades</button>,
    <button className="btn btn-danger crv-25 ml-1" onClick={logout}>
      <i className="ion-power text-white"></i>
    </button>,
    <button className="btn btn-primary crv-25 ml-1">Transacts</button>,
  ];

  useEffect(() => {
    if (window.sessionStorage.getItem("authenticated") === null) {
      window.open("/", "_self");
    } else {
      var _url = window.location.href.toString().split("/");
      _url = _url[_url.length - 1];

      var _key = window.sessionStorage.getItem("key");
      if (users !== undefined) {
        users.map(async (ele) => {
          if (_key === ele["id"]) {
            if (_url !== ele["type"]) {
              window.open(ele["type"], "_self");
            }

            setusername(ele["username"]);
            setpassword(ele["password"]);
            settype(ele["type"]);
          }
          return 0;
        });
      }
    }
  });

  // Log out
  function logout() {
    if (window.confirm("Do you want to Logout?")) {
      window.sessionStorage.clear();
      window.open("/", "_self");
    }
  }

  return (
    <div id="home">
      {users !== undefined ? (
        <div className="container">
          <div className="row">
            <div className="col-md-8 offset-md-2">
              <div className="row min-h-400">
                <div className="col-md-6 bg-green crv-25-left p-3 display-center">
                  <div className="">
                    <h4 className="text-center text-lime mb-2">
                      Welcome,{" "}
                      <span className="text-warning text-capitalize">
                        {type}
                      </span>{" "}
                    </h4>
                    <p className="px-3 text-white text-center">
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    </p>

                    {type === "admin" ? (
                      <img
                        src="img/admin.jpg"
                        alt=""
                        className="img-fluid crv-8"
                      />
                    ) : type === "student" ? (
                      <img
                        src="img/student.jpeg"
                        alt=""
                        className="img-fluid crv-8"
                      />
                    ) : type === "accountant" ? (
                      <img
                        src="img/accountant.jpg"
                        alt=""
                        className="img-fluid crv-8"
                      />
                    ) : type === "secretary" ? (
                      <img
                        src="img/secretary.jpg"
                        alt=""
                        className="img-fluid crv-8"
                      />
                    ) : type === "cashier" ? (
                      <img
                        src="img/cashier.jpg"
                        alt=""
                        className="img-fluid crv-8"
                      />
                    ) : (
                      <h5 className="text-white text-center">
                        You must logged in.
                      </h5>
                    )}
                  </div>
                </div>
                <div className="col-md-6 bg-light crv-25-right p-3">
                  <div className="text-right">
                    {type === "admin" ? (
                      <div className="">
                        {myButtons[5]}
                        {myButtons[2]}
                        {myButtons[3]}
                        {myButtons[4]}
                      </div>
                    ) : type === "student" ? (
                      <div className="">
                        {myButtons[3]}
                        {myButtons[4]}
                      </div>
                    ) : type === "accountant" ? (
                      <div className="">
                        {myButtons[0]}
                        {myButtons[1]}
                        {myButtons[4]}
                      </div>
                    ) : type === "secretary" ? (
                      <div className="">
                        {myButtons[2]}
                        {myButtons[4]}
                      </div>
                    ) : type === "cashier" ? (
                      <div className="">
                        {myButtons[1]}
                        {myButtons[4]}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>

                  <div className="p-3">
                    <h3 className="text-success text-center mt-5 mb-4">
                      Your Credentials
                    </h3>
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">
                          <i className="ion-person"></i>
                        </span>
                      </div>
                      <input
                        disabled
                        type="text"
                        className="form-control"
                        placeholder="Username"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        value={username}
                      />
                    </div>
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">
                          <i className="ion-android-lock"></i>
                        </span>
                      </div>
                      <input
                        disabled
                        type="text"
                        className="form-control"
                        placeholder="Password"
                        aria-label="Password"
                        aria-describedby="basic-addon1"
                        value={password}
                      />
                    </div>
                    <div className="text-center">
                      <small>
                        Date and time: <strong>{time}</strong>
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h5 className="text-center">Fetching data..</h5>
      )}
    </div>
  );
}

export default Home;
