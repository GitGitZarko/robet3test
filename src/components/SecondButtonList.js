import React, { Component } from 'react';
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

    this.props.renderThirdButtonList(kljuc, data)
  }

  render() {
    const { kljuc } = this.props
    return (

      <button
        className="ui teal button"
        onClick={(e) => this.renderThirdButtonList(e, kljuc)}
      >
        {this.props.imeDugmeta}
      </button>
    )
  }

}
export default SecondButtonList;