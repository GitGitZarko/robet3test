import React, { Component } from 'react';
import { connect } from 'react-redux';
import MediaQuery from 'react-responsive';
import { Modal } from 'semantic-ui-react';
import Slider from "react-slick";
import { fetchChamps, fetchInEvidence, fetchStructureOutright, sportViewChamps, fetchStructurePlayer, removeSingleMatch } from '../actions';
import ChampsCategories from './ChampsCategories';
import ChampName from './ChampName';
import ChampsCategoriesMobile from './Mobile/ChampsCategoriesMobile';

class ChampsList extends Component {
    state = {
        displayChildren: '',
        valueTriger: Boolean,
        target: null,
        anteDisplay: '',
        displayPlayers: '',
        valueAnte: Boolean,
        targetAnte: null,
        valuePlayer: Boolean,
        targetPlayer: null,
        showModal: false
    }
    componentDidMount() {
        this.props.fetchChamps();
        this.props.fetchInEvidence();
        this.props.fetchStructureOutright();
        this.props.fetchStructurePlayer();
    }
    closeModal = () => {
        this.setState({ showModal: false })
      }
    handleModalOpenButton(evt) {
        evt.preventDefault()
        this.closeModal();
      }
    uradiNesto(event, i, sport) {
        event.preventDefault();
        this.setState({
            valueTriger: !this.state.valueTriger,
            displayChildren: this.state.valueTriger ? 'headerLeftMenu' : 'headerLeftMenu-hidden',
            target: i
        })
        this.props.sportViewChamps(i)
        if (this.props.singleMatch) this.props.removeSingleMatch()
    }
    uradiNestoAnte(event, i) {
        event.preventDefault();
        this.setState({
            valueAnte: !this.state.valueAnte,
            anteDisplay: this.state.valueAnte ? 'headerLeftMenu' : 'headerLeftMenu-hidden',
            targetAnte: i
        })
        if (this.props.singleMatch) this.props.removeSingleMatch()
    }
    uradiNestoPlayer(event, i) {
        event.preventDefault();
        this.setState({
            valuePlayer: !this.state.valuePlayer,
            displayPlayer: this.state.valuePlayer ? 'headerLeftMenu' : 'headerLeftMenu-hidden',
            targetPlayer: i,
            showModal: true         
        })
        
        if (this.props.singleMatch) this.props.removeSingleMatch()
       
    }

    renderPlayersList() {
        const { players } = this.props
  

        return players.map((sport, i) => {
            return (
                
                <li>
                    <div className="item">
                        <div className="content">
                            <div className="headerLeftMenu" onClick={(e) => this.uradiNestoPlayer(e, sport.SportId, sport)} ><i className="serbia flag"></i>  {sport.SportName}</div>
                            {sport.Categories.map((cat, k) => <div> {sport.SportId === this.state.targetPlayer ?
                                <ChampsCategories
                                    categorie={cat}
                                    key={k}
                                    antepost={false}
                                    isFavorite={false}
                                    players={true}
                                    sportId={sport.SportId}
                                    displayChildren={this.state.displayPlayer} />
                                : null
                            }
                            </div>
                            )}
                        </div>
                    </div>
                </li>
                       
            )
        })
     

    }
    renderPlayersListMobile(){
        const { players } = this.props
        return players.map((sport, i) => {
            return (                
                <Modal closeIcon onClose={this.closeModal} open={this.state.showModal} trigger={<button onClick={(e) => this.uradiNestoPlayer(e, sport.SportId, sport)} className="ui button">MARCATORI</button>}>
                     <Modal.Header>Select a Competition</Modal.Header>
                     <Modal.Content >
                            {sport.Categories.map((cat, k) =>  <button className="ui orange button main-button-list" > {sport.SportId === this.state.targetPlayer ?
                                <ChampsCategoriesMobile     
                                    showModal={this.closeModal}
                                    categorie={cat}
                                    key={k}
                                    antepost={false}
                                    isFavorite={false}
                                    players={true}
                                    sportId={sport.SportId}
                                    displayChildren={this.state.displayPlayer} />
                                : null
                            }
                            </button>
                            
                            )}
                    </Modal.Content>
                   </Modal>   
                   
            )
        })
     

    }
    

