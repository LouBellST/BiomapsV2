import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import '../style/theme.css'



function Theme(props) {

  const backgrounds = [oiseauPetit,backgroundPetit,collinePetit,paysagePetit,vaguePetit,saclayPetit]


  const handleThemeChange = async (bg) => {
    props.setBgUser(`center / cover no-repeat url(${bg})`);
    props.setBg(`center / cover no-repeat url(${bg})`);
  }
  

  return (   
    <div className="theme">
      <div className="contenuTheme">
        <h1>Fonds</h1>

        <div className="centeredOptions">
          <Grid container spacing={5} maxWidth='lg'>          
            {backgrounds.map((bg) => (
              <Grid item xs={4}>
                <Box className="themeBox" onClick={(e) => {e.preventDefault(); handleThemeChange(bg);}} sx={{ bgColor: 'white', backgroundImage:`url(${bg})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', height: {xs:110, md:200}, boxShadow: 5, borderRadius: 1, '&:hover': {boxShadow: 10, cursor: 'pointer'} }} />
              </Grid>
            ))}
          </Grid>
        </div>

        {/*
        <h1>Couleurs</h1>
        <div className="centeredOptions">
          <div className="fonds">
            {colors.map((color) => (
              <Box sx={{ bgcolor: color, width: {xs: 35, md:100}, height: {xs: 35, md:100}, my: 1, boxShadow: 5, border: '3px solid #fff', borderRadius: 100, '&:hover': {boxShadow: 10, cursor: 'pointer'} }} />
            ))}
          </div>
        </div>
        */}
        
      </div>
    </div>
  )
}

export default Theme