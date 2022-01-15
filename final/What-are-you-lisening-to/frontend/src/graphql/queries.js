import { gql } from  "@apollo/client"

export const HELLO = gql`
    query {
        hello
    }
`;

export const GET_USERS_QUERY = gql`
    query GetUsersQuery($neLat: Float, 
    $neLng: Float, $swLat: Float, $swLng: Float, $all: Boolean) {
        users(neLat: $neLat, neLng: $neLng, swLat: $swLat, swLng: $swLng, all: $all) {
            id
            name
            lat
            lng
            songID
            imageURL
        }
    }
`