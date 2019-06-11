import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../public/css/Sports.css';
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
            displayChildren: this.state.valueTriger ? 'block' : 'none',
            target: i
        })
        this.props.sportViewChamps(i)
        if (this.props.singleMatch) this.props.removeSingleMatch()
    }
    uradiNestoAnte(event, i) {
        event.preventDefault();
        this.setState({
            valueAnte: !this.state.valueAnte,
            anteDisplay: this.state.valueAnte ? 'block' : 'none',
            targetAnte: i
        })
        if (this.props.singleMatch) this.props.removeSingleMatch()
    }
    uradiNestoPlayer(event, i) {
        event.preventDefault();
        this.setState({
            valuePlayer: !this.state.valuePlayer,
            displayPlayer: this.state.valuePlayer ? 'block' : 'none',
            targetPlayer: i
        })
        if (this.props.singleMatch) this.props.removeSingleMatch()
    }

    renderPlayersList() {
        const { players } = this.props
        return players.map((sport, i) => {
            return (
                <li >
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
    renderSportList() {
        const { champs } = this.props
        return champs.map((sport, i) => {
            return (
                <li >
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
                <div className="ui relaxed divided list">
                    <div className="ui middle aligned selection list" style={{ border: '1px dotted black' }}>
                        <h5>CAMPIONATI PREFERITI </h5>
                        {this.renderEvidenceList()}
                    </div>
                </div>
                <div className="ui relaxed divided list">
                    <div className="ui middle aligned selection list" style={{ border: '1px dotted black' }}>
                        <h5>MARCATORI</h5>
                        {this.renderPlayersList()}
                    </div>
                </div>
                <div className="ui relaxed divided list">
                    <div className="ui middle aligned selection list" style={{ border: '1px dotted black' }}>
                        <h5>SPORT DISPONIBILI</h5>
                        {this.renderSportList()}
                    </div>
                </div>
                <div className="ui relaxed divided list">
                    <div className="ui middle aligned selection list" style={{ border: '1px dotted black' }}>
                        <h5>ANTEPOST</h5>
                        {this.renderAntepostList()}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ champs, inEvidence, outright, players, singleMatch }) => ({ champs, inEvidence, outright, players, singleMatch })
export default connect(mapStateToProps, { fetchChamps, fetchInEvidence, fetchStructureOutright, sportViewChamps, fetchStructurePlayer, removeSingleMatch })(ChampsList);