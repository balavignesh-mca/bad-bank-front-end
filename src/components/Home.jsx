import Card from "react-bootstrap/Card";
import bank from "../images/2.png";

export default function Home() {
  return (
    <>
      <center>
        <Card border="primary" className="box" style={{ marginTop: "4rem" }}>
          <Card.Header style={{ fontSize: 50 }} className="title">
            Axis BANK
          </Card.Header>
          <Card.Body>
            <Card.Title
              style={{ fontSize: 30, textShadow: " 1px 1px 2px #000000" }}
            >
              Welcome to Axis Bank
            </Card.Title>
            <img
              className="card-img-top"
              src={bank}
              alt="bank"
              style={{ maxWidth: "400px" }}
            />
            {/* <button
              className="w-100 btn btn-lg btn-primary"
              type="submit"
              onClick={() => {}}
            >
              Admin Login
            </button> */}
          </Card.Body>
        </Card>
      </center>
    </>
  );
}
