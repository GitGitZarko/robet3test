import React from 'react';
//import '../public/css/Sports.css';
import { Header, Table, Button} from 'semantic-ui-react'

const LiveMatchOverview = (props) => {
    if(!props.sportOverview) return null;
    const { Sports } = props.sportOverview

    return (
        <div>
            <Table>
                <Table.Row >  
                    {Sports.map((data, i ) => {
                        return <Table.Cell selectable>
                        {data.Tournaments.map((ata, f) => 
                            <div>
                                <Header> 
                                    {ata.TournamentName} 
                                </Header> 
                                {ata.Matchies.map((gego, b) => {
                                    return <Table.Row verticalAlign='middle'>
                                    <Table.Cell colSpan='2' width="four">
                                            <Table.Cell>
                                                {gego.Team1} <br/>
                                                {gego.Team2} <br/>
                                                {gego.MatchDateString}<br/>
                                            </Table.Cell>  
                                            <Table.Cell>
                                                {gego.Score1} 
                                                {gego.Comment}                                                
                                            </Table.Cell>                                        
                                    </Table.Cell>
                                    <Table.Cell colSpan={gego.Bets.length} width="eight">
                                       
                                        {gego.Bets.map((fufu, k) => {   
                                            return <Table.Cell >{fufu.BetLabel}</Table.Cell>
                                        })}
                                       
                                    </Table.Cell>
                                    
                                    </Table.Row> 
                                })}
                                
                            </div> 
                        )}
                         </Table.Cell> 
                    } )}                                  
               </Table.Row>             
            </Table>           
        </div>
      
        
    )
}

export default LiveMatchOverview;