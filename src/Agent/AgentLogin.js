import React,{useState,useEffect} from 'react'
import {TextField,Button,Paper} from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { Card,Row,Col } from 'react-bootstrap';
import axios from 'axios';
import { LinkVercel } from '../Link';


const AgentLogin = () => {

    const [flag,setFlag] = useState("login")
    const navigate = useNavigate();

    const [loginDetails,setLoginDetails] = useState({
        username:"",
        password :""
      })
      const [registerDetails,setRegisterDetails] = useState({
        username:"",
        password :"",
        re_password:""
      })
    
      const agentRegister = async function(){
        
        try{
            if(registerDetails.password === registerDetails.re_password){
                
                const response = await axios.post(`${LinkVercel}/agent/register`,registerDetails)

            }
        }catch(e){}
    
      }
    
      const agentLogin = async function(){
          
        try{
           
          const response = await axios.post(`${LinkVercel}/agent/login`,loginDetails);
          console.log(response)
          if(response.data.flag){
            localStorage.setItem("agentToken",response.data.token);
            navigate("/agentHome",{state:{profile:response.data.value[0]}})
          }

        }catch(e){}

      
      }
      
  
      let element ; 
  
      switch(flag){
          
        case "login":
          element = <div style={{padding:"15px",width:"100%"}}>
            <h1>Login</h1>
            <p></p>
          
          <TextField style={{width:"100%"}} onChange={e=>setLoginDetails((prev)=>{
            return {...prev,username:e.target.value}
          })} id="filled-basic" label="username" variant="filled"  />
     
         <p></p>
         <TextField style={{width:"100%"}} onChange={e=>setLoginDetails((prev)=>{
            return {...prev,password:e.target.value}
          })} id="filled-basic" label="password" variant="filled"  />
          <p></p>
          <Card.Footer>
          <Button onClick={agentLogin} variant='contained' color='success'>Login</Button>
          <p></p>
          <Button variant='outlined'  onClick={e=>setFlag("register")}>Don't Have A Account?</Button>
          
          </Card.Footer>
           </div>
           break;
    
        case "register":
    
        element=<div style={{padding:"15px",width:"100%"}}>
          <h1>Register</h1>
          <p></p>
          <TextField style={{width:"100%"}} onChange={e=>setRegisterDetails((prev)=>{
            return {...prev,username:e.target.value}
          })} id="filled-basic" label="username" variant="filled"  />
        <p></p>
        <TextField style={{width:"100%"}} onChange={e=>setRegisterDetails((prev)=>{
            return {...prev,password:e.target.value}
          })} id="filled-basic" label="password" variant="filled" />
        <p></p>
        <TextField style={{width:"100%"}} onChange={e=>setRegisterDetails((prev)=>{
            return {...prev,re_password:e.target.value}
          })} id="filled-basic" label="re_password" variant="filled"/>
        <p></p>
        <Card.Footer>
        <Button onClick={agentRegister} variant='contained' color='success'>Register</Button>
        <p></p>
        <Button variant='outlined' onClick={e=>setFlag("login")}>Already Have A Account?</Button>
    
     
        
         
        </Card.Footer>
    
         </div>
         break;
           
     
    
      }


  return (
    <div>  <Row>
    <Col lg = {6} style={{display:"flex",flexDirection:"column",justifyContent:"center"}} >
       
       <div>
         <h1 style={{fontSize:"100px",fontWeight:"100"}}>A Scholarship Agent</h1>
         <p style={{fontSize:"30px",fontWeight:"100"}}>Help The Students To Find The Scholarships They Truly Deserve</p>
       </div>

    </Col>
    <Col lg = {6} style={{backgroundColor:"",padding:"35px"}} >
      <Paper elevation={5} style={{padding:"35px"}}>
      {element}
      </Paper>
    </Col>
 </Row></div>
  )
}

export default AgentLogin