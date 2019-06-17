import React, { Component } from 'react';
//import '../public/css/Sports.css';
import { connect } from 'react-redux';
import { fetchCasinoGames } from '../../actions';
import { Grid, Menu, Segment } from 'semantic-ui-react';
import Header from '../Header';
import Game from './Game';

class Casino extends Component {
    state = { activeItem: 'bio' }

    handleItemClick = (e, { name, id }) => {
        this.setState({ activeItem: name })
        this.props.fetchCasinoGames(id)
    }

    componentDidMount() {
        this.props.fetchCasinoGames();

    }

    renderCasinoGames = () => {
        if (!this.props.casinoGames) return null
        const { games } = this.props.casinoGames

        let hehe = games.sort(a => a.GameOrder !== -1000)
            .map((data, i) => <Game game={data} />)
        return hehe;
    }

    render() {
        const { activeItem } = this.state

        return (
            <div className="ui two grid" style={{ marginRight: '20px' }}>
                <div className="row">

                    <div className="sixteen wide mobile two wide computer column" style={{ background: 'lightblue' }}>
                        <Menu fluid vertical tabular>
                            <Menu.Item name='Novita' id='st=1' active={activeItem === 'Novita'} onClick={this.handleItemClick} />
                            <Menu.Item name='Mobile' id='m=0' active={activeItem === 'Mobile'} onClick={this.handleItemClick} />
                            <Menu.Item name='TIPO DI GIOCO' style={{ background: 'yellow', textAlign: 'center', fontWeight: 600 }} />

                            <Menu.Item
                                name='Slots'
                                id='t=1'
                                active={activeItem === 'Slots'}
                                onClick={this.handleItemClick}
                            />
                            <Menu.Item
                                name='Video Poker'
                                id='t=2'
                                active={activeItem === 'Video Poker'}
                                onClick={this.handleItemClick}
                            />
                            <Menu.Item
                                name='Virtual Games'
                                id='t=10'
                                active={activeItem === 'Virtual Games'}
                                onClick={this.handleItemClick}
                            />

                            <Menu.Item name='PARTNERS' style={{ background: 'yellow', textAlign: 'center', fontWeight: 600 }} />

                            <Menu.Item
                                name='$ GLOBAL CASINO $'
                                id='c=22'
                                active={activeItem === '$ GLOBAL CASINO $'}
                                onClick={this.handleItemClick}
                            />
                            <Menu.Item
                                name='SEVENABC'
                                id='c=23'
                                active={activeItem === 'SEVENABC'}
                                onClick={this.handleItemClick}
                            />
                        </Menu>
                    </div>

                    <div className=" fourteen wide computer column" style={{ background: 'lightblue' }}>
                        <div className="ui grid" style={{ background: 'lightgreen' }}>
                            {this.renderCasinoGames()}
                        </div>
                    </div>

                </div>
            </div >



        )
    }
}

const mapStateToProps = ({ casinoGames }) => ({ casinoGames })
export default connect(mapStateToProps, { fetchCasinoGames })(Casino);

