import React, { Component } from 'react';


class TicketChildItem extends Component {
    constructor(props) {
        super(props);  
       
      }
        render() {          
            const { oddValue, oddType, matchName, oddGroup } = this.props.objekat
        return (    
            <div className="item">
                <div className="right floated content">
                    {oddValue}
                    <div className="ui icon button">
                        <i className="close icon"></i>
                    </div>
                </div>
                <div className="left floated content">
                        <div className="header">
                                {matchName}
                        </div>
                            {oddType}     
                </div>
            </div>
            )
       }
    
    }    
    // const mapStateToProps = ({ middleBoxButtons }) => ({ middleBoxButtons })
export default TicketChildItem;