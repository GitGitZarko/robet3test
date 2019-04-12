import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchChamps, fetchInEvidence, fetchStructureOutright } from '../actions';
import ChampsCategories from './ChampsCategories'

class ChampsList extends Component {
    state = {
        displayChildren: '',
        valueTriger: Boolean,
        target: null,
        anteDisplay: '',
        valueAnte: Boolean,
        targetAnte: null
    }
    componentDidMount(){
        this.props.fetchChamps();  
        this.props.fetchInEvidence();   
        this.props.fetchStructureOutright(); 
    }

    uradiNesto(event, i){
            event.preventDefault();            
            this.setState({
                valueTriger: !this.state.valueTriger,
                displayChildren: this.state.valueTriger ? 'block' : 'none',
                target: i
            })
    }
    uradiNestoAnte(event, i){
        event.preventDefault();            
        this.setState({
            valueAnte: !this.state.valueAnte,
            anteDisplay: this.state.valueAnte ? 'block' : 'none',
            targetAnte: i
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
    renderEvidenceList(){
        const { inEvidence } = this.props              
        return inEvidence.map((sport, i ) => {            
            return(
                <li>
                <div className="item">                    
                    <div className="content">
                        <div className="header"><i className="serbia flag"></i>  {sport.TrounamentDescription}</div>
                     
            </div>
                </div>
            </li>
            )
        })
    }
    renderAntepostList(){
        const { outright } = this.props              
        return outright.map((sport, i ) => {            
            return(
                <li >
                <div className="item">                    
                    <div className="content">
                        <div className="header" onClick={(e) => this.uradiNestoAnte(e, sport.SportId)} ><i className="italy flag"></i>  {sport.SportName}</div>
            { sport.Categories.map((cat, k) => <div> {sport.SportId == this.state.targetAnte ?                                 
                                <ChampsCategories 
                                categorie={cat} 
                                key={k} 
                                sportId={sport.SportId} 
                                displayChildren={this.state.anteDisplay}/> 
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
        console.log("Evidencija: ", this.props.inEvidence)
        console.log("OUTRIGHT: ", this.props.outright)
     return (
         <div>
             <div className="ui relaxed divided list">     
                    <div className="ui middle aligned selection list" style={{border: '1px dotted black'}}>
                    <h5>CAMPIONATI PREFERITI </h5>
                    {this.renderEvidenceList()}
                    </div>                       
                </div>

                <div className="ui relaxed divided list">     
                    <div className="ui middle aligned selection list" style={{border: '1px dotted black'}}>
                    <h5>SPORT DISPONIBILI</h5>
                    {this.renderSportList()}
                    </div>                              
                </div>

                
                    <div className="ui relaxed divided list">     
                    <div className="ui middle aligned selection list" style={{border: '1px dotted black'}}>
                    <h5>ANTEPOST</h5>
                    {this.renderAntepostList()}
                </div>       
                </div>              
        </div>
         )
   }
 }
 
 const mapStateToProps = ({ champs, inEvidence, outright }) => ({ champs, inEvidence, outright })
 export default connect(mapStateToProps, {fetchChamps, fetchInEvidence, fetchStructureOutright})(ChampsList);