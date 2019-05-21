import React from 'react';
//import '../public/css/Sports.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './Header';
import Sport from './Sport';
import LiveBet from './LiveBet';

const App = () => {
    return (
        <div >            
            <BrowserRouter>
            <div>
                <Header/>
                <Route path="/" exact component={Sport}></Route>
                <Route path="/LiveBet" exact component={LiveBet}></Route>
            </div>
            </BrowserRouter>
        </div>
      
        
    )
}

export default App;