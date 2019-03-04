import React, { Component } from 'react';
import ChampName from './ChampName';

class ChampsCategories extends Component {
    
    // pokaziMiAlert = (e) =>
    // {
    //     e.preventDefault();
    //     //const { sportId } = this.props
    //     console.log(this.props.sportId)
    // }

    render() {       
        const { sportId } = this.props
        const { categorie } = this.props
     return ( 
            //  <div onClick={this.pokaziMiAlert}>            
            <div>
                {categorie.CategoryName}
                 <ul>                 
                     {categorie.Champs.map((item, i) => <ChampName champs={item} key={i} sportId={sportId}/>)}                     
                 </ul>
            </div>
                      
            
         )
   }

}

export default ChampsCategories;