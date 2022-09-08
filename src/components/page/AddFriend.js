import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useState} from "react";

import Error from "../alter/Error";
import Success from "../alter/success";
import AddIcon from "@mui/icons-material/Add";
import {styled} from "@mui/material/styles";
import Fab from "@mui/material/Fab";
import {Link, useNavigate} from "react-router-dom";

const StyledFab = styled(Fab)({
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
});
export default function AddFriend(socket) {
    const navigate = useNavigate()

    const [open, setOpen] = React.useState(false);
    const [stateQuery, setQuery] = useState()
    const [email, setName] = useState('')

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const addFriend = async () => {
        socket.socket.current.emit(
            "add_friend",
            email,
        )
        socket.socket.current.on('isAdded',(isAdded)=>{
            if (isAdded){
                setQuery('success')
                setTimeout(()=>{
                    window.location.reload(false);
                },500)
            }else {
                setQuery('error')

            }

        })

    }
    return (
        <div style={{display: "inline-block"}}>
            <StyledFab color="secondary" aria-label="add">
                <AddIcon onClick={handleClickOpen}/>
            </StyledFab>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Subscribe</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        input email your friend
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        value={email}
                        fullWidth
                        name="email"
                        onChange={(e) => {
                            return setName(e.target.value)
                        }}
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>

                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={addFriend}>Subscribe</Button>
                </DialogActions>
                {stateQuery === 'error' ? <Error/> : ''}
                {stateQuery === 'success' ? <Success/> : ''}

            </Dialog>
        </div>
    );
}