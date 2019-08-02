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
        this.fetchCmsPages();
        
        // const script = document.getElementById(match.params.customer).innerHTML;
        // window.eval(script);
    }
    ShowServerError = ({ error }) =>  {
        if (!error) {
          return null;
        }
        return (
          <div className="alert">
            <h3>Server Error</h3>
            {error instanceof window.Response ? (
              <p>
                <b>{error.status}</b> on <b>{error.url}</b>
                <br />
                <small>{error.statusText}</small>
              </p>
            ) : (
              <p>
                <code>{error.toString()}</code>
              </p>
            )}
          </div>
        );
      }
    fetchCmsPages = async () => {
        const url = `http://www.betvip.fun/CmsReactPages?pagename=${this.props.match.params.CmsPage}`;      
        try {
            const response = await fetch(url);
            if (!response.ok) {
              this.setServerError(response);
            }
            const data = await response.json();
            const script = document.createElement("script");
            this.setState({html: data.HtmlContent, script: data.Scripts})
            // do something here with `await response.json()`
          } catch (ex) {
            console.log("This is React SAPage.")
          }

        
        
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
 