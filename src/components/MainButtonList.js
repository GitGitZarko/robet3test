import React, { Component } from 'react';
import { Header, Table, Button, SegmentInline, Ref } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { callFromBox, updateChampList } from '../actions';
import SecondButtonList from './SecondButtonList';


// const buttonStyle = {
//     background: 'red',
//     color: 'white'
// }

// () => console.log(this.buttonRef.current.innerText, this.props.sportId + "probica" + this.props.tourId)


class MainButtonList extends Component {
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
        style={{margin: 0, width: '25%', borderRadius: 0,border: '1px solid white'}}
        className="ui orange button"
        ref={this.buttonRef}
        onClick={(e) => this.renderSecondButtonList(e, kljuc, TournamentSpecialMatchList)}>
        {Text}
      </button>
    )
  }
}
const mapStateToProps = ({ middleBoxButtons }) => ({ middleBoxButtons })
export default connect(mapStateToProps, { callFromBox, updateChampList })(MainButtonList);