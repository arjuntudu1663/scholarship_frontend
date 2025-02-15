import React,{useEffect, useState} from 'react'
import { Row , Col, Card,Tabs,Tab, Modal } from 'react-bootstrap'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { Stepper,Step,StepLabel, TextField, Button, Paper,Accordion, AccordionSummary, AccordionDetails, Chip } from '@mui/material'
import axios from 'axios'
import { LinkVercel } from '../Link'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MenuItem from '@mui/material/MenuItem';

const StudentHome = () => {
  
    const location = useLocation()
    const navigate = useNavigate()
    const [checkFlag,setCheckFlag] = useState(false)
    
     const [selectCountries,setSelectCountries] = useState([
        "USA","CANADA","UK","EUROPE","IRELAND","AUSTRALIA","NEWZEALAND","ASIA","MIDDLEEAST"
    ])
    const steps = ["Set profile","Add required Fields","Done!"]
    const [index,setIndex] = useState(0);
    
    const [name,setName] = useState("")
    const [country,setCountry] = useState("")
    const [degree,setdegree] = useState("")
    const [neet,setneet] = useState("")
    const [hs,seths] = useState("")
    const [pcb,setpcb] = useState("")
    const [profile,setProfile] = useState({})
    const [availableScholarships,setAvailableScholarShips] = useState([]); 
    const [searchCountry,setSearchCountry] = useState("")
    
    const [myApplications,setMyApplications] = useState([]);
    const [myApplicationModal,setMyApplicationModal] = useState(false)
     
    const [myAppliedScholarships,setMyAppliedScholarships] = useState([])

    const update1 = async function(){
         
        try{
             
            const response = await axios.post(`${LinkVercel}/student/update`,{
                studentId:location.state.profile._id,
                name:name,
                country:country
            })
            console.log(response)
            if(response.status == 200){
                setIndex(1)
            }

        }catch(e){}

    }

    const update2 = async function(){
         
        try{
            const response = await axios.post(`${LinkVercel}/student/update2`,{
                studentId:location.state.profile._id ,
                degree:degree,
                neet:neet,
                hs:hs,
                pcb:pcb
            })
            
            if(response.status === 200){
                setIndex(2)
                window.location.reload();
            }

        }catch(e){}

    }

    const scholarshipFind = async function(){
        
        try{
            const response = await axios.post(`${LinkVercel}/student/scholarshipFind`,{studentId:location.state.profile._id,countryName:searchCountry})
            console.log(response,"<==== scholarships")
            if(response.data.flag){
                setAvailableScholarShips(response.data.value)
                setSearchCountry("")
            }else{
                setAvailableScholarShips(response.data.value)
                setSearchCountry("")
            }

        }catch(e){

        }

    }
    
    const setApplication = async function(scholarShipId,studentId,agentId,ScholarShipCountry,StudentCountry){

         try{
            const response = await axios.post(`${LinkVercel}/application/addApplication`,{
                scholarShipId:scholarShipId,
                studentId:studentId,
                agentId:agentId,
                ScholarShipCountry:ScholarShipCountry,
                StudentCountry:StudentCountry
            })
            window.location.reload();
         }catch(e){

         }
    }
    
    
    let element ;

    switch (index){
         
        case 0:
            element =<> <div style={{display:"flex",gap:"15px"}}>
            <TextField onChange={e=>setName(e.target.value)} placeholder='name' />
            <TextField onChange={e=>setCountry(e.target.value)}  placeholder='country' />
            </div>
            <p></p>
            <Button variant='contained' color='success' style={{width:"25%"}} onClick={update1}>Update</Button>
            </> 
            break;
        
        case 1:
            element =<><div>
                 <TextField onChange={e=>setdegree(e.target.value)} placeholder='degree' />
                 <TextField onChange={e=>setneet(e.target.value)} placeholder='neet' />
                 <TextField onChange={e=>seths(e.target.value)} placeholder='hs' />
                 <TextField onChange={e=>setpcb(e.target.value)} placeholder='pcb' />   
            </div>
            <Button  variant='contained' color='success'  style={{width:"25%"}} onClick={update2}>Submit</Button>
            </> 

            break;

        
        

    }
    
    useEffect(()=>{
       
        const getProfile = async function(){
             const response = await axios.post(`${LinkVercel}/student/check`,{studentId:location.state.profile._id});
             console.log(response)
             setProfile(response.data.value)
        }

        const myApplicationsfunction  = async function(){
             
            try{
                const response = await axios.post(`${LinkVercel}/application/myApplications`,{id:location.state.profile._id})
                console.log(response)
                setMyApplications(response.data.value)
                
                response.data.value.map((x)=>{
                    setMyAppliedScholarships((prev)=>{
                        return [...prev,x.ScholarShipId]
                    })
                })
              

                console.log(myAppliedScholarships,"<==== myapplied scholarships")
            }catch(e){}
        }

        getProfile();
        myApplicationsfunction();

    },[])

  return (
    <div style={{width:"100%"}} > 
       
          <Row>
             <Col lg = {4} style={{padding:"15px"}}>

             {checkFlag? <Button variant='outlined' color='error' onClick={e=>setCheckFlag(!checkFlag)}>close</Button>: <Button variant='contained' color='success' onClick={e=>setCheckFlag(!checkFlag)}>UpdateProfile</Button>}
             <Button variant='contained' color='error'  style={{marginLeft:"15px"}}  onClick={e=>navigate("/")} >LogOut</Button>
                <p></p>
                {checkFlag?<Card style={{width:"500px",padding:"15px"}}>
                    <p></p>
                <Stepper activeStep={index} alternativeLabel style={{width:"500px"}} >
                {steps.map((label) => (
                <Step key={label}>
                <StepLabel>{label}</StepLabel>
                </Step>
                ))}
                </Stepper>
                <p></p> 
             
                {element}
                </Card>:<></>}

                <p></p>
              
                <Accordion style={{padding:"15px"}}>
                    <AccordionSummary expandIcon = {<KeyboardArrowDownIcon/>}>Profile</AccordionSummary>
                    <AccordionDetails>
                        Name - <span style={{fontWeight:"bold"}}>{profile.name}</span>
                        <p></p>
                        Country - <span style={{fontWeight:"bold"}}>{profile.country}</span>
                        <p></p>
                        degree - <span style={{fontWeight:"bold"}}>{profile.degree}</span>
                        <p></p>
                        neet - <span style={{fontWeight:"bold"}}>{profile.neet}</span>
                        <p></p>
                        hs - <span style={{fontWeight:"bold"}}>{profile.hs}</span>
                        <p></p>
                        pcb - <span style={{fontWeight:"bold"}}>{profile.pcb}</span>
                    </AccordionDetails>
                </Accordion>
                <p></p>
              
                <p></p>
                <Paper elevation={5} style={{padding:"35px",backgroundColor:"blue"}}>
                    <h5 style={{color:"white"}}>Check Available ScholarShips</h5>
                    <p></p>
                    <Button style={{backgroundColor:"white"}} onClick={scholarshipFind} variant='contained' color='white'>See</Button>
                    <p></p>
                    <h5 style={{color:"white"}}>Search By Country Name</h5>
                    <p></p>
                    <TextField   style={{width:"200px",backgroundColor:"white",width:"100%"}} select placeholder='country' >
                            {
                                selectCountries.map((x)=>{
                                
                                return <MenuItem value = {x}>
                                    <Button  
                                    onClick={e=>setSearchCountry(x)} >{x}</Button>
                                </MenuItem>

                                })
                            }

              </TextField>
                    <p></p>
                    <Button style={{backgroundColor:"white"}} onClick={scholarshipFind}  variant='outlined' color='success'>Search</Button>
                </Paper>
                <p></p>
                <Paper elevation={5} style={{padding:"35px",backgroundColor:""}}>
                   <h5 > Application Status</h5>
                   <Button onClick={e=>setMyApplicationModal(true)}  variant='contained' color='success' >See</Button>
                </Paper>
              

             </Col>
             
              
              {
                checkFlag?<></>:
                  <Col lg = {8} style={{backgroundColor:"",height:"70vh",padding:"15px",overflow:"scroll"}}>
                  {
                    availableScholarships.map((x)=>{
                         
                        return    <Paper elevation={5} style={{padding:"35px",backgroundColor:"",width:"100%",marginBottom:"30px"}}>
                                          <h5 style={{color:"",fontWeight:"bold"}}>{x.name}</h5>
                                          <h6 style={{fontWeight:"100"}}>Country - {x.country}</h6>
                                          <h6 style={{fontWeight:"100"}}>Price - {x.price}</h6>
                                                <p></p>
                                                <p>Exams</p>
                                               <p></p>
                                               <div style={{display:"flex"}}>
                                               
                                               {x.exams.map((x)=>{
                                                    return <Button variant='outlined' disabled style={{marginRight:"15px"}}>{x}</Button>
                                                })}
                                               </div>
                                           
                                          <p></p> 
                                          <p> Documents</p>
                                            <p></p>
                                          <div style={{display:"flex"}}>
                                            
                                               {x.documents.map((x)=>{
                                                    return <Button variant='outlined' disabled style={{marginRight:"15px"}}>{x}</Button>
                                                })}
                                               </div>
                                               <p></p>
                                            <Button disabled =   {myAppliedScholarships.includes(x._id)?true:false} onClick={e=>setApplication(x._id,location.state.profile._id,x.agentId,x.country,location.state.profile.country)} style = {{width:"30%"}} variant='outlined' color='success'>
                                                {myAppliedScholarships.includes(x._id)?"Applied":"Apply"}
                                            </Button>
                                         
                                </Paper>

                    })
                  }
                            

             </Col>
              }



          </Row>
         <Modal show = {myApplicationModal}>
                
                <Modal.Body style={{height:"700px",overflow:"scroll"}} >{
                    
                     myApplications.map((x)=>{

                       
                        return  <Card style={{marginBottom:"30px",padding:"20px"}}>
                             application id - {x.id}
                             <p></p>
                             scholarshipId - {x.ScholarShipId}
                             <p></p>
                             status - {x.status === 0 ? "Pending":"Granted!"}
                        </Card>
                     })
                    
                    
                    }</Modal.Body>

                    <Modal.Footer>
                         
                         <Button onClick={e=>setMyApplicationModal(false)}>Close</Button>
                    </Modal.Footer>

         </Modal>
    </div>
  )
}

export default StudentHome