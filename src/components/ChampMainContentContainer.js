import React, { Component } from 'react';
import ChampMainContent from './ChampMainContent';
import { connect } from 'react-redux';
import '../public/css/Sports.css';
import { fetchChampList, addChampToList, removeChampFromList, sportViewChamps} from '../actions';
import { DimmerDimmable } from 'semantic-ui-react';
import TestComponent from './TestComponent';
import { Header, Table, Checkbox, Button, SegmentInline, Ref, Grid } from 'semantic-ui-react'

class ChampMainContentContainer extends Component {
    constructor(props) {
        super(props)

        this.testKontejner = React.createRef();
    }

    onFocus = () => {
      const { champs } = this.props
      let listaTournamentCode = this.props.champsMiddleBoxList.map((objekat) => objekat.TournamentCode)
      return listaTournamentCode
  }


    mainContainerAddRemove = (champId, sportId) => {
            
      console.log("CLICK IZ VIEW-A", champId ," I B " , sportId )
    //   const { champs } = this.props
    //   const { sportId } = this.props  
    //   const { antepost } = this.props
    //   const { isFavorite } = this.props

    //   console.log("KAKO KO", this.props.antepost, "Champs: ", champs)
    //   // const { TournamentCode } = this.props.champsMiddleBoxList        
    //   const champIdChangable = isFavorite ? champs.TournamentSourceID : champs.ChampId;
      
      if(this.onFocus().some(a => a == champId)){ 
          console.log('tu je ima ga')                 
          this.props.removeChampFromList(champId, sportId)
          this.setState({isOpen: false})              
      }else{                    
          console.log('neje tu nema ga')                 
          this.props.addChampToList(champId, sportId, null)
          this.setState({isOpen: true})                
      }
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
                <Table columns={3}>          
                {
                  champsSport.map((sport, i) => { 
                    return (                                       
                      sport.Categories.map((item) => {
                      return (
                        <div >                       
                        <Table.Row style={{background: '#0a437f', color: 'white', width: '100%', display: 'inline-block', padding: '10px 0'}}>
                          <Table.HeaderCell style={{float: 'left'}}>
                          {item.CategoryName}
                          </Table.HeaderCell>
                          <Table.HeaderCell  style={{float: 'right', cursor: 'pointer'}} onClick={() => this.props.sportViewChamps(0)}>
                          <h5>VISUALIZZA SELEZIONATO</h5>
                          </Table.HeaderCell>
 
                          </Table.Row> 
                      
                           <Table.Body style={{display: 'block', width: '100%'}}>
                              <Table.Row style={{display: 'block', width: '100%'}}>
                      {item.Champs.map((val) => <button  style={{margin: 0, width: '50%', borderRadius: 0, border: '1px solid white', textTransform: 'uppercase', textAlign: 'left', padding: '10px 0'}}><Checkbox checked={this.includesInMiddleBox(val.ChampId) ? true : false} onChange={() => this.mainContainerAddRemove(val.ChampId, sport.SportId)}/>{val.ChampName}</button>)}
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

                { this.props.singleMatch == null ? 
                  this.props.sportView == 0 ? this.novaFunkcija() : this.renderujSportChamps()
                :  (   
                  <div> 
                    <div style={{textAlign: 'center'}}>
                    <h1>{this.props.singleMatch.name}</h1>
                    <h4>{this.props.singleMatch.date}</h4>
                    </div>
                      {this.props.singleMatch.data.Items.map((data, i) => 
                        <div key={i}>
                              {data.GroupName}
                              {data.OddItems.map((gege,i) => <button>{gege.Value}</button>)}
                        </div>
                        
                      )}
                    </div>       
                )
                }
                {/* {this.renderujSportChamps()} */}
            </div>
        )
    }
}
const mapStateToProps = ({ champsMiddleBoxList,champs, sportView, singleMatch }) => ({ champsMiddleBoxList, champs, sportView, singleMatch })
export default connect(mapStateToProps, { fetchChampList, addChampToList, removeChampFromList, sportViewChamps })(ChampMainContentContainer);
