import {gql} from '@apollo/client'

export const LOGIN_GOOGLE = gql`
    mutation loginGoogle($token: String!,) {
        loginGoogle(checkGoogleTokenInput: {token:$token}) {
            access_token
            user{
                id
            }
        }
    }
`

export const SINGUP_GOOGLE = gql`
    mutation registrationGoogle($token: String!,) {
        registrationGoogle(checkGoogleTokenInput: {token:$token}) {
            access_token
            user{
                email
            }
        }
    }
`


export const REGISTRATION = gql`
    mutation registration($email: String!,$password: String!) {
        registration(createUserInput: {email:$email,password:,$password}) {
            access_token
            user{
                email
                id
                isActive
            }
        }
    }
`
export const LOGIN = gql`
    mutation login($email: String!,$password: String!) {
        login(createUserInput: {email:$email,password:,$password}) {
            access_token
            user{
                email
                id
                
            }
        }
    }
`

export const LOGOUT = gql`
    mutation logout {
        logout
    }
`