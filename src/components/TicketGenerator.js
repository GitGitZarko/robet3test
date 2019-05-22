import React, { Component } from 'react';
import { DelayInput } from 'react-delay-input';
import '../public/css/Sports.css';
import { connect } from 'react-redux';
import { fetchStartJson, removeAllOdds, oddsTicketList, quickBetAction } from '../actions';
import TicketChildItem from './TicketChildItem';
import { allOddsTable } from '../json/allOddsTable';
import { Button, Icon,  Modal,  Dropdown, Checkbox } from 'semantic-ui-react';


const customStyle = {
    background: 'yellow',
    border: '1px solid black',
    padding: '5px'
    
}


//OVO JE JEDNOSTAVNI BUTTON COMPONENT koji prima samo color prop i textValue zasto
class TicketGenerator extends Component {
    constructor(props) {
        super(props);
        this.timeout = 0;
        this.props.fetchStartJson()
        this.state = {
            storageIsClear: false,
            activeButton: false,
            modalOpen: false,
            reRender: Boolean,
            quickChecked: false,
            localTotalAmount: 0,
            colsCalculateValue: 0,
            focus: false
        }
        this.textInput = React.createRef();
        this.dropdownBrat = React.createRef();
        this.textInputMain = React.createRef();

        this.focusInput = this.focusInput.bind(this);
        this.focusDrop = this.focusDrop.bind(this);
    }
    focusInput() {
        // Explicitly focus the text input using the raw DOM API
        // Note: we're accessing "current" to get the DOM node
        this.textInput.current.focus();
        
      }
      focusDrop() {
        // Explicitly focus the text input using the raw DOM API
        // Note: we're accessing "current" to get the DOM node     
        this.textInputMain.current.blur();
        //THIS NEED TO BE IMPLEMENTED
        //this.textInputMain.current.value = "";
        this.setState({ focus: true})
        
      }

    handleOpen = () => this.setState({ modalOpen: true })
    handleClose = () => this.setState({ modalOpen: false })

    removeAllOdds = () => {

        this.setState({
            storageIsClear: true,
            localTotalAmount: 0
        })
        this.props.fetchStartJson()
        this.props.removeAllOdds()
        localStorage.clear();
    }

    renderTicketChildren = (ticketValues) => {
              
        const prom = ticketValues.Odds.map((a) => a.MatchId)
        const unique = [...new Set(prom)]
        
        return unique.map((data, i) => <TicketChildItem key={i} matchId={data} data={ticketValues} />)
    }

    checkTheOddsLenght = () => {    
        const { Odds } = this.props.oddList
        let oddIdList = [];
        if (!Odds) {
            return null
        }

        oddIdList = Odds.map((a) => a.OddId)
        let nesto = oddIdList.length < 1 || oddIdList.length == 0 ? true : false
        return nesto
    }
    sistemInputChange = (e, name, ticketTotalValue, columns, sumColumns) => {
        e.preventDefault();
        let convertTotalAmount;
        let localCurentInputValue;
        convertTotalAmount = (this.state.localTotalAmount / sumColumns) * columns
        localCurentInputValue = e.target.value * columns     
        
        let localTicket = JSON.parse(localStorage.ticket)
        let colAmount = 0;
        let row = 0;
        localTicket.Bets.map((data, i) => name === data.GroupDescription ? colAmount = e.target.value : null)
        localTicket.Bets.map((data, i) => name === data.GroupDescription ? row = i : null)

        localTicket.operationType = 4;
        localTicket.isLive = false;
        localTicket.oddId = 0;
        localTicket.Bets[row].ColAmount = colAmount
        
        localStorage.setItem("ticket", JSON.stringify(localTicket));        
        this.props.oddsTicketList(localTicket)
        this.setState({
            localTotalAmount: +this.state.localTotalAmount-convertTotalAmount + localCurentInputValue,            
        })
        
    }

    addTotalAmount = (e, data) => {
        e.preventDefault()

        this.setState({
            localTotalAmount: e.target.value
        })       
    }

