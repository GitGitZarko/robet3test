import React, { Component } from 'react';
import _ from 'lodash'
import { DelayInput } from 'react-delay-input';
import { connect } from 'react-redux';
import { fetchStartJson, removeAllOdds, oddsTicketList, quickBetAction } from '../actions';
import TicketChildItem from './TicketChildItem';
import { Button, Header, Icon, Image, Modal, Embed, Dropdown, Checkbox } from 'semantic-ui-react';


const customStyle = {
    background: 'yellow',
    border: '1px solid black',
    padding: '5px'
}

const friendOptions = [
    {
      key: 'Jenny Hess',
      text: 'Jenny Hess',
      value: 'Jenny Hess',
      image: { avatar: true, src: '/images/avatar/small/jenny.jpg' },
    },
    {
      key: 'Elliot Fu',
      text: 'Elliot Fu',
      value: 'Elliot Fu',
      image: { avatar: true, src: '/images/avatar/small/elliot.jpg' },
    },
    {
      key: 'Stevie Feliciano',
      text: 'Stevie Feliciano',
      value: 'Stevie Feliciano',
      image: { avatar: true, src: '/images/avatar/small/stevie.jpg' },
    },
    {
      key: 'Christian',
      text: 'Christian',
      value: 'Christian',
      image: { avatar: true, src: '/images/avatar/small/christian.jpg' },
    },
    {
      key: 'Matt',
      text: 'Matt',
      value: 'Matt',
      image: { avatar: true, src: '/images/avatar/small/matt.jpg' },
    },
    {
      key: 'Justen Kitsune',
      text: 'Justen Kitsune',
      value: 'Justen Kitsune',
      image: { avatar: true, src: '/images/avatar/small/justen.jpg' },
    },
  ]
  


//OVO JE JEDNOSTAVNI BUTTON COMPONENT koji prima samo color prop i textValue zasto
class TicketGenerator extends Component {
    constructor(props) {
        super(props); 
        this.timeout =  0;
        this.props.fetchStartJson()
        this.state = {
            storageIsClear: false,
            activeButton: false,
            modalOpen: false,
            reRender: Boolean,
            quickChecked: false         
        }
      }

    // renderujOddListu(){    
    //     return this.props.oddList.map((name, i) => {
    //         // console.log('PROPS inside map', name.TournamentCode);
    //         return (
    //             <div className="ui middle aligned divided list">
    //            <TicketChildItem  key={i} objekat={name}/>
    //            </div>
    //         )
    //    })
    // }
    handleOpen = () => this.setState({ modalOpen: true })
    handleClose = () => this.setState({ modalOpen: false })

    removeAllOdds = () => {
        
        this.setState({
            storageIsClear: true
        })        
        this.props.fetchStartJson()
        this.props.removeAllOdds()
        localStorage.clear();
    }    
        
        
    
    renderTicketChildren = (ticketValues) => {
        // console.log("Iz funkcije", ticketValues)        
        const prom = ticketValues.Odds.map((a) => a.MatchId)
        const unique = [...new Set(prom)]
        // console.log("Iz funkcije 2", unique)
        // this.checkTheOddsLenght()

        return unique.map((data, i) => <TicketChildItem key={i} matchId={data} data={ticketValues}/>)
    }

