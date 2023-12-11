import { Container, Nav, Navbar } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";

export default function NavBarRoutes() {
   const storedToken = localStorage.getItem("token");

  const [data, setData] = useState('');
  

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      console.log(storedToken);
      
      async function fetchData() {
        try {
          const res = await axios.get("http://127.0.0.1:4000/getSingleData", {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          });
          setData(res.data.role);
          console.log(res.data);
        } catch (error) {
          console.error("Error in fetchData:", error);
        }
      }

      fetchData();
    }
  }, [storedToken]);

  return (
    <Navbar bg="dark" variant="dark" className="nav-bar">
      <Container>
        <Navbar.Brand href="/" title="welcome">
          Home
        </Navbar.Brand>
       
        <Nav className="me-auto">
          <Nav.Link href="#/login" className="nav" title="login">profile</Nav.Link>
         {storedToken ? 
           "":
          <Nav.Link href="#/create" className="nav" title="Create a new account">Create Account</Nav.Link>
}

{data === 'customer' ?
    
    <>
    <Nav.Link href="#/deposit" className="nav" title="Deposit money">deposit</Nav.Link>
    <Nav.Link href="#/withdraw" className="nav" title="Withdraw money">withdraw</Nav.Link>  
    </>
    :
    ''
  }


        </Nav>
      </Container>
    </Navbar>
  );
}
