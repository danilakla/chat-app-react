import {gql} from "@apollo/client";

export const GET_PROFILE = gql`
    query {
        getProfile {
            image
            user{
                email
                isActive
            }
            name
            lastname

        }
    }
`

