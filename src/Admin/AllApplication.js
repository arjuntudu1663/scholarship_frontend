
import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { LinkVercel } from '../Link'
import { Card, Modal,Row,Col } from 'react-bootstrap'
import { Switch,Button } from '@mui/material'

const AllApplication = () => {
    const [data,setData] = useState([])
    const [modalFlag,setModalFlag] = useState(false)

    const [studentDetails,setStudentDetails] = useState({
      country:"",     
      name:"",
      degree:"",   
      hs:"", 
      hs:"",   
      neet:"",
      pcb:"",
    });


    const [scholarshipDetails,setScholarshipDetails] = useState({
      country:"",  
      hs:"", 
      name:"",  
      neet:"", 
      pcb:"",   
      price:"", 
    }); 
     

     const setGrant = async function(id){
              
          try{
            const response = await axios.post(`${LinkVercel}/admin/setGrant`,{applicationId:id})
            if(response.data.flag){
               window.location.reload();
            }
          }catch(e){}

     }

     const seeDetails = async function(sId,scId){
       setModalFlag(true)
       try{
           const response =await axios.post(`${LinkVercel}/admin/seeDetails`,{studentId:sId,scholarshipId:scId})
         
           const s = response.data.value.student
           const sc = response.data.value.scholarship
           
           console.log(s,"<=======>",sc);

           setStudentDetails((prev)=>{
            return {...prev,
               name:s.name,
               country:s.country,
               degree:s.degree,
               hs:s.hs,
               neet:s.neet,
               pcb:s.pcb,
            }
           })
           setScholarshipDetails((prev)=>{
                  return {...prev, country:sc.country ,
                     hs:sc.hs ,
                     name:sc.name ,
                     neet:sc.neet ,
                     pcb:sc.pcb ,
                     price:sc.price ,}    
           })


       }catch(e){

       }

     }

     const closeModal = function(){
       setModalFlag(false);
       setStudentDetails({})
       setScholarshipDetails({});
     }
   
    useEffect(()=>{
        const getData = async () => {
            
             try{
                const response = await axios.get(`${LinkVercel}/admin/allApplications`)    
                console.log(response)
                if(response.data.flag){
                    setData(response.data.value)
                }
             }catch(e){

             }
        }

        getData();
    },[])

  return (
    <div>
     
        <Row>
            
            <Col lg = {8}>
            Pending Applications
            <p></p>
            {data.map((x)=>{
          
           if(x.status === 0){
            return <Card style={{marginBottom:"15px"}}>        
            <Card.Body>
            {x.id}
           <p></p>
             <div style={{display:"flex",alignItems:"center",gap:"15px"}}>
             <p style={{fontWeight:"100"}}>{x.StudentCountry}</p><p style={{fontWeight:"100"}}>{x.ScholarShipCountry}</p>

             </div>
             <p></p>   
             <div style={{display:"flex",gap:"15px"}}>
             {x.status == 0 ? <Button  onClick={e=>setGrant(x.id)} variant = 'contained' color='success' >Grant</Button>:<></>}
             <Button onClick={e=>seeDetails(x.studentId,x.ScholarShipId)} variant='contained' color='success'>Details</Button>
         </div>
           <p></p>
          
            </Card.Body>

        </Card>
           }

       })}
            </Col>

            <Col lg = {4}>
            Granted Applications
            <p></p>
            
            <div style={{height:"500px",overflow:"scroll",width:"100%"}}>
            {data.map((x)=>{
          
          if(x.status === 1){
             return <Card style={{marginBottom:"15px"}}>        
             <Card.Body>
             {x.id}
            <p></p>
              <div style={{display:"flex",alignItems:"center",gap:"15px"}}>
              <p style={{fontWeight:"100"}}>{x.StudentCountry}</p><p style={{fontWeight:"100"}}>{x.ScholarShipCountry}</p>

              </div>
              <p></p>   
              <div style={{display:"flex",gap:"15px"}}>
              {x.status == 0 ? <Button  onClick={e=>setGrant(x.id)} variant = 'contained' color='success' >Grant</Button>:<></>}
              <Button onClick={e=>seeDetails(x.studentId,x.ScholarShipId)} variant='contained' color='success'>Details</Button>
          </div>
            <p></p>
           
             </Card.Body>

         </Card>
          }

     })}

            </div>
            </Col>

        </Row>

       <Modal show = {modalFlag} style={{marginTop:"10%"}}>

         <Modal.Body>
              
             student name -  {studentDetails.name}
             <p></p>
             scholarship name - {scholarshipDetails.name}

         </Modal.Body>
         
         <Modal.Footer>
            <Button variant='contained' color='error' onClick={closeModal} >Close</Button>
         </Modal.Footer>


       </Modal>

    </div>
  )
}

export default AllApplication