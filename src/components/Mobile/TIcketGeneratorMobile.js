import React, { Component } from 'react';
import { DelayInput } from 'react-delay-input';
import { connect } from 'react-redux';
import { fetchStartJson, removeAllOdds, oddsTicketList, quickBetAction, changeOddValueType, fetchUserAgency} from '../../actions';
import TicketChildItem from '../TicketChildItem';
import { allOddsTable } from '../../json/allOddsTable';
import { Button, Modal, Icon, Label , Dropdown, Checkbox, Table, TransitionablePortal, Tab } from 'semantic-ui-react';


class TicketGeneratorMobile extends Component {
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
            focus: false,
            multiplaValue: 0,
            showModal: false
        }
        this.textInput = React.createRef();
        this.dropdownBrat = React.createRef();
        this.dropdownAgenzia = React.createRef();
        this.textInputMain = React.createRef();

        this.focusInput = this.focusInput.bind(this);
        this.focusDrop = this.focusDrop.bind(this);
        
        localStorage.setItem("OddType", JSON.stringify(0));
        this.localstorageExparation()       
    }

    closeModal = () => {
        this.setState({ showModal: false })
      }
    handleDimmer = () => this.setState({ dimmerActive: !this.dimmerActive })
    
    localstorageExparation = () =>{
        let token;
        if (!localStorage.getItem("userToken"))
            {
                token = JSON.parse(localStorage.getItem('userToken'))
                this.props.fetchUserAgency(token)
            }
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
        this.setState({ focus: true })

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
        localStorage.setItem('OddType', 0);
    }

    renderTicketChildren = (ticketValues, ticketType) => {

        const prom = ticketValues.Odds.map((a) => a.MatchId)
        const unique = [...new Set(prom)]

        return unique.map((data, i) => <TicketChildItem key={i} matchId={data} data={ticketValues} ticketType={ticketType} />)
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
            localTotalAmount: +this.state.localTotalAmount - convertTotalAmount + localCurentInputValue,
        })

    }
    resetLocalTicketOdds() {
        let localTicket = JSON.parse(localStorage.ticket)
        console.log('LOCALNI TIKET', localTicket)

        localTicket.Bets.map((data, i) => (data.ColAmount = 0, data.IsActive = false))

        localTicket.operationType = 4;
        localTicket.isLive = false;
        localTicket.oddId = 0;

        localStorage.setItem("ticket", JSON.stringify(localTicket));
        this.props.oddsTicketList(localTicket)
        this.setState({
            multiplaValue: 0
        })
     
    }

    sistemInputChangeMultipla = (e, name, ticketTotalValue, columns, sumColumns) => {
        e.preventDefault();

        let localTicket = JSON.parse(localStorage.ticket)

        localTicket.operationType = 4;
        localTicket.isLive = false;
        localTicket.oddId = 0;
        localTicket.Bets[0].ColAmount = e.target.value

        //localStorage.setItem("ticket", JSON.stringify(localTicket)); //@Zare ovo je jos uvek pod znakom pitanja
        this.props.oddsTicketList(localTicket)

        this.setState({
            multiplaValue: e.target.value
        })
        // this.setState({
        //     localTotalAmount: +this.state.localTotalAmount - convertTotalAmount + localCurentInputValue,
        // })

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

        localTicket.Bets.map((ata, i) => data === ata.GroupDescription ? row = i : null)

        localTicket.operationType = 4

        let pormenaZnaka = !localTicket.Bets[row].IsActive
        localTicket.Bets[row].IsActive = pormenaZnaka
        localTicket.isLive = false;
        localTicket.oddId = 0;

        localStorage.setItem("ticket", JSON.stringify(localTicket));

        this.setState({
            colsCalculateValue: 100
        })

        if (localTicket.Bets[row].ColAmount != 0)
            this.props.oddsTicketList(localTicket)
    }

    quickBet = (e) => {
        if (e.charCode === 13) {
            if (this.state.quickChecked)
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

    getUserAgencyInfo = () => {
        if(!this.props.userAgency) return null;
        const { Items } = this.props.userAgency
        if (Items === null) return null
        const response = Items.map((data, i) => ({ key: i, text: data.Text, value: data.Value, id: data.Id }))
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
    multiplaButton() {
        this.resetLocalTicketOdds()
        this.setState({ activeButton: false, localTotalAmount: 0 })
    }
    sistemaButton() {
        this.resetLocalTicketOdds()
        this.setState({ activeButton: true, localTotalAmount: 0 })
    }

    handleAnimationChange = animation => () =>
    this.setState(prevState => ({ animation, visible: !prevState.visible }))

    handleCloseTicket= close => () =>{
        this.setState({ visible: false })
    }
    numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    isNumberOdd(num){
        return num % 2;
    }
    render() {
        let ticketValues;
        let ticketCols;
        let sumCols;
        let ticketType;

        const { active } = this.state
        const { animation, dimmed, direction, visible } = this.state
        const vertical = direction === 'bottom' || direction === 'top'

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
             <TransitionablePortal transition={{ animation: 'slide up', duration: 300 }} 
             open={this.state.showModal}
             trigger={<Button onClick={() => this.setState({showModal: true})} id="push-dugme" > <Icon name='list ol' size={'big'} /> 
             <Label circular key={'red'}>
             {ticketValues && ticketValues.OddsNumber}
             </Label></Button>}>
             <Modal closeIcon onClose={this.closeModal} open={this.state.showModal} className="fullscreen"  
             >
             <Modal.Header>
                 TICKET                        
                <i className="trash small icon"  onClick={this.removeAllOdds}></i> 
                {ticketType === 2 &&
                    <Table  unstackable celled className="ticket-modal-table">
                        <Table.Body>
                            <Table.Row>
                               
                                <Table.Cell>
                                <Button className="modal-ticket-header-button"  onClick={() => this.multiplaButton()} >MULTIPLA</Button>
                                </Table.Cell>
                                <Table.Cell >
                                <Button className="modal-ticket-header-button" onClick={() => this.sistemaButton()}>SISTEMA</Button>
                                </Table.Cell>
                            </Table.Row>
                        </Table.Body>                      
                    </Table>
                }                       
             
                    
             
            </Modal.Header>
        
            <Modal.Content scrolling>
    
              
                <div className="ui items customized">
                    {ticketValues && this.renderTicketChildren(ticketValues, ticketType)}             
                </div>

            
                {/* {
                    (ticketType === 4 || ticketType === 2) && this.state.activeButton === true ? ticketValues.Bets.map((data, f) => {

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
                                                onChange={(e) => this.sistemInputChange(e, data.GroupDescription, ticketValues.TotalAmount, data.Cols, sumCols)}
                                                value={data.IsActive ? this.state.localTotalAmount / sumCols : data.ColAmount}
                                            />
                                        </div>
                                    </div>

                                    <div className="ui left floated content">
                                        <div className="ui checkbox">
                                            <input type="checkbox"
                                                checked={data.IsActive}
                                                name={data.GroupDescription}
                                                onChange={(e) => this.checkBoxInput(e, data.GroupDescription, data.IsActive, data.Cols)}
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
                {this.state.activeButton === true &&
                    <div className="ui middle aligned divided list">
                        <div className="item">
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
                

                <div className="ui middle aligned divided list" >
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
                <Dropdown
                                    ref={this.dropdownAgenzia}
                                    placeholder='Select Odd...'
                                    fluid
                                    selection
                                    search      
                                    className="dropdown-users-agency"                                       
                                    options={this.getUserAgencyInfo()}
                                    // onChange={(e) => this.selectQuickBetOdd(e, this.props.getQuickBet.MatchId, this.getQuickBetsList())}
                                />
              
                                   */}
                </Modal.Content>
                <Modal.Actions className="ticket-modal">
                {/* <Checkbox className="checkbox-importo" label='TRASFERIMENTO IMPORTO'  />
                <Checkbox className="checkbox-accetta" label='ACCETTA CAMBIO DI QUOTA'  />
                <Checkbox className="checkbox-stampa" label='STAMPA TICKET'  />   */}
                        { (this.state.activeButton === false && (ticketType === 2 || ticketType === 4)) &&
                       <Table celled unstackable className="mobile-ticket-table">
                            <Table.Row>
                                <Table.Cell  width={6}>
                                Eventi: {ticketValues && ticketValues.OddsNumber}
                                </Table.Cell>
                                <Table.Cell width={10} className="float-right-ticket-cell">
                                Moltiplicatore: {ticketValues && ticketValues.MaxPerc}
                                </Table.Cell>
                            </Table.Row>
                          
                            <Table.Row>
                                <Table.Cell>
                                    Multipla 
                                </Table.Cell>
                                
                                <Table.Cell className="table-input-cell">
                                   < div className="ui input">
                                    <DelayInput
                                        minLength={0}
                                        delayTimeout={500}
                                        type="text"
                                        placeholder="0"
                                        onChange={(e) => this.sistemInputChangeMultipla(e)}
                                        value={this.state.multiplaValue}
                                    />
                                </div>                                
                                </Table.Cell>
                          
                            </Table.Row>                            
                            
                            <Table.Row>
                                <Table.Cell>
                                Vincita Max
                                </Table.Cell>
                                <Table.Cell selectable className="scommetti-ticket-cell">                                
                                         <p>SCOMMETTI</p>
                                         <p className="total-amount">{ticketValues && this.numberWithCommas(ticketValues.MaxWin)}</p>                        
                                </Table.Cell>
                            </Table.Row>
                        </Table>  }
                             {
                                 (ticketType === 4 || ticketType === 2) && this.state.activeButton === true && 
                                 <div className="ui grid" id="input-sistema-ticket">
                                     <div className="eight wide mobile left aligned column">
                                     Eventi: {ticketValues && ticketValues.OddsNumber}                      
                                     </div>
                                     <div className="eight wide mobile right aligned column">
                                     Moltiplicatore: {ticketValues && ticketValues.MaxPerc}
                                     </div>
                                     <div className="ui grid inner" id="input-sistema-ticket">
                                {ticketValues.Bets.map((data, f) => { 
                                    
                                    return(
                                        
                                        <div className="eight wide mobile column" >       
                                            <div className="ui grid"  >
                                                <div className="stretched row">
                                                <div className="ten wide column">
                                            <DelayInput
                                                key={f}
                                                minLength={0}
                                                delayTimeout={500}
                                                type="text"
                                                placeholder={data.GroupDescription}
                                                onChange={(e) => this.sistemInputChange(e, data.GroupDescription, ticketValues.TotalAmount, data.Cols, sumCols)}
                                                value={data.IsActive ? this.state.localTotalAmount / sumCols : "" /*data.ColAmount*/}
                                            />                                
                                            </div>
                                                 
                                            <div className="four wide column">
                                                
                                            
                                        <div className="ui checkbox">
                                            <input type="checkbox"
                                                checked={data.IsActive}
                                                name={data.GroupDescription}
                                                onChange={(e) => this.checkBoxInput(e, data.GroupDescription, data.IsActive, data.Cols)}
                                            />
                                            <label> {data.Cols}</label>
                                           
                                        </div>
                                        </div>
                                        </div>
                                        </div>

                                    
                                                         
                                </div>
                           
                                
                                
                                    )
                               
                                })   
                            }
                            </div>
                            
                              <div class="two column row" id="input-sistema-ticket-row">
                             <div className="eight wide mobile middle aligned column">
                             Vincita Max             
                                     </div>
                                     <div className="eight wide mobile column scommetti-ticket-cell" >
                                     <p>SCOMMETTI</p>
                                         <p className="total-amount">{ticketValues && this.numberWithCommas(ticketValues.MaxWin)}</p>  
                                     </div>
                                     </div>
                                     
                                     </div>     
                            }
                                         
                
                                                                                       
                </Modal.Actions>
         
            </Modal>
                          
            </TransitionablePortal>
            
            </div>
        )
    }
}

const mapStateToProps = ({ ticket, oddList, getQuickBet, userAgency }) => ({ ticket, oddList, getQuickBet, userAgency })
export default connect(mapStateToProps, { fetchStartJson, removeAllOdds, oddsTicketList, quickBetAction, changeOddValueType, fetchUserAgency })(TicketGeneratorMobile);


