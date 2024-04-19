import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';

import '../style/modules.css'

// search bar de l'écran modules
export default function SearchBar(props) {

  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 300, height: 40, ml: 2, mr: 2}}
      className="search"
      elevation={2}
    >
      <InputBase
        className='searchInput'
        sx={{ ml: 1, flex: 1 }}
        placeholder={props.placeH}
        inputProps={{ 'aria-label': 'search a service' }}
        value={props.q}
        onChange={(e) => props.setQ(e.target.value)}
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}