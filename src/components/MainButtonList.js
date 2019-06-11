import React, { Component } from 'react';
import { connect } from 'react-redux';
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
    console.log("VALUE VALUE VALUE", TournamentSpecialMatchList[0].Value)
    this.props.updateChampList(tcode, scode, TournamentSpecialMatchList[0].Value)
    this.props.renderSecondButtonList(kljuc, data)
  }
  render() {
    const { TournamentSpecialMatchList, Text } = this.props.special
    const { kljuc } = this.props

    return (
      <button
        style={{ margin: 0, width: '25%', borderRadius: 0, border: '1px solid white', textTransform: 'uppercase' }}
        className="ui orange button"

        onClick={(e) => this.renderSecondButtonList(e, kljuc, TournamentSpecialMatchList)}>
        {Text}
      </button>
    )
  }
}
const mapStateToProps = ({ middleBoxButtons }) => ({ middleBoxButtons })
export default connect(mapStateToProps, { callFromBox, updateChampList })(MainButtonList);