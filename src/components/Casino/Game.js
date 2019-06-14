import React, { useState } from 'react';
//import '../public/css/Sports.css';

const Game = ({ game }) => {

	const [displayButton, setDisplayButton] = useState(0);

	return (
		// <div className="eight wide mobile five wide computer center aligned column  ">
		<div className="ui eight wide mobile four wide computer center aligned column">

			<div className="ui image" style={{ border: '4px white solid' }}>

				<img onMouseOver={() => setDisplayButton(1)}
					onMouseOut={() => setDisplayButton(0)}
					style={{ zIndex: 1 }}
					src={!game.iconUrl ? `/images/itcasino/${game.providerGameId}.png` : game.iconUrl} alt="Local Picrure" />
				<button className="huge ui yellow button"
					style={{
						position: 'relative',
						top: '50%',

						zIndex: 5,
						opacity: displayButton
					}}>
					GIOCA
				</button>
				<div style={{ background: 'yellow' }}>
					<h5>{game.gameName}</h5>
				</div>
			</div>


		</div >

	)
}

export default Game;