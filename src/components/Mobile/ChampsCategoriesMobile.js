import React, { Component } from 'react';
import ChampName from '../ChampName';
import { Modal } from 'semantic-ui-react';
import MediaQuery from 'react-responsive';

class ChampsCategoriesMobile extends Component {
    state = {
        dataId: null,
        showChildren: Boolean,
        displayChild: '',
        showModal: Boolean
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

    closeModal = () => {
        this.setState({ showModal: false })
      }

    handleModalOpenButton(evt) {
        evt.preventDefault()
        this.closeModal();
      }


    render() {
        const { sportId } = this.props
        const { categorie } = this.props    

        return (
            //  <div onClick={this.pokaziMiAlert}>  
            <Modal closeIcon onClose={this.props.showModal}  trigger={<div className={this.props.displayChild} data-id={categorie.CategoryId} onClick={(e) => this.uradiNesto(e)}  >  {categorie.CategoryName}</div>}>
                     <Modal.Header>{categorie.CategoryName}</Modal.Header>
                {categorie.Champs.map((item, i) => <div onClick={e => this.handleModalOpenButton(e)} > {categorie.CategoryId === this.state.dataId ?     
                    <Modal.Content>
                    <ChampName                       
                        champs={item}
                        key={i}
                        antepost={this.props.antepost}
                        players={this.props.players}
                        sportId={sportId}
                        displayChild={this.state.displayChild}
                    />
                    </Modal.Content>           
                    :
                    null
                }
                </div>
                )}            
            </Modal>  
            
        )
    }
}

export default ChampsCategoriesMobile;