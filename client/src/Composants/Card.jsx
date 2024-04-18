import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, TextField } from '@mui/material';
import Textarea from '@mui/material/TextField';

import infoLogo from '../ressources/info.png'
import edit from '../ressources/edit.png'

// element d'information de la page d'accueil
export default function InfoCard(props) {

  const [infos, setInfos] = React.useState("Pas d'information aujourd'hui");
  const [toggleCount, setToggleCount] = React.useState(1);
  const [valueInfo, setValueInfo] = React.useState("")
  const array = [<form action="" onSubmit={e => {handleSubmit(e)}}><input className="inputInfo" placeholder={infos} name='newInfo' value={valueInfo} onChange={(e) => setValueInfo(e.target.value)}/></form>, <Typography variant="body2" color="#fff9">{infos}</Typography>]


  const handleEdit = () => () => {
    setToggleCount(toggleCount + 1);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await props.data(`/infos/${valueInfo}`, 'post');
    setToggleCount(toggleCount + 1);
  }

  const fetchData = async () => {
    const infosData = await props.data('/infos', 'get');
    setInfos(infosData[0].info);
  }

  fetchData();


  return (
    <Card sx={{ position: 'relative', boxShadow: 3, border: 'solid 0.5px #fff2', bgcolor: '#fff3', backdropFilter: 'blur(5px)', color: 'white', maxWidth: 345, borderRadius: 2, mx: 10, maxHeight: 340, minWidth: 280}} >
      <Button sx={{	position: 'absolute',top: '3px', right: '-10px', display: `${props.display}` }} onClick={handleEdit()} className="editInfo"><img src={edit} alt="" /></Button>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={infoLogo}
          alt="info"

          sx = {{ p: '15px 5px', objectFit: "contain"}}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Information
          </Typography>
          {array[toggleCount%2]}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}