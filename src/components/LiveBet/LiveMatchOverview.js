import React from 'react';
//import '../public/css/Sports.css';
import { Header, Table, Button} from 'semantic-ui-react'

const LiveMatchOverview = (props) => {
    if(!props.sportOverview) return null;
    const { Sports } = props.sportOverview

    return (
        <div>
            <Table fixed>
                <Table.Row >  
                    {Sports.map((data, i ) => {
                        return <Table.Cell selectable>
                        {data.Tournaments.map((ata, f) => 
                            <div>
                                <Header style={{background: '#424242', color: 'white', fontWeight: '600', padding: '10px', margin: 0, border: '1px dotted white'}}> 
                                    {ata.TournamentName} 
                                </Header>                                 
                                {ata.Matchies.map((gego, b) => {
                                    return <Table.Row verticalAlign='middle' style={{background: 'black', color: 'white'}}>
                                    <Table.Cell colSpan='2' width="four">
                                        <Table style={{background: 'black', color: 'white' }}>
                                            <Table.Row verticalAlign='middle' >
                                            <Table.Cell style={{padding: 0, cursor: 'pointer'}}>
                                                {gego.Team1} <br/>
                                                {gego.Team2} <br/>
                                                {gego.MatchDateString}<br/>
                                            </Table.Cell>  
                                            <Table.Cell textAlign='right' style={{color: 'gold', padding: 0, cursor: 'pointer'}}>
                                                {gego.Score1} 
                                                {gego.Comment}                                                
                                            </Table.Cell>                     
                                            </Table.Row>                   
                                        </Table>
                                    </Table.Cell>
                                    <Table.Cell width="tvelwe" style={{padding: 0}}>
                                    <Table columns={gego.Bets.length} style={{tableLayout: 'fixed'}}>
                                       
                                        {gego.Bets.map((fufu, k) => {   
                                            return (                                                
                                                <Table.Cell textAlign='center' colRow={2} style={{padding: 0, background: '#424242', color: 'white', fontWeight: 600, borderRight: '1px solid white'}}>
                                                    {fufu.BetLabel}
                                                    <Table columns={fufu.Odds.length}>
                                                    <Table.Row verticalAlign='middle'>
                                                    {fufu.Odds.map((stato)=> { return <Table.Cell style={{background: 'orange', color: 'white', fontWeight: 600}} textAlign='center'>{stato.OddLabel}</Table.Cell>})}
                                                    </Table.Row>
                                                    <Table.Row verticalAlign='middle'>
                                                    {fufu.Odds.map((stato)=> { return <Table.Cell 
                                                            style={{    background: '#424242', color: 'white', fontWeight: 600, 
                                                                        borderBottom: `3px solid ${stato.Trend === 1 ? '#04f872' : 'red'}`, 
                                                                        borderRight: '1px solid white',
                                                                        cursor: 'pointer'}}
                                                        textAlign='center'>{stato.OddValue}</Table.Cell>})}
                                                    </Table.Row>
                                                    </Table>
                                                </Table.Cell>                        
                                            )
                                         

                                        })}
                                       
                                    </Table>
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