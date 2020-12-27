import React from 'react';
import { Link } from 'react-router-dom';
import Lottie from 'react-lottie';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonArrow from './ui/ButtonArrow';
import { Typography } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CallToAction from './ui/CallToAction';

import animationData from '../animations/landinganimation/data';
import customSoftwareIcon from '../assets/customSoftware.svg';
import mobileAppsIcon from '../assets/mobileIcon.svg';
import websitesIcon from '../assets/websiteIcon.svg';
import revolutionBackground from '../assets/repeatingBackground.svg';
import infoBackground from '../assets/infoBackground.svg';


const useStyles = makeStyles(theme => ({
    animation: {
        maxWidth: '50em',
        minWidth: '21em',
        marginTop: '2em',
        marginLeft: '10%',
        [theme.breakpoints.down('sm')]: {
            maxWidth: '30em',
        },
    },
    estimateButton: {
        ...theme.typography.estimate,
        backgroundColor: theme.palette.common.orange,
        borderRadius: 50,
        height: 45,
        width: 145,
        marginRight: 40,
        '&:hover': {
            backgroundColor: theme.palette.secondary.light,
        },
    },
    buttonContainer: {
        marginTop: '1em',
    },
    learnButtonHero: {
        ...theme.typography.learnButton,
        fontSize: '0.9rem',
        height: 45,
        width: 145,
    },
    learnButton: {
        ...theme.typography.learnButton,
        fontSize: '0.7rem',
        height: 35,
        padding: 5,
        [theme.breakpoints.down('sm')]: {
            marginBottom: '2em',
        },
    },
    mainContainer: {
        marginTop: '5em',
        [theme.breakpoints.down('md')]: {
            marginTop: '3em',
        },
        [theme.breakpoints.down('xs')]: {
            marginTop: '3em',
        },
    },
    heroTextContainer: {
        minWidth: '21.5em',
        marginLeft: '1em',
        [theme.breakpoints.down('xs')]: {
            marginLeft: 0,
        },
    },
    specialText: {
        fontFamily: "Pacifico",
        color: theme.palette.common.orange,
    },
    subtitle: {
        marginBottom: '1em',
    },
    icon: {
        marginLeft: '2em',
        [theme.breakpoints.down('xs')]: {
            marginLeft: 0,
        },
    },
    serviceContainer: {
        marginTop: '12em',
        [theme.breakpoints.down('sm')]: {
            padding: 25,
        },
    },
    revolutionBackground: {
        backgroundImage: `url(${ revolutionBackground })`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '100%',
        width: '100%',
    },
    revolutionCard: {
        position: 'absolute',
        boxShadow: theme.shadows[10],
        borderRadius: 15,
        padding: '10em',
        [theme.breakpoints.down('sm')]: {
            paddingTop: '8em',
            paddingBottom: '8em',
            paddingLeft: 0,
            paddingRight: 0,
            borderRadius: 0,
            width: '100%',
        },
    },
    infoBackground: {
        backgroundImage: `url(${ infoBackground })`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '100%',
        width: '100%',
    },
}));


