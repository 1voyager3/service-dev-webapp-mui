import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { AppBar } from '@material-ui/core';
import { Toolbar } from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { SwipeableDrawer } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


import logo from '../../assets/logo.svg';


function ElevationScroll(props) {
    const { children } = props;

    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}

const useStyle = makeStyles(theme => ({
    toolBarMargin: {
        ...theme.mixins.toolbar,
        marginBottom: '3em',
        [theme.breakpoints.down('md')]: {
            marginBottom: '2em',
        },
        [theme.breakpoints.down('xs')]: {
            marginBottom: '1.25em',
        },
    },
    logo: {
        height: '8em',
        [theme.breakpoints.down('md')]: {
            height: '7em',
        },
        [theme.breakpoints.down('xs')]: {
            height: '5.5em',
        },
    },
    logoContainer: {
        padding: 0,
        "&:hover": {
            backgroundColor: 'transparent',
        },
    },
    tabContainer: {
        marginLeft: 'auto',
    },
    tab: {
        ...theme.typography.tab,
        minWidth: 10,
        marginLeft: '25px',
    },
    button: {
        ...theme.typography.estimate,
        borderRadius: '50px',
        marginLeft: '50px',
        marginRight: '25px',
        height: '55px',
    },
    menu: {
        backgroundColor: theme.palette.common.blue,
        color: 'white',
        borderRadius: '0px',
    },
    menuItem: {
        ...theme.typography.tab,
        opacity: 0.7,
        "&:hover": {
            opacity: 1,
        },
    },
    drawerContainer: {
        marginLeft: 'auto',
        "&:hover": {
            backgroundColor: 'transparent',
        },
    },
    drawerIcon: {
        height: '50px',
        width: '50px',
    },
    drawer: {
        backgroundColor: theme.palette.common.blue,
    },
    drawerItem: {
        ...theme.typography.tab,
        color: 'white',
        opacity: 0.7,
    },
    drawerItemSelected: {
        '& .MuiListItemText-root': {
            opacity: 1,
        },
    },
    drawerItemEstimate: {
        backgroundColor: theme.palette.common.orange,
    },
    appBar: {
        zIndex: theme.zIndex.modal + 1,
    },
}));

