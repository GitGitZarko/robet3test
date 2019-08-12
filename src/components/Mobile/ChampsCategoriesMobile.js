import React, { Component } from 'react';
import ChampNameMobile from './ChampNameMobile';
import {  Button, Header, Icon, Modal } from 'semantic-ui-react';
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
            <Modal dimmer={'blurring'}  trigger={<div className={this.props.displayChild} data-id={categorie.CategoryId} onClick={(e) => this.uradiNesto(e)}  >  {categorie.CategoryName}</div>}>
                     <Modal.Header id="modal-header-marcatori" style={{backgroundImage: `url(/images/codedFlags/${categorie.CategoryId}.png)`}} >{categorie.CategoryName}</Modal.Header>
                {categorie.Champs.map((item, i) => <div onClick={e => this.handleModalOpenButton(e)} > {categorie.CategoryId === this.state.dataId ?     
                    <Modal.Content>
                    <ChampNameMobile                       
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
                   <Modal.Actions>
                     <Button color='green' inverted onClick={this.props.showModal}>
                       <Icon name='checkmark' /> Finish
                     </Button>
                   </Modal.Actions>       
            </Modal>  
            
        )
    }
}

export default ChampsCategoriesMobile;