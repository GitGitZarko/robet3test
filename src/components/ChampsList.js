import React, { Component } from 'react';
import { connect } from 'react-redux';
import MediaQuery from 'react-responsive';
import Slider from "react-slick";
import { fetchChamps, fetchInEvidence, fetchStructureOutright, sportViewChamps, fetchStructurePlayer, removeSingleMatch } from '../actions';
import ChampsCategories from './ChampsCategories'
import ChampName from './ChampName';

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
        targetPlayer: null
    }
    componentDidMount() {
        this.props.fetchChamps();
        this.props.fetchInEvidence();
        this.props.fetchStructureOutright();
        this.props.fetchStructurePlayer();
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
            targetPlayer: i
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
                            <div className={this.state.displayPlayer} onClick={(e) => this.uradiNestoPlayer(e, sport.SportId, sport)} ><i className="serbia flag"></i>  {sport.SportName}</div>
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
    renderSportListMobile() {
        const { champs } = this.props;

        return champs.map((sport, i) => {
            return (
                                <a class="item">
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
                </MediaQuery>
                <MediaQuery maxWidth={414}> 
                <div class="ui labeled icon menu scroll inverted">
                   {this.renderSportListMobile()}
                </div>
                </MediaQuery>
                <MediaQuery minDeviceWidth={1224}>  
                    
                <div className="ui relaxed divided list">
                    <div className="ui middle aligned selection list left-sidebar-border" >
                        <h5>SPORT DISPONIBILI</h5>
                        {this.renderSportList()}
                    </div>
                </div>
                
                </MediaQuery>
                <MediaQuery minDeviceWidth={1224}>
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