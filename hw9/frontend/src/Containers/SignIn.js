import { Input, Modal, Button, Space, Row} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Title from '../Containers/Title'
const SignIn = ({me, setMe, signIn, signUp, password, setPassword}) => {
    

    return (
    <>
        <Title>
            <h1>My Chat Room</h1>
        </Title>
        <Space direction="vertical">
            <Input  
            prefix={<UserOutlined />}
            value = {me}
            onChange={(e) => setMe(e.target.value.replace(/\s/g, ''))}
            placeholder="Enter your name"
            size="large" style={{ width: 300}}
            />
            <Input.Password
            value = {password}
            onChange={(e) => setPassword(e.target.value.replace(/\s/g, ''))}
            placehoder="Enter your password"
            size="large" style={{ width: 300}}
            
            />
            <Row justify="end">
                <Space>
                <Button type="primary" onClick={() => {signIn(me, password)}}>Sign In</Button>
                <Button type="default" onClick={() => {signUp(me, password)}}>Sign Up </Button>
                </Space>
            </Row>
        </Space>
        
    </>
    )}

export default SignIn