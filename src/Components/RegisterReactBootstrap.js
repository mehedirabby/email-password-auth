import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import app from '../firebase/Firebase.init';
import {getAuth,createUserWithEmailAndPassword} from 'firebase/auth'


const auth = getAuth(app)

const RegisterReactBootstrap = () => {
    const [passwordError,setPasswordError]=useState('')
    const handleRegisterForm=event=>{
        event.preventDefault();
        const email=event.target.email.value;
        const password = event.target.password.value;
        console.log(email,password)

        //upper case password
        if(!/(?=.*[A-Z].*[A-Z])/.test(password)){
            setPasswordError('Please provide at lease two upper Case')
            return;

        }
        if(password.length <6){
            setPasswordError('passWord Should Be 6 character')
            return;
        }
        if(!/(?=.*[!@#$*])/.test(password)){
            setPasswordError('Please add at least 1 special character')
            return;
        }
        setPasswordError('');
        createUserWithEmailAndPassword(auth, email, password)
        .then(result=>{
            const user = result.user;
            console.log(user)
        })
        .error(error=>{
            console.error('error',error)
        })

    }
    return (
        <div className='w-25 mx-auto'>
            <h3 className='text-primary'>Please Register</h3>
        <Form onSubmit={ handleRegisterForm}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" name="email" placeholder="Enter email" required />
                
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" placeholder="Password" required />
                </Form.Group>
                <p className='text-danger'>{passwordError}</p>
                <Button variant="primary" type="submit">
                        Register
                </Button>
    </Form>
        </div>
    );
};

export default RegisterReactBootstrap;