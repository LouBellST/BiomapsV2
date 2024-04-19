import { useState } from 'react'
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';

import '../style/login.css'

import paysage from '../ressources/paysagePetit.jpg'

  
function Login(props) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [incorrect, setIncorrect] = useState('none');


  const authentifier = async () => {
    const auth = await props.data(`/auth/${username}/${password}`, 'post');
    if(auth.data){
      const success = await props.data(`/user/${username}`, 'get')
      props.setUser(success)
      handleConnection();
    }else{
      setIncorrect('block');
    }
  }

  const handleConnection = () => {
    props.setIsConnected(true)
    props.setActiveSection(0);
    props.setShowNav('block');
    props.setShowDrawer('flex')
    props.setBg(`center / cover no-repeat url(${paysage})`);
  }

  return (   
      <div className="overlayLogin">
        <Box className="loginCard" sx={{ boxShadow: 20, bgcolor: '#fff2', backdropFilter: 'blur(5px)' }}>

          <form className="loginForm" action="">
            <Typography sx={{mx: 'auto', mb: 3}} variant="h4" component="div">Se connecter</Typography>

            <Typography sx={{ color: '#d00', display: `${incorrect}` }} variant="h6" component="div">Vos identifiants sont incorrects</Typography>

            <label className="labelInputs" htmlFor="id">Identifiant</label>
            <input type="text" placeholder="jeandupont@gmail.com" name="id" value={username} onChange={(e) => setUsername(e.target.value)}/>

            <label className="labelInputs" htmlFor="mdp">Mot de passe</label>
            <input type="password" placeholder="Mot de passe" name="mdp" value={password} onChange={(e) => setPassword(e.target.value)}/>
  

            <FormControlLabel
            control={
              <Checkbox sx={{color: '#ddd'}} name="resterConnecte" />
            }
            label="Se souvenir de moi" sx={{color: 'white'}}
          />
            <Button onClick={(e) => {e.preventDefault(); authentifier();}} variant="contained" sx={{width: 200, mt: 3, mx: 'auto', p: '10px 10px', borderRadius: 10, bgcolor: '#3a86ff'}} >Se connecter</Button>
          </form>

        </Box>
      </div>
  )
}

export default Login