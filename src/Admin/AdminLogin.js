
import React,{useState,useEffect} from 'react'
import {TextField,Button,Paper} from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { Card,Row,Col, Modal } from 'react-bootstrap';
import axios from 'axios';
import { LinkVercel } from '../Link';

const AdminLogin = () => {


    const [flag,setFlag] = useState("login")
    const navigate = useNavigate();

    const [modalFlag,setModalFlag] = useState(false);
    const [modalMessage,setModalMessage] = useState("")

    const [loginDetails,setLoginDetails] = useState({
        name:"",
        password :""
      })
    const [registerDetails,setRegisterDetails] = useState({
        name:"",
        password :"",
        re_password:""
      })
    
      const Register = async function(){

         try{
          if(registerDetails.password === registerDetails.re_password){
             
            const response = await axios.post(`${LinkVercel}/admin/register`,{name:registerDetails.name,password:registerDetails.password});
            if(response.data.flag){
               
              setModalFlag(true);
              setModalMessage("Register Successfull")
              setModalFlag(false);
              setFlag("login")

            }else{
               
              setModalFlag(true);
              setModalMessage(response.data.value.message)

            }
        }
        
         }catch(e){}
    
    
      }
    
      const Login = async function(){
          
              try{
                const response = await axios.post(`${LinkVercel}/admin/login`,loginDetails);
                console.log(response)
                if(response.data.flag == false){
                  setModalFlag(true);
                  setModalMessage("wrong credentials")
                }else{
                   navigate("/adminHome",{state:{profile:response.data.value.profile}})
                }

              }catch(e){

              }

      
      }


      let element ;
 
    switch(flag){
          
        case "login":
          element = <div style={{padding:"15px",width:"100%"}}>
            <h1>Login</h1>
            <p></p>
          
          <TextField style={{width:"100%"}} onChange={e=>setLoginDetails((prev)=>{
            return {...prev,name:e.target.value}
          })} id="filled-basic" label="username" variant="filled"  />
     
         <p></p>
         <TextField style={{width:"100%"}} onChange={e=>setLoginDetails((prev)=>{
            return {...prev,password:e.target.value}
          })} id="filled-basic" label="password" variant="filled"  />
          <p></p>
          <Card.Footer>
          <Button  variant='contained' onClick={Login} color='success'>Login</Button>
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
            return {...prev,name:e.target.value}
          })} id="filled-basic" label="name" variant="filled"  />
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
        <Button onClick={Register}  variant='contained' color='success'>Register</Button>
        <p></p>
        <Button variant='outlined' onClick={e=>setFlag("login")}>Already Have A Account?</Button>
        </Card.Footer>
    
         </div>
         break;
    }


    
  return (
    <div style={{width:"50%"}}>{element}
    
    
    <Modal style={{marginTop:"10%"}} show = {modalFlag}>
         <Modal.Body>
          {modalMessage}
         </Modal.Body>
         <Modal.Footer>
           <Button onClick={e=>setModalFlag(false)}>Close</Button>
         </Modal.Footer>
    </Modal>

    </div>
  )
}

export default AdminLogin