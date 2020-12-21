import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './ui/Theme';
import Header from './ui/Header';
import Footer from './ui/Footer';
import LandingPage from './LandingPage';


const App = () => {

    const [value, setValue] = useState(0);
    const [selectedIndex, setSelectedIndex] = useState(0);

    return (
        <ThemeProvider theme={ theme }>
            <BrowserRouter>
                <Header
                    value={ value }
                    setValue={ setValue }
                    selectedIndex={ selectedIndex }
                    setSelectedIndex={ setSelectedIndex }
                />
                <Switch>
                    <Route path="/"
                           render={ (props) =>
                               <LandingPage
                                   { ...props }
                                   setValue={ setValue }
                                   setSelectedIndex={ setSelectedIndex }
                               /> }
                           exact
                    />
                    <Route path="/services"
                           component={ () => <div>Service</div> }
                           exact
                    />
                    <Route path="/customsoftware"
                           component={ () => <div>customsoftware</div> }
                           exact
                    />
                    <Route path="/mobileapps"
                           component={ () => <div>mobileapps</div> }
                           exact
                    />
                    <Route path="/websites"
                           component={ () => <div>websites</div> }
                           exact
                    />
                    <Route path="/revolution"
                           component={ () => <div>revolution</div> }
                           exact
                    />
                    <Route path="/about"
                           component={ () => <div>about</div> }
                           exact
                    />
                    <Route path="/contact"
                           component={ () => <div>contact</div> }
                           exact
                    />
                    <Route path="/estimate"
                           component={ () => <div>estimate</div> }
                           exact
                    />
                </Switch>
                <Footer
                    setValue={ setValue }
                    setSelectedIndex={ setSelectedIndex }
                />
            </BrowserRouter>
        </ThemeProvider>
    )
        ;
};

export default App;
