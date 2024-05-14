import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';


import '../style/App.css'
import logo from '../ressources/BiomapsLogo.png'
import searchLogo from '../ressources/search.png'

const drawerWidth = 240;
const navItems = ['Accueil', 'Services', 'Procédures'];



function DrawerAppBar(props) {

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [letter, setLetter] = React.useState("U");
  const settings = ['Profil', 'Déconnexion'];
  const [searchValue, setSearchValue] = React.useState("");
  const [listeServices, setListeServices] = React.useState([]);


  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleNavMenuButton = (setting) =>{
    if(setting === 'Déconnexion') {props.setActiveSection(5); props.setIsConnected(false); props.setShowDrawer('none'); props.setShowNav('none'); props.setBg('none');}
    else if(setting === 'Profil') {props.setActiveSection(3); props.setShowDrawer('flex'); props.setShowNav('block'); props.setBg(props.bgUser);}
    //else if(setting === 'Personalisation'){props.setActiveSection(4); props.setShowDrawer('flex'); props.setShowNav('block'); props.setBg(props.bgUser)}
  }

  const handleToggleNavButtons = (item) =>{
    if(props.isConnected === true){
      for(let i=0; i< navItems.length; i++){
        if(item === navItems[i]) {
          props.setActiveSection(i);
          props.setShowNav('block');
          props.setBg(props.bgUser);
          props.setShowDrawer('flex'); 
        }
      }
    }
  }

  const showNavInput = (e) => {
    e.stopPropagation();
    props.setShowInput(true)   
  }

  const hideNavInput = () => {
    props.setShowInput(false)
  }

  const fetchData = async () => {
    try{
      const myData = await props.data(`/user/${props.user.mail}`, 'get');
      setLetter(myData.nom[0]);
      const MyList = await props.data('/services', 'get');
      setListeServices(MyList);
    }catch(e){
      console.log(e);
    }
  }
  

  fetchData();


  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <img src={logo} className="logoImageDrawer" />
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton onClick={(e) => {e.preventDefault(); handleToggleNavButtons(item);}} sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  const searchNav = props.showInput ? (
  <div className='dropdown'>
    <input autoFocus value={searchValue} onChange={(e) => setSearchValue(e.target.value)} placeholder='Rechercher' className='navInput'/>
    <div class="dropdown-content">
      {listeServices.map((s) => {
        if(searchValue === "" || s.nom.toLowerCase().includes(searchValue.toLowerCase())){
        return (
          <a href={s.lien} target="_blank" rel="noopener noreferrer">{s.nom}</a>
        )}
      })}
    </div>
  </div>
  ) : (<img src={searchLogo} alt="" />);
  

  return (
    <Box >
      <CssBaseline />
      <AppBar onClick={() => hideNavInput()} component="nav" sx={{ bgcolor: '#0000', boxShadow: 0 }} className="navbar">
        <Toolbar >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { xs: `${props.showDrawer}`, md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Box onClick={(e) => {e.preventDefault(); handleToggleNavButtons('Accueil');}}
              className="logo">
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}
            >
              <img src={logo} className="logoImage" />
              <div className="logoTitle">BioMaps</div>
            </Typography>
          </Box>
          <Box className="navItems" sx={{ display: { xs: 'none', md: `${props.showNav}` } }}>
            <Button sx={{mr: 1}} onClick={(e) => showNavInput(e)} className='searchLogo'>
              {searchNav}
            </Button>
            {navItems.map((item) => ( 
              <Button className="navItem" key={item} onClick={(e) => {e.preventDefault(); handleToggleNavButtons(item);}} sx={{ color: '#fff', mx:{ sm: 0, lg: 2}, fontWeight: 'medium', fontSize: 14 }}>
                {item}  
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0, mr: 7, display: `${props.showNav}`}}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar>{letter}</Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={(e) => {e.preventDefault(); handleCloseUserMenu(); handleNavMenuButton(setting);}}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

        </Toolbar>

      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
        
    </Box>
  );
}

DrawerAppBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DrawerAppBar;