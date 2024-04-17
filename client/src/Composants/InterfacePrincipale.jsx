import { useState } from 'react'
import Box from '@mui/material/Box';

import '../style/interface_principale.css'

import Accueil from './Accueil'
import Modules from './Modules'
import Procedures from './Procedures'
import Profil from './Profil'
import Theme from './Theme'
import Login from './Login'

// wrap les differents elements globaux
function InterfacePrincipale(props) {

  const ecrans = [<Accueil data={props.data}/>, <Modules data={props.data} />, <Procedures data={props.data} />, <Profil setActiveSection={props.setActiveSection} data={props.data} />, <Theme setBg={props.setBg} bgUser={props.bgUser} setBgUser={props.setBgUser} data={props.data} />, <Login setActiveSection={props.setActiveSection} setIsConnected={props.setIsConnected} setShowDrawer={props.setShowDrawer} setShowNav={props.setShowNav} setBg={props.setBg} />]


  return (   
    <Box sx={{ background: `${props.bg}` }} className="background">
      <div className="overlay">
        {ecrans[props.activeSection]}
      </div>
    </Box>
    
  )
}

export default InterfacePrincipale