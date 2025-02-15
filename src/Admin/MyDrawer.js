import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

const MyDrawer = ({flag,setFlag,chooseFlag}) => {



  return (

     
     <Drawer  open = {flag}>
              <div style={{width:"300px",height:"100%",padding:"30px"}}>
                   <div style={{width:"100%",marginTop:"30%",display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
                    <div></div>
                    <Button variant='contained' color='error' onClick={e=>setFlag(false)}>Close</Button>

                   </div>
                   <List >
                      <ListItem>
                         <ListItemButton onClick={e=>chooseFlag("applications")}>
                            Applications
                         </ListItemButton>
                      </ListItem>

                     

                      <ListItem>
                         <ListItemButton onClick={e=>chooseFlag("scholarships")}>
                            Scholarships
                         </ListItemButton>
                      </ListItem>
                      <ListItem>
                         <ListItemButton onClick={e=>chooseFlag("agents")}>
                            Agents
                         </ListItemButton>
                      </ListItem>
                      <ListItem>
                         <ListItemButton onClick={e=>chooseFlag("students")}>
                            Students
                         </ListItemButton>
                      </ListItem>
                   </List>

              </div>
     </Drawer>
  )
}

export default MyDrawer