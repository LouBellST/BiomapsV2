import { useState, useEffect } from 'react'
import '../style/profil.css'
import Avatar from '@mui/material/Avatar';


function Profil(props) {
  const [name, setName] = useState("")
  const [mail, setMail] = useState("")

  const handleThemeButton = () => {
    props.setActiveSection(3);
  }

  const fetchData = async () => {
    try{
      const myData = await props.data(`/user/${props.user.mail}`, 'get')
      setName(myData.nom)
      setMail(myData.mail)
    }catch(e){
      console.log(e);
    }
  }
  
  fetchData();


  return (   
    <div className="profil">
      <div className="contenu">
        <h1>{name}</h1>
        <h2><a href="">{mail}</a></h2>

        <h2 className="modif" onClick={(e) => {e.preventDefault(); handleThemeButton();}}>Modifier le thème</h2>
      </div>
    </div>
    
  )
}

export default Profil