import * as React from 'react'
import '../style/procedures.css'

import CustomizedMenus from './Groupes'
import ModuleCard from './ModuleCard'
import SearchBar from './SearchBar'

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import pdf from '../ressources/Rapport_proco.pdf'
import bin from '../ressources/bin.png'

function Procedures(props) {

  const listeFilters = ["Stagiaire", "Matériel"];
  const [listeProcedures, setListeProcedures] = React.useState([{id: 12, nom: "Rapport Proco", groupe: "Stagiaire"}]);
  const [filter, setFilter] = React.useState("Stagiaire");
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

  const handleSupprProcedure = async (procedure) => {
    try{
      //await props.data(`/delete/${procedure._id}`, 'post');
    }catch(e){
      console.log(e);
    }
  }


  const boutonsAdmin = (props.user.admin) ? (
    <div className="BoutonsModifs">
      <Button onClick={() => {if(props.user.admin){/*props.setActiveSection(6)*/}else{alert("Vous n'avez pas la permission.")} } } sx={{my: 2, ml: 2, border: '1px solid #fff1', bgcolor: '#fff2', backdropFilter: 'blur(4px)', color: '#fff', boxShadow: 2, '&:hover': {border: '1px solid #fff1', bgcolor: '#fff1', color: '#fff'}}} variant="outlined">Ajouter une procédure</Button>
      <Button onClick={() => {if(props.user.admin){toggleAffichage()}else{alert("Vous n'avez pas la permission.")} } } sx={{my: 2, ml: 2, border: '1px solid #fff1', bgcolor: '#fff2', backdropFilter: 'blur(4px)', color: '#fff', boxShadow: 2, '&:hover': {border: '1px solid #fff1', bgcolor: '#fff1', color: '#fff'}}} variant="outlined">{textSuppr}</Button>
    </div>
  ) : null;
  
  return (   
    <div className="container">
      <div className="procedures">
        <h1 className="proceduresLabels">Procédures</h1>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
          <CustomizedMenus id={1} filter={filter} setFilter={setFilter} />
          <SearchBar placeH="Procédure" q={q} setQ={setQ}/>
        </Box>
        {boutonsAdmin}
        
        <div className="listeProcedures">
          {listeProcedures.map((p) => {
            if(p.groupe === filter && (q === "" || p.nom.toLowerCase().includes(q.toLowerCase()) ) ){
            return (
              <div className="procedureContainer">
                <ModuleCard key={p._id} text={p.nom.toUpperCase()} style="flex-end" fontsize={15} />
                <Button sx={{ position: 'absolute', top: '25px', right: '10px', display: `${afficherBin}` }} onClick={() => handleSupprProcedure(s)} className="deleteFav"><img src={bin} alt="" /></Button>
              </div>
            )}
          })}
        </div>

      </div>   
    </div> 
  )
}

export default Procedures