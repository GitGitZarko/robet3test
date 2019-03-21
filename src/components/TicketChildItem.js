import React, { Component } from 'react';


class TicketChildItem extends Component {
    constructor(props) {
        super(props);  
       
      }
        render() {          
            const { MatchName, OddValue, OddTypeName } = this.props.data
            console.log("is childa",this.props.data)
        return (    
            <div className="ui item">
            <div className="ui left floated content">
                        <div className="ui header">
                                {MatchName}
                        </div><br/>
                            {OddTypeName}     
                </div>
                <div className="ui right floated content">
                                 {OddValue}
                    <div className="ui icon button">
                        <i className="close icon"></i>
                    </div>
                </div>
                
            </div>
            )
       }
    
    }    
    // const mapStateToProps = ({ middleBoxButtons }) => ({ middleBoxButtons })
export default TicketChildItem;