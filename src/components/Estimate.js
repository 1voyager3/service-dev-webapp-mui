import React, { useState, useRef, Fragment } from "react";
import ReactGA from "react-ga";
import axios from "axios";
import Lottie from "react-lottie";
import { cloneDeep } from "lodash";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Hidden from "@material-ui/core/Hidden";
import Snackbar from "@material-ui/core/Snackbar";
import CircularProgress from "@material-ui/core/CircularProgress";

import check from '../assets/check.svg';
import send from '../assets/send.svg';
import backArrow from '../assets/backArrow.svg';
import forwardArrow from '../assets/forwardArrow.svg';
import backArrowDisabled from '../assets/backArrowDisabled.svg';
import forwardArrowDisabled from '../assets/forwardArrowDisabled.svg';
import software from '../assets/software.svg';
import mobile from '../assets/mobile.svg';
import website from '../assets/website.svg';
import iphone from '../assets/iphone.svg';
import android from '../assets/android.svg';
import camera from '../assets/camera.svg';
import gps from '../assets/gps.svg';
import upload from '../assets/upload.svg';
import usersIcon from '../assets/users.svg';
import biometrics from '../assets/biometrics.svg';
import bell from '../assets/bell.svg';
import info from '../assets/info.svg';
import customized from '../assets/customized.svg';
import data from '../assets/data.svg';
import users from '../assets/users.svg';
import person from '../assets/person.svg';
import persons from '../assets/persons.svg';
import people from '../assets/people.svg';
import globe from '../assets/globe.svg';

import estimateAnimation from '../animations/estimateAnimation/data.json';


const useStyles = makeStyles(theme => ({
    icon: {
        width: "12em",
        height: "10em",
    },
    estimateButton: {
        ...theme.typography.estimate,
        borderRadius: 50,
        backgroundColor: theme.palette.common.orange,
        height: 50,
        width: 225,
        marginTop: "5em",
        fontSize: "1.25rem",
        "&:hover": {
            backgroundColor: theme.palette.secondary.light,
        },
    },
    message: {
        border: `2px solid ${ theme.palette.common.blue }`,
        marginTop: "3em",
        marginBottom: "2em",
        borderRadius: 5,
    },
    specialText: {
        fontFamily: "Raleway",
        fontWeight: 700,
        fontSize: "2rem",
        color: theme.palette.common.orange,
    },
}));

const defaultQuestions = [
    {
        id: 1,
        title: "Which service are you interested in?",
        active: true,
        options: [
            {
                id: 1,
                title: "Custom Software Development",
                subtitle: null,
                icon: software,
                iconAlt: "three floating screens",
                selected: false,
                cost: 0,
            },
            {
                id: 2,
                title: "iOS/Android App Development",
                subtitle: null,
                icon: mobile,
                iconAlt: "outlines of phones and tablets",
                selected: false,
                cost: 0,
            },
            {
                id: 3,
                title: "Website Development",
                subtitle: null,
                icon: website,
                iconAlt: "computer outlined",
                selected: false,
                cost: 0,
            },
        ],
    },
];

