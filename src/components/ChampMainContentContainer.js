import React, { Component } from 'react';
import ChampMainContent from './ChampMainContent';
import { connect } from 'react-redux';
import '../public/css/Sports.css';
import { fetchChampList, addChampToList } from '../actions';
import { DimmerDimmable } from 'semantic-ui-react';
import TestComponent from './TestComponent';
import { Header, Table, Button, SegmentInline, Ref, Grid } from 'semantic-ui-react'





class ChampMainContentContainer extends Component {
    constructor(props) {
        super(props)

        this.testKontejner = React.createRef();
    }
    includesInMiddleBox(value){
      const result = this.props.champsMiddleBoxList.some(name => name.TournamentCode == value)      
      return result;
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
    renderujSportChamps(){        
          const { champs } = this.props
          const champsSport = champs.filter(item => item.SportId === this.props.sportView )

          console.log("SPORT SPORT" , champsSport)
            return (
                <Table>          
                {
                  champsSport.map((sport, i) => { 
                    return (                                       
                      sport.Categories.map((item) => {
                      return (
                        <div >
                        <Table.Header>
                        <Table.Row>
                          <Table.HeaderCell>{item.CategoryName}</Table.HeaderCell>
                          </Table.Row> 
                          </Table.Header>
                           <Table.Body>
                           <Table.Row>
                      {item.Champs.map((val) => <Table.Cell style={this.includesInMiddleBox(val.ChampId) ? {background: 'red', cursor: 'pointer'} : {background: 'white', cursor: 'pointer'}}>{val.ChampName}</Table.Cell>)}
                             {/* { item.Champs.map((val) =>  <Table.Row><Table.Cell></Table.Cell>{val}</Table.Row> )}                               */}
                             </Table.Row>
                            </Table.Body>
                          </div>
                      )
                    })
                  )              
                  })                
                }                
                </Table>
            )       
    }
    render() {              
        return (
            <div >
                {this.props.sportView == 0 ? this.novaFunkcija() : this.renderujSportChamps()}
                {/* {this.renderujSportChamps()} */}
            </div>
        )
    }
}
const mapStateToProps = ({ champsMiddleBoxList,champs, sportView }) => ({ champsMiddleBoxList, champs, sportView })
export default connect(mapStateToProps, { fetchChampList, addChampToList })(ChampMainContentContainer);
