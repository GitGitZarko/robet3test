import React from 'react';
import '../public/css/Sports.css';

import { BrowserRouter, Route } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import LoginHeader from './Login/LoginHeader';
import Sport from './Sport';
import LiveBet from './LiveBet/LiveBet';
import Casino from './Casino/Casino';
import Poker from './Poker';
import Home from './Home/Home';
import CmsPage from './CmsPage';
import { useCookies } from 'react-cookie';


if (localStorage.getItem("OddType") === null)
    localStorage.setItem('OddType', 0);
if (!localStorage.getItem("userToken"))
    localStorage.setItem('userToken', null);

const App = () => {
    const [cookies, setCookie] = useCookies(['userToken']);
    setCookie('userToken', null , { path: '/' });
    return (
        <div>
            <BrowserRouter>
                <div>
                    <LoginHeader />
                    <Header />
                    <Route path="/" exact component={Home}></Route>
                    <Route path="/Sport" exact component={Sport}></Route>
                    <Route path="/LiveBet" exact component={LiveBet}></Route>
                    <Route path="/Casino" exact component={Casino}></Route>
                    <Route path="/Poker" exact component={Poker}></Route>
                    <Route path="/:CmsPage" component={CmsPage}></Route>
                    <Footer />
                </div>
            </BrowserRouter>
        </div>


    )
}

export default App;