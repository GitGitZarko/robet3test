import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  updateChampList } from '../actions';
import { Header, Table, Button, SegmentInline, Ref } from 'semantic-ui-react'

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
    // this.props.callFromBox(this.props.tourId, this.props.sportId, [1])
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

      <button
        style={{margin: 0, width: '25%', borderRadius: 0, border: '1px solid white'}}
        className="ui teal button"
        onClick={(e) => this.renderThirdButtonList(e, kljuc, this.props.special)}
      >
        {this.props.imeDugmeta}
      </button>
    )
  }

}
//const mapStateToProps = ({ middleBoxButtons }) => ({ middleBoxButtons })
export default connect(null, { updateChampList })(SecondButtonList);