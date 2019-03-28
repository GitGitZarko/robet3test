import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchChamps, fetchChampList, addChampToList, removeChampFromList } from '../actions';


class ChampName extends Component {    
    constructor(props) {
        super(props)
        
        this.state = {
          values: [],          
          isFocused: Boolean,
          isOpen: false,                  
        }

        
    }
    
    onFocus = () => {
        const { champs } = this.props
        let listaTournamentCode = this.props.champsMiddleBoxList.map((objekat) => objekat.TournamentCode)
        return listaTournamentCode
    }

    azurirajContent = (e) =>
    {
        e.preventDefault();  
        
        const { champs } = this.props
        const { sportId } = this.props   
        // const { TournamentCode } = this.props.champsMiddleBoxList        
        
        // console.log("LISTICA::::: JEDNAKO JE", listaTournamentCode, champs.ChampId)
        if(this.onFocus().some(a => a == champs.ChampId)){ 
            console.log('tu je ima ga')                 
            this.props.removeChampFromList(champs.ChampId, sportId)
            this.setState({isOpen: false})              
        }else{                    
            console.log('neje tu nema ga')                 
            this.props.addChampToList(champs.ChampId, sportId)
            this.setState({isOpen: true})                
        }
        //listaTournamentCode.includes(champs.ChampId) ? console.log('true') : this.props.addChampToList(champs.ChampId, sportId)

        // this.props.removeChampFromList(champs.ChampId, sportId) : this.props.addChampToList(champs.ChampId, sportId)
//    
        // if(this.state.isFocused == false){
        //     this.props.removeChampFromList(champs.ChampId, sportId)
        // }else{
        //     this.props.addChampToList(champs.ChampId, sportId)
        // }

        //this.props.fetchChampList(champs.ChampId, sportId);      
        
        
        // this.props.champsMiddleBoxList.map((objekat) => objekat.TournamentCode == champs.ChampId ? this.setState({ color: 'red'}) : this.setState({ color: 'blue'}) )
        

        // console.log(`Sampionat: ${champs.ChampName},
        //              Id Sampionata: ${champs.ChampId}, 
        //              Id sporta: ${sportId}`)
    }
    removeBox = (e) => {
        e.preventDefault(); 
        const { champs } = this.props
        const { sportId } = this.props    
         //this.props.removeChampFromList(champs.ChampId, sportId);
        // console.log("posle delete"+this.props.champsMiddleBoxList)
    }
    
    render() {       
        const { champs } = this.props
      
       
     return ( 
                  
           <div onClick={this.azurirajContent} className="ui middle aligned selection list" style={{ background: this.onFocus().some(a => a == champs.ChampId) ? 'red' : 'white', cursor: 'pointer'}}>
                {champs.ChampName}                
            </div>
            
          
            
                      
            
         )
   }

}

 
const mapStateToProps = ({ champsContent, champsMiddleBoxList }) => ({ champsContent, champsMiddleBoxList })
export default connect(mapStateToProps, { fetchChampList, addChampToList, removeChampFromList })(ChampName);
