import React, { Component } from 'react';
import { connect } from 'react-redux';
// import '../public/css/Sports.css';
import { fetchChampList, addChampToList, removeChampFromList, sportViewChamps, removeSingleMatch } from '../actions';


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
        let listaTournamentCode = this.props.champsMiddleBoxList.map((objekat) => objekat.TournamentCode)
        return listaTournamentCode
    }

    azurirajContent = (e) => {
        e.preventDefault();
        this.props.sportViewChamps(0);

        const { champs } = this.props
        const { sportId } = this.props
        const { antepost } = this.props
        const { isFavorite } = this.props
        const { players } = this.props

        const champIdChangable = isFavorite ? champs.TournamentSourceID : champs.ChampId;

        if (this.onFocus().some(a => a == champIdChangable)) {
            this.props.removeChampFromList(champIdChangable, sportId)
            this.setState({ isOpen: false })
        } else {
            this.props.addChampToList(champIdChangable, sportId, antepost, players)
            this.setState({ isOpen: true })
        }


        if (this.props.singleMatch) this.props.removeSingleMatch()

    }
    removeBox = (e) => {
        e.preventDefault();
        const { champs } = this.props
        const { sportId } = this.props
    }

    render() {
        const { champs } = this.props
        const { isFavorite } = this.props
        const { inEvidenceIdCountry } = this.props
        
        return (
            <div className={this.props.displayChild}>
            <div onClick={this.azurirajContent} className={isFavorite ? '' : 'ui middle aligned selection list'} style={{ color: this.onFocus().some(a => a == (isFavorite ? champs.TournamentSourceID : champs.ChampId)) ? '#1FE8AF' : '', cursor: 'pointer' }}>
                {isFavorite && <img  style={{margin: '0px 10px 0px 0px'}} className="ui middle aligned mini image"  src={`/images/codedFlags/${inEvidenceIdCountry}.png`}/>}{isFavorite ? champs.TrounamentDescription : champs.ChampName}
            </div>
            </div>
        )
    }

}


const mapStateToProps = ({ champsContent, champsMiddleBoxList, outright, singleMatch }) => ({ champsContent, champsMiddleBoxList, outright, singleMatch })
export default connect(mapStateToProps, { fetchChampList, addChampToList, removeChampFromList, sportViewChamps, removeSingleMatch })(ChampName);
