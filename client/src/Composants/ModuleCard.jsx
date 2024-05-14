import * as React from 'react'
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

import '../style/moduleCard.css'

const DemoPaper = styled(Paper)(({ theme }) => ({
  width: 120,
  height: 120,
  padding: theme.spacing(2),
  ...theme.typography.body2,
  textAlign: 'center',
}));

export default function ModuleCard(props) {

  return (
      <DemoPaper square={false} elevation={20} className="moduleCard" sx={{ textAlign: 'center', bgcolor: '#fff2', backdropFilter: 'blur(4px)', boxShadow: 2, borderRadius: 3, color: '#fff', fontSize: props.fontsize, border: 'solid 0.5px #fff2', '&:hover': {bgcolor: '#fff1'}, display: 'flex', flexDirection: 'column', justifyContent: `${props.style}` }}>{props.text}</DemoPaper>
  );
}
