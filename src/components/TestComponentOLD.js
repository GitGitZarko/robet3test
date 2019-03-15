import React, { Component } from 'react';
import { Header, Table, Button, SegmentInline, Ref} from 'semantic-ui-react'
import MainButtonList from './MainButtonList';
import SecondButtonList from './SecondButtonList'; 
import { connect } from 'react-redux';
import { callFromBox } from '../actions';
import '../public/css/Sports.css';

class TestComponent extends Component {
   constructor(props) {
      super(props);
      this.state = {
        isHidden: false,
        secondGroup: [],
        thirdGroup: [],
        tournamentCode: '',
        sportCode: ''
      }
      this.buttonRef = React.createRef();
    }

    componentDidUpdate(prevProps) {
      // Typical usage (don't forget to compare props):
      if (this.props.objekat !== prevProps.objekat) {
         this.renderSecondLevel()
      }
    }
    // Toggle the visibility
   //  toggleHidden(e) {
   //    this.setState({
   //      isHidden: !this.state.isHidden
   //    });
   //    console.log(e.target.dataset.id)
   //  }
   //TO je ova funkcija, 
   ajdeKlikni = (e, second) => {
      e.preventDefault();
      const { TounamentSpecialMainList,  SportCode, TournamentCode} = this.props.objekat;
      if (!TounamentSpecialMainList) {
         return null;
      }

      //ovde stavljam lokalni state
      this.setState({
         secondGroup: second,
         thirdGroup: [],
         tournamentCode: TournamentCode,
         sportCode: SportCode
      })         
      this.renderTounamentSpecialMainList()
      console.log("stanje",this.state)
      this.props.callFromBox(TournamentCode, SportCode, [this.buttonRef])           
      
         }
//OVDE RENDERUJEM DUGMICE NARANDZASTE, KOJIMA DAJEM IME NARAVNO IZ REDUX STATEA
   renderTounamentSpecialMainList(){
      const { TounamentSpecialMainList, SportCode, TournamentCode} = this.props.objekat;
      if (!TounamentSpecialMainList) {
         return null;
      }

      return TounamentSpecialMainList.map((special, i) => {         
            const narandzastaDugmad = <button  className="ui orange button" ref={this.buttonRef}  onClick={(e) => this.ajdeKlikni(e, special.TournamentSpecialMatchList)} >{special.Text} </button>;
            const crvenaDugmad = special.TournamentSpecialMatchList.map((data) => <div style={{display: 'inline-block'}} onClick={(e) => this.thirdButtons(e,data)}><SecondButtonList  color="red" textValue={data.Text}></SecondButtonList> </div>)
            const plavaDugmad = special.TournamentSpecialMatchList.map((data) => <div>{data.Items.Value}</div>)
            
               
            return(
               <div>
               {narandzastaDugmad}
               {crvenaDugmad}
               {plavaDugmad}
               </div>
            )
    })
}

    renderTounementMainTitleList(){
        const { TounementMainTitleList } = this.props.objekat;
        
        // console.log('PROPS champsContent', this.props.champsContent);
        if (!TounementMainTitleList) {
           return null;
        }
        return TounementMainTitleList.map(name => {             
              return (     
                 <Table.HeaderCell textAlign="center"  colSpan={name.numeroScommesse}>{name.nome}</Table.HeaderCell>                    
              )
         })
      }
      renderTitleList(){
        const { TounementTitleList } = this.props.objekat;
        //console.log('PROPS champsContent', this.props.champsContent);
        if (!TounementTitleList) {
           return null;
        }
        return (
           <Table.Row>  
           <Table.HeaderCell >Match</Table.HeaderCell>           
           {TounementTitleList.map(name =>  <Table.HeaderCell textAlign="center" colSpan={1}>{name.nome}</Table.HeaderCell>  )}
           </Table.Row>  
        );
        
        // return TounementTitleList.map(name => {
        //       return (
        //          <Table.HeaderCell>{name.nome}</Table.HeaderCell>
        //       )
        //  })
      }
      

      renderTournamentMatchList(){
        const { TournamentMatchList } = this.props.objekat;
        
        console.log('PROPS champsContent', this.props.objekat);
        if (!TournamentMatchList) {
           return null;
        }
        
        return TournamentMatchList.map(val => {
           // console.log(val.TournamentMatchOddList)
              return (
                 
                 <Table.Row>  
                    
                 <Table.Cell>
                    <Header>
                       {val.QuickMatchCode}
                       {val.MatchDate}
                   </Header>
                    <Header.Content>
                       {val.MatchName}
                    </Header.Content>              
                 </Table.Cell>
                 {                
                    val.TournamentMatchOddList.map(odds => 
                    <Table.Cell textAlign="center" width="four" selectable style={{cursor: 'pointer'}}>{odds.OddValue}    </Table.Cell>
                    )
                 }
             
                 </Table.Row>  
                 // <Table.Table.Cell>{val.MatchCode}</Table.Table.Cell>
                 // <Table.Table.Cell>{val.MatchCode}</Table.Table.Cell>
                 // <Table.Table.Cell>{val.MatchCode}</Table.Table.Cell>
                 // <Table.Table.Cell>{val.MatchCode}</Table.Table.Cell>
              )
         })
      }
      thirdButtons(e,data){
         e.preventDefault();
         console.log(data)
         this.setState({
            thirdGroup: data.Items
         })         
      }
      
      //ovo je funkcija koja renderuje crvene dugmice, znaci radim .map na lokalni state
      renderSecondLevel(){                                                          
         return this.state.secondGroup.map((data) => <div style={{display: 'inline-block'}} onClick={(e) => this.thirdButtons(e,data)}><SecondButtonList  color="red" textValue={data.Text}></SecondButtonList> </div>)
      }

      renderThirdLevel(){
         
      }
    render() {       
        const { objekat }  = this.props
     return (        
            <div style={{border: '2px green solid', marginBottom: '20px'}} >
                <div style={{background: 'yellow', border: '1px solid orange', marginBottom: '0px', padding: '20px'}}>
                <h5 >{objekat.TournamentName}</h5>  
                </div>
                <div>
                {this.renderTounamentSpecialMainList()}       
                </div>
                <div style={{display: 'inline-block', width: '100%'}}>
                
               { /*!this.state.secondGroup ? null : */this.renderSecondLevel()}                   
               </div>
                <div style={{display: 'inline-block', width: '100%'}}>                
                { /*!this.state.thirdGroup ? null : */this.state.thirdGroup.map((data) => <SecondButtonList color="blue" textValue={data.Text}></SecondButtonList>) }
                </div>
                <Table celled>                 
            <Table.Header>    
               <Table.Row>
            </Table.Row>            
               <Table.Row>  
               <Table.Cell ></Table.Cell>
                        {this.renderTounementMainTitleList()}        
               </Table.Row>  
                        {this.renderTitleList()}                        
            </Table.Header>
            <Table.Body>               
               {this.renderTournamentMatchList()}       
            </Table.Body>
         </Table>
                {/* <h1>{`This is the separate tournament box: ${objekat.TournamentCode}`}</h1> */}
            </div>    
                 
         )
   }
}

const mapStateToProps = ({ middleBoxButtons }) => ({ middleBoxButtons })
export default connect(mapStateToProps, { callFromBox })(TestComponent);