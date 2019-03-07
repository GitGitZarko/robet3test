import React, { Component } from 'react';
import { Header, Table, Button, SegmentInline} from 'semantic-ui-react'
import '../public/css/Sports.css';

class TestComponent extends Component {
   
   renderTounamentSpecialMainList(){
      const { TounamentSpecialMainList } = this.props.objekat;
      if (!TounamentSpecialMainList) {
         return null;
      }

      return TounamentSpecialMainList.map(special => {
         return (                           
            <Button color="orange" compact>{special.Text}</Button>        
         )
    })

   }
   // switchOddsSpan = (value) => {
   //    switch(value){
   //       case '1x2':
   //       return 3
   //       case 'Doppia Chance':
   //       return 3
   //       case 'GGNG':
   //       return 2
   //       case 'OV/UN 2.5':
   //       return 2
   //       default: 
   //       return 0
   //    }
   // }
    renderTounementMainTitleList(){
        const { TounementMainTitleList } = this.props.objekat;
        
        // console.log('PROPS champsContent', this.props.champsContent);
        if (!TounementMainTitleList) {
           return null;
        }
        return TounementMainTitleList.map(name => {             
              return (     
                      
                 <Table.HeaderCell textAlign="center"  colSpan={name.numeroScommesse}>{name.nome}</Table.HeaderCell>     
               
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
           <Table.HeaderCell >Match</Table.HeaderCell>           
           {TounementTitleList.map(name =>  <Table.HeaderCell textAlign="center" colSpan={1}>{name.nome}</Table.HeaderCell>  )}
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
                    <Table.Cell textAlign="center" width="four" selectable style={{cursor: 'pointer'}}>{odds.OddValue}    </Table.Cell>
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
  
    render() {       
        const { objekat }  = this.props
     return (            
            <div>
                <div style={{background: 'yellow', border: '1px solid orange', marginTop: '50px', marginBottom: '0px', padding: '20px'}}>
                <h5 >{objekat.TournamentName}</h5>  
                </div>
                {this.renderTounamentSpecialMainList()}       
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

export default TestComponent;