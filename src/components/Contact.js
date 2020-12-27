import React, { useState } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";

import ButtonArrow from './ui/ButtonArrow';
import background from '../assets/background.jpg';
import phoneIcon from '../assets/phone.svg';
import emailIcon from '../assets/email.svg';
import airplane from '../assets/send.svg';
import mobileBackground from '../assets/mobileBackground.jpg';
import { withMobileDialog } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
    background: {
        backgroundImage: `url(${ background })`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "60em",
        paddingBottom: "10em",
        [theme.breakpoints.down("md")]: {
            backgroundImage: `url(${ mobileBackground })`,
        },
    },
    estimateButton: {
        ...theme.typography.estimate,
        borderRadius: 50,
        height: 80,
        width: 205,
        backgroundColor: theme.palette.common.orange,
        fontSize: "1.5rem",
        marginRight: "5em",
        marginLeft: "2em",
        "&:hover": {
            backgroundColor: theme.palette.secondary.light,
        },
        [theme.breakpoints.down("md")]: {
            marginLeft: 0,
            marginRight: 0,
        },
    },
    learnButton: {
        ...theme.typography.learnButton,
        fontSize: "0.7rem",
        height: 35,
        padding: 5,
        [theme.breakpoints.down("md")]: {
            marginBottom: "2em",
        },
    },
    message: {
        border: `2px solid ${ theme.palette.common.blue }`,
        marginTop: "5em",
        borderRadius: 5,
    },
    sendButton: {
        ...theme.typography.estimate,
        borderRadius: 50,
        height: 45,
        width: 245,
        fontSize: "1rem",
        backgroundColor: theme.palette.common.orange,
        "&:hover": {
            backgroundColor: theme.palette.secondary.light,
        },
        [theme.breakpoints.down("sm")]: {
            height: 40,
            width: 225,
        },
    },
}));


