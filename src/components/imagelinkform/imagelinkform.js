import React from 'react';
import './imagelinkform.css';



const ImageLinkForm = ( { onInputChange, onButtonSubmit } ) => {
	return(
			<div>
				<p className="f3">
				{`Enter the URL for an image of a person... this webpage's AI will find their face...` }
				</p>
					<div className='center'>
						<div className=' form center pa4 br3 shadow-5'>
							<input className='f4 pa2 w-70 br3 center' type='text' onChange={onInputChange}  />
							<button className='w-30 br3 grow f4 link ph3 pv2 dib white bg-light-purple' 
										onClick={onButtonSubmit}
							>Detect</button>
						</div>
					</div>		
			</div>
			 
		);


}
export default ImageLinkForm;