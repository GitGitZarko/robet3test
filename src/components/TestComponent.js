import React, { Component } from 'react';
import { Header, Table, Button, SegmentInline, Ref } from 'semantic-ui-react'
import MainButtonList from './MainButtonList';
import SecondButtonList from './SecondButtonList';
import ThirdButtonList from './ThirdButtonList';
import { connect } from 'react-redux';
import { callFromBox, updateChampList, oddsTicketList } from '../actions';
import '../public/css/Sports.css';

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
         broj: Number
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
   ajdeKlikni = (e, description) => {
      e.preventDefault();
      const { TounamentSpecialMainList, SportCode, TournamentCode } = this.props.objekat;
      if (!TounamentSpecialMainList) {
         return null;
      }

      this.setState({
         isHidden: !this.state.isHidden,
         DescriptionOrder: description,
      })
      const refOrangeButton = e.target.dataset.value

      console.log(e.target.dataset.value)

      //this.props.callFromBox(TournamentCode, SportCode, refOrangeButton)
      this.props.updateChampList(TournamentCode, SportCode, refOrangeButton)

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

      console.log("Ovde radi2: ", broj)
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
         thirdGroup: []
      })
      // console.log(TournamentSpecialMatchList.map((a) => a.Items.map((b) => b.Text)))
   }
   renderThirdButtonList(broj, data) {
      if (broj === undefined) return console.log("greska", broj)

      console.log("Ovde radi2: ", broj)
      const { TounamentSpecialMainList } = this.props.objekat;
      if (!TounamentSpecialMainList) {
         return null;
      } 
      
      const ajdeVise = data.Items.map((a, i) => <ThirdButtonList key={i} data={data} value={a.Value} imeDugmeta={a.Text}/>)
      
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
   addOddToTicket = (e, sportCode, tourCode, oddType, oddValue, matchName, oddGroup) => {
      e.preventDefault();
      this.props.oddsTicketList({
         sportCode,
         tourCode,
         oddType,
         oddValue,
         matchName,
         oddGroup
      })
      // alert(sportCode+"tcOde:"+ tourCode )
   }

   renderTournamentMatchList() {
      const { TournamentMatchList } = this.props.objekat;

      console.log('PROPS champsContent', this.props.objekat);
      if (!TournamentMatchList) {
         return null;
      }

      return TournamentMatchList.map(val => {
         // console.log(val.TournamentMatchOddList)
         return (

            <Table.Row>

               <Table.Cell>
                  <Header>
                     {val.QuickMatchCode}
                     {val.MatchDate}
                  </Header>
                  <Header.Content>
                     {val.MatchName}
                  </Header.Content>
               </Table.Cell>
               {
                  val.TournamentMatchOddList.map((odds, o) =>
                     <Table.Cell
                        key={o}
                        textAlign="center"
                        width="four"
                        selectable
                        style={{ cursor: 'pointer' }}
                        onClick={(e) =>
                           this.addOddToTicket(e, this.props.objekat.SportCode, this.props.objekat.TournamentCode, odds.OddType, odds.OddValue, val.MatchName, odds.OddGroup)}>
                        {odds.OddValue}
                     </Table.Cell>
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
      console.log(data)
      this.setState({
         thirdGroup: data.Items
      })
   }

   render() {
      const { objekat } = this.props

      return (
         <div style={{ border: '2px green solid', marginBottom: '20px' }} >
            <div style={{ background: 'yellow', border: '1px solid orange', marginBottom: '0px', padding: '20px' }}>
               <h5 >{objekat.TournamentName}</h5>
            </div>
            <div >
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
         </div>

      )
   }
}

const mapStateToProps = ({ middleBoxButtons }) => ({ middleBoxButtons })
export default connect(mapStateToProps, { callFromBox, updateChampList, oddsTicketList })(TestComponent);