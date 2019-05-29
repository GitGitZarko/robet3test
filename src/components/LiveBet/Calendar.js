import React, { Component } from 'react';
import { connect } from 'react-redux';
//import '../public/css/Sports.css';
import { fetchLiveBetGames } from '../../actions';

class Calendar extends Component {
    constructor(props) {
        super(props)   
    }

       

    render(){    

        return (
            <div >        
                    Render! CALENDAR COMPONENT
            </div>       
    
            
        )
    }
    
}

const mapStateToProps = ({ liveBetGames }) => ({ liveBetGames })
export default connect(mapStateToProps,{ fetchLiveBetGames })(Calendar);