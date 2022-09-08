import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';
import {Link} from "react-router-dom";
import { useEffect, useRef, useState} from "react";
import socket from "../../socket/socket.io";
import AddFriend from "./AddFriend";

export default function ListFriend() {
    const [friends, setFriend] = useState([{}])
    let newArray;
    const socketConnection = useRef();
    useEffect(() => {
        const token = localStorage.getItem('access_token')
        socketConnection.current = socket(token).connect()
        socketConnection.current.emit('init-user')
        socketConnection.current.on('3', (listFriends) => {

        })
        socketConnection.current.on('friends', (listFriends) => {

            setFriend(listFriends)
        })

        socketConnection.current.on('disconnect_caller', ({isConnected, email}) => {

            setFriend(friends.map((fr) => {
                if (fr.email === email) {
                    fr.connected = isConnected
                }

                return fr
            }))
            window.location.reload(true);

        })
    }, [])

    window.onbeforeunload = function () {
        myfun();
    };

    function myfun() {
        socketConnection.current.emit('disconnect_user')
    }

    return (
        <React.Fragment
        >
            <CssBaseline / >
                <Paper square sx={{pb: '50px', width: '100%'}}>
                    <Typography variant="h5" gutterBottom component="div" sx={{p: 2, pb: 0}}>
                        Inbox
                    </Typography>
                    <List sx={{mb: 2}}>
                        {friends.map(({socketId, email, connected}) => (
                            <Link to={`/chat-room/${socketId}`}> <React.Fragment key={socketId}>
                                <ListItem button>
                                    <ListItemAvatar>
                                        <Avatar alt="Profile Picture"/>
                                    </ListItemAvatar>
                                    <ListItemText primary={email} secondary={connected}/>
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
                        <AddFriend socket={socketConnection}/>
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