const Header = (props) => {

    const classes = useStyle();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));

    const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

    const [value, setValue] = useState(0);
    const [anchorEl, setAnchorEl] = useState(null);
    const [openMenu, setOpenMenu] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [openDrawer, setOpenDrawer] = useState(false);

    const handleChange = (e, newValue) => {
        setValue(newValue);
    };

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
        setOpenMenu(true);
    };

    const handleMenuItemClick = (e, i) => {
        setAnchorEl(null);
        setOpenMenu(false);
        setSelectedIndex(i);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setOpenMenu(false);
    };

    const menuOptions = [
        { name: 'Services', link: '/services', activeIndex: 1, selectedIndex: 0 },
        { name: 'Custom Software Development', link: '/customsoftware', activeIndex: 1, selectedIndex: 1 },
        { name: 'Mobile App Development', link: '/mobileapps', activeIndex: 1, selectedIndex: 2 },
        { name: 'Website Development', link: '/websites', activeIndex: 1, selectedIndex: 3 },
    ];

    const routes = [
        { name: 'Home', link: '/', activeIndex: 0 },
        {
            name: 'Services',
            link: 'services',
            activeIndex: 1,
            ariaOwns: anchorEl ? "simple-menu" : undefined,
            ariaPopup: anchorEl ? "true" : undefined,
            mouseOver: e => handleClick(e),
        },
        { name: 'Revolution', link: '/revolution', activeIndex: 2 },
        { name: 'About', link: '/about', activeIndex: 3 },
        { name: 'Contact', link: '/contact', activeIndex: 4 },
        // { name: 'Free Estimate', link: '/estimate', activeIndex: 5 },
    ];

    useEffect(() => {

        [...menuOptions, ...routes].forEach(route => {
            switch (window.location.pathname) {
                case `${ route.link }`:
                    if (value !== route.activeIndex) {
                        setValue(route.activeIndex);
                        if (route.selectedIndex && route.selectedIndex !== selectedIndex) {
                            setSelectedIndex(route.selectedIndex);
                        }
                    }
                    break;
                default:
                    break;
            }
        });

    }, [value, selectedIndex, menuOptions, routes]);


    const tabs = (
        <>
            <Tabs
                value={ value }
                onChange={ handleChange }
                className={ classes.tabContainer }
                indicatorColor="primary"
            >
                {
                    routes.map((route, index) => (
                        <Tab
                            key={ `${ route }${ index }` }
                            label={ route.name }
                            className={ classes.tab }
                            component={ Link }
                            to={ route.link }
                            aria-owns={ route.ariaOwns }
                            aria-haspopup={ route.ariaPopup }
                            onMouseOver={ route.mouseOver }
                        />
                    ))

                }
            </Tabs >
            <Button variant="contained" color="secondary" className={ classes.button } >
                Free Estimate
            </Button >
            <Menu
                id="simple-menu"
                anchorEl={ anchorEl }
                open={ openMenu }
                onClose={ handleClose }
                classes={ { paper: classes.menu } }
                MenuListProps={ { onMouseLeave: handleClose } }
                elevation={ 0 }
                keepMounted
                style={{zIndex: 1302}}
            >
                {
                    menuOptions.map((option, index) => (
                            <MenuItem
                                key={ `${option}${index}` }
                                component={ Link }
                                to={ option.link }
                                classes={ { root: classes.menuItem } }
                                onClick={ (e) => {
                                    handleMenuItemClick(e, index);
                                    setValue(1);
                                    handleClose();
                                } }
                                selected={ index === selectedIndex && value === 1 }
                            >
                                { option.name }
                            </MenuItem >
                        ),
                    )
                }
            </Menu >
        </>
    );

    const drawer = (
        <>
            <SwipeableDrawer
                disableBackdropTransition={ !iOS }
                disableDiscovery={ iOS }
                open={ openDrawer }
                onClose={ () => setOpenDrawer(false) }
                onOpen={ () => setOpenDrawer(true) }
                classes={ { paper: classes.drawer } }
            >

                <div className={ classes.toolBarMargin } />

                <List disablePadding >

                    {
                        routes.map((route, index) => (
                            <ListItem
                                key={ `${ route }${ index }` }
                                onClick={ () => {
                                    setOpenDrawer(false);
                                    setValue(route.activeIndex);
                                } }
                                selected={ value === route.activeIndex }
                                divider
                                button
                                component={ Link }
                                to={ route.link }
                                classes={ { selected: classes.drawerItemSelected } }
                            >
                                <ListItemText
                                    disableTypography
                                    className={ classes.drawerItem }
                                >
                                    { route.name }
                                </ListItemText >
                            </ListItem >
                        ))
                    }

                    <ListItem
                        onClick={ () => {
                            setOpenDrawer(false);
                            setValue(5);
                        } }
                        selected={ value === 5 }
                        divider
                        button
                        component={ Link }
                        to='/estimate'
                        classes={ { root: classes.drawerItemEstimate, selected: classes.drawerItemSelected } }
                    >
                        <ListItemText
                            className={ classes.drawerItem }
                            disableTypography
                        >
                            Free Estimate
                        </ListItemText >
                    </ListItem >
                </List >
            </SwipeableDrawer >
            <IconButton
                onClick={ () => setOpenDrawer(!openDrawer) }
                disableRipple
                className={ classes.drawerContainer }
            >
                <MenuIcon
                    className={ classes.drawerIcon }
                />
            </IconButton >
        </>
    );

    return (
        <>
            <ElevationScroll >
                <AppBar position="fixed" className={ classes.appBar } >
                    <Toolbar disableGutters >
                        <Button
                            component={ Link }
                            to="/"
                            className={ classes.logoContainer }
                            onClick={ () => setValue(0) }
                            disableRipple
                        >
                            <img src={ logo } alt="company logo" className={ classes.logo } />
                        </Button >
                        {
                            matches ? drawer : tabs
                        }
                    </Toolbar >
                </AppBar >
            </ElevationScroll >
            <div className={ classes.toolBarMargin } />
        </>
    );
};


export default Header;