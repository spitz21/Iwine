import React from "react";
import "../App.css";
import Card from "react-bootstrap/Card";
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';


function Sidebar({setPage}) {

    return(
        <Card className="sidebar" style={{minHeight: '10vh', minWidth: '150px', height: '100vh', width:'15vw', maxHeight: '100vh', maxWidth:'200px', background: '#4B0A45'}}>
        <Card.Body>
            <Tab.Container id="left-tabs-example" defaultActiveKey= "first" >
                <Nav variant="pills" className="flex-column" onSelect={(selectedKey) => setPage(selectedKey)}>
                    <Nav.Item>
                        <Nav.Link  eventKey="first" style={{color: 'white'}}>Search</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="second" style={{color: 'white'}}>Wine Lists</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="third" style={{color: 'white'}}>Account</Nav.Link>
                    </Nav.Item>
                </Nav>
            </Tab.Container>
        </Card.Body>
      </Card>
    );
}

export default Sidebar;