// const softwareQuestions = [
//     {
//         id: 1,
//         title: "Which service are you interested in?",
//         active: false,
//         options: [
//             {
//                 id: 1,
//                 title: "Custom Software Development",
//                 subtitle: null,
//                 icon: software,
//                 iconAlt: "three floating screens",
//                 selected: false,
//                 cost: 0,
//             },
//             {
//                 id: 2,
//                 title: "iOS/Android App Development",
//                 subtitle: null,
//                 icon: mobile,
//                 iconAlt: "outlines of phones and tablets",
//                 selected: false,
//                 cost: 0,
//             },
//             {
//                 id: 3,
//                 title: "Website Development",
//                 subtitle: null,
//                 icon: website,
//                 iconAlt: "computer outline",
//                 selected: false,
//                 cost: 0,
//             },
//         ],
//     },
//     {
//         id: 2,
//         title: "Which platforms do you need supported?",
//         subtitle: "Select all that apply.",
//         options: [
//             {
//                 id: 1,
//                 title: "Web Application",
//                 subtitle: null,
//                 icon: website,
//                 iconAlt: "computer outline",
//                 selected: false,
//                 cost: 1000,
//             },
//             {
//                 id: 2,
//                 title: "iOS Application",
//                 subtitle: null,
//                 icon: iPhone,
//                 iconAlt: "outline of iphone",
//                 selected: false,
//                 cost: 1000,
//             },
//             {
//                 id: 3,
//                 title: "Android Application",
//                 subtitle: null,
//                 icon: android,
//                 iconAlt: "outlines of android phone",
//                 selected: false,
//                 cost: 1000,
//             },
//         ],
//         active: true,
//     },
//     {
//         id: 3,
//         title: "Which features do you expect to use?",
//         subtitle: "Select all that apply.",
//         options: [
//             {
//                 id: 1,
//                 title: "Photo/Video",
//                 subtitle: null,
//                 icon: camera,
//                 iconAlt: "camera outline",
//                 selected: false,
//                 cost: 250,
//             },
//             {
//                 id: 2,
//                 title: "GPS",
//                 subtitle: null,
//                 icon: gps,
//                 iconAlt: "gps pin",
//                 selected: false,
//                 cost: 250,
//             },
//             {
//                 id: 3,
//                 title: "File Transfer",
//                 subtitle: null,
//                 icon: upload,
//                 iconAlt: "outline of cloud with arrow pointing up",
//                 selected: false,
//                 cost: 250,
//             },
//         ],
//         active: false,
//     },
//     {
//         id: 4,
//         title: "Which features do you expect to use?",
//         subtitle: "Select all that apply.",
//         options: [
//             {
//                 id: 1,
//                 title: "Users/Authentication",
//                 subtitle: null,
//                 icon: usersIcon,
//                 iconAlt: "outline of a person with a plus sign",
//                 selected: false,
//                 cost: 250,
//             },
//             {
//                 id: 2,
//                 title: "Biometrics",
//                 subtitle: null,
//                 icon: biometrics,
//                 iconAlt: "fingerprint",
//                 selected: false,
//                 cost: 250,
//             },
//             {
//                 id: 3,
//                 title: "Push Notifications",
//                 subtitle: null,
//                 icon: bell,
//                 iconAlt: "outline of a bell",
//                 selected: false,
//                 cost: 250,
//             },
//         ],
//         active: false,
//     },
//     {
//         id: 5,
//         title: "What type of custom features do you expect to need?",
//         subtitle: "Select one.",
//         options: [
//             {
//                 id: 1,
//                 title: "Low Complexity",
//                 subtitle: "(Informational)",
//                 icon: info,
//                 iconAlt: "'i' inside a circle",
//                 selected: false,
//                 cost: 250,
//             },
//             {
//                 id: 2,
//                 title: "Medium Complexity",
//                 subtitle: "(Interactive, Customizable, Realtime)",
//                 icon: customized,
//                 iconAlt: "two toggle switches",
//                 selected: false,
//                 cost: 500,
//             },
//             {
//                 id: 3,
//                 title: "High Complexity",
//                 subtitle: "(Data Modeling and Computation)",
//                 icon: data,
//                 iconAlt: "outline of line graph",
//                 selected: false,
//                 cost: 1000,
//             },
//         ],
//         active: false,
//     },
//     {
//         id: 6,
//         title: "How many users do you expect?",
//         subtitle: "Select one.",
//         options: [
//             {
//                 id: 1,
//                 title: "0-10",
//                 subtitle: null,
//                 icon: person,
//                 iconAlt: "person outline",
//                 selected: false,
//                 cost: 1,
//             },
//             {
//                 id: 2,
//                 title: "10-100",
//                 subtitle: null,
//                 icon: persons,
//                 iconAlt: "outline of two people",
//                 selected: false,
//                 cost: 1.125,
//             },
//             {
//                 id: 3,
//                 title: "100+",
//                 subtitle: null,
//                 icon: people,
//                 iconAlt: "outline of three people",
//                 selected: false,
//                 cost: 1.25,
//             },
//         ],
//         active: false,
//     },
// ];

