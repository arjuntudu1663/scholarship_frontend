import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap';
import { useLocation } from 'react-router-dom'
import { Button } from '@mui/material';
import MyDrawer from './MyDrawer';
import AllApplication from './AllApplication';
import AllAgents from './AllAgents';
import AllStudents from './AllStudents';
import AllScholarships from './AllScholarships';
import { CiMenuBurger } from "react-icons/ci";

const AdminHome = () => {

    const location = useLocation();
    
    const [drawerFlag,setDrawerFlag] = useState(false)
    const closeDrawer = (val) => setDrawerFlag(val)
    const [pageFlag,setPageFlag] = useState("applications")

    const chooseFlag = (val) => setPageFlag(val)
    
    let element ;
    
    switch(pageFlag){

      case "applications":
        element = <AllApplication/>
      break;
      case "agents":
        element = <AllAgents/>
      break;
      case "students":
        element = <AllStudents/>
      break;
      case "scholarships":
        element = <AllScholarships/>
      break;

    }



    useEffect(()=>{


    },[])



  return (
    <div style={{width:"100%"}}>
      
        <MyDrawer flag = {drawerFlag} setFlag={closeDrawer} chooseFlag = {chooseFlag}/>
         <Button onClick={e=>setDrawerFlag(!drawerFlag)}> <CiMenuBurger color='black' size = {30}/></Button>
          
          <p></p>
        
         {element}


    </div>
  )
}

export default AdminHome