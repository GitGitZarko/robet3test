import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react'
import { callFromBox, updateChampList } from '../actions';

class MainButtonList extends Component {

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

  renderSecondButtonList(e, kljuc, data) {
    e.preventDefault()
    const { scode, tcode } = this.props
    const { TournamentSpecialMatchList } = this.props.special
    // console.log("VALUE VALUE VALUE", TournamentSpecialMatchList[0].Value)
    this.props.updateChampList(tcode, scode, TournamentSpecialMatchList[0].Value)
    this.props.renderSecondButtonList(kljuc, data)
  }
  render() {
    const { TournamentSpecialMatchList, Text } = this.props.special
    const { kljuc } = this.props

    return (
      <Button  color="orange" className="main-button-list"
        onClick={(e) => this.renderSecondButtonList(e, kljuc, TournamentSpecialMatchList)}>
        {Text}
      </Button>
    )
  }
}
const mapStateToProps = ({ middleBoxButtons }) => ({ middleBoxButtons })
export default connect(mapStateToProps, { callFromBox, updateChampList })(MainButtonList);