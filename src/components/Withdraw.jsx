import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import axios from "axios";

export default function Withdraw() {
  let [currbalance, setCurrbalance] = useState();
  let [withdraw, setWithdraw] = useState();
  let [acc_Id, setAcc_Id] = useState();
  let [acc_Name, setAcc_Name] = useState();
  const [result, setResult] = useState({ display: "none" });
  const [form, setForm] = useState({ display: "block" });
  const storedToken = localStorage.getItem("token");

  let url = `http://127.0.0.1:4000/getSingleData`;
  useEffect(() => {
    async function fetchdata() {
      let res = await axios.get(`${url}`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });
      let result = res.data;
      console.log("data: ", result);

      if (result.custid) {
        setAcc_Id(result.custid);
        setCurrbalance(result.money);
        setAcc_Name(result.name);
        console.log(currbalance);
      } else {
        alert(result.message);
        setAcc_Id("");
        setCurrbalance();
        setAcc_Name();
      }
    }

    fetchdata();
  }, [url, acc_Id, currbalance,storedToken]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (withdraw === " ") {
      alert("Please enter an amount");
    } else if (isNaN(withdraw)) {
      setWithdraw("");
      alert("Please enter amount in number");
    } else if (Number(withdraw) < 1) {
      setWithdraw("");
      alert("Please enter a positive amount");
    } else if (currbalance >= withdraw){
      setWithdraw("");
      setAcc_Id("");
      setResult({ display: "block" });
      setForm({ display: "none" });
      await updateproducts();
    }else {

     alert("insufficient amount")
    }
  }

  const updateproducts = async () => {
    
    let balance_add = Number(currbalance) - Number(withdraw);
    setCurrbalance(balance_add);

    let update = {
      balance: balance_add,
    };

    const data = await axios.put(
      `http://127.0.0.1:4000/update/${acc_Id}`,
      update,
      {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      }
    );

    console.log(data);
    alert(data.data);
    
    
  };

  return (
    <>
      <center>
        <Card border="primary" className="form update">
          <Card.Header style={{ fontSize: 50 }} className="title">
            Withdraw
          </Card.Header>
          <Card.Body>
            <Card.Title style={{ fontSize: 22 }} className="title">
              Account Holder : {acc_Name}
            </Card.Title>
            <form className="create" style={form} onSubmit={handleSubmit}>
              <Card.Title
                style={{ fontSize: 30, textShadow: " 1px 1px 2px #000000" }}
              >
                balance: ${currbalance}
              </Card.Title>

              <div className="form-floating">
                <input
                  className="form-control top"
                  placeholder="Amount"
                  value={withdraw}
                  onChange={(e) => setWithdraw(e.target.value)}
                  min="1"
                />
                <label htmlFor="floatingFirstName">Enter Amount..</label>
              </div>
              <br />

              <button
                className="w-100 btn btn-lg btn-success"
                disabled={!withdraw}
                type="submit"
              >
                Withdraw
              </button>
            </form>

            <div style={result}>
              <h3
                style={{ paddingTop: "2rem", paddingBottom: "3rem" }}
                className="title"
              >
                {`Account Balance: ${currbalance}`}
              </h3>

              <button
                className="w-100 btn btn-lg btn-primary"
                type="submit"
                onClick={() => {
                  setWithdraw("");
                  setAcc_Id("");
                  setAcc_Name("");
                  setCurrbalance();
                  setResult({ display: "none" });
                  setForm({ display: "block" });
                }}
              >
                back to withdraw
              </button>
            </div>
          </Card.Body>
        </Card>
      </center>
    </>
  );
}
