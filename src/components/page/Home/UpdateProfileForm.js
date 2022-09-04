import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useEffect, useState} from "react";
import {useMutation} from "@apollo/client";
import {FORGOT_PASSWORD} from "../../../mutation/forgotPassword.mutation";
import {PROFILE_CREATE, UPDATE_PROFILE, UPDATE_RPOFILE} from "../../../mutation/profile";

export default function UpdateProfileForm({userData}) {
    const [open, setOpen] = React.useState(false);
    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')
    const [img, setImage] = useState('')
    const [updateUserProfile] = useMutation(UPDATE_PROFILE)
    const handleClickOpen = () => {
        setOpen(true);
    };


    const handleClose = () => {

        setOpen(false);
    };

    const update = async () => {
        try {


            const data = await updateUserProfile({
                variables: {
                    name:name?name:userData.name,
                    lastname: lastName?lastName:userData.lastname,
                    image: img?img:userData.img
                }
            })
            if (!data) {
                console.log('null data')
            }

            console.log(data)
        } catch (e) {
            console.log(e)
        }

    }
    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Update Profile
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Subscribe</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To subscribe to this website, please enter your email address here. We
                        will send updates occasionally.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name "
                        type="text"
                        fullWidth
                        variant="standard"
                        value={name}
                        onChange={(e) => {
                            return setName(e.target.value)
                        }}
                    />

                    <TextField
                        autoFocus
                        margin="dense"
                        id="lastName"
                        label="LastName "
                        type="text"
                        fullWidth
                        variant="standard"
                        value={lastName}
                        onChange={(e) => {
                            return setLastName(e.target.value)
                        }}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="img"
                        label="URL on avatar "
                        type="text"
                        fullWidth
                        variant="standard"
                        value={img}
                        onChange={(e) => {
                            return setImage(e.target.value)
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={update}>Subscribe</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
