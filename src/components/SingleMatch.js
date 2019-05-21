import React, { Component } from 'react';
import { Header, Table, Button, SegmentInline, Ref, Grid, Dropdown } from 'semantic-ui-react'

//import '../public/css/Sports.css';

class SingleMatch extends Component{
    
    render(){
        const { singleMatch } = this.props
    return (
        <div> 
        <div style={{textAlign: 'center'}}>
        <h1>{singleMatch.name}</h1>
        <h4>{singleMatch.date}</h4>
        </div>
        <Table celled>             
               <Table.Body>
               <Table.Row>                    
               {singleMatch.data.Items.map((data, i) =>  
                    <div key={i}>
                        <Table.Cell>
                        {data.GroupName}
                        </Table.Cell>   
                        
                       
                        {data.OddItems.map((gege,i) =>                                  
                                
                                <button
                                style={{margin: 0, width: '25%', borderRadius: 0,border: '1px solid white', textTransform: 'uppercase'}}
                                className="ui black button"
                                >                            
                                {gege.Value}
                                </button> 
                                
                                
                            )}   
                      
                                       
                     
                        
                    </div>
          )}
               </Table.Row>
               </Table.Body>
        </Table>
          
        </div>       

      
        
    )
    }
}

export default SingleMatch;