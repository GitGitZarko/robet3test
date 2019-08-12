import React, { Component } from 'react';
import ChampName from './ChampName';
import MediaQuery from 'react-responsive';

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
            <div>
            <MediaQuery maxWidth={414}> 
                        <div className={this.props.displayChildren} data-id={categorie.CategoryId} onClick={(e) => this.uradiNesto(e)}  ></div>
            </MediaQuery>
                <div className={this.props.displayChildren} data-id={categorie.CategoryId} onClick={(e) => this.uradiNesto(e)}  >
                
                    <img className="ui middle aligned mini image" style={{marginRight: '10px'}} src={`/images/codedFlags/${categorie.CategoryId}.png`}/>
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
            </div>
        )
    }
}

export default ChampsCategories;