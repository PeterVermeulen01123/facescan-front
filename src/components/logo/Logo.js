import React from 'react';
import Tilt from 'react-parallax-tilt';
import './Logo.css';
import brain from './brain.jpg';

const Logo = () => {
	return (
			<div className = 'ma4 mt0' >
				<Tilt className="Tilt br2 shadow-2"  style={{  max: 155, height: '125px', width: '120px' }} >
			      <div className="Tilt-inner pa3">
			        <img alt="brainImage" src={brain} />
			      </div>
    			</Tilt>
			</div>
		);

}

export default Logo; 