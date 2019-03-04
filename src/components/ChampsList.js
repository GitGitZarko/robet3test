import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchChamps } from '../actions';
import ChampsCategories from './ChampsCategories'

class ChampsList extends Component {
    componentDidMount(){
        this.props.fetchChamps();      
    }
    
    renderSportList(){
        const { champs } = this.props              
        return champs.map((sport, i ) => {
            return(
                <li>
                <div className="item">                    
                    <div className="content">
                        <div className="header"><i className="italy flag"></i>  {sport.SportName}</div>
            { sport.Categories.map((cat, k) => <div><ChampsCategories categorie={cat} key={k} sportId={sport.SportId}/> </div> )}                     
            </div>
                </div>
            </li>
            )
        })
    }
    render() {        
        console.log(this.props.champs)
     return (
            <div className="ui relaxed divided list">     
            <div className="ui middle aligned selection list">
            {this.renderSportList()}
            </div>           
                      
            </div>
         )
   }
 }
 
 const mapStateToProps = ({ champs }) => ({ champs })
 export default connect(mapStateToProps, {fetchChamps})(ChampsList);