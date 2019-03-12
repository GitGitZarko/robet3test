import React, { Component } from 'react';
import ChampMainContent from './ChampMainContent';
import { connect } from 'react-redux';
import { fetchChampList, addChampToList } from '../actions';
import { DimmerDimmable } from 'semantic-ui-react';
import TestComponent from './TestComponent';

class ChampMainContentContainer extends Component{

novaFunkcija(){
    // const { TournamentCode } = this.props.champsMiddleBoxList;
    // console.log('PROPS champsMiddleBoxList', this.props.champsMiddleBoxList);
    // if (!TournamentCode) {
    //    return null;
    // }
    return this.props.champsMiddleBoxList.map(name => {
        // console.log('PROPS inside map', name.TournamentCode);
        return (
           <TestComponent objekat={name}/>
        )
   })

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
