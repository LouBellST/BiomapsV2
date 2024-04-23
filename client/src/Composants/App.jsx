import { useState } from 'react'

import axios from 'axios';

import '../style/App.css'

import DrawerAppBar from './Navbar'
import InterfacePrincipale from './InterfacePrincipale'

import paysage from '../ressources/paysagePetit.jpg'

function App() {

  const [activeSection, setActiveSection] = useState(5)
  const [bgUser, setBgUser] = useState(`center / cover no-repeat url(${paysage})`)
  const [bg, setBg] = useState('none')
  const [isConnected, setIsConnected] = useState(false);
  const [showNav, setShowNav] = useState('none');
  const [showDrawer, setShowDrawer] = useState('none')
  const [user, setUser] = useState(null);
  const [showInput, setShowInput] = useState(false);
  const [valueNavSearch, setValueNavSearch] = useState("");
  

  const apiCall = (addr, method) => {
    try{
      if (method === 'post'){
        return axios.post(`http://localhost:8080${addr}`)
      }
       else if(method === 'get'){ 
         return axios.get(`http://localhost:8080${addr}`).then(response => response.data);
       }
    }catch(e){
      console.log(e)
    }
  }

 
  return (   
    <div className="app">   
      <DrawerAppBar showInput={showInput} setShowInput={setShowInput} user={user} data={apiCall} activeSection={activeSection} setActiveSection={setActiveSection} isConnected={isConnected} setIsConnected={setIsConnected} bg={bg} setBg={setBg} bgUser={bgUser} showNav={showNav} setShowNav={setShowNav} showDrawer={showDrawer} setShowDrawer={setShowDrawer}/>
      <InterfacePrincipale setShowInput={setShowInput} user={user} setUser={setUser} data={apiCall} activeSection={activeSection} setActiveSection={setActiveSection} setIsConnected={setIsConnected} bg={bg} setBg={setBg} bgUser={bgUser} setBgUser={setBgUser} setShowNav={setShowNav} setShowDrawer={setShowDrawer}/>
    </div>
  )
}

export default App
