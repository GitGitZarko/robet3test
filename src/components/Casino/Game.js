import React from 'react';
//import '../public/css/Sports.css';

const Game = ({ game }) => {
	console.log(game)
	return (
		// <div className="eight wide mobile five wide computer center aligned column  ">
		<div className="ui eight wide mobile four wide computer center aligned column">
			<div className="ui image" style={{ border: '4px white solid' }}>
				<img src={!game.iconUrl ? `/images/itcasino/${game.providerGameId}.png` : game.iconUrl} alt="Local Picrure" />
				<div style={{ background: 'yellow' }}>
					<h5>{game.gameName}</h5>
				</div>
			</div>


		</div >

	)
}

export default Game;