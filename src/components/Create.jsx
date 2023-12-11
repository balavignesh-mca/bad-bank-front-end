import { useState } from "react";
import Card from "react-bootstrap/Card";
import axios from "axios";

// create component
export default function Create() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [id, setId] = useState();
  const [addButton, setAddButton] = useState({ display: "none" });
  const [form, setForm] = useState({ display: "block" });

  let url = "http://127.0.0.1:4000/register";
  // handleSubmit function to check
  async function handleSubmit(e) {
    e.preventDefault();
    if (!name) {
      alert("Please enter your name.");
    } else if (!email) {
      alert("Please enter your email.");
    } else if (!password) {
      alert("Please enter your password.");
    } else if (password.length < 8) {
      alert("Please enter a password minimum of 8 characters.");
    } else {
      await postproducts();
    }
  }

  // posting data in database
  const postproducts = async () => {
    let data = {
      name: name,
      email: email,
      password: password,
    };

    const res = await axios.post(url, data);
    setId(res.data.id);

    switch (res.data.statuscode) {
      case 401:
        alert(`EMAIL: ${email} already exsist!!`);
        break;

      case 201:
        alert(`account created successfully`);
        setName("");
        setEmail("");
        setPassword("");
        setAddButton({ display: "block" });
        setForm({ display: "none" });
        break;

      default:
        break;
    }
    console.log(`${res.data.message}`);
  };

  // condition for button
  const isFormFilled = name && email && password;

  return (
    <>
      <center>
        <Card border="primary" className="form">
          <Card.Header style={{ fontSize: 50 }} className="title">
            Create Account
          </Card.Header>
          <Card.Body>
            <form className="create" style={form} onSubmit={handleSubmit}>
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control top"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <label htmlFor="floatingFirstName">Name</label>
              </div>

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
                Create Account
              </button>
            </form>

            <div style={addButton}>
              <h1
                style={{ fontSize: 40, paddingBottom: "3rem" }}
                className="title"
              >
                Account ID is: {id}
              </h1>

              <button
                className="w-100 btn btn-lg btn-primary"
                type="submit"
                onClick={() => {
                  setAddButton({ display: "none" });
                  setForm({ display: "block" });
                }}
              >
                Add anthor account
              </button>
            </div>
          </Card.Body>
        </Card>
      </center>
    </>
  );
}
