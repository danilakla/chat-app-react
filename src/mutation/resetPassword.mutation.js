import {gql} from '@apollo/client'



export const RESET_PASSWORD = gql`
    mutation updatePassword($password: String!,$token: String!) {
        updatePassword(updatePasswordInput:{password:$password,token:$token})
        
    }
`