const Contact = ({ setValue, setSelectedIndex }) => {

    const classes = useStyles();
    const theme = useTheme();
    const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
    const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
    const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));

    const [name, setName] = useState("");

    const [email, setEmail] = useState("");
    const [emailHelper, setEmailHelper] = useState("");

    const [phone, setPhone] = useState("");
    const [phoneHelper, setPhoneHelper] = useState("");

    const [message, setMessage] = useState("");

    const [open, setOpen] = useState(false);

    const [loading, setLoading] = useState(false);

    const [alert, setAlert] = useState({ open: false, message: '', backgroundColor: '' });

    const onChange = (event) => {

        let valid;

        switch (event.target.id) {
            case 'email':
                setEmail(event.target.value);
                valid = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(event.target.value);

                if (!valid) {
                    setEmailHelper("Invalid email");
                } else {
                    setEmailHelper("");
                }
                break;
            case 'phone':
                setPhone(event.target.value);
                valid = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(event.target.value);

                if (!valid) {
                    setPhoneHelper("Invalid phone number");
                } else {
                    setPhoneHelper("");
                }
                break;
            default:
                break;
        }
    };

    const onConfirm = () => {

        setLoading(true);

        axios.get('https://us-central1-service-development-webapp.cloudfunctions.net/sendMail',
            {
                params: {
                    name: name,
                    email: email,
                    phone: phone,
                    message: message,
                },
            },
        )
            .then(res => {

                setLoading(false);
                setOpen(false);

                setName('');
                setEmail('');
                setPhone('');
                setMessage('');

                setAlert({ open: true, message: 'Message sent successfully!', backgroundColor: '#4BB543' });

            })
            .catch(err => {

                setLoading(false);

                setAlert({ open: true, message: 'Something went wrong, please try again', backgroundColor: '#FF3232' });

            });
    };

    const buttonContents = (
        <>
            Send Message
            <img src={ airplane } alt="paper airplane"
                 style={ { marginLeft: '1em' } }
            />
        </>
    );


    return (
        <Grid container direction="row">

            {/* ======================== Contact Block ======================== */ }
            <Grid item lg={ 4 } xl={ 3 }
                  container direction="column" justify="center" alignItems="center"
                  style={ {
                      marginBottom: matchesMD ? '5em' : 0,
                      marginTop: matchesSM ? '1em' : matchesMD ? '5em' : 0,
                  } }
            >
                <Grid item>
                    <Grid container direction="column"
                    >

                        {/* ----------------------- Contact Section ----------------------- */ }
                        <Grid item>
                            <Typography variant="h2" align={ matchesMD ? 'center' : undefined }
                                        style={ { lineHeight: 1 } }
                            >
                                Contact Us
                            </Typography>
                            <Typography variant="body1" align={ matchesMD ? 'center' : undefined }
                                        style={ { color: theme.palette.common.blue } }
                            >
                                We're waiting.
                            </Typography>
                        </Grid>

                        {/* ----------------------- Phone Section ----------------------- */ }
                        <Grid item
                              container direction="row"
                              style={ { marginTop: '2em' } }
                        >
                            <Grid item>
                                <img src={ phoneIcon } alt="phone icon"
                                     style={ { marginRight: '0.5em', verticalAlign: 'bottom' } }
                                />
                            </Grid>
                            <Grid item>
                                <Typography variant="body1"
                                            style={ { color: theme.palette.common.blue, fontSize: '1rem' } }

                                >
                                    <a href="tel:3333333333"
                                       style={ { textDecoration: 'none', color: 'inherit' } }
                                    >
                                        (333) 333-3333
                                    </a>
                                </Typography>
                            </Grid>
                        </Grid>

                        {/* ----------------------- Email Section ----------------------- */ }
                        <Grid item
                              container direction="row"
                              style={ { marginBottom: '2em' } }
                        >
                            <Grid item>
                                <img src={ emailIcon } alt="envelop icon"
                                     style={ { marginRight: '0.5em', verticalAlign: 'bottom' } }
                                />
                            </Grid>
                            <Grid item>
                                <Typography variant="body1"
                                            style={ { color: theme.palette.common.blue, fontSize: '1rem' } }
                                >
                                    <a href="mailto:info@example.com"
                                       style={ { textDecoration: 'none', color: 'inherit' } }
                                    >
                                        info@example.com
                                    </a>
                                </Typography>
                            </Grid>
                        </Grid>

                        {/* ----------------------- Form Section ----------------------- */ }
                        <Grid item
                              container direction="column"
                              style={ { width: '20em' } }
                        >
                            <Grid item style={ { marginBottom: '0.5em' } }>
                                <TextField label="Name" id="name" fullWidth
                                           value={ name } onChange={ (e) => setName(e.target.value) }
                                />
                            </Grid>
                            <Grid item style={ { marginBottom: '0.5em' } }>
                                <TextField label="Email" id="email" fullWidth
                                           helperText={ emailHelper }
                                           error={ emailHelper.length !== 0 }
                                           value={ email } onChange={ onChange }
                                />
                            </Grid>
                            <Grid item style={ { marginBottom: '0.5em' } }>
                                <TextField label="Phone" id="phone" fullWidth
                                           helperText={ phoneHelper }
                                           error={ phoneHelper.length !== 0 }
                                           value={ phone } onChange={ onChange }
                                />
                            </Grid>
                        </Grid>

                        {/* ----------------------- Message Section ----------------------- */ }
                        <Grid item>
                            <TextField id="message" multiline rows={ 10 } fullWidth
                                       value={ message } onChange={ (e) => setMessage(e.target.value) }
                                       InputProps={ { disableUnderline: true } }
                                       placeholder="Tell us more about your project"
                                       className={ classes.message }
                                       style={ { width: '20em' } }
                            />
                        </Grid>

                        {/* ----------------------- Button Section ----------------------- */ }
                        <Grid item
                              container direction="row" justify="center"
                              style={ { marginTop: '2em' } }
                        >
                            <Button variant="contained"
                                    disabled={ name.length === 0 || email.length === 0 || phone.length === 0 ||
                                    message.length === 0 || emailHelper.length !== 0 || phoneHelper.length !== 0
                                    }
                                    onClick={ () => setOpen(true) }
                                    className={ classes.sendButton }
                            >
                                { buttonContents }
                            </Button>
                        </Grid>

                    </Grid>
                </Grid>

            </Grid>


            {/* ======================== Dialog Block ======================== */ }
            <Dialog open={ open } fullScreen={ matchesSM }
                    onClose={ () => setOpen(false) }
                    PaperProps={ {
                        style: {
                            paddingTop: matchesXS ? '1em' : '5em', paddingBottom: matchesXS ? '1em' : '5em',
                            paddingLeft: matchesXS ? 0 : matchesSM ? '5em' : matchesMD ? '15em' : '25em',
                            paddingRight: matchesXS ? 0 : matchesSM ? '5em' : matchesMD ? '15em' : '25em',
                        },
                    } }
                    style={ { zIndex: 1302 } }
            >
                <DialogContent>

                    <Grid container direction="column">

                        {/* ----------------- Dialog Confirm Message Section ------------------ */ }
                        <Grid item>
                            <Typography variant="h4" gutterBottom align="center">
                                Confirm Message
                            </Typography>
                        </Grid>

                        {/* ----------------------- Dialog Form Sections ----------------------- */ }
                        <Grid item style={ { marginBottom: '0.5em' } }>
                            <TextField label="Name" id="name" fullWidth
                                       value={ name } onChange={ (e) => setName(e.target.value) }
                            />
                        </Grid>
                        <Grid item style={ { marginBottom: '0.5em' } }>
                            <TextField label="Email" id="email" fullWidth
                                       helperText={ emailHelper }
                                       error={ emailHelper.length !== 0 }
                                       value={ email } onChange={ onChange }
                            />
                        </Grid>
                        <Grid item style={ { marginBottom: '0.5em' } }>
                            <TextField label="Phone" id="phone" fullWidth
                                       helperText={ phoneHelper }
                                       error={ phoneHelper.length !== 0 }
                                       value={ phone } onChange={ onChange }
                            />
                        </Grid>

                        {/* ----------------------- Dialog Message Section ----------------------- */ }
                        <Grid item style={ { width: matchesSM ? '100%' : '20em' } }>
                            <TextField id="message" multiline rows={ 10 } fullWidth
                                       value={ message } onChange={ (e) => setMessage(e.target.value) }
                                       InputProps={ { disableUnderline: true } }
                                       className={ classes.message }
                            />
                        </Grid>

                        {/* ----------------------- Dialog Buttons Section ----------------------- */ }
                        <Grid item
                              container direction={ matchesSM ? "column" : "row" } alignItems="center"
                              style={ { marginTop: '2em' } }
                        >

                            <Grid item>
                                <Button color="primary"
                                        onClick={ () => setOpen(false) }
                                        style={ { fontWeight: 300 } }
                                >
                                    Cancel
                                </Button>
                            </Grid>

                            <Grid item>
                                <Button variant="contained"
                                        disabled={ name.length === 0 || email.length === 0 || phone.length === 0 ||
                                        message.length === 0 || emailHelper.length !== 0 || phoneHelper.length !== 0
                                        }
                                        onClick={ onConfirm }
                                        className={ classes.sendButton }
                                >

                                    { loading ? <CircularProgress size={ 30 } /> : buttonContents }

                                </Button>
                            </Grid>

                        </Grid>

                    </Grid>
                </DialogContent>
            </Dialog>


            {/* ======================== Snackbar Block ======================== */ }
            <Snackbar
                anchorOrigin={ { vertical: 'top', horizontal: 'center' } }
                open={ alert.open }
                onClose={ () => setAlert({ ...alert, open: false }) }
                autoHideDuration={ 4000 }
                message={ alert.message }
                ContentProps={ { style: { backgroundColor: alert.backgroundColor } } }
            />


            {/* ======================== Background Block ======================== */ }
            <Grid item lg={ 8 } xl={ 9 }
                  container direction={ matchesMD ? 'column' : 'row' }
                  justify={ matchesMD ? 'center' : undefined } alignItems="center"
                  className={ classes.background }
            >

                {/* ----------------------- Content Section ----------------------- */ }
                <Grid item
                      style={ { marginLeft: matchesMD ? 0 : '3em', textAlign: matchesMD ? 'center' : 'inherit' } }
                >
                    <Grid container direction="column">
                        <Grid item>
                            <Typography variant="h2" align={ matchesMD ? 'center' : undefined }>
                                Simple Software.
                                <br />
                                Revolutionary Results.
                            </Typography>
                            <Typography variant="subtitle2" align={ matchesMD ? 'center' : undefined }
                                        style={ { fontSize: '1.5rem' } }
                            >
                                Take advantage of the 21st Century.
                            </Typography>
                            <Grid item
                                  container direction="row" justify={ matchesMD ? 'center' : undefined }
                            >
                                <Button variant="outlined" className={ classes.learnButton }
                                        component={ Link } to="/revolution"
                                        onClick={ () => setValue(2) }
                                >
                                    <span style={ { marginRight: 5 } }>Learn More</span>
                                    <ButtonArrow width={ 10 } height={ 10 } fill={ theme.palette.common.blue } />
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                {/* ----------------------- Button Section ----------------------- */ }
                <Grid item>
                    <Button variant="contained"
                            className={ classes.estimateButton }
                            component={ Link } to="/estimate"
                            onClick={ () => setValue(5) }
                    >
                        Free Estimate
                    </Button>
                </Grid>

            </Grid>


        </Grid>
    );
};


export default Contact;