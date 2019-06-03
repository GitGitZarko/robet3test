import React, { Component } from 'react';
import { Header, Table, Button, SegmentInline, Ref, Grid, Dropdown } from 'semantic-ui-react'
import MainButtonList from './MainButtonList';
import SecondButtonList from './SecondButtonList';
import ThirdButtonList from './ThirdButtonList';
import '../public/css/Sports.css';
import { connect } from 'react-redux';
import { callFromBox, updateChampList, oddsTicketList, removeChampFromList, fetchSingleMatch } from '../actions';


class TestComponent extends Component {
   constructor(props) {
      super(props);
      this.state = {
         isHidden: false,
         secondGroup: [],
         thirdGroup: [],
         tournamentCode: '',
         sportCode: '',
         DescriptionOrder: 0,
         broj: Number,
         reRendered: Boolean,
         updateBox: [],
         selectedValue: '',
         oddTypeValue: 0
      }
      this.buttonRef = React.createRef();
   }
  
   ajdeKlikni = (e) => {
      e.preventDefault();
      const { TounamentSpecialMainList, SportCode, TournamentCode } = this.props.objekat;
      if (!TounamentSpecialMainList) {
         return null;
      }

      this.setState({
         isHidden: !this.state.isHidden,

      })


      //this.props.callFromBox(TournamentCode, SportCode, refOrangeButton)
      this.props.updateChampList(TournamentCode, SportCode, this.state.updateBox)

   }

   renderTounamentSpecialMainList() {
      const { TounamentSpecialMainList, SportCode, TournamentCode } = this.props.objekat;
      if (!TounamentSpecialMainList) {
         return null;
      }

      return TounamentSpecialMainList.map((special, i) => {
         return <MainButtonList key={i} kljuc={i} special={special} scode={SportCode} tcode={TournamentCode} renderSecondButtonList={this.renderSecondButtonList.bind(this)} />
         const redButtons = special.TournamentSpecialMatchList.map((data) => <div style={{ display: 'inline-block' }} onClick={(e) => this.thirdButtons(e, data)}><SecondButtonList color="red" textValue={data.Text}></SecondButtonList> </div>)
         const blueButtons = special.TournamentSpecialMatchList.map((data) => data.Items.map((ata) => <SecondButtonList color="blue" textValue={ata.Text}></SecondButtonList>))
      })
   }
   renderSecondButtonList(broj, data) {
      if (broj === undefined) return console.log("greska", broj)

      const { TounamentSpecialMainList } = this.props.objekat;
      if (!TounamentSpecialMainList) {
         return null;
      }
      const { TournamentSpecialMatchList } = TounamentSpecialMainList[broj]      
      const ajdeVise = TournamentSpecialMatchList.map((data, i) => <SecondButtonList imeDugmeta={data.Text} key={i} kljuc={i} special={data} renderThirdButtonList={this.renderThirdButtonList.bind(this)} />)

      this.setState({
         secondGroup: ajdeVise,
         thirdGroup: [],
         updateBox: data[0].Value
      })      
   }
   renderThirdButtonList(broj, data) {
      if (broj === undefined) return console.log("greska", broj)

      const { TounamentSpecialMainList } = this.props.objekat;
      if (!TounamentSpecialMainList) {
         return null;
      }

      const ajdeVise = data.Items.map((a, i) => <ThirdButtonList key={i} data={data} value={a.Value} imeDugmeta={a.Text} />)

      this.setState({
         thirdGroup: ajdeVise
      })  
   }

   renderTounementMainTitleList() {
      const { TounementMainTitleList } = this.props.objekat;

      if (!TounementMainTitleList) {
         return null;
      }

      return TounementMainTitleList.map((name, a) => {
         return (
            <Table.HeaderCell key={a} textAlign="center" colSpan={name.numeroScommesse}>{name.nome}</Table.HeaderCell>
         )
      })
   }
   renderTitleList() {
      const { TounementTitleList } = this.props.objekat;

      if (!TounementTitleList) {
         return null;
      }
      return (
         <Table.Row>
            <Table.HeaderCell >Match</Table.HeaderCell>
            {TounementTitleList.map((name, f) => <Table.HeaderCell key={f} textAlign="center" >{name.nome}</Table.HeaderCell>)}
         </Table.Row>
      );
   }