    checkBoxInput = (e, data, aktivan, cols) => {
        
        const localTicket = JSON.parse(localStorage.ticket)
        let row;

        localTicket.Bets.map((ata, i) => data === ata.GroupDescription ? row = i : null )
                
        localTicket.operationType = 4        
        
        let pormenaZnaka = !localTicket.Bets[row].IsActive        
        localTicket.Bets[row].IsActive = pormenaZnaka
        localTicket.isLive = false;
        localTicket.oddId = 0;
        
        localStorage.setItem("ticket", JSON.stringify(localTicket));
                
        this.setState({
            colsCalculateValue: 100
        })   

        if(localTicket.Bets[row].ColAmount != 0)
                this.props.oddsTicketList(localTicket)   
    }

    quickBet = (e) => {        
        if (e.charCode === 13) {                  
            if(this.state.quickChecked)
                this.focusInput();
                else this.focusDrop();
            this.props.quickBetAction(e.target.value)            
        }
    }

    getQuickBetsList = () => {
        const { Items } = this.props.getQuickBet
        if (!Items) return null
        const response = Items.map((data, i) => ({ key: i, text: data.OddType, value: data.OddValue, qCode: data.QuickCode }))        
        return response;
    }

    selectQuickBetOdd = (e, matchCode, oddValue) => {

        let oddsObject = oddValue.find(o => o.text === e.target.textContent)
        if (!oddsObject) return null

        const { value } = oddsObject
        let localTicket = JSON.parse(localStorage.ticket)

        localTicket.operationType = 1;
        localTicket.isLive = false;
        localTicket.matchId = matchCode;
        localTicket.oddId = value;
        
        localStorage.setItem("ticket", JSON.stringify(localTicket));
        this.props.oddsTicketList(localTicket)
    }

    selectQuickCode = (e, matchCode) => {
        const { Items } = this.props.getQuickBet
        if (!Items) return null

        if (e.charCode === 13) {
            let oddsObject = Items.find((o) => o.QuickCode === e.target.value)

            if (!oddsObject) return null
            const { OddValue } = oddsObject
            let localTicket = JSON.parse(localStorage.ticket)

            localTicket.operationType = 1;
            localTicket.isLive = false;
            localTicket.matchId = matchCode;
            localTicket.oddId = OddValue;

            localStorage.setItem("ticket", JSON.stringify(localTicket));
            this.props.oddsTicketList(localTicket)
        }
    }

