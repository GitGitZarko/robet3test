import React, { Component } from 'react';
import { Header, Table, Button, SegmentInline, Ref} from 'semantic-ui-react'

class SecondButtonList extends Component {
    constructor(props) {
        super(props);

        this.buttonRef = React.createRef();
      }
 

        render() {          
         return (   
                         
                   <button className={"ui "+this.props.color+" button"}>{this.props.textValue}</button>                                                      

             )
       }
    
    }    
    export default SecondButtonList;