   addOddToTicket = (e, sportCode, tourCode, oddType, oddValue, matchName, oddGroup, oddCode, matchCode) => {
      e.preventDefault();
      const { IsAntepost } = this.props.objekat;

      this.setState({
         reRendered: !this.state.reRendered
      })

      let localTicket = JSON.parse(localStorage.ticket)

      localTicket.isLive = false;
      localTicket.matchId = IsAntepost ? tourCode : matchCode;
      localTicket.oddId = oddCode;
      localTicket.operationType = 1;

      localStorage.setItem("ticket", JSON.stringify(localTicket));
      this.props.oddsTicketList(localTicket)
   }

   singleMatchView = (e, code, date, name) => {
      e.preventDefault();
      this.props.fetchSingleMatch(code, date, name);
   }

   componentDidMount() {      
      const oddTypeValue = JSON.parse(localStorage.OddType);
      this.setState({ oddTypeValue });
    }
    componentDidUpdate(prevProps) {    
      if (this.props.changeOddValue !== prevProps.changeOddValue) {
         const oddTypeValue = JSON.parse(localStorage.OddType);
         this.setState({ oddTypeValue: oddTypeValue });
      }
      
    }

   renderTournamentMatchList() {
      const { TournamentMatchList } = this.props.objekat;
      const { Odds } = this.props.oddList
      const { IsAntepost } = this.props.objekat;
      let oddIdList = [];
      let oddType = JSON.parse(localStorage.OddType);

      if (localStorage.getItem("ticket") !== null) {
         let localTicket = JSON.parse(localStorage.getItem('ticket'))
         oddIdList = localTicket.Odds.map((a) => a.OddId)
      }
      if (!TournamentMatchList) {
         return null;
      }

      return TournamentMatchList.map(val => {        
         return (
            <Table.Row>
               <Table.Cell width="three" className="table-cell">
                  <Header.Content>
                     {!IsAntepost ? val.QuickMatchCode + " " + val.MatchDate : null}
                     <Header.Subheader className="betvip-subheader" onClick={(e) => this.singleMatchView(e, val.MatchCode, val.MatchDate, val.MatchName)}>
                        {val.MatchName}
                     </Header.Subheader>

                  </Header.Content>
               </Table.Cell>
               {!this.props.objekat.IsSpecial ?
                  val.TournamentMatchOddList.map((odds, o) =>
                     <Table.Cell
                        key={o}
                        textAlign="center"
                        width="one"
                        selectable
                        active={oddIdList.includes(odds.OddCode) ? true : false}
                        style={{ cursor: 'pointer' }}
                        onClick={(e) =>
                           // this.addOddToTicket(e, this.props.objekat.SportCode, this.props.objekat.TournamentCode, odds.OddType, odds.OddValue, val.MatchName, odds.OddGroup)}>
                           this.addOddToTicket(e, this.props.objekat.SportCode, this.props.objekat.TournamentCode, odds.OddType, odds.OddValue, val.MatchName, odds.OddGroup, odds.OddCode, val.MatchCode)}>
                              {/* {
                                 this.state.oddTypeValue == 0 ? odds.OddValue : (this.state.oddTypeValue == 1 ? odds.OddValueAmerican : odds.OddValueFraction) 
                              } */}
                        {this.props.changeOddValue == 0 ? odds.OddValue : (this.props.changeOddValue == 1 ? odds.OddValueAmerican : odds.OddValueFraction) }
                     </Table.Cell>
                  ) : val.TournamentMatchOddList.map((odds, o) =>
                     <Button className="moje-dugme"
                        key={o}
                        style={{ textAlign: 'left', margin: 0, width: '25%', borderRadius: 0 }}
                        active={oddIdList.includes(odds.OddCode) ? true : false}
                        onClick={(e) =>
                           // this.addOddToTicket(e, this.props.objekat.SportCode, this.props.objekat.TournamentCode, odds.OddType, odds.OddValue, val.MatchName, odds.OddGroup)}>
                           this.addOddToTicket(e, this.props.objekat.SportCode, this.props.objekat.TournamentCode, odds.OddType, odds.OddValue, val.MatchName, odds.OddGroup, odds.OddCode, val.MatchCode)}>
                        {odds.OddType}
                        <span style={{ float: 'right' }}>
                        {this.props.changeOddValue == 0 ? odds.OddValue : (this.props.changeOddValue == 1 ? odds.OddValueAmerican : odds.OddValueFraction) }
                        {/* {odds.OddValue} */}
                        
                        </span>
                     </Button>
                  )

               }

            </Table.Row>
            // <Table.Table.Cell>{val.MatchCode}</Table.Table.Cell>
            // <Table.Table.Cell>{val.MatchCode}</Table.Table.Cell>
            // <Table.Table.Cell>{val.MatchCode}</Table.Table.Cell>
            // <Table.Table.Cell>{val.MatchCode}</Table.Table.Cell>
         )
      })
   }
   thirdButtons(e, data) {
      e.preventDefault();      
      this.setState({
         thirdGroup: data.Items
      })
   }
   removeChampFromList = () => {
      const { SportCode, TournamentCode } = this.props.objekat
      this.props.removeChampFromList(TournamentCode, SportCode);
   }

