import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import axios from "axios";

export default function Alldata() {
  const [data, setData] = useState();


  const storedToken = localStorage.getItem("token");
  let url = "http://127.0.0.1:4000/allData";
  useEffect(() => {
    async function fetchdata() {
      
      let res = await axios.get(url, {headers: {
              Authorization: `Bearer ${storedToken}`,
            },});
      let result = res.data;
      setData(result);
      
    }
    fetchdata();
  }, [url,storedToken]);
  
      console.log(data);
  const handleDelete = async (id, name, email) => {
    await axios.delete(`http://127.0.0.1:4000/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    });

    alert(`successfully deleted account ID: ${id} 
                                        Name: ${name}
                                         Email: ${email}`);
    let update_data = await axios(url);
    setData(update_data.data);
  };

  return (
    <>
      <center>
        <Card border="primary" className="box all">
          <Card.Header style={{ fontSize: 50 }} className="title">
            All data
          </Card.Header>
          <Card.Body>
            { 
            data &&
             data.map((item, key) => (
                <Card border="dark" className="all-box" key={key}>
                  <Card.Header style={{ fontSize: 22 }}>
                    Account ID: {item.custid}
                  </Card.Header>
                  <p className="el-alldata">Name : {item.name} </p>
                  <p className="el-alldata">email : {item.email} </p>
                  <p className="bl-alldata">
                    balance : ${item.money}
                  </p>

                  <button
                    className="w-100 btn btn-lg btn-danger all-btn"
                    onClick={() =>
                      handleDelete(
                        item.custid,
                        item.name,
                        item.email
                      )
                    }
                  >
                    Delete account
                  </button>
                </Card>
              ))}
          </Card.Body>
        </Card>
      </center>
    </>
  );
}
