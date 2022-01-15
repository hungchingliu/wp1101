import {gql} from "@apollo/client"

export const CREATE_USER_MUTATON = gql`
    mutation CreateUser($input: CreateUserInput!){
        createUser(input: $input){
            id
        }
    }
`

export const UPDATE_USER_MUTATION = gql`
    mutation UpdateUser($input: CreateUserInput!){
        updateUser(input: $input){
            id
        }
    }
`

export const DELETE_USER_MUTATION = gql`
    mutation DeleteUser($id: String!){
        deleteUser(id:$id)
    }
`