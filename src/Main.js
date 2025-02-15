import React from 'react'
import { Card ,Nav,Navbar,NavDropdown,Container,Row,Col} from 'react-bootstrap'
import { Button ,Paper } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const Main = () => {
  
    const navigate = useNavigate()


  return (
    <div style={{width:"100%"}}>
        
       
          
                
             
                <Row>
                  
                  <Col lg = {6}>
                        
                        <div style={{height:"100%",display:"flex",flexDirection:"column",justifyContent:"center"}}>
                           
                           <h1 style={{fontWeight:"100",fontSize:"100px"}}>University</h1>
                           <h2 style={{fontWeight:"bold"}}>Insights</h2>
                           <p style={{fontWeight:"50"}}>Embark on a global educational journey with University Insights. We’re your go-to source for studying abroad, providing valuable insights into overseas programs, scholarships, and the application process. Our platform streamlines the process, assisting you in securing student visas and finding the ideal study abroad programs aligned with your field of study. Studying abroad enriches your global perspective, personal growth, and career opportunities. It’s a chance to adapt to different costs of living and embrace new academic and cultural horizons. Scholarships and financial aid options are available to make your journey more affordable, so explore them thoroughly. Your academic aspirations and fresh perspectives await. Kickstart your study abroad adventure by completing the application process and preparing for your international educational experience.</p>
                           <Button style={{width:"20%"}} variant='outlined' color='success'>Explore</Button>
                        </div>

                  </Col>
                  <Col lg = {6}>
                  <img style={{width:"100%",height:"500px",objectFit:"contain"}} src={"https://media.istockphoto.com/id/1399839098/photo/study-abroad-concept-design-of-world-with-graduation-cap-and-plane-map-pin-and-location-sign.jpg?s=612x612&w=0&k=20&c=JqJhsc2GruLh8WPPCI56CM0AVHZzYVXOV_mgU25XcuM="} />

                  </Col>

                </Row>

           
    </div>
  )
}

export default Main