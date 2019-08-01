import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Helmet} from "react-helmet";


export default class CmsPage extends Component {
    state = {
        loading: true,
        html: null,
        script: null
    }

    async componentDidMount(){
        console.log(data, this.props.match.params.CmsPage);
        const url = `http://www.betvip.fun/CmsReactPages?pagename=${this.props.match.params.CmsPage}`;
        const response = await fetch(url);
        const data = await response.json();
        const script = document.createElement("script");
        this.setState({html: data.HtmlContent, script: data.Scripts})
        console.log(data, this.props.match.params.CmsPage);
        // const script = document.getElementById(match.params.customer).innerHTML;
        // window.eval(script);
    }

render(){ 
        return (
        <div>
                <Helmet>
                <script type="text/javascript">{this.state.script}</script>
                </Helmet>

                <div className="content" dangerouslySetInnerHTML={{ __html: this.state.html }}></div>                    
        </div>
        )
}

}
 