import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchChamps, fetchChampList, addChampToList, removeChampFromList, sportViewChamps} from '../actions';


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
        this.props.sportViewChamps(0);

        const { champs } = this.props
        const { sportId } = this.props  
        const { antepost } = this.props
        const { isFavorite } = this.props

        console.log("KAKO KO", this.props.antepost, "Champs: ", champs)
        // const { TournamentCode } = this.props.champsMiddleBoxList        
        const champIdChangable = isFavorite ? champs.TournamentSourceID : champs.ChampId;
        
        if(this.onFocus().some(a => a == champIdChangable)){ 
            console.log('tu je ima ga')                 
            this.props.removeChampFromList(champIdChangable, sportId)
            this.setState({isOpen: false})              
        }else{                    
            console.log('neje tu nema ga')                 
            this.props.addChampToList(champIdChangable, sportId, antepost)
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
        const { isFavorite } = this.props
       
     return (                   
           <div onClick={this.azurirajContent} className={isFavorite ? '' : 'ui middle aligned selection list'} style={{ background: this.onFocus().some(a => a == (isFavorite ? champs.TournamentSourceID : champs.ChampId)) ? 'red' : 'white', cursor: 'pointer'}}>
                {isFavorite && <i className="serbia flag"></i>}{isFavorite ? champs.TrounamentDescription : champs.ChampName}                
            </div>
         )
   }

}

 
const mapStateToProps = ({ champsContent, champsMiddleBoxList, outright }) => ({ champsContent, champsMiddleBoxList, outright })
export default connect(mapStateToProps, { fetchChampList, addChampToList, removeChampFromList, sportViewChamps })(ChampName);
