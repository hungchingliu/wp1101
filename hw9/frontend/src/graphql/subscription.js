import { gql } from '@apollo/client'

export const CHATBOXMESSAGES_SUBSCRIPTION = gql`
    subscription chatBoxMessages(
        $chatBoxName: String!
    ){
    chatBoxMessages(chatBoxName: $chatBoxName){  
            message{    
                sender{
                    name
                }
                body
            }
        }
    }
    
`;