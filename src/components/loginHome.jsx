import React, { useEffect } from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const navigate = useNavigate();
  const storedToken = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      if (storedToken) {
        try {
          // Try fetching user data
          const userRes = await axios.get(
            "http://127.0.0.1:4000/getSingleData",
            {
              headers: {
                Authorization: `Bearer ${storedToken}`,
              },
            }
          );

          // If user data is found, redirect to user dashboard
          if (userRes.data.role === "customer") {
            navigate("/user-login");
            return; // Exit the function if user data is found
          }
        } catch (userError) {
          console.error("Error fetching user data:", userError);
        }

        try {
          // Try fetching admin data
          const adminRes = await axios.get(
            "http://127.0.0.1:4000/getAdminData",
            {
              headers: {
                Authorization: `Bearer ${storedToken}`,
              },
            }
          );

          // If admin data is found, redirect to admin dashboard
          if (adminRes.data.role === "admin") {
            navigate("/admin-login");
          }
        } catch (adminError) {
          console.error("Error fetching admin data:", adminError);
        }
      }
    };

    fetchData();
  }, [storedToken, navigate]);

  const handleRedirect = (path) => {
    navigate(path);
  };

  return (
    <center>
      <Card border="primary" className="form">
        <Card.Header style={{ fontSize: 50 }} className="title">
          Login Options
        </Card.Header>
        <Card.Body>
          <button
            className="w-100 btn btn-lg btn-primary"
            onClick={() => handleRedirect("/admin-login")}
          >
            Admin Login
          </button>

          <button
            className="w-100 btn btn-lg btn-primary mt-2"
            onClick={() => handleRedirect("/user-login")}
          >
            User Login
          </button>
        </Card.Body>
      </Card>
    </center>
  );
};

export default LoginPage;
