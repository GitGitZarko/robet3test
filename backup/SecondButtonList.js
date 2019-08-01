import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  updateChampList } from '../actions';
import { Button } from 'semantic-ui-react'

class SecondButtonList extends Component {
  constructor(props) {
    super(props);
  }

  ajdeKlikni = (e) => {
    e.preventDefault();
    const { special } = this.props;
    if (!special) {
      return null
    }
    const value = special.TournamentSpecialMatchList
    
    if (!this.props.middleBoxButtons) {
      return null
    }
    if (!value) return null;

  }

  renderThirdButtonList(e, kljuc, data) {
    e.preventDefault()
    const { ChampId , SportId, Value} = this.props.special
    this.props.updateChampList(ChampId, SportId, Value)
    this.props.renderThirdButtonList(kljuc, data)
  }

  render() {
    const { kljuc } = this.props
    return (

      <Button color="teal" className="second-button-list"
        onClick={(e) => this.renderThirdButtonList(e, kljuc, this.props.special)}      >
        {this.props.imeDugmeta}
      </Button>
    )
  }

}
//const mapStateToProps = ({ middleBoxButtons }) => ({ middleBoxButtons })
export default connect(null, { updateChampList })(SecondButtonList);