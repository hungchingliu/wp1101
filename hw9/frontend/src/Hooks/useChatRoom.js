import { useState } from "react";
import {message} from 'antd'

const useChatRoom = () => {
    
    const [status, setStatus] = useState({})
    
    const displayStatus = (payload) => {
        if (payload.msg){
          const {type ,msg} = payload
          const content = {
            content: msg, duration: 0.5}
          switch (type) {
            case 'success':
              message.success(content)
              break
            case 'error':
              message.error(content)
              break
            case 'info':
              message.success(content)
              break;
            default: break;
    
          }
        }
      }
    
    
    return {
        status,
        setStatus,
        displayStatus
       
    }
}

export default useChatRoom