    checkTheOddsLenght = () => {
        //console.log(unique.lenght)
        // let localTicket = JSON.parse(localStorage.ticket)
        // let oddIdList = localTicket.Odds.map((a) => a.OddId)
        const { Odds }  = this.props.oddList
        let oddIdList = [];
        if(!Odds){
            return null
        }
        
        console.log("konzolica: ", Odds.map((a) => a.OddId))
         oddIdList =  Odds.map((a) => a.OddId)
         let nesto = oddIdList.length < 1 || oddIdList.length == 0 ? true : false
        return nesto        
    }   
    sistemInputChange = (e, name) => {
        e.preventDefault();       
            console.log(e.target.value)
            let localTicket = JSON.parse(localStorage.ticket)
            let colAmount = 0;
            let row = 0;
        const noviTiket = localTicket.Bets.map((data, i) => name === data.GroupDescription ? (colAmount = e.target.value, row = i) : null)

        localTicket.operationType = 4;
        localTicket.Bets[row].ColAmount = colAmount
        console.log("resenje tiketa: " , localTicket)
            
    //   localTicket.isLive = false;
    //   localTicket.matchId = matchCode;
    //   localTicket.oddId = oddCode;
      //localTicket.Bets[0].ColAmount = 200;  // THIS IS HARD CODED, IT IS JUST FOR TESTING
      //console.log("BETOVI :  ", localTicket.Bets[0].ColAmount)

    localStorage.setItem("ticket", JSON.stringify(localTicket));
    //   // console.log("TIKETARA", localTicket)
        this.props.oddsTicketList(localTicket)
        
    }
    addTotalAmount = (e, data) => {
        e.preventDefault()
     
        console.log(e.target.value)
        let localTicket = JSON.parse(localStorage.ticket)
        // let colAmount = 0;
        // let row = 0;
        //   const noviTiket = localTicket.Bets.map((data, i) => name === data.GroupDescription ? (colAmount = e.target.value, row = i) : null)
            
            localTicket.operationType = 4;
            localTicket.TotalAmount = parseInt(e.target.value)
        //     localTicket.Bets[row].ColAmount = colAmount
        //     console.log("resenje tiketa: " , localTicket)
                
        // //   localTicket.isLive = false;
        // //   localTicket.matchId = matchCode;
        // //   localTicket.oddId = oddCode;
        // //localTicket.Bets[0].ColAmount = 200;  // THIS IS HARD CODED, IT IS JUST FOR TESTING
        // //console.log("BETOVI :  ", localTicket.Bets[0].ColAmount)

        localStorage.setItem("ticket", JSON.stringify(localTicket));
        // //   // console.log("TIKETARA", localTicket)
        console.log("sta daje: ", localTicket)
         this.props.oddsTicketList(localTicket)
        
            
    }


    checkBoxInput = (data) => {      
            
            let localTicket = JSON.parse(localStorage.ticket)
            let row = 0;
            localTicket.Bets.map((ata, i) => data === ata.GroupDescription ?  row = i : null)

            localTicket.operationType = 4;            
            localTicket.Bets[row].IsActive = localTicket.Bets[row].IsActive ? false : true;
            console.log("resenje tiketa: " , localTicket, row)
                
        //   localTicket.isLive = false;
        //   localTicket.matchId = matchCode;
        //   localTicket.oddId = oddCode;
        //localTicket.Bets[0].ColAmount = 200;  // THIS IS HARD CODED, IT IS JUST FOR TESTING
        //console.log("BETOVI :  ", localTicket.Bets[0].ColAmount)

        localStorage.setItem("ticket", JSON.stringify(localTicket));
        console.log("TIKETARA", localTicket)
        this.props.oddsTicketList(localTicket) 
    }
    quickBet = (e) => {
        
        console.log("ovo je vratilo cedo: ", e.target.value)
        if(e.charCode === 13){
            this.props.quickBetAction(e.target.value)
            console.log("ovo je vratilo cedo2: ", this.props.getQuickBet)
        }
        
    }
    getQuickBetsList = () =>{
        const { Items }  = this.props.getQuickBet
        if(!Items) return null
        const response =  Items.map((data, i) => ({key: i, text: data.OddType, value: data.OddValue, qCode: data.QuickCode}) )        
        console.log(response)
        return response;

    }
    selectQuickBetOdd = (e, matchCode, oddValue) => {
        
        let oddsObject = oddValue.find(o => o.text === e.target.textContent)     

        if(!oddsObject) return null

        const { value } = oddsObject
         let localTicket = JSON.parse(localStorage.ticket)
            
            localTicket.operationType = 1;            
            localTicket.isLive = false;
            localTicket.matchId = matchCode;
            localTicket.oddId = value;
        // //localTicket.Bets[0].ColAmount = 200;  // THIS IS HARD CODED, IT IS JUST FOR TESTING
        

        localStorage.setItem("ticket", JSON.stringify(localTicket));        
        this.props.oddsTicketList(localTicket)    
    }

