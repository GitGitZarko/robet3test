import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header, Table } from 'semantic-ui-react'


class ChampMainContent extends Component {

   renderTounementMainTitleList() {
      const { TounementMainTitleList } = this.props.champsContent;

      if (!TounementMainTitleList) {
         return null;
      }
      return TounementMainTitleList.map(name => {
         return (
            <Table.HeaderCell>{name.nome}</Table.HeaderCell>
         )
      })
   }

   renderTitleList() {
      const { TounementTitleList } = this.props.champsContent;

      if (!TounementTitleList) {
         return null;
      }
      return (
         <div>
            <Table.HeaderCell>Match</Table.HeaderCell>
            {TounementTitleList.map(name => <Table.HeaderCell>{name.nome}</Table.HeaderCell>)}
         </div>
      );

      // return TounementTitleList.map(name => {
      //       return (
      //          <Table.HeaderCell>{name.nome}</Table.HeaderCell>
      //       )
      //  })
   }
   click = () => {
      console.log("Kliknuto!")
   }
   renderTournamentMatchList() {
      const { TournamentMatchList } = this.props.champsContent;

      if (!TournamentMatchList) {
         return null;
      }

      return TournamentMatchList.map(val => {
         return (

            <Table.Row>
               <Table.Cell selectable>
                  <Header>
                     {val.QuickMatchCode}
                     {val.MatchDate}
                  </Header>
                  <Header.Content>
                     {val.MatchName}
                  </Header.Content>
               </Table.Cell>
               {
                  val.TournamentMatchOddList.map(odds =>
                     <Table.Cell > {odds.OddValue}    </Table.Cell>
                  )
               }
               <Table.Cell>

               </Table.Cell>
            </Table.Row>
         )
      })
   }

   render() {
      return (
         <div>
            <Table celled>
               <Table.Header>
                  {this.renderTounementMainTitleList()}
                  {this.renderTitleList()}

               </Table.Header>

               <Table.Body>

                  {this.renderTournamentMatchList()}


               </Table.Body>
            </Table>
         </div>
      )
   }
}

const mapStateToProps = ({ champsContent }) => ({ champsContent })
export default connect(mapStateToProps)(ChampMainContent);