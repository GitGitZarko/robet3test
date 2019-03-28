import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  updateChampList } from '../actions';

class ThirdButtonList extends Component {
  constructor(props) {
    super(props);
  }

  callUpdateTable(e, value){
    e.preventDefault();

    const { ChampId , SportId} = this.props.data
    
    console.log("Call from third button list: ", value)
    this.props.updateChampList(ChampId, SportId, value)    
  }

  render() {
    const { value } = this.props
    return (
      <button
        style={{margin: 0, width: '25%', borderRadius: 0,border: '1px solid white'}}
        className="ui purple button"
        onClick={(e) => this.callUpdateTable(e, value)}>
        {this.props.imeDugmeta}
      </button>
    )
  }

}
//const mapStateToProps = ({ middleBoxButtons }) => ({ middleBoxButtons })
export default connect(null, { updateChampList })(ThirdButtonList);