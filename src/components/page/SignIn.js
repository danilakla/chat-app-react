import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {useContext, useState} from "react";
import {Context} from "../../index";
import {useNavigate} from "react-router-dom";
import GoogleAuth from "../GoogleAuth";
import {LOGIN, LOGIN_GOOGLE, REGISTRATION, SINGUP_GOOGLE} from "../../mutation/auth.mutation";
import {useMutation} from "@apollo/client";
import FormDialog from "./ForgotPassword";
import Error from "../alter/Error";
import Success from "../alter/success";


const theme = createTheme();

export default function SignIn() {
    const navigate = useNavigate()
    const {store} = useContext(Context)
    const [login] = useMutation(LOGIN)
    const [stateQuery, setQuery] = useState()

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();

            const data = new FormData(event.currentTarget);
            const res = await login({
                variables: {
                    email: data.get('email'),
                    password: data.get('password'),
                }
            })
            localStorage.setItem('access_token', res.data.login.access_token)
            setQuery('success')

            navigate('/profile');
        }
        catch(e){
            console.log(e)
            setQuery('error')
        }

    };

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
                        Login
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
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
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary"/>}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Sign In
                        </Button>
                        {stateQuery==='error'?<Error/>:''}
                        {stateQuery==='success'?<Success/>:''}
                        <p style={{textAlign: "center"}}>or</p>
                        <GoogleAuth fun={'loginGoogle'} typeMutation={LOGIN_GOOGLE} children={'Login'}/>

                        <Grid container>
                            <Grid item xs>
                                <FormDialog/>
                            </Grid>
                            <Grid item xs>

                                <Button style={{fontSize: 15, marginTop: 30, margin: "auto"}}
                                        variant="outlined">
                                    <Link href="/up">
                                        {"Don't have an account? Sign Up"}
                                    </Link> </Button>


                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}