    renderSportListMobile() {
        const { champs } = this.props;

        return champs.map((sport, i) => {
            return (
                                <a class="item" onClick={(e) => this.uradiNesto(e, sport.SportId, sport)}>
                                    <img class="ui mini image" src={`/images/sporticons/${sport.SportId}.png`}/>
                                   
                                </a>                               
                        
            )
        })     
    }
    renderSportList() {
        const { champs } = this.props
        return champs.map((sport, i) => {
            return (
                <li>                        
                    <div className="item">
                        <div className="content">
                            <div className="headerLeftMenu" onClick={(e) => this.uradiNesto(e, sport.SportId, sport)} ><i className="italy flag"></i>  {sport.SportName}</div>
                            {sport.Categories.map((cat, k) => <div> {sport.SportId === this.state.target ?
                                <ChampsCategories
                                    categorie={cat}
                                    key={k}
                                    antepost={false}
                                    sportId={sport.SportId}
                                    displayChildren={this.state.displayChildren} />
                                : null
                            }
                            </div>
                            )}
                        </div>
                    </div>                    
                </li>
            )
        })
    }
    renderEvidenceList() {
        const { inEvidence } = this.props
        return inEvidence.map((sport, i) => {
            return (
                <li>
                    <div className="item" style={{ display: 'block' }}>
                        <div className="content" >
                            <div className="header" style={{ cursor: 'pointer' }}>

                                {
                                    <ChampName
                                        champs={sport}
                                        key={i}
                                        antepost={false}
                                        isFavorite={true}
                                        sportId={1}
                                        displayChild={this.state.displayChild}
                                    />
                                }
                            </div>
                        </div>
                    </div>

                </li>
            )
        })
    }
    renderAntepostList() {
        const { outright } = this.props
        return outright.map((sport, i) => {
            return (
                <li >
                    <div className="item">
                        <div className="content">
                            <div className="header" onClick={(e) => this.uradiNestoAnte(e, sport.SportId)} ><i className="italy flag"></i>  {sport.SportName}</div>
                            {sport.Categories.map((cat, k) => <div> {sport.SportId === this.state.targetAnte ?
                                <ChampsCategories
                                    categorie={cat}
                                    key={k}
                                    antepost={true}
                                    sportId={sport.SportId}
                                    displayChildren={this.state.anteDisplay} />
                                : null
                            }
                            </div>
                            )}
                        </div>
                    </div>
                </li>
            )
        })
    }

    render() {

        


        return (
            <div>
                <MediaQuery maxWidth={414}> 
                <div className="ui labeled icon menu scroll inverted" style={{listStyle: 'none'}}>                      
                        {this.renderEvidenceList()}
                   
                </div>
                <div class="ui labeled icon menu scroll inverted">
                   {this.renderSportListMobile()}
                </div>      
                <div  className="ui horizontal list">                      

                        {this.renderPlayersListMobile()}                    
                </div>  
                </MediaQuery>
                <MediaQuery minDeviceWidth={1224}>
                <div className="ui relaxed divided list">
                    <div className="ui middle aligned selection list left-sidebar-border" >
                        <h5>CAMPIONATI PREFERITI </h5>
                        {this.renderEvidenceList()}
                    </div>
                </div>
           
                <div className="ui relaxed divided list">
                    <div className="ui middle aligned selection list left-sidebar-border" >
                        <h5>MARCATORI</h5>
                        {this.renderPlayersList()}
                    </div>
                </div>                
                
                
                    
                <div className="ui relaxed divided list">
                    <div className="ui middle aligned selection list left-sidebar-border" >
                        <h5>SPORT DISPONIBILI</h5>
                        {this.renderSportList()}
                    </div>
                </div>
               
                <div className="ui relaxed divided list">
                    <div className="ui middle aligned selection list left-sidebar-border" >
                        <h5>ANTEPOST</h5>
                        {this.renderAntepostList()}
                    </div>
                </div>
                </MediaQuery>
            </div>
        )
    }
}

const mapStateToProps = ({ champs, inEvidence, outright, players, singleMatch }) => ({ champs, inEvidence, outright, players, singleMatch })
export default connect(mapStateToProps, { fetchChamps, fetchInEvidence, fetchStructureOutright, sportViewChamps, fetchStructurePlayer, removeSingleMatch })(ChampsList);