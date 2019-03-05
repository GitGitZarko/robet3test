import React, { Component } from 'react';
import { Header, Table, Button} from 'semantic-ui-react'

class TestComponent extends Component {
 
    renderTounementMainTitleList(){
        const { TounementMainTitleList } = this.props.objekat;
        // console.log('PROPS champsContent', this.props.champsContent);
        if (!TounementMainTitleList) {
           return null;
        }
        return TounementMainTitleList.map(name => {
              return (     
               <Table.Row>             
                 <Table.HeaderCell>{name.nome}</Table.HeaderCell>     
                 </Table.Row>                        
              )
         })
      }
      renderTitleList(){
        const { TounementTitleList } = this.props.objekat;
        //console.log('PROPS champsContent', this.props.champsContent);
        if (!TounementTitleList) {
           return null;
        }
        return (
           <Table.Row>  
           <Table.HeaderCell>Match</Table.HeaderCell>
           {TounementTitleList.map(name =>  <Table.HeaderCell>{name.nome}</Table.HeaderCell>  )}
           </Table.Row>  
        );
        
        // return TounementTitleList.map(name => {
        //       return (
        //          <Table.HeaderCell>{name.nome}</Table.HeaderCell>
        //       )
        //  })
      }
      

      renderTournamentMatchList(){
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
                    val.TournamentMatchOddList.map(odds => 
                    <Table.Cell>{odds.OddValue}    </Table.Cell>
                    )
                 }
                 <Table.Cell>
                    
                 </Table.Cell>
                 </Table.Row>  
                 // <Table.Table.Cell>{val.MatchCode}</Table.Table.Cell>
                 // <Table.Table.Cell>{val.MatchCode}</Table.Table.Cell>
                 // <Table.Table.Cell>{val.MatchCode}</Table.Table.Cell>
                 // <Table.Table.Cell>{val.MatchCode}</Table.Table.Cell>
              )
         })
      }
  
    render() {       
        const { objekat }  = this.props
     return (            
            <div>
                <div style={{background: 'yellow', border: '1px solid orange', marginTop: '50px', marginBottom: '0px', padding: '20px'}}>
                <h5 >{objekat.TournamentName}</h5>  
                </div>
                <Table celled>
                 
            <Table.Header>                   
                           
                        {this.renderTounementMainTitleList()}        
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

export default TestComponent;