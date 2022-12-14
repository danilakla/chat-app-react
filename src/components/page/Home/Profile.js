import * as React from 'react';
import {styled, createTheme, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import {mainListItems, secondaryListItems} from './listItems';
import Chart from './Chart';
import Deposits from './Deposits';
import Orders from './Orders';
import SwipeableTextMobileStepper from "./Photo";
import CreateProfileForm from "./CreateProfileForm";
import UpdateProfileForm from "./UpdateProfileForm";
import {useEffect, useState} from "react";
import {useQuery} from "@apollo/client";
import {GET_PROFILE} from "../../../query/profile";



function DashboardContent() {
    const {data, loading, error}=useQuery(GET_PROFILE)
    const [open, setOpen] = React.useState(true);
    const [name, setName] = useState('')
    const [lastname, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [isActive, setIsActive] = useState('')
    const [isCreateProfile, setIsCreateProfile] = useState(false)

    const [img, setImage] = useState('')
    const toggleDrawer = () => {
        setOpen(!open);
    };
    useEffect(()=>{
        if(!loading){

            const profile=data.getProfile
            console.log(profile)
            setImage(profile.image)
            setName(profile.name)
            setEmail(profile.user.email)
            setIsActive(profile.user.isActive)

            setLastName(profile.lastname)
            setIsCreateProfile(true)
        }
    },[data])

    return (
        <>
            <Box
                component="main"
                sx={{
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[100]
                            : theme.palette.grey[900],
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                }}
            >
                <Toolbar/>
                <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
                    <Grid container spacing={3}>
                        {/* Chart */}
                        <Grid item xs={12} md={8} lg={9}>
                            <Paper
                                sx={{
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: "100%",
                                }}
                            >
                                <h1>{name}</h1>
                                <h1>{lastname}</h1>
                                <h1>{email}</h1>
                                <h1>{isActive}</h1>

                            </Paper>
                        </Grid>
                        {/* Recent Deposits */}
                        <Grid item xs={12} md={4} lg={3}>
                            <img width={300} height={300}
                                 src={img}/>
                            {!isCreateProfile?<CreateProfileForm/>:<UpdateProfileForm userData={{name,lastname,img}}/>}



                        </Grid>
                        {/* Recent Orders */}
                        <SwipeableTextMobileStepper/>
                    </Grid>
                </Container>
            </Box>
        </>
    );
}

export default function Dashboard() {
    return <DashboardContent/>;
}