    selectQuickCode = (e, matchCode) => {
        const { Items }  = this.props.getQuickBet
        if(!Items) return null

        if(e.charCode === 13){
        let oddsObject = Items.find((o) => o.QuickCode === e.target.value)
        
        if(!oddsObject) return null
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
    if(this.props.ticket){         
        if(localStorage.getItem("ticket") === null){          
            console.log("KKK: ",this.props.ticket)   
            localStorage.setItem('ticket', JSON.stringify(this.props.ticket));   
        }
        
        ticketValues = JSON.parse(localStorage.getItem('ticket')) 
        ticketCols = ticketValues.Bets.map((data) =>  data.IsActive === true ? data.Cols : null).filter((e) => e != null)
        if(ticketCols.length > 0) {
            sumCols = ticketCols.reduce((cols, i) => cols + i)
            console.log("colsssss:   :::  "+sumCols + "   sss    ", ticketCols.length)    
            }
    }         
    
   
    return (    
        <div>
            <Checkbox style={{width: '10%', float: 'left'}} onClick={() => this.setState({quickChecked: !this.state.quickChecked})} checked={this.state.quickChecked}/>
            <Modal trigger={<h5 onClick={this.handleOpen} style={{cursor: 'pointer', width: '90%', textAlign: 'left'}}>USA IL QUICK CODE</h5>}
            open={this.state.modalOpen}
            onClose={this.handleClose}
            size='fullscreen'
            
            >
            {/* <Modal.Header>Profile Picture</Modal.Header> */}
            <Modal.Content scrolling >            
            <Embed
                    active={true}
                    url='http://www.betvip.fun/sport/oddstype'
                    
                />
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
                        <div className="ui input" style={{width: '50%', float: 'left'}}>
                            <input type="text" placeholder="QUICK_BET" onKeyPress={(e) => this.quickBet(e)} />
                        </div>  
                        
                      {  this.state.quickChecked ? 
                                <div className="ui input" style={{width: '50%', float: 'right'}}>
                                <input type="text" placeholder="Quick Code" onKeyPress={(e) => this.selectQuickCode(e, this.props.getQuickBet.MatchId)} />
                                </div>  
                                : 
                                <Dropdown
                                placeholder='Select Odd...'
                                fluid
                                selection
                                search
                                style={{width: '50%', float: 'right'}}
                                options={this.getQuickBetsList()}
                                onChange={(e) => this.selectQuickBetOdd(e, this.props.getQuickBet.MatchId, this.getQuickBetsList())}
                            />
                      }
                    {/* <div className="ui input" style={{width: '50%'}}>
                        <input type="text" placeholder="0" />
                                </div> */}
                        </div> 
                        {   this.props.getQuickBet.ErrorMessage ?
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
        
               
                   { !this.checkTheOddsLenght() &&   
                            <div>
                            <button className="ui toggle button" onClick={() => this.setState({ activeButton: false})}>MULTIPLA</button> 
                            <button className="ui toggle button" onClick={() => this.setState({ activeButton: true})}>SISTEMA</button>
                            </div>                                    
                       
                   
                   }
            {
                this.state.activeButton && ticketValues.Bets.map((data) => {                    
                    return(                        
                        <div className="ui middle aligned divided list">
                            <div className="item">
                            <div className="right floated content">
                            <div className="ui input">
                                <DelayInput
                                    minLength={0}
                                    delayTimeout={500} 
                                    type="text" 
                                    placeholder="0" 
                                    onChange={(e) => this.sistemInputChange(e, data.GroupDescription)}
                                    value={data.IsActive ? ticketValues.TotalAmount/sumCols : data.ColAmount}/>
                                </div>
                            </div>                
                            <div className="ui left floated content">
                            <div className="ui checkbox">
                                <input type="checkbox"
                                checked={data.IsActive}
                                name={data.GroupDescription} 
                                onChange={() => this.checkBoxInput(data.GroupDescription)}
                                />
                                <label> { data.GroupDescription }</label>
                            </div>
                               
                            </div>
                            {data.Cols}
                            </div>
                            </div>                            
                    )
                })
                
                
            }
            {
                    <div className="ui middle aligned divided list">
                    <div className="item" style={{border: "1px solid black"}}>
                            <div className="right floated content">
                            <div className="ui input">
                                <DelayInput type="text" placeholder="0" value={ticketValues && ticketValues.TotalAmount}
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
                !this.state.activeButton && <div className="ui middle aligned divided list">    
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
    
const mapStateToProps = ({ ticket, oddList, getQuickBet }) => ({ ticket, oddList, getQuickBet})
export default connect(mapStateToProps, { fetchStartJson, removeAllOdds, oddsTicketList, quickBetAction})(TicketGenerator);