// const websiteQuestions = [
//     {
//         id: 1,
//         title: "Which service are you interested in?",
//         active: false,
//         options: [
//             {
//                 id: 1,
//                 title: "Custom Software Development",
//                 subtitle: null,
//                 icon: software,
//                 iconAlt: "three floating screens",
//                 selected: false,
//                 cost: 0,
//             },
//             {
//                 id: 2,
//                 title: "iOS/Android App Development",
//                 subtitle: null,
//                 icon: mobile,
//                 iconAlt: "outlines of phones and tablets",
//                 selected: false,
//                 cost: 0,
//             },
//             {
//                 id: 3,
//                 title: "Website Development",
//                 subtitle: null,
//                 icon: website,
//                 iconAlt: "computer outline",
//                 selected: false,
//                 cost: 0,
//             },
//         ],
//     },
//     {
//         id: 2,
//         title: "Which type of website are you wanting?",
//         subtitle: "Select one.",
//         options: [
//             {
//                 id: 1,
//                 title: "Basic",
//                 subtitle: "(Informational)",
//                 icon: info,
//                 iconAlt: "person outline",
//                 selected: false,
//                 cost: 1000,
//             },
//             {
//                 id: 2,
//                 title: "Interactive",
//                 subtitle: "(Users, API's, Messaging)",
//                 icon: customized,
//                 iconAlt: "outline of two people",
//                 selected: false,
//                 cost: 2000,
//             },
//             {
//                 id: 3,
//                 title: "E-Commerce",
//                 subtitle: "(Sales)",
//                 icon: globe,
//                 iconAlt: "outline of three people",
//                 selected: false,
//                 cost: 2500,
//             },
//         ],
//         active: true,
//     },
// ];

const softwareQuestions = [
    { ...defaultQuestions[0], active: false },
    {
        id: 2,
        title: "Which platforms do you need supported?",
        subtitle: "Select all that apply.",
        options: [
            {
                id: 1,
                title: "Web Application",
                subtitle: null,
                icon: website,
                iconAlt: "computer outline",
                selected: false,
                cost: 100,
            },
            {
                id: 2,
                title: "iOS Application",
                subtitle: null,
                icon: iphone,
                iconAlt: "outline of iphone",
                selected: false,
                cost: 100,
            },
            {
                id: 3,
                title: "Android Application",
                subtitle: null,
                icon: android,
                iconAlt: "outlines of android phone",
                selected: false,
                cost: 100,
            },
        ],
        active: true,
    },
    {
        id: 3,
        title: "Which features do you expect to use?",
        subtitle: "Select all that apply.",
        options: [
            {
                id: 1,
                title: "Photo/Video",
                subtitle: null,
                icon: camera,
                iconAlt: "camera outline",
                selected: false,
                cost: 25,
            },
            {
                id: 2,
                title: "GPS",
                subtitle: null,
                icon: gps,
                iconAlt: "gps pin",
                selected: false,
                cost: 25,
            },
            {
                id: 3,
                title: "File Transfer",
                subtitle: null,
                icon: upload,
                iconAlt: "outline of cloud with arrow pointing up",
                selected: false,
                cost: 25,
            },
        ],
        active: false,
    },
    {
        id: 4,
        title: "Which features do you expect to use?",
        subtitle: "Select all that apply.",
        options: [
            {
                id: 1,
                title: "Users/Authentication",
                subtitle: null,
                icon: users,
                iconAlt: "outline of a person with a plus sign",
                selected: false,
                cost: 25,
            },
            {
                id: 2,
                title: "Biometrics",
                subtitle: null,
                icon: biometrics,
                iconAlt: "fingerprint",
                selected: false,
                cost: 25,
            },
            {
                id: 3,
                title: "Push Notifications",
                subtitle: null,
                icon: bell,
                iconAlt: "outline of a bell",
                selected: false,
                cost: 25,
            },
        ],
        active: false,
    },
    {
        id: 5,
        title: "What type of custom features do you expect to need?",
        subtitle: "Select one.",
        options: [
            {
                id: 1,
                title: "Low Complexity",
                subtitle: "(Informational)",
                icon: info,
                iconAlt: "'i' inside a circle",
                selected: false,
                cost: 25,
            },
            {
                id: 2,
                title: "Medium Complexity",
                subtitle: "(Interactive, Customizable, Realtime)",
                icon: customized,
                iconAlt: "two toggle switches",
                selected: false,
                cost: 50,
            },
            {
                id: 3,
                title: "High Complexity",
                subtitle: "(Data Modeling and Computation)",
                icon: data,
                iconAlt: "outline of line graph",
                selected: false,
                cost: 100,
            },
        ],
        active: false,
    },
    {
        id: 6,
        title: "How many users do you expect?",
        subtitle: "Select one.",
        options: [
            {
                id: 1,
                title: "0-10",
                subtitle: null,
                icon: person,
                iconAlt: "person outline",
                selected: false,
                cost: 1,
            },
            {
                id: 2,
                title: "10-100",
                subtitle: null,
                icon: persons,
                iconAlt: "outline of two people",
                selected: false,
                cost: 1.25,
            },
            {
                id: 3,
                title: "100+",
                subtitle: null,
                icon: people,
                iconAlt: "outline of three people",
                selected: false,
                cost: 1.5,
            },
        ],
        active: false,
    },
];


