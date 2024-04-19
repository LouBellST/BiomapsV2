import * as React from 'react'
import { useEffect } from 'react'
import Link from '@mui/material/Link';

import '../style/procedures.css'

import CustomizedMenus from './Groupes'
import ModuleCard from './ModuleCard'
import SearchBar from './SearchBar'

import Box from '@mui/material/Box';

function Procedures(props) {

  const listeFilters = ["Stagiaire", "Matériel"];
  const [listeProcedures, setListeProcedures] = React.useState([]);
  const [filter, setFilter] = React.useState("Stagiaire");
  const [q, setQ] = React.useState("");
  

  const fetchData = async () => {
    const myData = await props.data('/services', 'get')
    setListeProcedures(myData)
  }



  useEffect(() => {
    fetchData();
  })
  

  
  return (   
    <div className="container">
      <div className="procedures">
        <h1 className="proceduresLabels">Procédures</h1>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
          <CustomizedMenus id={1} filter={filter} setFilter={setFilter} />
          <SearchBar placeH="Procédure" q={q} setQ={setQ}/>
        </Box>
        
        <div className="listeProcedures">
          {listeProcedures.map((p) => {
            if(p.groupe === filter && (q === "" || p.nom.toLowerCase().includes(q.toLowerCase()) ) ){
            return (
            <a href={p.lien} target="_blank" rel="noopener noreferrer">
              <ModuleCard key={p._id} text={p.nom.toUpperCase()} style="flex-end" fontsize={15} />
            </a>
            )}
          })}
        </div>

      </div>   
    </div> 
  )
}

export default Procedures