const LandingPage = ({ setValue, setSelectedIndex }) => {

    const classes = useStyles();
    const theme = useTheme();
    const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
    const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));

    const defaultOptions = {
        loop: true,
        autoplay: false,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    };


    return (
        <Grid container direction="column" className={ classes.mainContainer }>

            {/* =========== HERO BLOCK =============  */ }
            <Grid item>
                <Grid container direction="row" justify="flex-end" alignItems="center">
                    <Grid sm item className={ classes.heroTextContainer }>
                        <Typography variant="h2" align="center">
                            Bring West Coast technology
                            <br />
                            to the MidWest
                        </Typography>
                        <Grid container direction="row" justify="center" className={ classes.buttonContainer }>
                            <Grid item>
                                <Button variant="contained" className={ classes.estimateButton }
                                        component={ Link } to="/estimate"
                                        onClick={ () => setValue(5) }
                                >
                                    Free Estimate
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button variant="outlined" className={ classes.learnButtonHero }
                                        component={ Link } to="/revolution"
                                        onClick={ () => setValue(2) }
                                >
                                    <span style={ { marginRight: 10 } }>Learn More</span>
                                    <ButtonArrow width={ 15 } height={ 15 } fill={ theme.palette.common.blue } />
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid sm item className={ classes.animation }>
                        <Lottie options={ defaultOptions }
                                height={ '100%' }
                                width={ '100%' }
                        />
                    </Grid>
                </Grid>
            </Grid>

            {/* ========== THE SERVICES BLOCK ========= */ }

            {/* ------------ Custom Software Service Block ---------- */ }
            <Grid item>
                { ' ' }
                <Grid container direction="row" className={ classes.serviceContainer }
                      justify={ matchesSM ? 'center' : undefined }
                >
                    <Grid item
                          style={ { marginLeft: matchesSM ? 0 : '5em', textAlign: matchesSM ? 'center' : undefined } }
                    >
                        <Typography variant="h4">
                            Custom Software Development
                        </Typography>
                        <Typography variant="subtitle1" className={ classes.subtitle }>
                            Save Energy. Save Time. Save Money.
                        </Typography>
                        <Typography variant="subtitle1">
                            Complete digital solutions, from investigation to { ' ' }
                            <span className={ classes.specialText }>celebration.</span>
                        </Typography>
                        <Button variant="outlined" className={ classes.learnButton }
                                component={ Link } to="/customsoftware"
                                onClick={ () => {
                                    setValue(1);
                                    setSelectedIndex(1);
                                } }

                        >
                            <span style={ { marginRight: 10 } }>Learn More</span>
                            <ButtonArrow width={ 10 } height={ 10 } fill={ theme.palette.common.blue } />
                        </Button>
                    </Grid>
                    <Grid item>
                        <img src={ customSoftwareIcon } alt="custom software icon" className={ classes.icon } />
                    </Grid>
                </Grid>
            </Grid>

            {/* ------------ iOS/Android App Service Block ------------ */ }
            <Grid item>
                { ' ' }
                <Grid container direction="row" className={ classes.serviceContainer }
                      justify={ matchesSM ? 'center' : 'flex-end' }
                >
                    <Grid item style={ { textAlign: matchesSM ? 'center' : undefined } }>
                        <Typography variant="h4">
                            iOS/Android App Development
                        </Typography>
                        <Typography variant="subtitle1" className={ classes.subtitle }>
                            Extend Functionality. Extend Access. Increase Engagement.
                        </Typography>
                        <Typography variant="subtitle1">
                            Integrate your experience or create a standalone
                            app { matchesSM ? null : <br /> } with either mobile platform.
                        </Typography>
                        <Button variant="outlined" className={ classes.learnButton }
                                component={ Link } to="/mobileapps"
                                onClick={ () => {
                                    setValue(1);
                                    setSelectedIndex(2);
                                } }
                        >
                            <span style={ { marginRight: 10 } }>Learn More</span>
                            <ButtonArrow width={ 10 } height={ 10 } fill={ theme.palette.common.blue } />
                        </Button>
                    </Grid>
                    <Grid item style={ { marginRight: matchesSM ? 0 : '5em' } }>
                        <img src={ mobileAppsIcon } alt="mobile phone icon" className={ classes.icon } />
                    </Grid>
                </Grid>
            </Grid>

            {/* ------------ Websites Service Block ---------- */ }
            <Grid item>
                { ' ' }
                <Grid container direction="row" className={ classes.serviceContainer }
                      justify={ matchesSM ? 'center' : undefined }
                >
                    <Grid item
                          style={ { marginLeft: matchesSM ? 0 : '5em', textAlign: matchesSM ? 'center' : undefined } }
                    >
                        <Typography variant="h4">
                            Website Development
                        </Typography>
                        <Typography variant="subtitle1" className={ classes.subtitle }>
                            Reach More. Discover More. Sell More.
                        </Typography>
                        <Typography variant="subtitle1">
                            Optimized for Search Engines, built for speed.
                        </Typography>
                        <Button variant="outlined" className={ classes.learnButton }
                                component={ Link } to="/websites"
                                onClick={ () => {
                                    setValue(1);
                                    setSelectedIndex(3);
                                } }
                        >
                            <span style={ { marginRight: 10 } }>Learn More</span>
                            <ButtonArrow width={ 10 } height={ 10 } fill={ theme.palette.common.blue } />
                        </Button>
                    </Grid>
                    <Grid item>
                        <img src={ websitesIcon } alt="website icon" className={ classes.icon } />
                    </Grid>
                </Grid>
            </Grid>

            {/* =========== REVOLUTION BLOCK =============  */ }
            <Grid item>
                <Grid container direction="row" justify="center" alignItems="center"
                      style={ { height: '100em', marginTop: '12em' } }
                >
                    <Card className={ classes.revolutionCard }>
                        <CardContent>
                            <Grid container direction="column" style={ { textAlign: 'center' } }>
                                <Grid item>
                                    <Typography variant="h3" gutterBottom>
                                        The Revolution
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="subtitle1">
                                        Visionary insights coupled with cutting-edge technology is a recipe for
                                        revolution.
                                    </Typography>
                                    <Button variant="outlined" className={ classes.learnButtonHero }
                                            component={ Link } to="/revolution"
                                            onClick={ () => setValue(2) }
                                    >
                                        <span style={ { marginRight: 10 } }>Learn More</span>
                                        <ButtonArrow width={ 15 } height={ 15 } fill={ theme.palette.common.blue } />
                                    </Button>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                    <div className={ classes.revolutionBackground } />
                </Grid>
            </Grid>

            {/* =========== INFORMATION BLOCK =============  */ }
            <Grid item>
                <Grid container direction="row" alignItems="center" style={ { height: '80em' } }
                      className={ classes.infoBackground }
                >

                    <Grid item container direction={ matchesXS ? 'column' : 'row' }
                          style={ { textAlign: matchesXS ? 'center' : 'inherit' } }
                    >

                        <Grid item sm style={ { marginLeft: matchesXS ? 0 : matchesSM ? '2em' : '5em' } }>
                            <Grid container direction="column"
                                  style={ { marginBottom: matchesXS ? '10em' : 0 } }
                            >
                                <Typography variant="h2" style={ { color: 'white' } }>About Us</Typography>
                                <Typography variant="subtitle2">Let's get personal.</Typography>
                                <Grid item>
                                    <Button variant="outlined" className={ classes.learnButton }
                                            style={ { color: 'white', borderColor: 'white' } }
                                            component={ Link } to="/about"
                                            onClick={ () => setValue(3) }
                                    >
                                        <span style={ { marginRight: 10 } }>Learn More</span>
                                        <ButtonArrow width={ 10 } height={ 10 } fill="white" />
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item sm style={ {
                            marginRight: matchesXS ? 0 : matchesSM ? '2em' : '5em',
                            textAlign: matchesXS ? 'center' : 'right',
                        } }
                        >
                            <Grid container direction="column">
                                <Typography variant="h2" style={ { color: 'white' } }>Contact Us</Typography>
                                <Typography variant="subtitle2">
                                    Say Hello! <span role="img" aria-label="waving hand">👋</span>
                                </Typography>
                                <Grid item>
                                    <Button variant="outlined" className={ classes.learnButton }
                                            style={ { color: 'white', borderColor: 'white' } }
                                            component={ Link } to="/contact"
                                            onClick={ () => setValue(4) }
                                    >
                                        <span style={ { marginRight: 10 } }>Learn More</span>
                                        <ButtonArrow width={ 10 } height={ 10 } fill="white" />
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            {/* =========== CALL TO ACTION BLOCK =============  */ }
            <Grid item>
                <CallToAction setValue={ setValue } />
            </Grid>

        </Grid>
    );
};


export default LandingPage;