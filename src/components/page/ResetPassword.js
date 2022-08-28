import {createTheme, ThemeProvider} from "@mui/material/styles";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Error from "../alter/Error";
import Success from "../alter/success";
import GoogleAuth from "../GoogleAuth";
import {REGISTRATION, SINGUP_GOOGLE} from "../../mutation/auth.mutation";
import Grid from "@mui/material/Grid";
import FormDialog from "./ForgotPassword";
import Link from "@mui/material/Link";
import * as React from "react";
import {useMutation} from "@apollo/client";
import {useContext, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Context} from "../../index";
import {RESET_PASSWORD} from "../../mutation/resetPassword.mutation";


const theme = createTheme();

export default function ResetPassword() {
    const [resetPassword] = useMutation(RESET_PASSWORD)
    const [stateQuery, setQuery] = useState()

    const navigate = useNavigate()
    const {store} = useContext(Context)

    const token = useParams().resetToken

    const handleSubmit = async (event) => {
        console.log(token)
        try {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            const res = await resetPassword({
                variables: {
                    password: data.get('password'),
                    token
                }
            })
            if (res) {
                setQuery('success')
            }
        } catch (e) {
            console.log(e)
            setQuery('error')
        }

    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Reset password
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Reset
                        </Button>
                        {stateQuery === 'error' ? <Error/> : ''}
                        {stateQuery === 'success' ? <Success/> : ''}

                    </Box>
                    <Link href="/" variant="body2">
                        Back to login
                    </Link>
                </Box>
            </Container>
        </ThemeProvider>
    );
}