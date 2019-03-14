import React, { Component } from 'react';
import ChampMainContent from './ChampMainContent';
import { connect } from 'react-redux';
import { fetchChampList, addChampToList } from '../actions';
import { DimmerDimmable } from 'semantic-ui-react';
import TestComponent from './TestComponent';

class ChampMainContentContainer extends Component{
    constructor(props){
        super(props)
        this.testKontejner = React.createRef();
    }
    
kontejner = () =>
{
    console.log("broj Kontejnera " ,this.testKontejner)
}
novaFunkcija(){
    // const { TournamentCode } = this.props.champsMiddleBoxList;
    // console.log('PROPS champsMiddleBoxList', this.props.champsMiddleBoxList);
    // if (!TournamentCode) {
    //    return null;
    // }
    return this.props.champsMiddleBoxList.map(name => {
        // console.log('PROPS inside map', name.TournamentCode);
        return (
            <div ref={this.testKontejner} onClick={this.kontejner}>
           <TestComponent  objekat={name}/>
           </div>
        )
   }).reverse();
}
    render ()         
    {
        return(            
            <div>       
               {this.novaFunkcija()} 
            </div>
        )
    }
}
const mapStateToProps = ({ champsMiddleBoxList }) => ({ champsMiddleBoxList })
export default connect(mapStateToProps, { fetchChampList, addChampToList })(ChampMainContentContainer);
