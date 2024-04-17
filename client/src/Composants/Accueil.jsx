import * as React from 'react'
import { useEffect } from 'react'
import '../style/accueil.css'

import ModuleCard from './ModuleCard'
import InfoCard from './Card'
import SearchBar from './SearchBar'

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Button from '@mui/material/Button';


import bin from '../ressources/bin.png'


function Accueil(props) {

  const [listeServices, setListeServices] = React.useState([]);
  const [q, setQ] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [count, setCount] = React.useState(0);


  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleNewFav = (newFav) => () => {
    props.data(`/favoris/${newFav._id}`, 'post')

    setCount(count + 1);
  };

  const handleSupprFav = (newFav) => () => {
    props.data(`/favoris/${newFav._id}/delete`, 'post')

    setCount(count + 1);
  };

  const fetchData = async () => {
    const myData = await props.data('/modules', 'get')
    setListeServices(myData)
  }


  
  useEffect(() => {
    fetchData();
  }, [count])
  

  
  const DrawerList = (
    <Box sx={{ height: '100%', textAlign: 'center', width: 400, display: 'flex', flexDirection: 'column', bgcolor: '#777', color: '#fff', pt: 2 }} role="presentation" >
      
      <h1>Services</h1>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', mb: 3}}>
        <SearchBar q={q} setQ={setQ}/>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap' }} onClick={toggleDrawer(false)}>
        {listeServices.map((service, index) => {
          if(q === "" || service.nom.toLowerCase().includes(q.toLowerCase()) ) {
          return (
            <Box onClick={handleNewFav(service)}>
              <ModuleCard  key={index} text={service.nom.toUpperCase()} style="flex-end" fontsize={15} />
            </Box>
          )}
        })}
      </Box>
       

    </Box>
  );


  return (   
    <div className="accueil">
      <div className="card">
        <InfoCard data={props.data} />
      </div>
      
      <h1>Favoris</h1>

      <div className="elementsAccueil">
        <div className="listeModulesAccueil">
          {listeServices.map((module, index) => {
            if(module.favoris){
              return (
                <div className="favLink">
                  <a href={module.lien} target="_blank" rel="noopener noreferrer">
                    <ModuleCard key={index} text={module.nom.toUpperCase()} style="flex-end" fontsize={15} />
                  </a>
                  <button onClick={handleSupprFav(module)} className="deleteFav"><img src={bin} alt="" /></button>
                </div>
              
              )}
          })}
          <Box onClick={toggleDrawer(true)} >
            <ModuleCard key={"add"} text={"+"} style="center" fontsize={40}/>
          </Box>
        </div>

        <Drawer anchor='right' open={open} onClose={toggleDrawer(false)}>
          {DrawerList}
        </Drawer>
        
      </div>
    </div>
  )
}

export default Accueil