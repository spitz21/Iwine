import React, {Component, useState} from "react";
import "../App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AccountPage from "./AccountPage";
import Sidebar from "./Sidebar";
import SearchPage from "./SearchPage";

/* Uses Sidebar component to get selection of the page the user wishes to visit*/
function UserHomePage(){
    const [page, setPage] = useState("first");
    
    if(page == "first") return(
    <>
    {/*first page renders the search component*/}
    <Container className = "sidebarContainer">
    <Row>
        <Col sm={2} className="sidebarCol">
            <Sidebar setPage={setPage}/>
        </Col>
        <Col sm={10} className = "userHomePages">
            <SearchPage/>
        </Col>
    </Row>
    </Container>
    </>
    
    );
    if(page == "second") return(
        <>
        {/*second page renders the wine list component*/}
        <Container className = "sidebarContainer">
        <Row>
        <Col sm={2} className="sidebarCol">
            <Sidebar setPage={setPage}></Sidebar>
        </Col>
        <Col sm={10} className = "userHomePages">
            <div style={{color: "white"}}>Wine List Page</div>
        </Col>
        </Row>
        </Container>
        </>
    );
    if(page == "third") return (
        <>
        {/*third page renders the account manager component*/}
        <Container className = "sidebarContainer">
        <Row>
        <Col sm={2} className="sidebarCol">
            <Sidebar setPage={setPage}></Sidebar>
        </Col>
        <Col sm={10} className = "userHomePages">
            <AccountPage></AccountPage>
        </Col>
        </Row>
        </Container>
        </>
        );
}

export default UserHomePage;
