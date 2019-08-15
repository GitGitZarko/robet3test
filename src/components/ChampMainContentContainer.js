import React, { Component } from 'react';
import { connect } from 'react-redux';
import MediaQuery from 'react-responsive';
import { fetchChampList, addChampToList, removeChampFromList, sportViewChamps} from '../actions';
import TestComponent from './TestComponent';
import SingleMatch from './SingleMatch';
import SingleMatchMobile from './Mobile/SingleMatchMobile';
import { Table, Checkbox, Button } from 'semantic-ui-react'

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
      if(this.onFocus().some(a => a == champId)){             
          this.props.removeChampFromList(champId, sportId)
          this.setState({isOpen: false})              
      }else{                                     
          this.props.addChampToList(champId, sportId, null)
          this.setState({isOpen: true})                
      }
    }

    

    mainContainerAddRemoveDirect = (champId, sportId) => {      
      if(this.onFocus().some(a => a == champId)){             
          this.props.removeChampFromList(champId, sportId)
          this.setState({isOpen: false})              
      }else{                                     
          this.props.addChampToList(champId, sportId, null)
          this.setState({isOpen: true})         
          this.props.sportViewChamps(0)       
      }
    }


    includesInMiddleBox(value){
      const result = this.props.champsMiddleBoxList.some(name => name.TournamentCode == value)      
      return result;
    }

    novaFunkcija() {  
        return this.props.champsMiddleBoxList.map((name, i) => {            
            return (
                <TestComponent                 
                key={i} objekat={name} 
                />
            )
        }).reverse();
    }

    //   <MediaQuery minDeviceWidth={1224}> @
    renderujSportChamps(){        
          const { champs } = this.props
          const champsSport = champs.filter(item => item.SportId === this.props.sportView )
          
            return (
                <Table columns={3}>          
                {
                  champsSport.map((sport, i) => { 
                    return (                                       
                      sport.Categories.map((item) => {
                      return (
                        <div >                       
                        <Table.Row className="table-row-main-container">
                          <Table.HeaderCell className="table-header-cell-left">
                          {item.CategoryName}
                          </Table.HeaderCell>
                          <Table.HeaderCell  className="table-header-cell-right" onClick={() => this.props.sportViewChamps(0)}>
                          <h5>VISUALIZZA SELEZIONATO</h5>
                          </Table.HeaderCell>
 
                          </Table.Row> 
                      
                           <Table.Body className="table-body-main-container" >
                              <Table.Row  className="table-row-main-container-inner">
                      {item.Champs.map((val) => <button  className="button-main-container" ><Checkbox checked={this.includesInMiddleBox(val.ChampId) ? true : false} onChange={() => this.mainContainerAddRemove(val.ChampId, sport.SportId)}/><span onClick={() => this.mainContainerAddRemoveDirect(val.ChampId, sport.SportId)}>{val.ChampName}</span></button>)}
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
                    <MediaQuery minDeviceWidth={1224}>  
                    <SingleMatch  singleMatch={this.props.singleMatch}/>
                    </MediaQuery>
                    <MediaQuery maxWidth={1224}>  
                    <SingleMatchMobile  singleMatch={this.props.singleMatch}/>
                    </MediaQuery>
                    {/* <div style={{textAlign: 'center'}}>
                    <h1>{this.props.singleMatch.name}</h1>
                    <h4>{this.props.singleMatch.date}</h4>
                    </div>
                      {this.props.singleMatch.data.Items.map((data, i) => 
                        <div key={i}>
                              {data.GroupName}
                              {data.OddItems.map((gege,i) => <button>{gege.Value}</button>)}
                        </div>
                        
                      )}*/}
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
