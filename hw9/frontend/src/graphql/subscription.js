import { gql } from '@apollo/client'

export const CHATBOXMESSAGES_SUBSCRIPTION = gql`
    subscription chatBoxMessages(
        $chatBoxName: String!
    ){
    chatBoxMessages(chatBoxName: $chatBoxName){
            mutation  
            message{    
                sender{
                    name
                }
                body
            }
        }
    }
    
`;