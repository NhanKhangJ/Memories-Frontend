import React from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container} from '@material-ui/core';
import {GoogleLogin} from 'react-google-login'

import {useDispatch} from 'react-redux'

import useStyles from './styles'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Input from './Input';
import { useState } from 'react';
import Icon from './icon';
import { useHistory } from 'react-router-dom';
import {signin, signup} from '../../actions/auth'


const initialState = { firstName: '', lastName:'', email:'', password: '', confirmPassword:''}


const Auth = () => {
    const classes = useStyles();
    const [showPassword, setShowPassword]= useState(false)
    const [isSignup, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState(initialState)
    const dispatch = useDispatch();
    const history = useHistory()
    
    const handleShowPassword =() =>{
      setShowPassword((prevShowPassword) => !prevShowPassword)
    }
 

    const handleChange = (e) =>{
       setFormData({...formData, [e.target.name]: e.target.value})//spread all the properties but only change the one specific one you are currently on wiht target value that means the current input that we have in there 
    }
    
    const switchMode = () =>{
           setFormData(initialState);
           setIsSignUp((preIsSignUp) => !preIsSignUp);
           setShowPassword(false)
    }
    
    const handleSubmit = (e) =>{ 
      e.preventDefault();

     if(isSignup){
       dispatch(signup(formData, history))
     } else {
       dispatch(signin(formData, history))
     }
   };

    const googleSuccess = async (res) =>{
        const result = res?.profileObj; // optional chaining operator the question mark dot, is a speacial operator that's not going to throw an error if we don't have access to the res object 
        const token = res?.tokenId;
      try {
        dispatch({type: 'AUTH', data: {result, token}});
        history.push('/')
      } catch (error) {
        
      }
 
    };

    const googleFailure = (error) =>{
        console.log(error)
        console.log('Google Sign In was unsuccessful')
    };

  return (
<Container component="main" maxWidth="xs">
  <Paper className={classes.paper} elevation={3}> 
     <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
     </Avatar>
     <Typography variant='h5'>{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
     <form className={classes.form} onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {
            isSignup && (
              <>
                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half/>
                <Input name="lastName" label="Last Name" handleChange={handleChange} half/>
              </>
            )}
            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword=
            {handleShowPassword}/>
            {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password"/>}
        </Grid>
        <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            {isSignup ? 'Sign Up' : 'Sign in'}
        </Button>
        {/* <GoogleLogin
          clientId="1036752263889-opftetgg7ueju72vmtgi52kbr936a762.apps.googleusercontent.com"
          render={(renderProps) => (
              <Button
               className={classes.googleButton} 
               color='primary' 
               fullWidth 
               onClick={renderProps.onClick} 
               disabled={renderProps.disabled} 
               startIcon={<Icon />} 
               variant="contained">
               Google Sign In
               </Button>
          )}
          onSuccess={googleSuccess}
          onFailure={googleFailure}
          cookiePolicy={'single_host_origin'}
        /> */}
  
        <Grid container justifyContent="flex-end" >
             <Button onClick={switchMode}>
                   {isSignup ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
             </Button>
        </Grid>
     </form>
  </Paper>
  
</Container>
  )
}

export default Auth