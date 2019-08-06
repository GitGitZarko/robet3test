import React, { Component }from 'react';
import logo from '../public/images/logo_new.png';
import { Link } from 'react-router-dom';
import {Helmet} from "react-helmet";

class Header extends Component{

  state = {
    loading: true,
    html: null,
    script: null
}

async componentDidMount(){
    const url = `http://www.betvip.fun/CmsReactPages?pagename=header`;
    const response = await fetch(url);
    const data = await response.json();
    const script = document.createElement("script");
    script.innerHTML = data.Scripts;
    this.setState({html: data.HtmlContent, script: data.Scripts})
    // console.log(data, this.props.match.params.CmsPage);
    // const script = document.getElementById(match.params.customer).innerHTML;
    // window.eval(script);
}

render(){ 
    return (
    <div>     
                <Helmet>
                <script>{this.state.script}</script>
                </Helmet>
            
            <div className="content" dangerouslySetInnerHTML={{ __html: this.state.html }}></div>      
            
         
    </div>
    )
}

}
export default Header;

// const Header = () => {
//   return (
//     <div className="ui secondary  pointing menu stackable" >
//       <Link to="/" className="left item" >
//         <div class="ui logo image">
//           <img src={logo} />
//         </div>
//       </Link>
//       <Link to="/" className="item" >
//         HOME
//         </Link>
//       <Link to="/Sport" className="item" >
//         SPORT
//         </Link>
//       <Link to="/LiveBet" className="item" >
//         SPORT LIVE
//         </Link>
//       <Link to="/Casino" className="item" >
//         CASINO'
//         </Link>
//       <Link to="/Virtual" className="item" >
//         VIRTUAL SPORT
//         </Link>
//       <Link to="/Poker" className="item" >
//         POKER
//         </Link>
//       <div className="right menu">

//       </div>
//     </div>

//   )

// }

// export default Header;
