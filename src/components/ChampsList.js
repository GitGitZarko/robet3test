import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchChamps } from '../actions';
import ChampsCategories from './ChampsCategories'

class ChampsList extends Component {
    state = {
        displayChildren: '',
        valueTriger: Boolean,
        target: null
    }
    componentDidMount(){
        this.props.fetchChamps();      
    }

    uradiNesto(event, i){
            event.preventDefault();            
            this.setState({
                valueTriger: !this.state.valueTriger,
                displayChildren: this.state.valueTriger ? 'block' : 'none',
                target: i
            })
    }
    
    renderSportList(){
        const { champs } = this.props              
        return champs.map((sport, i ) => {
            return(
                <li >
                <div className="item">                    
                    <div className="content">
                        <div className="header" onClick={(e) => this.uradiNesto(e, sport.SportId)} ><i className="italy flag"></i>  {sport.SportName}</div>
            { sport.Categories.map((cat, k) => <div> {sport.SportId == this.state.target ?                                 
                                <ChampsCategories 
                                categorie={cat} 
                                key={k} 
                                sportId={sport.SportId} 
                                displayChildren={this.state.displayChildren}/> 
                                : null
                            }
                                </div>
                                )}                     
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