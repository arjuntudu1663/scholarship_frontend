import { TextField ,Button,Slider,List, FormControl,Accordion, AccordionDetails, AccordionSummary, Paper, Chip} from '@mui/material';
import React,{useState,useEffect,useRef} from 'react'
import { useLocation } from 'react-router-dom'
import MenuItem from '@mui/material/MenuItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import axios from 'axios';
import { LinkVercel } from '../Link';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Col, Row,Card } from 'react-bootstrap';




const AgentHome = () => {
  
  const location = useLocation();
  const [aFlag,setAflag] = useState(false)
  
 
 


  const [selectCountries,setSelectCountries] = useState([
    "USA","CANADA","UK","EUROPE","IRELAND","AUSTRALIA","NEWZEALAND","ASIA","MIDDLEEAST"
  ])
  const [currExam,setCurrExam] = useState("")
  const [currDocument,setCurrDocument] = useState("")
  const [allScholarShips,setAllScholarShips] = useState([])



  const addDocuments = function(){
     
    setData((prev)=>{
      return   {...prev,documents:[...prev.documents,currDocument]}
    })

    setCurrDocument("")

  }
  const addExam = function(){
     
         setData((prev)=>{
            return   {...prev,exams:[...prev.exams,currExam]}
          })

     setCurrExam("")
  }
  const [data,setData] = useState({
    agentId:location.state.profile._id,
    name:"",
    price:"",
    neet:0,
    pcb:0,
    hs:0,
    country:"",
    exams:[],
    documents:[]
  })

  const createScholarShip = async function(){
      
     console.log(data)

    try{
          
      const response = await axios.post(`${LinkVercel}/agent/createScholarShip`,data)
      console.log(response,"<=== createscholarship")
      if(response.status == 200){
         
        setData((prev)=>{
          return {...prev,name:"",price:"",neet:0,pcb:0,hs:0,country:"",exams:[],documents:[]}
        })
        setAflag(false)
        window.location.reload();
      }

    }catch(e){}


  }

 

  useEffect(()=>{
      
    const getScholarShip = async function(){
        
      try{
        const response = await axios.post(`${LinkVercel}/agent/getScholarShip`,{id:location.state.profile._id})
        console.log(response)
        setAllScholarShips(response.data.value)
      }catch(e){}
      
    }
   
    getScholarShip();
     

  },[])

  return (
    <div style={{width:"100%"}}> 
     <p></p>
        <Button variant='contained' color='success' onClick={(e)=>{setAflag(!aFlag)}} >{aFlag?'close':'Add Scholarship'}</Button>
        <Button style={{marginLeft:"15px"}} onClick={e=>window.location.href= "/"} variant='contained' color='error'  >LOG OUT</Button>
       
        <p></p>
         <Row>
           <Col lg = {aFlag?12:4}>
              {aFlag? <Paper elevation={10} style={{display:"flex",padding:"15px",justifyContent:"space-between"}}>
    
        
          <div style={{width:"40%",padding:"15px"}}>
          <TextField value={data.name} placeholder='name' onChange={e=>setData((prev)=>{
              return {...prev,name:e.target.value}
            })}/>
              <p></p>
              Select Country
              <p></p>
              <TextField value={data.country} style={{width:"200px"}} select placeholder='country' >
                  {
                    selectCountries.map((x)=>{
                      
                      return <MenuItem value = {x}>
                        <Button onClick={e=>setData((prev)=>{
                          return {...prev,country:x}
                        })}>{x}</Button>
                      </MenuItem>

                    })
                  }

              </TextField>

              
              <p></p>
              <h3>Required Percentage</h3>
              <p></p>
              NEET
      <Slider
        aria-label="Temperature"
        defaultValue={data.neet}
        valueLabelDisplay="auto"
        shiftStep={30}
        step={10}
        marks
        min={10}
        max={100}
         onChange={e=>setData((prev)=>{
          return {...prev,neet:e.target.value}
         })}
      />
       PCB
      <Slider
        aria-label="Temperature"
        defaultValue={data.pcb}
        valueLabelDisplay="auto"
        shiftStep={30}
        step={10}
        marks
        min={10}
        max={100}
        onChange={e=>setData((prev)=>{
          return {...prev,pcb:e.target.value}
         })}
      
      />
      12th Marks 
      <Slider
        aria-label="Temperature"
        defaultValue={data.pcb}
        valueLabelDisplay="auto"
        shiftStep={30}
        step={10}
        marks
        min={10}
        max={100}
        onChange={e=>setData((prev)=>{
          return {...prev,hs:e.target.value}
         })}
      
      />
         <TextField value={data.price} placeholder='price' onChange={e=>setData((prev)=>{
        return {...prev,price:e.target.value}
       })} />
          </div>
         
          <div style={{width:"50%",paddingLeft:"",}}>
            <p></p>
            <TextField value={currExam} placeholder='Required Exams' onChange={e=>setCurrExam(e.target.value)} />
            <p></p>
            <Button variant='outlined' onClick={addExam}>Add</Button>
            <p></p>
             <div style={{display:"flex"}}>
             {
              data.exams.map((x)=>{
                return  <Chip style={{marginRight:"15px"}} label= {x}/>
              })
            }
             </div>
            <p></p>
        
           
            <p></p>
          <TextField value={currDocument} onChange={e=>setCurrDocument(e.target.value)} placeholder=' Required documents' />
            <p></p>
          <Button variant='outlined' onClick={addDocuments}>Add</Button>
          <p></p>
          <div style={{display:"flex"}}>
          
             {
              data.documents.map((x)=>{
                return  <Chip style={{marginRight:"15px"}} label= {x}/>
              })
            }
             </div>
           <p></p>
          <Button variant='contained' color='success' onClick={createScholarShip}>Create</Button>
         </div>
          
         
          
        </Paper>
         
           :<></>}
           </Col>
            <p></p>
           {aFlag?<></>:<>
            <Col lg={12}>
                 
                 <Row>
                 {
                allScholarShips.map((x)=>{
                  return <Col lg = {4}> <Card elevation={5} style={{padding:"35px",backgroundColor:"",width:"100%",marginBottom:"15px"}}>

                  <h5 style={{color:"",fontWeight:"bold"}}>{x.name}</h5>
                  <h4>Country - {x.country}</h4>
                  <h4>Price - {x.price}</h4>
                  <Accordion>
                    <AccordionSummary  expandIcon = {<KeyboardArrowDownIcon/>}>Required Exams</AccordionSummary>
                    <AccordionDetails >
                        {x.exams.map((x)=>{
                            return <p>{x}</p>
                        })}
                    </AccordionDetails>
                  </Accordion>
                  <p></p>
                  <Accordion>
                    <AccordionSummary expandIcon = {<KeyboardArrowDownIcon/>}>Required Documents</AccordionSummary>
                    <AccordionDetails>
                        {x.documents.map((x)=>{
                            return <p>{x}</p>
                        })}
                    </AccordionDetails>
                  </Accordion>
                    <p></p>
                   <div style={{width:"100%",display:"flex",justifyContent:"space-between"}}>
                   <Button style = {{width:"30%"}} variant='outlined' color='success'>Edit</Button>
                   <Button style = {{width:"30%"}} variant='outlined' color='success'>Delete</Button>

                   </div>
                 
        </Card></Col>
                })
               }
                 </Row>

           </Col></>}
           


        </Row>




    </div>
  )
}

export default AgentHome