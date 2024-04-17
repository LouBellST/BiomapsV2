import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

import infoLogo from '../ressources/info.png'
import edit from '../ressources/edit.png'

// element d'information de la page d'accueil
export default function InfoCard(props) {

  const [infos, setInfos] = React.useState("Pas d'information aujourd'hui");
  const [count, setCount] = React.useState(0);

  const handleEdit = () => () => {
    setCount(count + 1);
    
  }

  const fetchData = async () => {
    const infosData = await props.data('/infos', 'get');
    setInfos(infosData[0]);
  }

  React.useEffect(() => {
    document.title = `${count}`;
    fetchData();
  }, [count])

  return (
    <Card sx={{ boxShadow: 3, border: 'solid 0.5px #fff2',bgcolor: '#fff3', backdropFilter: 'blur(5px)', color: 'white', maxWidth: 345, borderRadius: 2, mx: 10, maxHeight: 340, minWidth: 280}} >
      <button onClick={handleEdit()} className="editInfo"><img src={edit} alt="" /></button>
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
          <Typography variant="body2" color="#fff9">
            {infos.info}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}