import './login.css';
import { useRef } from 'react';
import Form from 'react-bootstrap/Form';
import { verifyUser } from '../../data/username';



function Login({setToken}) {
    const userRef = useRef();
    const passRef = useRef();
    return (
        <div className="login-container">
            <Form.Label htmlFor="inputPassword5" >Username</Form.Label>
            <Form.Control style={{ textAlign: 'center' }}
                type="text"
                id="username"
                placeholder='user'
                ref={userRef}
            />
            <Form.Label htmlFor="inputPassword5" >Password</Form.Label>
            <Form.Control style={{ textAlign: 'center' }}
                type="password"
                id="password"
                placeholder='password'
                ref={passRef}
            />
            <button className='btn btn-success mt-3'
            onClick={ () => {
                const user = userRef.current.value.trim()
                const pass = passRef.current.value.trim()
                userRef.current.value = ''
                passRef.current.value = ''
                const userInfo = verifyUser(user, pass)
                if (userInfo === null) {
                    alert('Wrong user or password')
                    userRef.current.focus()
                } else {
                    setToken(userInfo.token)
                }
            }}
            >Login</button>
        </div>
    );
}

export default Login;