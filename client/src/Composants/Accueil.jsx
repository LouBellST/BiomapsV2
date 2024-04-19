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
  const [count, setCount] = React.useState(2);
  const [modifierIcons, setModifierIcons] = React.useState('none');
  const [toggleCount, setToggleCount] = React.useState(1);
  const [modifierText, setModifierText] = React.useState('Modifier');



  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleNewFav = (newFav) => async () => {
    await props.data(`/favoris/${newFav._id}`, 'post');

    setCount(count + 1);
  };

  const handleSupprFav = (newFav) => async () => {
    await props.data(`/favoris/${newFav._id}/delete`, 'post');

    setCount(count + 1);
  };

  const toggleModifier = () => () => {
    setToggleCount(toggleCount + 1);

    if(toggleCount % 2 === 0){
      setModifierIcons('none');
      setModifierText('Modifier');
    }
    else{
      setModifierIcons('block');
      setModifierText('terminer');
    }
  }

  const fetchData = async () => {
    const myData = await props.data('/modules', 'get');
    setListeServices(myData);
  }


  
  useEffect(() => {
    document.title = `${count}`
    fetchData();
  }, [count])
  

  
  const DrawerList = (
    <Box sx={{ height: '100%', textAlign: 'center', width: 400, display: 'flex', flexDirection: 'column', bgcolor: '#777', color: '#fff', pt: 2 }} role="presentation" >
      
      <h1>Services</h1>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', mb: 3}}>
        <SearchBar placeH="Service" q={q} setQ={setQ}/>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap' }} onClick={toggleDrawer(false)}>
        {listeServices.map((service, index) => {
          if(q === "" || service.nom.toLowerCase().includes(q.toLowerCase()) ) {
          return (
            <Box onClick={handleNewFav(service)}>
              <ModuleCard key={index} text={service.nom.toUpperCase()} style="flex-end" fontsize={15} />
            </Box>
          )}
        })}
      </Box>
       

    </Box>
  );


  return (   
    <div className="accueil">
      <div className="card">
        <InfoCard user={props.user} data={props.data} display={modifierIcons} />
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
                  <Button sx={{ position: 'absolute', top: '25px', right: '10px', display: `${modifierIcons}` }} onClick={handleSupprFav(module)} className="deleteFav"><img src={bin} alt="" /></Button>
                </div>
              
              )}
          })}
          <Box onClick={toggleDrawer(true)} >
            <ModuleCard key={"add"} text={"+"} style="center" fontsize={40}/>
          </Box>
        </div>

        <Button onClick={toggleModifier()} className="modifier" sx={{ mt: 15, mb: 3, mx: 3, color: '#fff'}}>{modifierText}</Button>

        <Drawer anchor='right' open={open} onClose={toggleDrawer(false)}>
          {DrawerList}
        </Drawer>
        
      </div>
    </div>
  )
}

export default Accueil