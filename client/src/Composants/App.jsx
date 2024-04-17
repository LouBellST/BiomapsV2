import { useState } from 'react'

import axios from 'axios';

import '../style/App.css'

import DrawerAppBar from './Navbar'
import InterfacePrincipale from './InterfacePrincipale'

import paysage from '../ressources/paysagePetit.jpg'

function App() {

  const [activeSection, setActiveSection] = useState(0)
  const [bgUser, setBgUser] = useState(`center / cover no-repeat url(${paysage})`)
  const [bg, setBg] = useState(bgUser)
  const [isConnected, setIsConnected] = useState(true);
  const [showNav, setShowNav] = useState('block');
  const [showDrawer, setShowDrawer] = useState('flex')


  const apiCall = (addr, method) => {
    if (method === 'post'){
     return axios.post(`http://localhost:8080${addr}`)
   }

    else if(method === 'get'){ 
      return axios.get(`http://localhost:8080${addr}`).then(response => response.data);
    }
    
  }

 
  return (   
    <div className="app">   
      <DrawerAppBar data={apiCall} activeSection={activeSection} setActiveSection={setActiveSection} isConnected={isConnected} setIsConnected={setIsConnected} bg={bg} setBg={setBg} bgUser={bgUser} showNav={showNav} setShowNav={setShowNav} showDrawer={showDrawer} setShowDrawer={setShowDrawer}/>
      <InterfacePrincipale data={apiCall} activeSection={activeSection} setActiveSection={setActiveSection} setIsConnected={setIsConnected} bg={bg} setBg={setBg} bgUser={bgUser} setBgUser={setBgUser} setShowNav={setShowNav} setShowDrawer={setShowDrawer}/>
    </div>
  )
}

export default App
