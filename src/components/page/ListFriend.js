import * as React from 'react';
import {styled} from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Fab from '@mui/material/Fab';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Avatar from '@mui/material/Avatar';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';
import {Link} from "react-router-dom";
import {createContext, useContext, useEffect, useRef, useState} from "react";
import socket from "../../socket/socket.io";
import AddFriend from "./AddFriend";

const messages = [
    {
        socketId: 1,
        name: 'Danila?',
    },


    {
        socketId: 2,
        name: 'SomeOnew',

    },

    {
        socketId: 3,
        name: 'SOme two',
    },

];



export default function ListFriend() {
    const socketConnection = useRef();
    useEffect(() => {
        console.log(2)
        const token = localStorage.getItem('access_token')
        socketConnection.current = socket(token).connect()
socketConnection.current.emit('init-user')
    }, [])



    return (
        <React.Fragment>
            <CssBaseline/>
            <Paper square sx={{pb: '50px', width: '100%'}}>
                <Typography variant="h5" gutterBottom component="div" sx={{p: 2, pb: 0}}>
                    Inbox
                </Typography>
                <List sx={{mb: 2}}>
                    {messages.map(({socketId, name, person}) => (
                        <Link to={`/chat-room/${socketId}`}> <React.Fragment key={socketId}>
                            <ListItem button>
                                <ListItemAvatar>
                                    <Avatar alt="Profile Picture" src={person}/>
                                </ListItemAvatar>
                                <ListItemText primary={name} secondary={name}/>
                            </ListItem>
                        </React.Fragment></Link>

                    ))}
                </List>
            </Paper>
            <AppBar position="fixed" color="primary" sx={{top: 'auto', bottom: 0}}>
                <Toolbar>
                    <IconButton color="inherit" aria-label="open drawer">
                        <MenuIcon/>
                    </IconButton>
               <AddFriend socket={socketConnection.current}/>
                    <Box sx={{flexGrow: 1}}/>
                    <IconButton color="inherit">
                        <SearchIcon/>
                    </IconButton>
                    <IconButton color="inherit">
                        <MoreIcon/>
                    </IconButton>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
}
