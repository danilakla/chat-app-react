import React, {useEffect, useState,} from 'react';
import GoogleLogin from "react-google-login";
import {gapi} from "gapi-script";
import {useNavigate} from 'react-router-dom'
import {useMutation} from "@apollo/client";
import Error from "./alter/Error";
import Success from "./alter/success";

const GoogleAuth = ({children,typeMutation,fun}) => {
    const [auth] = useMutation(typeMutation)
    const [stateQuery, setQuery] = useState()

    const navigate=useNavigate()
    useEffect(() => {

        function start() {
            gapi.client.init({
                clientId: '515288434314-4c86djpslburbt8tagraale5tkg05h9q.apps.googleusercontent.com',
                scope: 'email',
            });
        }

        gapi.load('client:auth2', start);
    }, []);


    const responseGoogle = async (response) => {

        try {

            const accessToken = response.accessToken;
            const {data} = await auth({
                variables: {
                  token:accessToken
                }
            })
            console.log(data[fun].access_token)
            localStorage.setItem('access_token', data[fun].access_token)
            setQuery('success')

            navigate('/profile');


        } catch (error) {
            setQuery(`error`)

            console.log(error)
        }

    }

    return (
        <div style={{ margin: "auto", marginBottom: 20}}>
            <GoogleLogin
                clientId="515288434314-4c86djpslburbt8tagraale5tkg05h9q.apps.googleusercontent.com"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
            >{children}</GoogleLogin>
            {stateQuery==='error'?<Error/>:''}
            {stateQuery==='success'?<Success/>:''}
        </div>
    );
};

export default GoogleAuth;