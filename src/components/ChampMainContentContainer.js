import React, { Component } from 'react';
import ChampMainContent from './ChampMainContent';
import { connect } from 'react-redux';
import '../public/css/Sports.css';
import { fetchChampList, addChampToList } from '../actions';
import { DimmerDimmable } from 'semantic-ui-react';
import TestComponent from './TestComponent';


class ChampMainContentContainer extends Component {
    constructor(props) {
        super(props)

        this.testKontejner = React.createRef();
    }

       novaFunkcija() {
        // const { TournamentCode } = this.props.champsMiddleBoxList;
        // console.log('PROPS champsMiddleBoxList', this.props.champsMiddleBoxList);
        // if (!TournamentCode) {
        //    return null;
        // }
        return this.props.champsMiddleBoxList.map((name, i) => {
            // console.log('PROPS inside map', name.TournamentCode);
            return (
                <TestComponent                 
                key={i} objekat={name} 
                />
            )
        }).reverse();
    }
    render() {
        return (
            <div>
                {this.novaFunkcija()}
            </div>
        )
    }
}
const mapStateToProps = ({ champsMiddleBoxList }) => ({ champsMiddleBoxList })
export default connect(mapStateToProps, { fetchChampList, addChampToList })(ChampMainContentContainer);
