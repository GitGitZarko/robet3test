import React, { Component } from 'react';
import { Header, Table, Button, SegmentInline, Ref, Grid } from 'semantic-ui-react'
import MainButtonList from './MainButtonList';
import SecondButtonList from './SecondButtonList';
import ThirdButtonList from './ThirdButtonList';
import '../public/css/Sports.css';
import { connect } from 'react-redux';
import { callFromBox, updateChampList, oddsTicketList, removeChampFromList } from '../actions';


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
         updateBox: []
      }
      this.buttonRef = React.createRef();
   }

   // Toggle the visibility
   //  toggleHidden(e) {
   //    this.setState({
   //      isHidden: !this.state.isHidden
   //    });
   //    console.log(e.target.dataset.id)
   //  }
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

      // console.log("Ovde radi2: ", data[0].Value)
      const { TounamentSpecialMainList } = this.props.objekat;
      if (!TounamentSpecialMainList) {
         return null;
      }
      // const result = Object.entries(TounamentSpecialMainList)[broj]
      const { TournamentSpecialMatchList } = TounamentSpecialMainList[broj]
      // const ssss = TournamentSpecialMatchList.map((a) => a.Items.map((b) => <SecondButtonList imeDugmeta={b.Text}/>{b.Text}</SecondButtonList>))
      // const ajdeVise = TournamentSpecialMatchList.map((data) => data.Items.map((ata) => <SecondButtonList imeDugmeta={ata.Text} />))
      const ajdeVise = TournamentSpecialMatchList.map((data, i) => <SecondButtonList imeDugmeta={data.Text} key={i} kljuc={i} special={data} renderThirdButtonList={this.renderThirdButtonList.bind(this)} />)

      this.setState({
         secondGroup: ajdeVise,
         thirdGroup: [],
         updateBox: data[0].Value
      })
      // console.log(TournamentSpecialMatchList.map((a) => a.Items.map((b) => b.Text)))
   }
   renderThirdButtonList(broj, data) {
      if (broj === undefined) return console.log("greska", broj)

      // console.log("Ovde radi2: ", broj)
      const { TounamentSpecialMainList } = this.props.objekat;
      if (!TounamentSpecialMainList) {
         return null;
      }

      const ajdeVise = data.Items.map((a, i) => <ThirdButtonList key={i} data={data} value={a.Value} imeDugmeta={a.Text} />)

      this.setState({
         thirdGroup: ajdeVise
      })
      // console.log(TournamentSpecialMatchList.map((a) => a.Items.map((b) => b.Text)))
   }

   renderTounementMainTitleList() {
      const { TounementMainTitleList } = this.props.objekat;

      // console.log('PROPS champsContent', this.props.champsContent);
      if (!TounementMainTitleList) {
         return null;
      }

      return TounementMainTitleList.map((name, a) => {
         // console.log("KURAC!!!: ", a)
         return (
            <Table.HeaderCell key={a} textAlign="center" colSpan={name.numeroScommesse}>{name.nome}</Table.HeaderCell>
         )
      })
   }
   renderTitleList() {
      const { TounementTitleList } = this.props.objekat;
      //console.log('PROPS champsContent', this.props.champsContent);
      if (!TounementTitleList) {
         return null;
      }
      return (
         <Table.Row>
            <Table.HeaderCell >Match</Table.HeaderCell>
            {TounementTitleList.map((name, f) => <Table.HeaderCell key={f} textAlign="center" >{name.nome}</Table.HeaderCell>)}
         </Table.Row>
      );

      // return TounementTitleList.map(name => {
      //       return (
      //          <Table.HeaderCell>{name.nome}</Table.HeaderCell>
      //       )
      //  })
   }
   addOddToTicket = (e, sportCode, tourCode, oddType, oddValue, matchName, oddGroup, oddCode, matchCode) => {
      e.preventDefault();
      this.setState({
         reRendered: !this.state.reRendered
      })

      let localTicket = JSON.parse(localStorage.ticket)

      localTicket.isLive = false;
      localTicket.matchId = matchCode;
      localTicket.oddId = oddCode;
      localTicket.operationType = 1;
      //localTicket.Bets[0].ColAmount = 200;  // THIS IS HARD CODED, IT IS JUST FOR TESTING
      //console.log("BETOVI :  ", localTicket.Bets[0].ColAmount)


      localStorage.setItem("ticket", JSON.stringify(localTicket));

      // console.log("TIKETARA", localTicket)

      this.props.oddsTicketList(localTicket)
   }

   renderTournamentMatchList() {
      const { TournamentMatchList } = this.props.objekat;
      const { Odds }  = this.props.oddList
      let oddIdList = [];


      //console.log("konzolica: ", Odds.map((a) => a.OddId))
      console.log("localTicket:", JSON.parse(localStorage.getItem('ticket')))
      if(localStorage.getItem("ticket") !== null){
         let localTicket = JSON.parse(localStorage.getItem('ticket'))      
         oddIdList = localTicket.Odds.map((a) => a.OddId)
      }
      

      
      
      
      if (!TournamentMatchList) {
         return null;
      }
   
      return TournamentMatchList.map(val => {
         // console.log(val.TournamentMatchOddList)
         return (

            <Table.Row>

               <Table.Cell width="three">
                  <Header.Content>
                     {val.QuickMatchCode} {val.MatchDate}
                     <Header.Subheader>

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
                        {odds.OddValue}
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
                        <span style={{ float: 'right' }}>{odds.OddValue}</span>
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
      // console.log(data)
      this.setState({
         thirdGroup: data.Items
      })
   }
   removeChampFromList = () => {
      const { SportCode, TournamentCode } = this.props.objekat
      this.props.removeChampFromList(TournamentCode, SportCode);
   }

   render() {
      const { objekat } = this.props

      return (
         <div style={{ border: '2px green solid', marginBottom: '20px' }} >
            <div className="ui main  clearing segment" style={{ background: 'yellow' }}>
               <button className="ui right floated icon button" onClick={this.removeChampFromList}>
                  <i className="close icon"></i>
               </button>
               <button className="ui right floated icon button" onClick={this.ajdeKlikni}>
                  <i className="sync icon"></i>
               </button>
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
               <button class="ui yellow basic button">UNICA</button>
               <button class="ui black basic button">SINGLE</button>
               <button class="ui green basic button">TRIPLA</button>
               <button class="ui blue basic button">4UPLA</button>
               <button class="ui red basic button">SUPLA</button>
            </div>
         </div>


      )
   }
}

const mapStateToProps = ({ middleBoxButtons, oddList }) => ({ middleBoxButtons, oddList })
export default connect(mapStateToProps, { callFromBox, updateChampList, oddsTicketList, removeChampFromList })(TestComponent);