    render() {
        let ticketValues;
        let ticketCols;
        let sumCols;
        let ticketType;

        if (this.props.ticket) {
            if (localStorage.getItem("ticket") === null) {                
                localStorage.setItem('ticket', JSON.stringify(this.props.ticket));
            }

            ticketValues = JSON.parse(localStorage.getItem('ticket'))
            ticketCols = ticketValues.Bets.map((data) => data.IsActive === true ? data.Cols : null)//.filter((e) => e != null)
            ticketType = ticketValues.TicketType;
            if (ticketCols.length > 0) {
                sumCols = ticketCols.reduce((cols, i) => cols + i)                
            }            
        }
        
        return (
            <div>
                <Checkbox style={{ width: '10%', float: 'left' }} onClick={() => this.setState({ quickChecked: !this.state.quickChecked })} checked={this.state.quickChecked} />
                <Modal trigger={<h5 onClick={this.handleOpen} style={{ cursor: 'pointer', width: '90%', textAlign: 'left' }}>USA IL QUICK CODE</h5>}
                    open={this.state.modalOpen}
                    onClose={this.handleClose}
                    size='fullscreen'
                >
                    {/* <Modal.Header>Profile Picture</Modal.Header> */}
                    <Modal.Content scrolling >
                        <table id="tabelica" style={{ width: '100%', backgroundColor: '#2e3338', borderSpacing: 0, color: 'white', borderCollapse: 'collapse' }}>
                            <tbody>
                                <tr>
                                    <th>Sport</th>
                                    <th>Gruppo</th>
                                    <th>Tipo</th>
                                    <th>Codice</th>
                                </tr>
                                {allOddsTable.map((data, i) =>
                                    <tr key={i}>
                                        <td>
                                            {data.Sport}
                                        </td>
                                        <td>
                                            {data.Gruppo}
                                        </td>
                                        <td>
                                            {data.Tipo}
                                        </td>
                                        <td>
                                            {data.Codice}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        {/* <Embed
                    active={true}
                    url='http://www.betvip.fun/sport/oddstype'
                    
                /> */}
                        {/* <Modal.Description>
                <Header>Modal Header</Header>
                <p>This is an example of expanded content that will cause the modal's dimmer to scroll</p>

            </Modal.Description>*/}
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='green' onClick={this.handleClose} inverted>
                            <Icon name='checkmark' /> Close
            </Button>
                    </Modal.Actions>
                </Modal>
                <div className="ui container">
                    <div className="ui row">
                        <div className="item">
                            <div className="ui input" style={{ width: '50%', float: 'left' }}>
                                <input type="text" placeholder="QUICK_BET" onKeyPress={(e) => this.quickBet(e)}  ref={this.textInputMain} onClick={() => this.setState({focus: false})} />
                            </div>

                            {this.state.quickChecked ?
                                <div className="ui input" style={{ width: '50%', float: 'right' }}>
                                    <input type="text" placeholder="Quick Code" onKeyPress={(e) => this.selectQuickCode(e, this.props.getQuickBet.MatchId)}  ref={this.textInput} />
                                </div>
                                :
                                <Dropdown
                                    ref={this.dropdownBrat}
                                    placeholder='Select Odd...'
                                    fluid
                                    selection                                    
                                    search 
                                    className={`${this.state.focus}`}
                                    //searchInput={{ autoFocus: this.state.focus}}
                                    style={{ width: '50%', float: 'right' }}
                                    options={this.getQuickBetsList()}
                                    onChange={(e) => this.selectQuickBetOdd(e, this.props.getQuickBet.MatchId, this.getQuickBetsList())}                                    
                                />
                            }
                            {/* <div className="ui input" style={{width: '50%'}}>
                        <input type="text" placeholder="0" />
                                </div> */}
                        </div>
                        {this.props.getQuickBet.ErrorMessage ?
                            <div className="ui label">
                                <i className="ui info circle icon"></i>
                                {this.props.getQuickBet.ErrorMessage}
                            </div>
                            :
                            <div className="ui text">
                                <h5>{this.props.getQuickBet.MatchName}</h5>
                            </div>
                        }
                    </div>
                </div>

                <div className="ui item">
                    <div className="ui left floated content">
                        <div className="ui header">
                            Remove all odds
                        </div>
                    </div>
                    <div className="ui right floated content">
                        <div className="ui icon button" onClick={this.removeAllOdds}>
                            <i className="close icon"></i>
                        </div>
                    </div>
                </div>
                <div className="ui items" style={customStyle}>
                    {ticketValues && this.renderTicketChildren(ticketValues)}
                    {/* {ticketValues && ticketValues.Odds.map((data, i) => <TicketChildItem key={i} data={data}/>)} */}
                    {/* {ticketValues &&  [...(new Set(ticketValues.Odds.map(({ MatchId }) => <button>{MatchId}</button>)))]} */}
                    {/* {ticketValues && Array.from(new Set(ticketValues.Odds.map(s => s.MatchId)))
                            .map(MatchId => <button>{MatchId}</button>)
                            } */}
                </div>

                {ticketType === 2  &&
                    <div>
                        <button className="ui toggle button" onClick={() => this.setState({ activeButton: false, localTotalAmount: 0 })}>MULTIPLA</button>
                        <button className="ui toggle button" onClick={() => this.setState({ activeButton: true, localTotalAmount: 0 })}>SISTEMA</button>
                    </div>
                }
                {
                    (ticketType === 4 || ticketType === 2 ) ? ticketValues.Bets.map((data, f) => {   
                        
                        data.ColAmount = 0
                        return (
                            <div className="ui middle aligned divided list">
                                <div className="item">
                                    <div className="right floated content">
                                        <div className="ui input">
                                            <DelayInput
                                                key={f}
                                                minLength={0}
                                                delayTimeout={500}
                                                type="text"
                                                placeholder="0"
                                                onChange={(e) => this.sistemInputChange(e, data.GroupDescription, ticketValues.TotalAmount,  data.Cols, sumCols)}
                                                value={data.IsActive ? this.state.localTotalAmount / sumCols : data.ColAmount}
                                                />
                                        </div>
                                    </div>
                                    
                                    <div className="ui left floated content">
                                        <div className="ui checkbox">
                                            <input type="checkbox"
                                            
                                                checked={data.IsActive}
                                                name={data.GroupDescription}
                                                onChange={(e) => this.checkBoxInput(e,data.GroupDescription, data.IsActive,  data.Cols)}
                                                />
                                            <label> {data.GroupDescription}</label>
                                        </div>

                                    </div>
                                    {data.Cols}
                                </div>
                            </div>
                        )
                    })

                            : null
                }
                {
                    <div className="ui middle aligned divided list">
                        <div className="item" style={{ border: "1px solid black" }}>
                            <div className="right floated content">
                                <div className="ui input">
                                    <DelayInput type="text" placeholder="0" value={this.state.localTotalAmount}
                                        delayTimeout={500}
                                        onChange={(e) => this.addTotalAmount(e)}
                                    />
                                </div>
                            </div>
                            <div className="ui left floated content">
                                <div className="content">
                                    TOTAL AMOUNT
                            </div>
                            </div>
                        </div>
                    </div>
                }
                {
                    (this.state.activeButton === true && (ticketType === 2 || ticketType === 4 )) && <div className="ui middle aligned divided list">
                        <div className="item">
                            <div className="right floated content">
                                <div className="ui input">
                                    <input type="text" placeholder="0" />
                                </div>
                            </div>
                            <div className="content">
                                MULTIPLA
                            </div>

                        </div>
                    </div>
                }

                <div className="ui middle aligned divided list">
                    <div className="item">
                        <div className="right floated content">
                            <div className="ui purple label">{ticketValues && ticketValues.OddsNumber}</div>
                        </div>
                        <div className="content">
                            EVENTI
                </div>
                    </div>
                    <div className="item">
                        <div className="right floated content">
                            <div className="ui purple  label">{ticketValues && ticketValues.MaxPerc}</div>
                        </div>
                        <div className="content">
                            MOLTIPLICAORE
                </div>
                    </div>
                    <div className="item">
                        <div className="right floated content">
                            <div className="ui purple  label">{ticketValues && ticketValues.Cols}</div>
                        </div>
                        <div className="content">
                            COLONNE
                </div>
                    </div>
                    <div className="item">
                        <div className="right floated content">
                            <div className="ui purple  label">{ticketValues && ticketValues.MaxBonus}</div>
                        </div>
                        <div className="content">
                            BONUS MAX
                </div>
                    </div>
                    <div className="item">
                        <div className="right floated content">
                            <div className="ui purple  label">{ticketValues && ticketValues.MinBonus}</div>
                        </div>
                        <div className="content">
                            BONUS MIN
                </div>
                    </div>
                    <div className="item">
                        <div className="right floated content">
                            <div className="ui purple  label">{ticketValues && ticketValues.MaxWin}</div>
                        </div>
                        <div className="content">
                            VINCITA MAX
                </div>
                    </div>
                    <div className="item">
                        <div className="right floated content">
                            <div className="ui purple  label">{ticketValues && ticketValues.MinWin}</div>
                        </div>
                        <div className="content">
                            VINCITA MIN
                </div>
                    </div>
                    <div className="item">
                        <div className="right floated content">
                            <div className="ui purple  label">{ticketValues && ticketValues.MaxTotalWin}</div>
                        </div>
                        <div className="content">
                            VINCITA TOTALE MAX
                </div>
                    </div>
                    <div className="item">
                        <div className="right floated content">
                            <div className="ui purple  label">{ticketValues && ticketValues.MinTotalWin}</div>
                        </div>
                        <div className="content">
                            VINCITA TOTALE MIN
                </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ ticket, oddList, getQuickBet }) => ({ ticket, oddList, getQuickBet })
export default connect(mapStateToProps, { fetchStartJson, removeAllOdds, oddsTicketList, quickBetAction })(TicketGenerator);


