import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchChamps, fetchChampList, addChampToList } from '../actions';


class ChampName extends Component {    
    constructor(props) {
        super(props)
        
        this.state = {
          values: [],          
          isFocused: Boolean,
          isOpen: false,         
          color: '' 
        }
    }

    onFocus = () => {
        this.setState({
            isFocused: !this.state.isFocused,
            color: this.state.isFocused ? 'red' : 'white'
        })
    }
    
    azurirajContent = (e) =>
    {
        e.preventDefault();        
        this.onFocus();
        const { champs } = this.props
        const { sportId } = this.props        
        this.props.fetchChampList(champs.ChampId, sportId);      
        this.props.addChampToList(champs.ChampId, sportId)
        console.debug(this.props.champsMiddleBoxList);
        this.props.champsMiddleBoxList.map((objekat) => {
            const { TournamentCode } = objekat            
                console.log(TournamentCode);
            
        })
        

        // console.log(`Sampionat: ${champs.ChampName},
        //              Id Sampionata: ${champs.ChampId}, 
        //              Id sporta: ${sportId}`)
    }
    
    render() {       
        const { champs } = this.props
       
     return ( 
           <div onClick={this.azurirajContent} className="ui middle aligned selection list" style={{ background: this.state.color, cursor: 'pointer'}}>
                {champs.ChampName}             
            </div>
                      
            
         )
   }

}

 
const mapStateToProps = ({ champsContent, champsMiddleBoxList }) => ({ champsContent, champsMiddleBoxList })
export default connect(mapStateToProps, { fetchChampList, addChampToList })(ChampName);