const websiteQuestions = [
    { ...defaultQuestions[0], active: false },
    {
        id: 2,
        title: "Which type of website are you wanting?",
        subtitle: "Select one.",
        options: [
            {
                id: 1,
                title: "Basic",
                subtitle: "(Informational)",
                icon: info,
                iconAlt: "person outline",
                selected: false,
                cost: 100,
            },
            {
                id: 2,
                title: "Interactive",
                subtitle: "(Users, API's, Messaging)",
                icon: customized,
                iconAlt: "outline of two people",
                selected: false,
                cost: 200,
            },
            {
                id: 3,
                title: "E-Commerce",
                subtitle: "(Sales)",
                icon: globe,
                iconAlt: "outline of three people",
                selected: false,
                cost: 250,
            },
        ],
        active: true,
    },
];

const Estimate = () => {

    const classes = useStyles();
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));
    const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
    const matchesMD = useMediaQuery(theme.breakpoints.down("md"));

    const [questions, setQuestions] = useState(defaultQuestions);
    const [dialogOpen, setDialogOpen] = useState(false);

    const [name, setName] = useState("");

    const [email, setEmail] = useState("");
    const [emailHelper, setEmailHelper] = useState("");

    const [phone, setPhone] = useState("");
    const [phoneHelper, setPhoneHelper] = useState("");

    const [message, setMessage] = useState("");

    const [total, setTotal] = useState(0);

    const [service, setService] = useState("");
    const [platforms, setPlatforms] = useState([]);
    const [features, setFeatures] = useState([]);
    const [customFeatures, setCustomFeatures] = useState("");
    const [users, setUsers] = useState("");
    const [category, setCategory] = useState("");

    const [alert, setAlert] = useState({ open: false, color: "" });
    const [alertMessage, setAlertMesssage] = useState("");

    const [loading, setLoading] = useState(false);

    const defaultOptions = {
        loop: true,
        autoplay: false,
        animationData: estimateAnimation,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    const nextQuestion = () => {
        // if (matchesXS) {
        //     window.scrollTo(0, myRef.current.offsetTop + 75);
        // }
        const newQuestions = cloneDeep(questions);

        const currentlyActive = newQuestions.filter(question => question.active);
        const activeIndex = currentlyActive[0].id - 1;
        const nextIndex = activeIndex + 1;

        newQuestions[activeIndex] = { ...currentlyActive[0], active: false };
        newQuestions[nextIndex] = { ...newQuestions[nextIndex], active: true };

        setQuestions(newQuestions);
    };

    const previousQuestion = () => {
        // if (matchesXS) {
        //     window.scrollTo(0, myRef.current.offsetTop + 75);
        // }
        const newQuestions = cloneDeep(questions);

        const currentlyActive = newQuestions.filter(question => question.active);
        const activeIndex = currentlyActive[0].id - 1;
        const nextIndex = activeIndex - 1;

        newQuestions[activeIndex] = { ...currentlyActive[0], active: false };
        newQuestions[nextIndex] = { ...newQuestions[nextIndex], active: true };

        setQuestions(newQuestions);
    };

    const backButtonDisabled = () => {
        const currentlyActive = questions.filter(question => question.active);
        const activeId = currentlyActive[0].id;

        if (activeId === 1) {
            return true;
        } else {
            return false;
        }
    };

    const forwardButtonDisabled = () => {
        const currentlyActive = questions.filter(question => question.active);
        const activeId = currentlyActive[0].id;

        if (activeId === questions[questions.length - 1].id) {
            return true;
        } else {
            return false;
        }
    };

    const estimateDisabled = () => {
        let disabled = true;

        const emptySelections = questions
            .filter(
                question => question.title !== "Which features do you expect to use?",
            )
            .map(question => question.options.filter(option => option.selected))
            .filter(question => question.length === 0);

        const featureSelected = questions
            .filter(
                question => question.title === "Which features do you expect to use?",
            )
            .map(question => question.options.filter(option => option.selected))
            .filter(selections => selections.length > 0);

        if (questions.length === 2) {
            if (emptySelections.length === 1) {
                return false;
            }
        } else if (questions.length === 1) {
            return true;
        } else if (emptySelections.length === 1 && featureSelected.length > 0) {
            disabled = false;
        }

        return disabled;
    };

    const handleSelect = (id) => {
        const newQuestions = cloneDeep(questions);

        const currentlyActive = newQuestions.filter(question => question.active);
        const activeIndex = currentlyActive[0].id - 1;

        const newSelected = newQuestions[activeIndex].options[id - 1];

        const previousSelected = currentlyActive[0].options.filter(
            option => option.selected,
        );

        switch (currentlyActive[0].subtitle) {
            case "Select one.":
                if (previousSelected[0]) {
                    previousSelected[0].selected = !previousSelected[0].selected;
                }
                newSelected.selected = !newSelected.selected;
                break;
            default:
                newSelected.selected = !newSelected.selected;
                break;
        }

        switch (newSelected.title) {
            case "Custom Software Development":
                // if (matchesXS) {
                //     window.scrollTo(0, myRef.current.offsetTop + 75);
                // }
                setQuestions(softwareQuestions);
                setService(newSelected.title);
                setPlatforms([]);
                setFeatures([]);
                setCustomFeatures("");
                setUsers("");
                setCategory("");
                break;
            case "iOS/Android App Development":
                // if (matchesXS) {
                //     window.scrollTo(0, myRef.current.offsetTop + 75);
                // }
                setQuestions(softwareQuestions);
                setService(newSelected.title);
                setPlatforms([]);
                setFeatures([]);
                setCustomFeatures("");
                setUsers("");
                setCategory("");
                break;
            case "Website Development":
                // if (matchesXS) {
                //     window.scrollTo(0, myRef.current.offsetTop + 75);
                // }
                setQuestions(websiteQuestions);
                setService(newSelected.title);
                setPlatforms([]);
                setFeatures([]);
                setCustomFeatures("");
                setUsers("");
                setCategory("");
                break;
            default:
                setQuestions(newQuestions);
                break;
        }
    };

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

    const getTotal = () => {
        // ReactGA.event({ category: "Estimate", action: "Estimate Checked" });
        let cost = 0;

        const selections = questions
            .map(question => question.options.filter(option => option.selected))
            .filter(question => question.length > 0);

        selections.map(options => options.map(option => (cost += option.cost)));

        if (questions.length > 2) {
            const userCost = questions
                .filter(question => question.title === "How many users do you expect?")
                .map(question =>
                    question.options.filter(option => option.selected),
                )[0][0];

            setUsers(userCost.title);

            cost -= userCost.cost;
            cost *= userCost.cost;
        }

        setTotal(cost);
    };

    const getPlatforms = () => {
        if (questions.length > 2) {
            let newPlatforms = [];

            questions
                .filter(
                    question =>
                        question.title === "Which platforms do you need supported?",
                )
                .map(question => question.options.filter(option => option.selected))[0]
                .map(option => newPlatforms.push(option.title));

            setPlatforms(newPlatforms);
        }
    };

    const getFeatures = () => {
        if (questions.length > 2) {
            let newFeatures = [];

            questions
                .filter(
                    question => question.title === "Which features do you expect to use?",
                )
                .map(question => question.options.filter(option => option.selected))
                .map(option =>
                    option.map(newFeature => newFeatures.push(newFeature.title)),
                );

            setFeatures(newFeatures);
        }
    };

    const getCustomFeatures = () => {
        if (questions.length > 2) {
            const newCustomFeatures = questions
                .filter(
                    question =>
                        question.title ===
                        "What type of custom features do you expect to need?",
                )
                .map(question =>
                    question.options.filter(option => option.selected),
                )[0][0].title;

            setCustomFeatures(newCustomFeatures);
        }
    };

    const getCategory = () => {
        if (questions.length === 2) {
            const newCategory = questions
                .filter(
                    question =>
                        question.title === "Which type of website are you wanting?",
                )[0]
                .options.filter(option => option.selected)[0].title;

            setCategory(newCategory);
        }
    };

    const sendEstimate = () => {
        setLoading(true);
        // ReactGA.event({ category: "Estimate", action: "Estimate Sent" });

        axios
            .get(
                "https://us-central1-arc-development-website.cloudfunctions.net/sendMail",
                {
                    params: {
                        email: email,
                        name: name,
                        phone: phone,
                        message: message,
                        total: total,
                        category: category,
                        service: service,
                        platforms: platforms,
                        features: features,
                        customFeatures: customFeatures,
                        users: users,
                    },
                },
            )
            .then(res => {
                setLoading(false);
                setAlert({ open: true, color: "#4BB543" });
                setAlertMesssage("Message placed successfully!");
                setDialogOpen(false);
            })
            .catch(err => {
                setLoading(false);
                setAlert({ open: true, color: "#FF3232" });
                setAlertMesssage("Something went wrong! Please try again.");
                console.error(err);
            });
    };


    const softwareSelections = (
        <Grid container direction="column">
            <Grid
                item
                container
                alignItems="center"
                style={ { marginBottom: "1.25em" } }
            >
                <Grid item xs={ 2 }>
                    <img src={ check } alt="checkmark" />
                </Grid>
                <Grid item xs={ 10 }>
                    <Typography variant="body1">
                        { `You want ${ service } ` }
                        { platforms.length > 0
                            ? `for ${
                                //if only web application is selected...
                                platforms.indexOf("Web Application") > -1 &&
                                platforms.length === 1
                                    ? //then finish sentence here
                                    "a Web Application."
                                    : //otherwise, if web application and another platform is selected...
                                    platforms.indexOf("Web Application") > -1 &&
                                    platforms.length === 2
                                        ? //then finish the sentence here
                                        `a Web Application and an ${ platforms[1] }.`
                                        : //otherwise, if only one platform is selected which isn't web application...
                                        platforms.length === 1
                                            ? //then finish the sentence here
                                            `an ${ platforms[0] }`
                                            : //otherwise, if other two options are selected...
                                            platforms.length === 2
                                                ? //then finish the sentence here
                                                "an iOS Application and an Android Application."
                                                : //otherwise if all three are selected...
                                                platforms.length === 3
                                                    ? //then finish the sentence here
                                                    "a Web Application, an iOS Application, and an Android Application."
                                                    : null
                            }`
                            : null }
                    </Typography>
                </Grid>
            </Grid>
            <Grid
                item
                container
                alignItems="center"
                style={ { marginBottom: "1.25em" } }
            >
                <Grid item xs={ 2 }>
                    <img src={ check } alt="checkmark" />
                </Grid>
                <Grid item xs={ 10 }>
                    <Typography variant="body1">
                        { "with " }
                        {/* if we have features... */ }
                        { features.length > 0
                            ? //...and there's only 1...
                            features.length === 1
                                ? //then end the sentence here
                                `${ features[0] }.`
                                : //otherwise, if there are two features...
                                features.length === 2
                                    ? //...then end the sentence here
                                    `${ features[0] } and ${ features[1] }.`
                                    : //otherwise, if there are three or more features...
                                    features
                                        //filter out the very last feature...
                                        .filter((feature, index) => index !== features.length - 1)
                                        //and for those features return their name...
                                        .map((feature, index) => (
                                            <span key={ index }>{ `${ feature }, ` }</span>
                                        ))
                            : null }
                        { features.length > 0 &&
                        features.length !== 1 &&
                        features.length !== 2
                            ? //...and then finally add the last feature with 'and' in front of it
                            ` and ${ features[features.length - 1] }.`
                            : null }
                    </Typography>
                </Grid>
            </Grid>
            <Grid item
                  container direction="row" alignItems="center"
            >
                <Grid item xs={ 2 }>
                    <img src={ check } alt="checkmark" />
                </Grid>
                <Grid item xs={ 10 }>
                    <Typography variant="body1">
                        { `The custom features will be of ${ customFeatures.toLowerCase() }, and the project will be used by about ${ users } users.` }
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    );

    const websiteSelections = (
        <Grid container direction="column" style={ { marginTop: "14em" } }>
            <Grid item
                  container direction="row" alignItems="center"
            >
                <Grid item xs={ 2 }>
                    <img src={ check } alt="checkmark" />
                </Grid>
                <Grid item xs={ 10 }>
                    <Typography variant="body1">
                        { `You want ` }
                        { category === "Basic"
                            ? "a Basic Website."
                            : `an ${ category } Website.` }
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    );


    return (
        <Grid container direction="row">

            {/* ==================== Animation Estimate Block ==================== */ }
            <Grid item lg
                  container direction="column" alignItems={ matchesMD ? 'center' : undefined }
            >
                <Grid item
                      style={ { marginTop: '2em', marginLeft: matchesMD ? 0 : '5em' } }
                >
                    <Typography variant="h2" align={ matchesMD ? 'center' : undefined }>
                        Estimate
                    </Typography>
                </Grid>

                <Grid item
                      style={ { marginRight: matchesMD ? 0 : '10em', maxWidth: '50em', marginTop: '7.5em' } }
                >
                    <Lottie options={ defaultOptions }
                            height="100%" width="100%"
                            isStopped={ true }
                    />
                </Grid>

            </Grid>


            {/* ==================== Questions Block ==================== */ }
            <Grid item lg
                  container direction="column" alignItems="center"
                  style={ { marginRight: matchesMD ? 0 : '2em', marginBottom: '25em' } }
            >

                {
                    questions
                        .filter(question => question.active)
                        .map((question, index) => (

                            <Fragment key={ index }>

                                {/* ---------------- Question Section ---------------- */ }
                                <Grid item>
                                    <Typography variant="h2" gutterBottom align="center"
                                                style={ {
                                                    fontSize: '2.25rem',
                                                    fontWeight: 500,
                                                    marginBottom: '2.5em',
                                                    marginTop: '5em',
                                                    lineHeight: 1.25,
                                                    marginLeft: matchesSM ? '1em' : 0,
                                                    marginRight: matchesSM ? '1em' : 0,
                                                } }
                                    >
                                        { question.title }
                                    </Typography>

                                    <Typography variant="body1" align="center" gutterBottom
                                                style={ { marginBottom: '2.5em' } }
                                    >
                                        {/* stubbing for more space */ }
                                        { question.subtitle }
                                    </Typography>
                                </Grid>

                                {/* ---------------- Options Section ---------------- */ }
                                <Grid item
                                      container direction="row"
                                >
                                    {
                                        question.options.map((option, index) => (

                                            <Grid item md
                                                  container direction="column"
                                                  key={ index }
                                                  component={ Button }
                                                  onClick={ () => handleSelect(option.id) }
                                                  style={ {
                                                      display: 'grid',
                                                      textTransform: 'none',
                                                      borderRadius: 0,
                                                      marginBottom: matchesSM ? '1.5em' : 0,
                                                      backgroundColor: option.selected ? theme.palette.common.orange : null,
                                                  } }
                                            >
                                                <Grid item
                                                      style={ { maxWidth: '14em' } }
                                                >
                                                    <Typography variant="h6" align="center"
                                                                style={ { marginBottom: '1em' } }
                                                    >
                                                        { option.title }
                                                    </Typography>
                                                    <Typography variant="caption" align="center">
                                                        {/* stubbing for more space */ }
                                                        { option.subtitle }
                                                    </Typography>
                                                </Grid>
                                                <Grid item>
                                                    <img src={ option.icon } alt={ option.iconAlt }
                                                         className={ classes.icon }
                                                    />
                                                </Grid>
                                            </Grid>

                                        ))
                                    }
                                </Grid>
                            </Fragment>
                        ))
                }

                {/* ---------------- Arrows Section ---------------- */ }
                <Grid item
                      container direction="row" justify="space-between"
                      style={ { width: '18em', marginTop: '3em' } }
                >

                    <Grid item>
                        <IconButton disabled={ backButtonDisabled() }
                                    onClick={ previousQuestion }
                        >
                            <img src={ backButtonDisabled() ? backArrowDisabled : backArrow }
                                 alt="previous question"
                            />
                        </IconButton>
                    </Grid>

                    <Grid item>
                        <IconButton disabled={ forwardButtonDisabled() }
                                    onClick={ nextQuestion }
                        >
                            <img src={ forwardButtonDisabled() ? forwardArrowDisabled : forwardArrow }
                                 alt="next question"
                            />
                        </IconButton>
                    </Grid>

                </Grid>

                {/* ---------------- Estimate Button Section ---------------- */ }
                <Grid item>
                    <Button variant="outlined"
                            onClick={ () => {
                                setDialogOpen(true);
                                getTotal();
                                getPlatforms();
                                getFeatures();
                                getCustomFeatures();
                                getCategory();
                            } }
                            disabled={ estimateDisabled() }
                            className={ classes.estimateButton }
                    >
                        Get Estimate
                    </Button>
                </Grid>

            </Grid>

            {/* =========================== DIALOG Block =============================== */ }
            <Dialog
                open={ dialogOpen }
                onClose={ () => setDialogOpen(false) }
                fullWidth
                maxWidth="lg"
                fullScreen={ matchesSM }
                style={ { zIndex: 1302 } }
            >
                {/* ----------------- Dialog Title Section ------------------ */ }
                <Grid container direction="row" justify="center">
                    <Grid item style={ { marginTop: '1em', marginBottom: '1em' } }>
                        <Typography variant="h2" align="center">
                            Estimate
                        </Typography>
                    </Grid>
                </Grid>

                <DialogContent>
                    <Grid container direction={ matchesSM ? "column" : "row" }
                          justify="space-around" alignItems={ matchesSM ? "center" : undefined }
                    >

                        {/* ----------------------- Dialog Form Sections ----------------------- */ }
                        <Grid item md={ 7 }
                              container direction="column"
                              style={ { maxWidth: '20em' } }
                        >
                            {/* ------------- Name, Email, Phone Input Form Section ------------ */ }
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

                            {/* ------------------- Message Input Section ----------------------- */ }
                            <Grid item style={ { maxWidth: '20em' } }>
                                <TextField id="message" multiline rows={ 10 } fullWidth
                                           value={ message } onChange={ (e) => setMessage(e.target.value) }
                                           InputProps={ { disableUnderline: true } }
                                           placeholder="Tell us more about your project"
                                           className={ classes.message }
                                           style={ { maxWidth: '20em' } }
                                />
                            </Grid>

                            {/* ----------------------- Additional Content Section ----------------------- */ }
                            <Grid item>
                                <Typography variant="body1" paragraph align={ matchesSM ? 'center' : undefined }
                                            style={ { lineHeight: 1.25 } }
                                >
                                    We can create this digital solution for an estimated
                                    <span className={ classes.specialText }>
                                    ${ total.toFixed(2) }
                                </span>
                                </Typography>
                                <Typography variant="body1" paragraph align={ matchesSM ? 'center' : undefined }>
                                    Fill out your name, number, and email, place your request, and
                                    we’ll get back to you with details moving forward and a final
                                    price.
                                </Typography>
                            </Grid>

                        </Grid>

                        {/* ----------------------- Selection Review Sections ----------------------- */ }
                        <Grid item md={ 5 }
                              container direction="column" alignItems={ matchesSM ? 'center' : undefined }
                              style={ { maxWidth: '30em' } }
                        >
                            <Hidden smDown>
                                <Grid item>

                                    { questions.length > 2 ? softwareSelections : websiteSelections }

                                </Grid>
                            </Hidden>

                            {/* ----------------------- Dialog Button Sections ----------------------- */ }
                            <Grid item>
                                <Button variant="contained"
                                        onClick={ sendEstimate }
                                        className={ classes.estimateButton }
                                        disabled={ name.length === 0 || email.length === 0 || phone.length === 0 ||
                                        message.length === 0 || emailHelper.length !== 0 || phoneHelper.length !== 0
                                        }
                                >
                                    { loading ? (
                                        <CircularProgress />
                                    ) : (
                                        <Fragment>
                                            Place Request
                                            <img
                                                src={ send }
                                                alt="paper airplane"
                                                style={ { marginLeft: "0.5em" } }
                                            />
                                        </Fragment>
                                    ) }
                                    <img src={ send } alt="paper airplane"
                                         style={ { marginLeft: '0.5em' } }
                                    />
                                </Button>
                            </Grid>

                            <Hidden mdUp>
                                <Grid item style={ { marginBottom: matchesSM ? '5em' : 0 } }>
                                    <Button color="primary"
                                            onClick={ () => setDialogOpen(false) }
                                            style={ { fontWeight: 300 } }
                                    >
                                        Cancel
                                    </Button>
                                </Grid>
                            </Hidden>

                        </Grid>


                    </Grid>
                </DialogContent>

            </Dialog>

            {/* ======================== Snackbar Block ======================== */ }
            <Snackbar
                open={ alert.open }
                ContentProps={ { style: { backgroundColor: alert.color } } }
                anchorOrigin={ { vertical: "top", horizontal: "center" } }
                message={ alertMessage }
                autoHideDuration={ 4000 }
                onClose={ () => setAlert(false) }
            />

        </Grid>
    );
};


export default Estimate;







