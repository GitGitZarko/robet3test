import React, { Component } from 'react';
//import '../../public/Sports.css';
import { Header, Table } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { oddsTicketList, fetchSingleMatchLive } from '../../actions';

class LiveMatchOverview extends Component {

    addOddToTicket = (e, oddCode, matchCode) => {
        e.preventDefault();

        // this.setState({
        //     reRendered: !this.state.reRendered
        // })

        let localTicket = JSON.parse(localStorage.ticket)

        localTicket.isLive = true;
        localTicket.matchId = matchCode;
        localTicket.oddId = oddCode;
        localTicket.operationType = 1;

        localStorage.setItem("ticket", JSON.stringify(localTicket));
        this.props.oddsTicketList(localTicket)
    }
    novaFunkcijua(e, mid) {
        e.preventDefault();
        this.props.handler(2, mid);
        this.props.fetchSingleMatchLive(Math.random(), mid)
    }

    render() {
        if (!this.props.sportOverview) return null;
        const { Sports } = this.props.sportOverview
        let oddIdList = [];

        if (!Sports) return null;

        if (localStorage.getItem("ticket") !== null) {
            let localTicket = JSON.parse(localStorage.getItem('ticket'))
            oddIdList = localTicket.Odds.map((a) => a.OddId)
        }

        return (
            <div className="thirteen wide column">
                <Table fixed>
                    <Table.Row >
                        {Sports.map((data, i) => {
                            return <Table.Cell selectable>
                                {data.Tournaments.map((ata, f) =>
                                    <div>
                                        <Header style={{ background: '#424242', color: 'white', fontWeight: '600', padding: '10px', margin: 0, border: '1px dotted white' }}>
                                            {ata.TournamentName}
                                        </Header>
                                        {ata.Matchies.map((gego, b) => {
                                            return <Table.Row verticalAlign='middle' style={{ background: 'black', color: 'white' }}>
                                                <Table.Cell colSpan='2' width="four">
                                                    <Table style={{ background: 'black', color: 'white' }}>
                                                        <Table.Row verticalAlign='middle' >
                                                            <Table.Cell style={{ padding: 0, cursor: 'pointer' }} onClick={(e) => this.novaFunkcijua(e, gego.MatchId, ata.SportId)}>
                                                                {gego.Team1} <br />
                                                                {gego.Team2} <br />
                                                                {gego.MatchDateString}<br />
                                                            </Table.Cell>
                                                            <Table.Cell textAlign='right' style={{ color: 'gold', padding: 0, cursor: 'pointer' }}>
                                                                {gego.Score1}
                                                                <a style={{ marginLeft: '5px' }} className="ui teal label"> {gego.Comment}</a>
                                                            </Table.Cell>
                                                        </Table.Row>
                                                    </Table>
                                                </Table.Cell>
                                                <Table.Cell width="tvelwe" style={{ padding: 0 }}>
                                                    <Table columns={gego.Bets.length} style={{ tableLayout: 'fixed' }}>

                                                        {gego.Bets.map((fufu, k) => {
                                                            return (
                                                                <Table.Cell textAlign='center' colRow={2} style={{ padding: 0, background: '#424242', color: 'white', fontWeight: 600 }}>
                                                                    {fufu.BetLabel}
                                                                    <Table columns={fufu.Odds.length}>
                                                                        <Table.Row verticalAlign='middle'>
                                                                            {fufu.Odds.map((stato) => { return <Table.Cell style={{ background: 'orange', color: 'white', fontWeight: 600 }} textAlign='center'>{stato.OddLabel}</Table.Cell> })}
                                                                        </Table.Row>
                                                                        <Table.Row verticalAlign='middle'>
                                                                            {fufu.Odds.map((stato) => {
                                                                                return <Table.Cell className="live-bet-odds"
                                                                                    style={{
                                                                                        background: `${oddIdList.includes(stato.OddId) ? 'green' : '#424242'}`,
                                                                                        color: 'white', fontWeight: 600,
                                                                                        borderBottom: `3px solid ${stato.Trend === 1 ? '#04f872' : 'black' || stato.Trend === -1 ? 'red' : 'black'}`,
                                                                                        borderRight: '1px solid white',
                                                                                        cursor: 'pointer'
                                                                                    }}
                                                                                    onClick={(e) => this.addOddToTicket(e, stato.OddId, gego.MatchId)}
                                                                                    textAlign='center'>{stato.OddValue == 0 ? <i class="lock icon"></i>
                                                                                        :
                                                                                        this.props.changeOddValue == 0 ? stato.OddValue
                                                                                            :
                                                                                            (this.props.changeOddValue == 1 ? stato.OddValueAmerican
                                                                                                : stato.OddValueFraction)}
                                                                                </Table.Cell>
                                                                            })}
                                                                        </Table.Row>
                                                                    </Table>
                                                                </Table.Cell>
                                                            )


                                                        })}

                                                    </Table>
                                                </Table.Cell>

                                            </Table.Row>
                                        })}
                                    </div>
                                )}
                            </Table.Cell>

                        })}

                    </Table.Row>
                </Table>
            </div>


        )
    }
}

const mapStateToProps = ({ oddList, changeOddValue, oddIdList }) => ({ oddList, changeOddValue, oddIdList })
export default connect(mapStateToProps, { oddsTicketList, fetchSingleMatchLive })(LiveMatchOverview);
