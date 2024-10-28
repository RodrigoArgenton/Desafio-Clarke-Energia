import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

export default function SupplierCard({name,logo,state_of_origin,cost_per_kwh,minimum_kWh_limit,total_clients,average_rating}) {
  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: '#6699FF', color:'white',  borderRadius: '16px' }}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar src={logo} />
        </ListItemAvatar>
        <ListItemText
          primary={name}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                sx={{ color: 'white', display: 'inline' }}
              >
                <li>
                    <ul>
                        <strong>Estado:</strong> {state_of_origin}
                    </ul>
                    <ul>
                        <strong>Custo por KWH:</strong> {cost_per_kwh}
                    </ul>
                    <ul>
                        <strong>Minimo de KWH:</strong> {minimum_kWh_limit}
                    </ul>
                    <ul>
                        <strong>Total de clientes:</strong> {total_clients}
                    </ul>
                    <ul>
                        <strong>Avaliação:</strong> {average_rating}
                    </ul>
                </li>
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
    </List>
  );
}