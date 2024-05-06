import * as React from 'react'
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import '../style/modules.css'

import CustomizedMenus from './Groupes'
import ModuleCard from './ModuleCard'
import SearchBar from './SearchBar'

import bin from '../ressources/bin.png'


function Modules(props) {
  const listeFilters = ["Biomaps", "CEA", "CNRS", "Saclay"];
  const [listeServices, setListeServices] = React.useState([]);
  const [filter, setFilter] = React.useState("Biomaps");
  const [q, setQ] = React.useState("");
  const [afficherBin, setAfficherBin] = React.useState('none');
  const [count, setCount] = React.useState(0);
  const [textSuppr, setTextSuppr] = React.useState("Supprimer");
  

  const toggleAffichage = () => {
    setCount(count + 1);

    if(count%2 == 0){
      setAfficherBin('block');
      setTextSuppr("Terminer");
    }else{
      setAfficherBin('none');
      setTextSuppr("Supprimer");
    }
  }

  const handleSupprService = async (service) => {
    try{
      await props.data(`/delete/${service._id}`, 'post');
    }catch(e){
      console.log(e);
    }
  }

  const fetchData = async () => {
    try{
      const myData = await props.data('/services', 'get')
      setListeServices(myData)
    }catch(e){
      console.log(e);
    }
  }

  fetchData();

  const boutonsAdmin = (props.user.admin) ? (
    <div className="BoutonsModifs">
      <Button onClick={() => {if(props.user.admin){props.setActiveSection(6)}else{alert("Vous n'avez pas la permission.")} } } sx={{my: 2, ml: 2, border: '1px solid #fff1', bgcolor: '#fff2', backdropFilter: 'blur(4px)', color: '#fff', boxShadow: 2, '&:hover': {border: '1px solid #fff1', bgcolor: '#fff1', color: '#fff'}}} variant="outlined">Ajouter un service</Button>
      <Button onClick={() => {if(props.user.admin){toggleAffichage()}else{alert("Vous n'avez pas la permission.")} } } sx={{my: 2, ml: 2, border: '1px solid #fff1', bgcolor: '#fff2', backdropFilter: 'blur(4px)', color: '#fff', boxShadow: 2, '&:hover': {border: '1px solid #fff1', bgcolor: '#fff1', color: '#fff'}}} variant="outlined">{textSuppr}</Button>
    </div>
  ) : null;
  
  return (   
    <div className="container">
      <div className="modules">
        <h1 className="modulesLabels">Services</h1>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
          <CustomizedMenus id={0} filter={filter} setFilter={setFilter} />
          <SearchBar placeH="Service" q={q} setQ={setQ}/>
        </Box>
        {boutonsAdmin}
        
        <div className="listeModules">
          {listeServices.map((s) => {
            if(s.groupe.toLowerCase() === filter.toLocaleLowerCase() && (q === "" || s.nom.toLowerCase().includes(q.toLowerCase())) ){
            return (
              <div className="serviceContainer">
                <a href={s.lien} target="_blank" rel="noopener noreferrer">
                  <ModuleCard key={s._id} text={s.nom.toUpperCase()} style="flex-end" fontsize={13} />
                </a>
                <Button sx={{ position: 'absolute', top: '25px', right: '10px', display: `${afficherBin}` }} onClick={() => handleSupprService(s)} className="deleteFav"><img src={bin} alt="" /></Button>
              </div>
            )}
          })}
        </div>

      </div>   
    </div> 
  )
}

export default Modules