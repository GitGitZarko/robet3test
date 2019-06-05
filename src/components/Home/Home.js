import React, { Component } from 'react';
//import '../public/css/Sports.css';
import Slider from "react-slick";


export default class Home  extends Component{
    render() {
        const settings = {
            dots: false,
      lazyLoad: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      initialSlide: 2
        };
        
    return (
        <div>                       
           <div className="ui three grid" >
            <div className="three column row">
                <div className="three wide column" style={{ background: 'red'}}>
                    
                </div>  
                <div className="ten wide column" style={{ background: 'grey', textAlign: 'center'}}>  
                    <h1>HOME PAGE</h1>
                    <div>
                        <h2> Single Item</h2>
                        <Slider {...settings}>
                        <div>
                            <img src="/images/livebet/6.png" alt=""/>
                        </div>
                        <div>
                        <img src="/images/livebet/2.png" alt=""/>
                        </div>
                        <div>
                        <img src="/images/livebet/4.png" alt=""/>
                        </div>
                        <div>
                        <img src="/images/livebet/6.png" alt=""/>
                        </div>
                        <div>
                        <img src="/images/livebet/20.png" alt=""/>
                        </div>
                        <div>
                        <img src="/images/livebet/4.png" alt=""/>
                        </div>
                        </Slider>
                    
                    </div>
                </div>                  
                <div className="three wide column" style={{ background: 'lightblue'}}>
                    
                </div>
            </div>
        </div>       
        </div>
      
        
    )
}}
