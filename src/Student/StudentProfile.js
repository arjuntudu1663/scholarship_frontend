import React, { useEffect,useState } from 'react'
import axios from 'axios';
import { LinkVercel } from '../Link';
import { useLocation, useNavigate } from 'react-router-dom';
import {  Card } from 'react-bootstrap';
import { Button } from '@mui/material';

const StudentProfile = () => { 
    
    const location = useLocation();
    const navigate = useNavigate();

    const [profile,setProfile] = useState({
        country:"",
                
                degree:"",
            
                hs:"",
           
                name:"",
        
                neet:"",
             
             
             
                pcb:"",
             
    })
     
    useEffect(()=>{
        
        const getProfile = async () => { 
 
             try{
                const response = await axios.post(`${LinkVercel}/student/studenFind`,{id:location.state.id})
             
            console.log(response)

              setProfile((prev)=>{
                return {...prev,

                    country:response.data.value.country,
                
                    degree:response.data.value.degree,
                
                    hs:response.data.value.hs,
               
                    name:response.data.value.name,
            
                    neet:response.data.value.neet,
                 
                    pcb:response.data.value.pcb,

                }
              })
             }catch(e){

             }
        }
        
        getProfile();

    },[])

  return (
    <div style={{width:"100%"}}>
          
          <Card style={{width:"100%",padding:"50px"}}>
           Name -   {profile.name}
           <p></p>
           Country - {profile.country}
           <p></p>
           Degree - {profile.degree}
           <p></p>
           Hs - {profile.hs}
           <p></p>
           Neet  - {profile.neet}
           <p></p>
           Pcb - {profile.pcb}
           <p></p>
           <Button style={{width:"20%"}} onClick={(e)=>{
            navigate("/adminHome")
           }} >Back</Button>
          </Card>

    </div>
  )
}

export default StudentProfile