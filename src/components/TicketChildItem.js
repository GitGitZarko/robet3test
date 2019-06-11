import React, { Component } from 'react';
import { connect } from 'react-redux';
import { oddsTicketList } from '../actions';

class TicketChildItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isStarActive: false
        }
    }

    nestoUradi = (e, mId, OddId) => {
        e.preventDefault();
        let localTicket = JSON.parse(localStorage.ticket)

        localTicket.isLive = false;
        localTicket.matchId = mId;
        localTicket.oddId = OddId;
        localTicket.operationType = 2;

        localStorage.setItem("ticket", JSON.stringify(localTicket));
        this.props.oddsTicketList(localTicket)
    }
    pozoviState = (e, oddId, matchId) => {
        e.preventDefault()
        this.setState({ isStarActive: !this.state.isStarActive })
        let localTicket = JSON.parse(localStorage.ticket)

        localTicket.isLive = false;
        localTicket.matchId = matchId;
        localTicket.oddId = oddId;
        localTicket.operationType = 3;

        localStorage.setItem("ticket", JSON.stringify(localTicket));

        this.props.oddsTicketList(localTicket)
    }
    render() {
        const { Odds } = this.props.data

        const prom = Odds.map((elem) => elem.MatchId === this.props.matchId ? elem.MatchName : null)

        const distinctValue = [...new Set(prom)]
        return (
            <div>
                <div className="ui middle aligned divided list">
                    <div className="ui item">
                        <div className="ui left floated content">
                            <h4>{distinctValue}</h4>
                        </div>
                    </div>
                    {Odds.map((a) => {
                        return a.MatchId === this.props.matchId ?
                            <div className="ui item">
                                <div className="ui left floated content">
                                    {a.OddGroupName} : {a.OddTypeName}
                                </div>
                                <div className="ui right floated content">
                                    {this.props.changeOddValue == 0 ? a.OddValue : (this.props.changeOddValue == 1 ? a.OddValueAmerican : a.OddValueFraction)}
                                    {/* {a.OddValue} */}
                                    {/* OVDE TREBA NAPRAVITI SET BANKER FUNKCIJU */}
                                    <i className={"window " + (this.state.isStarActive ? 'star' : 'star outline') + " icon"} style={{ cursor: 'pointer' }} onClick={(e) => this.pozoviState(e, a.OddId, a.MatchId)}></i>
                                    <i className="window close icon" style={{ cursor: 'pointer' }} onClick={(e) => this.nestoUradi(e, a.MatchId, a.OddId)}></i>

                                </div>
                            </div>
                            : null


                    })}
                </div>
            </div>
        )
    }
}
const mapStateToProps = ({ changeOddValue }) => ({ changeOddValue })
export default connect(mapStateToProps, { oddsTicketList })(TicketChildItem);
