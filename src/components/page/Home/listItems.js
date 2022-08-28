import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import {Link} from "react-router-dom";

export const mainListItems = (
    <React.Fragment>


        <Link to={'/profile'}> <ListItemButton>
            <ListItemIcon>
                <DashboardIcon/>
            </ListItemIcon>
            <ListItemText primary="Dashboard"/>
        </ListItemButton></Link>

        <Link to={'/products'}> <ListItemButton>
            <ListItemIcon>
                <ShoppingCartIcon/>
            </ListItemIcon>
            <ListItemText primary="Orders"/>
        </ListItemButton></Link>





        <ListItemButton>
            <ListItemIcon>
                <LayersIcon/>
            </ListItemIcon>
            <ListItemText primary="Integrations"/>
        </ListItemButton>

    </React.Fragment>
);

export const secondaryListItems = (
    <React.Fragment>
        <ListSubheader component="div" inset>
            Saved reports
        </ListSubheader>
        <Link to={'/'}> <ListItemButton>
            <ListItemIcon>
                <PeopleIcon/>
            </ListItemIcon>
            <ListItemText primary="Customers"/>
        </ListItemButton></Link>

        <Link to={'/up'}> <ListItemButton>
            <ListItemIcon>
                <BarChartIcon/>
            </ListItemIcon>
            <ListItemText primary="Reports"/>
        </ListItemButton>
        </Link>
    </React.Fragment>
);