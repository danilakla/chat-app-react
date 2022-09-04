import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useState} from "react";
import {useMutation} from "@apollo/client";
import {FORGOT_PASSWORD} from "../../../mutation/forgotPassword.mutation";
import {PROFILE_CREATE} from "../../../mutation/profile";

export default function CreateProfileForm() {
    const [open, setOpen] = React.useState(false);
    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')
    const [img, setImage] = useState('')
    const [createProfile] = useMutation(PROFILE_CREATE)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {

        setOpen(false);
    };

    const create = async () => {
        try {
            console.log(name,lastName,img)

            const data = await createProfile({
                variables: {
                    name,
                    lastname: lastName,
                    image: img
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
                Create Profile
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
                        type="text"
                        label="URL on avatar"
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
                    <Button onClick={create}>Subscribe</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
