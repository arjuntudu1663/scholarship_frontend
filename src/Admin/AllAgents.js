import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { LinkVercel } from '../Link'
import { Card, Col, Row } from 'react-bootstrap'

const AllAgents = () => {
    const [data,setData] = useState([])
   
    useEffect(()=>{
        const getData = async () => {
            
             try{
                const response = await axios.get(`${LinkVercel}/admin/allAgents`)    
                if(response.data.flag){
                    setData(response.data.value);
                }
             }catch(e){

             }
        }

        getData();
    })

  return (
    <div style={{width:"100%"}}>
      <h1>Agents</h1>
           <Row>
           {data.map((x)=>{
            return <Col lg = {3} style={{padding:"15px"}}><Card style={{padding:"15px"}}>{x.username}</Card></Col>
        })}
           </Row>
    </div>
  )
}

export default AllAgents