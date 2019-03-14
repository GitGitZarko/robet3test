import React, { Component } from 'react';
import { Header, Table, Button, SegmentInline, Ref} from 'semantic-ui-react'
import { connect } from 'react-redux';
import { callFromBox } from '../actions';
import SecondButtonList from './SecondButtonList';


// const buttonStyle = {
//     background: 'red',
//     color: 'white'
// }

// () => console.log(this.buttonRef.current.innerText, this.props.sportId + "probica" + this.props.tourId)


class MainButtonList extends Component {
    constructor(props) {
        super(props);    
        this.buttonRef = React.createRef();
      }

      ajdeKlikni = (e) => {
        e.preventDefault();
        const { special } = this.props;
        if(!special){
          return null
        }
        const value = special.TournamentSpecialMatchList
        this.props.callFromBox(this.props.tourId, this.props.sportId, [1])
        if(!this.props.middleBoxButtons){
          return null
        }
        if(!value) return null;
        this.secondLevelButtons(value);
      
      }
      secondLevelButtons(value){
        return value.map((data) => {
          console.log(data);
          return (
            <SecondButtonList textValue={data.Text}>{data.Text}</SecondButtonList>
          )
        })
      }
        render() {    
                
         return (                                          
                   <button 
                      className="ui orange button" 
                      ref={this.buttonRef} 
                      onClick={this.ajdeKlikni}>
                      {this.props.buttonName}
                   </button>   
             )
       }    
    }    
const mapStateToProps = ({ middleBoxButtons }) => ({ middleBoxButtons })
export default connect(mapStateToProps, { callFromBox })(MainButtonList);