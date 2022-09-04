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
import {LOGIN} from "../../mutation/auth.mutation";
import {FORGOT_PASSWORD} from "../../mutation/forgotPassword.mutation";
import Error from "../alter/Error";
import Success from "../alter/success";

export default function FormDialog() {
    const [open, setOpen] = React.useState(false);
    const [stateQuery, setQuery] = useState()
    const [sendEmail] = useMutation(FORGOT_PASSWORD)
    const [email, setName] = useState('')

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const update = async () => {
        try {
            const data = await sendEmail({
                variables: {
                    email
                }
            })
            if (!data){
                setQuery(`error`)
            }
            setQuery('success')

            console.log(data)
        } catch (e) {
            setQuery(`error`)

        }

    }
    return (
        <div style={{display: "inline-block"}}>
            <Button variant="outlined" onClick={handleClickOpen}>
                Forgot password?
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
                    <Button onClick={update}>Subscribe</Button>
                </DialogActions>
                {stateQuery==='error'?<Error/>:''}
                {stateQuery==='success'?<Success/>:''}

            </Dialog>
        </div>
    );
}