import React, { Component } from 'react';
import { Header, Table, Button, SegmentInline, Ref} from 'semantic-ui-react'


//OVO JE JEDNOSTAVNI BUTTON COMPONENT koji prima samo color prop i textValue zasto
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