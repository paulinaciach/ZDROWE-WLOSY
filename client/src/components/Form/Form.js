import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from "react-redux";
import useStyles from './styles';
import { createPost, updatePost } from '../../actions/posts';
import lady from '../../images/women.png';

const Form = ({ currentId, setCurrentId }) => {
    const [postData, setPostData] = useState({
        title: '', message: '', tags: '', selectedFile: ''
    });
    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null);
    const user = JSON.parse(localStorage.getItem('profile'));
    const classes = useStyles();
    const dispatch = useDispatch();


    const onDownload = () => {
        const link = document.createElement("a");
        link.download = `zdrowewlosy.pdf`;
        link.href = "./zdrowewlosy.pdf";
        link.click();
      };

    useEffect(() => {
        if(post) setPostData(post);
    }, [post])
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        if(currentId) {
            dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
        }
        else {
            dispatch(createPost({...postData, name: user?.result?.name }));
        }
        clear();
    };

    const clear = () => {
        setCurrentId(null);
        setPostData({
            title: '', message: '', tags: '', selectedFile: ''
        });
    }

    if (!user?.result?.name) {
        return (
            <Paper className={classes.paper} align="center">
                <img  className={classes.margins} src={lady} alt="lady" height="60vh"/>
                <Typography className={classes.description} variant="h6" align="center">
                Zdrowe Włosy jest to baza danych zawierająca kosmetyki
                do pielęgnacji włosów. W opisie umieszczamy tylko składniki.
                Jeśli jesteś tu nowa ściągnij PDF z instrukcją jak dbać o włosy.

                </Typography>
                <br></br>
                <Typography className={classes.description} variant="h6" align="center">
                Zaloguj się aby móc dodawać nowe kosmetyki i zostawiać łapki w górze
                jeśli jakiś kosmetyk do pielęgnacji włosów Ci się spodobał :)
                </Typography>
                <br></br>
                <Button  className={classes.margins} variant="contained" color="primary" onClick={onDownload} >Ściągnij PDF</Button>  
            </Paper>
        );
    }

    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6" >{currentId ? 'Edytuj' : 'Dodaj'} Kosmetyk</Typography>
                {/* <TextField 
                    name="creator" 
                    variant="outlined" 
                    label="Creator" 
                    fullWidth 
                    value={postData.creator} 
                    onChange={(e) => setPostData({ ...postData, creator: e.target.value })}
                /> */}
                <TextField 
                    name="title" 
                    variant="outlined" 
                    label="Tytuł" 
                    fullWidth 
                    value={postData.title} 
                    onChange={(e) => setPostData({ ...postData, title: e.target.value })} 
                />
                <TextField 
                    name="message" 
                    variant="outlined" 
                    label="Składniki" 
                    fullWidth 
                    value={postData.message} 
                    onChange={(e) => setPostData({ ...postData, message: e.target.value })} 
                />
                <TextField 
                    name="tags" 
                    variant="outlined" 
                    label="Tagi" 
                    fullWidth 
                    value={postData.tags} 
                    onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} 
                />
                <div className={classes.fileInput}>
                    <FileBase
                        type="file"
                        multiple={false}
                        onDone={({base64}) => setPostData({ ...postData, selectedFile: base64})}
                    />
                </div>
                <Button className={classes.buttonSubmit} type="submit"  variant="contained" color="primary" size="large" fullWidth>WYŚLIJ DO BAZY</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth >Wyszyść</Button>
            </form>
        </Paper>
    );
}

export default Form;