import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Slider from "react-slick";

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", width: '50px', marginLeft: '50px', zIndex: 999 }}
            onClick={onClick}
        />
    );
}
function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", marginRight: '70px', zIndex: 999 }}
            onClick={onClick}
        />
    );
}

export default class Home extends Component {
    render() {
        const settings = {
            dots: false,
            lazyLoad: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 2,
            nextArrow: <SampleNextArrow />,
            prevArrow: <SamplePrevArrow />
        };

        return (
            <div>
                <div className="ui three grid" >
                    <div className="three column row">
                        <div className="three wide column" >

                        </div>
                        <div className="ten wide column" style={{ textAlign: 'center' }}>
                            <div className="one column row" style={{ textAlign: 'center', marginBottom: '30px' }}>
                                <div>
                                    <Slider {...settings}>
                                        <div className="homepage-item">
                                            <img src="/images/livebet/home1.png" alt="" />
                                        </div>
                                        <div className="homepage-item">
                                            <img src="/images/livebet/home2.png" />
                                        </div>
                                        <div className="homepage-item">
                                            <img src="/images/livebet/home3.png" alt="" />
                                        </div>
                                    </Slider>

                                </div>
                            </div>
                            <div className="ui stackable grid" >

                                <div className="two column row">
                                    <div className="column">
                                        <Link to="/Sport" >
                                            <div className="ui segment home">
                                                <div className="ui icon header">
                                                    <i className="basketball ball icon"></i>
                                                    SPORTS
                                            </div>
                                            </div>
                                        </Link>

                                    </div>
                                    <div className="column">
                                        <Link to="/LiveBet" >
                                            <div className="ui  segment home">
                                                <div className="ui icon header">
                                                    <i className="stopwatch icon"></i>
                                                    SPORT LIVE
                                            </div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                                <div className="three column row">
                                    <div className="column">
                                        <Link to="/Casino" >
                                            <div className="ui  segment home">
                                                <div className="ui icon header">
                                                    <i className="bullseye icon"></i>
                                                    CASINO
                                            </div>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="column">
                                        <Link to="/Poker" >
                                            <div className="ui  segment home">
                                                <div className="ui icon header">
                                                    <i className="copy icon"></i>
                                                    POKER
                                            </div>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="column">
                                        <Link to="/Virtual" >
                                            <div className="ui  segment home">
                                                <div className="ui icon header">
                                                    <i className="percent icon"></i>
                                                    VIRTUAL
                                            </div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="three wide column">

                        </div>
                    </div>
                </div>
            </div >


        )
    }
}
