import React, { Component } from 'react';
import ChampName from './ChampName';


class ChampsCategories extends Component {
    state = {
        dataId: null,
        showChildren: Boolean,
        displayChild: ''
    }

    uradiNesto(event, i) {
        event.preventDefault();

        if (event.target.dataset.id) {
            this.setState({
                dataId: event.target.dataset.id,
                showChildren: !this.state.showChildren,
                displayChild: this.state.showChildren ? 'headerLeftMenu' : 'headerLeftMenu-hidden'
            })

        }
    }

    render() {
        const { sportId } = this.props
        const { categorie } = this.props

        return (
            //  <div onClick={this.pokaziMiAlert}>    
                        <div className={this.props.displayChildren} data-id={categorie.CategoryId} onClick={(e) => this.uradiNesto(e)}  >
                {categorie.CategoryName}

                {categorie.Champs.map((item, i) => <div> {categorie.CategoryId === this.state.dataId ?
                    <ChampName
                        champs={item}
                        key={i}
                        antepost={this.props.antepost}
                        players={this.props.players}
                        sportId={sportId}
                        displayChild={this.state.displayChild}
                    />
                    :
                    null
                }
                </div>
                )}

            </div>
        )
    }
}

export default ChampsCategories;