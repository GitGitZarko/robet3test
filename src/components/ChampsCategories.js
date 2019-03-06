import React, { Component } from 'react';
import ChampName from './ChampName';

class ChampsCategories extends Component {
    state = {        
        dataId: null,
        showChildren: Boolean,
        displayChild: ''
        
        
    }
    // pokaziMiAlert = (e) =>
    // {
    //     e.preventDefault();
    //     //const { sportId } = this.props
    //     console.log(this.props.sportId)
    // }
    uradiNesto(event, i){
        event.preventDefault();    
     
        if(event.target.dataset.id){
            console.log("dataset",event.target.dataset.id)
        this.setState({
            dataId: event.target.dataset.id,
            showChildren: !this.state.showChildren,
            displayChild: this.state.showChildren ? 'block' : 'none'

        })
    }
}

render() {
        const { sportId } = this.props
        const { categorie } = this.props        
        
     return ( 
            //  <div onClick={this.pokaziMiAlert}>            
            <div data-id={categorie.CategoryId} onClick={(e) => this.uradiNesto(e)} style={{ display: this.props.displayChildren}} >
                {categorie.CategoryName}
                 
                     {categorie.Champs.map((item, i) => <div> {categorie.CategoryId == this.state.dataId ?     
                     <ChampName
                     champs={item} 
                     key={i} 
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