import { Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Title from '../Containers/Title'
const SignIn = ({me, setMe, setSignedIn, dislayStatus}) => (
    <>
        <Title>
            <h1>My Chat Room</h1>
        </Title>
        <Input.Search  
        prefix={<UserOutlined />}
        value = {me}
        enterButton="Sign In"
        onChange={(e) => setMe(e.target.value)}
        placeholder="Enter your name"
        size="large" style={{ width: 300, margin: 50}}
        onSearch={ (name) => {
            if (!name){
                dislayStatus({
                    type: "error",
                    msg: "Missing user name"
                })
            }
            else setSignedIn(true)

        }}
        />
    </>
)

export default SignIn