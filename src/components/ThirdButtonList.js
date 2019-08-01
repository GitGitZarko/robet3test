import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react'
import {  updateChampList } from '../actions';

class ThirdButtonList extends Component {
  constructor(props) {
    super(props);
  }

  callUpdateTable(e, value){
    e.preventDefault();

    const { ChampId , SportId} = this.props.data    
    this.props.updateChampList(ChampId, SportId, value)    
  }

  render() {
    const { value } = this.props
    return (
      <Button  inverted color="teal" className="third-button-list"
        onClick={(e) => this.callUpdateTable(e, value)}>
        {this.props.imeDugmeta}
      </Button>
    )
  }

}
//const mapStateToProps = ({ middleBoxButtons }) => ({ middleBoxButtons })
export default connect(null, { updateChampList })(ThirdButtonList);