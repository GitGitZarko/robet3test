import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchLiveBetGames, fetchLiveCalendar, fetchSingleMatchLive } from '../../actions';
import LiveMatchOverview from './LiveMatchOverview';
import TicketGenerator from '../TicketGenerator';
import SingleMatchLive from './SingleMatchLive';
import Calendar from './Calendar';

class LiveBet extends Component {
    constructor(props) {
        super(props)

        this.state = {
            sportId: 1,
            componentView: 0,
            matchId: ''
        }

    }

    componentDidMount() {
        this.props.fetchLiveBetGames(Math.random(), this.state.sportId)
        this.interval = setInterval(() => this.props.fetchLiveBetGames(Math.random(), this.state.sportId), 2000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    klik(e, sport) {
        e.preventDefault();

        this.props.fetchLiveBetGames(Math.random(), sport)
        const singleMatchId = this.props.liveBetGames.Sports[0].Tournaments[0].Matchies[0].MatchId
        this.props.fetchSingleMatchLive(Math.random(), singleMatchId)
        this.setState({
            sportId: sport
        })
    }
    klickMatch(e) {
        if (!this.props.liveBetGames) return null;
        const singleMatchId = this.props.liveBetGames.Sports[0].Tournaments[0].Matchies[0].MatchId
        this.props.fetchSingleMatchLive(Math.random(), singleMatchId)

    }

    renderSports() {

        if (!this.props.liveBetGames) return null;
        const { SportItems } = this.props.liveBetGames
        if (!SportItems) return null

        const rezultat = SportItems.map(data => <div
            onClick={(e) => this.klik(e, data.SportId)}
            className="livebet-menu-row"
            >
            <div className="livebet-menu-title" >{data.SportName}
            </div>
            <span className="ui red circular label">
                {data.MatchNumber}
            </span>
        </div>)
        return rezultat
    }
    renderSportsCalendar() {

        if (!this.props.calendar) return null;
        const { SportItems } = this.props.calendar
        const rezultat = SportItems.map(data => <div
            onClick={(e) => this.klik(e, data.SportId)}
            className="livebet-menu-row">
            <div className="livebet-menu-title">{data.SportName}
            </div>
            <span className="ui red circular label">
                {data.MatchNumber}
            </span>
        </div>)
        return rezultat
    }

    handler = (someValue, matchId) => {
        this.setState({
            componentView: someValue,
            matchId: matchId
        })
    }

    calendarRender(e) {
        e.preventDefault()
        this.setState({ componentView: 3 })
        this.props.fetchLiveCalendar(Math.random(), this.state.sportId);
    }
    render() {

        return (
            <div className="ui three grid">
                <div className="three column row livebet" >
                    <div className="thirteen wide column">
                        <div>{this.state.componentView === 3 ? this.renderSportsCalendar() : this.renderSports()}</div>
                        <div className="livebet-menu-right">
                            <button className="ui purple button" onClick={() => this.setState({ componentView: 1 })}>Overview</button>
                            <button className="ui purple button" onClick={() => this.setState({ componentView: 2 })}>Match</button>
                            <button className="ui purple button" onClick={(e) => this.calendarRender(e)}>Calendar</button>
                        </div>
                        {this.state.componentView === 0 || this.state.componentView === 1 ? <LiveMatchOverview sportOverview={this.props.liveBetGames} handler={this.handler} /> : null}
                        {this.state.componentView === 2 ? <SingleMatchLive sportOverview={this.props.liveBetGames} sportId={this.state.sportId} match={this.state.matchId} /> : null}
                        {this.state.componentView === 3 ? <Calendar /> : null}
                    </div>
                    <div className="three wide column sport-component" >
                        <TicketGenerator />
                    </div>
                </div>
            </div>



        )
    }

}

const mapStateToProps = ({ liveBetGames, calendar, singleMatchLive }) => ({ liveBetGames, calendar, singleMatchLive })
export default connect(mapStateToProps, { fetchLiveBetGames, fetchLiveCalendar, fetchSingleMatchLive })(LiveBet);