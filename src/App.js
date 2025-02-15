import logo from './logo.svg';
import './App.css';
import { useContext,useState,useEffect, createContext} from 'react';
import AgentLogin from './Agent/AgentLogin';
import {Routes,Route} from 'react-router-dom'
import {Container} from 'react-bootstrap'
import Main from './Main';
import AgentHome from './Agent/AgentHome';
import StudentLogin from './Student/StudentLogin';
import StudentHome from './Student/StudentHome';
import {Nav,Navbar,NavDropdown} from 'react-bootstrap'
import AdminLogin from './Admin/AdminLogin';
import AdminHome from './Admin/AdminHome';
import StudentProfile from './Student/StudentProfile';

const myContexts = createContext();

function App() {
  return (
    <div >
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
              <Navbar.Brand href="/" style={{fontWeight:"200"}}>University <span style={{fontWeight:"bold"}}>Insights</span></Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              
                 <Navbar.Collapse id="basic-navbar-nav">
                      
                 <div className='shiftLeft' style={{display:"flex"}} >
                      <Nav.Link style={{fontWeight:"200"}} href="/agentLogin">Agent</Nav.Link>
                      <Nav.Link style={{fontWeight:"200"}} href="/studentLogin">Student</Nav.Link>
                      <Nav.Link style={{fontWeight:"200"}} href="/adminLogin">Admin</Nav.Link>
                    
                  </div>

                </Navbar.Collapse>
                
            </Container>
          </Navbar>
       <Container style={{display:"grid",placeItems:"center",marginTop:"5%",width:"100%",backgroundColor:""}}>
          
          <Routes>
             <Route path = "/" element = {<Main/>} />
             <Route path = "/agentLogin" element = {<AgentLogin/>} />
             <Route path = "/agentHome" element = {<AgentHome/>} />
             <Route path = "/studentLogin" element = {<StudentLogin/>} />
             <Route path = "/studentHome" element = {<StudentHome/>} />
             <Route path = "/studentProfile" element = {<StudentProfile/>} />
             <Route path = "/adminLogin" element = {<AdminLogin/>} />
             <Route path = "/adminHome" element = {<AdminHome/>} />
          </Routes>

        </Container>
       
    </div>
  );
}

export {myContexts,App};
