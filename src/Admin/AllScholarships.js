import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { LinkVercel } from '../Link'
import {  Card ,Modal, Row,Col } from 'react-bootstrap'
import { CiMenuBurger } from "react-icons/ci";
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const AllScholarships = () => {
   
    const [data,setData] = useState([])
    const [allAppliers,setAllAppliers] = useState([]);
    const [appliersModal,setAppliersModal] = useState(false)

    const navigate = useNavigate();

    const getAppliers = async function(id){
         console.log(id);
         setAppliersModal(true);
        
         try{
            const response = await axios.post(`${LinkVercel}/admin/allAppliers`,{scholarShipId:id})
            console.log(response)

            setAllAppliers(response.data.value)
         }catch(e){

         }



    }

    const viewStudentProfile = async function(studentId){
         
        navigate("/studentProfile",{state:{id:studentId}})

    }

    const closeAppliers = function(){
        setAllAppliers([]);
        setAppliersModal(false)
    }
   
    useEffect(()=>{
        const getData = async () => {
            
             try{
                const response = await axios.get(`${LinkVercel}/admin/allScholarships`)    
                if(response.data.flag){
                    setData(response.data.value);
                }
                 console.log(response.data)
                 
             }catch(e){

             }
        }

        getData();
    },[])

  return (
    <div>
    
         <Row>
         {data.map((x)=>{
            return  <Col lg = {4}>
                <Card style = {{width:"100%",padding:"15px",marginBottom:"20px"}}>
                {x.name}
                <p></p>
                <Button onClick={e=>getAppliers(x._id)} style={{width:"50%"}} variant='contained' color='success' >Appliers</Button>
                </Card>
            </Col>
        })}
         </Row>
        

        <Modal show = {appliersModal}>
                <Modal.Body style={{height:"500px",overflow:"scroll"}}>
                   
                   {
                       allAppliers.map((x)=>{
                         
                        return <Card style={{marginBottom:"15px",padding:"15px"}} >
                            {x.studentId}
                            <p></p>
                            <Button style={{width:"20%"}} variant='contained' onClick={e=>viewStudentProfile(x.studentId)} color='success'>View</Button>
                        </Card>

                       })
                   }

                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={closeAppliers}>Close</Button>
                </Modal.Footer>
        </Modal>
    </div>
  )
}

export default AllScholarships