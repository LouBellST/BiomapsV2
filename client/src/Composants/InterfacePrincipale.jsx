import { useState } from 'react'
import Box from '@mui/material/Box';

import '../style/interface_principale.css'

import Accueil from './Accueil'
import Modules from './Modules'
import Procedures from './Procedures'
import Profil from './Profil'
import Theme from './Theme'
import Login from './Login'
import AjoutService from './AjoutService';

// wrap les differents elements globaux
function InterfacePrincipale(props) {

  const ecrans = [<Accueil user={props.user} data={props.data}/>,
  <Modules user={props.user} data={props.data} setActiveSection={props.setActiveSection}/>, 
  <Procedures user={props.user} data={props.data} setActiveSection={props.setActiveSection} />, 
  <Profil user={props.user} setActiveSection={props.setActiveSection} data={props.data} />, 
  <Theme setBg={props.setBg} bgUser={props.bgUser} setBgUser={props.setBgUser} data={props.data} />, 
  <Login data={props.data} setUser={props.setUser} setActiveSection={props.setActiveSection} setIsConnected={props.setIsConnected} setShowDrawer={props.setShowDrawer} setShowNav={props.setShowNav} setBg={props.setBg} />,
  <AjoutService data={props.data} setActiveSection={props.setActiveSection}/>
]


  return (   
    <Box onClick={() => props.setShowInput(false)} sx={{ background: `${props.bg}` }} className="background">
      <div className="overlay">
        {ecrans[props.activeSection]}
      </div>
    </Box>
    
  )
}

export default InterfacePrincipale