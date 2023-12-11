import React, { useEffect, useState } from "react";
import axios from "axios";

import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


export default function Login() {
  const [email, setEmail] = useState("");
  const [data, setData] = useState({});
  const [password, setPassword] = useState("");
  const [addButton, setAddButton] = useState({ display: "none" });
  const [form, setForm] = useState({ display: "block" });
  
  const [refresh, setRefresh] = useState(true);
const navigate = useNavigate(); 
  // useEffect to check if the user is already logged in
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      
      setAddButton({ display: "block" });
      setForm({ display: "none" });

      async function fetchData() {
        try {
          const res = await axios.get("http://127.0.0.1:4000/getAdminData", {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          });
          setData(res.data);
          console.log(res.data);
        } catch (error) {
          console.error("Error in fetchData:", error);
        }
      }

      fetchData();
    }
  }, [refresh]);

  // handleSubmit function to check
  async function handleSubmit(e) {
    e.preventDefault();

    if (!email) {
      alert("Please enter your email.");
    } else if (!password) {
      alert("Please enter your password.");
    } else {
      await loginAccount();
    }
  }

  // posting data in the database
  const loginAccount = async () => {
    let data = {
      email: email,
      password: password,
    };

    try {
      const res = await axios.post("http://127.0.0.1:4000/loginAdmin", data);

      switch (res.data.statuscode) {
        case 401:
          alert(res.data.message);
          setPassword("");
          break;

        case 201:
          alert("Login successfully ");
          // Save the token in localStorage
          localStorage.setItem("token", res.data.token);
          // Update state with user details
          
          setAddButton({ display: "block" });
          setForm({ display: "none" });
          setRefresh(true);
          window.location.reload();
          break;

        case 404:
          alert(res.data.message);
          setEmail("");
          setPassword("");
          break;

        default:
          break;
      }
      console.log(res.data.message);
    } catch (error) {
      console.error("Error in loginAccount:", error);
    }
  };

  // condition for the button
  const isFormFilled = email && password;

  return (
    <>
      <center>
        <Card border="primary" className="form" style={form}>
          <Card.Header style={{ fontSize: 50 }} className="title">
            Login Account
          </Card.Header>
          <Card.Body>
            <form className="create" onSubmit={handleSubmit}>
              <div className="form-floating">
                <input
                  type="email"
                  className="form-control middle"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="floatingEmail">Email</label>
              </div>

              <div className="form-floating">
                <input
                  type="password"
                  className="form-control bottom"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="floatingEmail">Password</label>
              </div>

              <button
                className="w-100 btn btn-lg btn-primary"
                type="submit"
                disabled={!isFormFilled}
              >
                Login Account
              </button>
            </form>
          </Card.Body>
        </Card>

        <Card border="primary" className="form" style={addButton}>
          <Card.Header style={{ fontSize: 30 }} className="title">
            ADMIN ACCOUNT
          </Card.Header>
          <Card.Body>
            <h1
              style={{ fontSize: 30, paddingBottom: "1rem" }}
              className="title"
            >
              Name: {data.name}
            </h1>
            <h1
              style={{ fontSize: 30, paddingBottom: "1rem" }}
              className="title"
            >
              Admin ID is: {data.adminid}
            </h1>
            <button
              className="w-100 btn btn-lg btn-primary"
              type="submit"
              onClick={() => navigate("/allData")}
            >
              allData
            </button>
            <br /> <br />
            <button
              className="w-100 btn btn-lg btn-primary"
              type="submit"
              onClick={() => {
                localStorage.removeItem("token");
                setAddButton({ display: "none" });
                setForm({ display: "block" });
                setEmail("");
                setPassword("");
                navigate("/login");
                window.location.reload();
              }}
            >
              Logout
            </button>
          </Card.Body>
        </Card>
      </center>
    </>
  );
}
