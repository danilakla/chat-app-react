import {gql} from "@apollo/client";

export const PROFILE_CREATE = gql`
    mutation createProfile($lastname: String!,$name: String!,$image:String!) {
        createProfile(createProfileInput: {lastname:$lastname,name:,$name,image:$image}) {
           name
            lastname
            
        }
    }
`
export const UPDATE_PROFILE = gql`
    mutation updateUserProfile($lastname: String!,$name: String!,$image:String!) {
        updateUserProfile(updateProfileInput: {lastname:$lastname,name:,$name,image:$image}) {
            name
            lastname

        }
    }
`