import { gql } from '@apollo/client'

export const CHATBOX_QUERY = gql`
    query chatBox(
        $chatBoxName: String!
    ){
        chatBox(chatBoxName: $chatBoxName){
            messages{
                sender{
                    name
                }
                body
            }
        }
    }
`;