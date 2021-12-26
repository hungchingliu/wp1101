import { gql } from '@apollo/client'

export const CREATE_MESSAGE_MUTATION = gql`
    mutation createMessage(
        $chatBoxName: String!
        $sender: String!
        $body: String!
    ){
        createMessage(
            chatBoxName: $chatBoxName
            sender: $sender
            body: $body
        ){
            sender{
                name
            }
            body
        }
    }
  
`;

export const CREATE_CHATBOX_MUTATION = gql`
    mutation createChatBox(
        $name1: String!
        $name2: String!
    ){
        createChatBox(
            name1: $name1
            name2: $name2
        ){
            name
        }
    }
`;

export const CLEAR_MESSAGE_MUTATION = gql`
    mutation clearMessage(
        $chatBoxName: String!
    ){
        clearMessage(
            chatBoxName: $chatBoxName
        )
    }
  
`;