   getAllOddsGroups = () => {
      const { TounamentGroupList } = this.props.objekat
      if (!TounamentGroupList) return null
      const rezultat = TounamentGroupList.map((data, i) => ({ key: i, text: data.Text, value: data.Value }))

      return rezultat;
   }
   //MAX IMPORTANT EXTRUDE VALUE FROM SEMANTIC UI DROPDOWN
   samoProba = (e, { value }) => {      
      const { SportCode, TournamentCode } = this.props.objekat
      this.props.updateChampList(TournamentCode, SportCode, value)
      this.setState({
         selectedValue: e.target.textContent
      })
   }
   render() {
      const { objekat } = this.props
      const { TounamentGroupList } = this.props.objekat

      return (
         <div style={{ border: '2px green solid', marginBottom: '20px' }} >
            <div className="ui main  clearing segment" style={{ background: 'yellow' }}>
               <button className="ui right floated icon button" onClick={this.removeChampFromList}>
                  <i className="close icon"></i>
               </button>
               <button className="ui right floated icon button" onClick={this.ajdeKlikni}>
                  <i className="sync icon"></i>
               </button>
               {TounamentGroupList ? <div className="ui right floated icon button" style={{ background: 'transparent', padding: 0, width: '30%' }}>
                  <Dropdown
                     placeholder='Select Odd Group...'
                     fluid
                     selection
                     options={this.getAllOddsGroups()}
                     //value={this.state.selectedValue}
                     // selectionn
                     // search                                   
                     // options={this.getQuickBetsList()}
                     onChange={this.samoProba}
                  //TREBA SREDITI !!!!!!!!!!!!!!!!!!
                  //this.props.updateChampList(tcode, scode, TournamentSpecialMatchList[0].Value)
                  />
               </div>
                  : null
               }
               {/* <div className="ui selection dropdown">
               <input type="hidden" name="gender"/>
               <i className="dropdown icon"></i>
               <div className="default text">Odds</div>
         <div className="menu">
               <div className="item" data-value="0">1</div>
               <div className="item" data-value="1">X</div>
               <div className="item" data-value="2">2</div>
                        
         </div>
         </div> */}
               <div className="left floated content">
                  <h5 >{objekat.TournamentName}</h5>
               </div>
            </div>
            <div>
               {this.renderTounamentSpecialMainList()}
            </div>
            <div style={{ display: 'inline-block', width: '100%' }}>
               {this.state.secondGroup}
            </div>
            <div style={{ display: 'inline-block', width: '100%' }}>
               {this.state.thirdGroup}
            </div>
            <Table celled>
               <Table.Header>
                  <Table.Row>
                  </Table.Row>
                  <Table.Row>
                     <Table.Cell ></Table.Cell>
                     {this.renderTounementMainTitleList()}
                  </Table.Row>
                  {this.renderTitleList()}
               </Table.Header>
               <Table.Body>
                  {this.renderTournamentMatchList()}
               </Table.Body>
            </Table>
            {/* <h1>{`This is the separate tournament box: ${objekat.TournamentCode}`}</h1> */}
            <div className="ui center aligned segment">
               <button className="ui yellow basic button">UNICA</button>
               <button className="ui black basic button">SINGLE</button>
               <button className="ui green basic button">TRIPLA</button>
               <button className="ui blue basic button">4UPLA</button>
               <button className="ui red basic button">SUPLA</button>
            </div>
         </div>


      )
   }
}

const mapStateToProps = ({ middleBoxButtons, oddList, singleMatch, changeOddValue }) => ({ middleBoxButtons, oddList, singleMatch, changeOddValue })
export default connect(mapStateToProps, { callFromBox, updateChampList, oddsTicketList, removeChampFromList, fetchSingleMatch })(TestComponent);