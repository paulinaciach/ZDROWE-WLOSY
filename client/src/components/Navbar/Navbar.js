import React, { useState, useEffect } from 'react';
import { AppBar, Button, Toolbar, Typography, Avatar } from '@material-ui/core';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useStyles from './styles';
import memories from '../../images/hair-comb.png';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

const Navbar = () => {
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const token = user?.token;
        
        if (token) {
            const decodedToken = decode(token);
            if(decodedToken.exp * 1000 < new Date().getTime()) logout();
        }

        setUser(JSON.parse(localStorage.getItem('profile')));

    }, [location]);

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        navigate('/home');
        setUser(null);
        homePage();

    };

    const homePage2 = () => {
        navigate('/home');
        homePage();

    };
    const delay = ms => new Promise(res => setTimeout(res, ms));

    const homePage = async () => {
        await delay(100);
        navigate('/');
    };



    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer} >
                <img className={classes.image} src={memories} alt="memories" height="60" onClick={homePage2}/>
                <Typography onClick={homePage2} className={classes.heading} variant="h2" align="center">Zdrowe Włosy</Typography>
            </div>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile} >
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}> {user.result.name.charAt(0)} </Avatar>
                        <Typography className={classes.userName} variant="h6"> {user.result.name} </Typography>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Wyloguj</Button>
                    </div>
                ) : (
                    <Button component={Link} to="/auth" variant="contained" color="primary" >Zaloguj się</Button>
                )}
                  
            </Toolbar>
        </AppBar>    
    );
};

export default Navbar;

