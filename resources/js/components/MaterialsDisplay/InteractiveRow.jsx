import React, { useState } from 'react';

import { ButtonModal } from './Modal';

export const InteractiveRow = ({material}) => {
	
	const [selectIndex, setSelectIndex] = useState(0);
	const [isDropDownOpen, setDropDownOpen] = useState(false);

	
	/* //  TODO: 

		* Clicking away from the drop-down-menu should close it!

		* Think of a more user friendly way to deal with having only one option
	
	*/


	return (
		<tr id='material'>
			<td>
					<ButtonModal material={material} selectIndex={selectIndex}/>					
			</td>

			<td> {material.name} </td>

			<td>
				<div id='drop-down' onClick={()=> setDropDownOpen(!isDropDownOpen)}>
						<table>
							
							<tbody>
								<tr id={selectIndex}>
										<td>{material.sections[selectIndex].instructor}</td>
										<td>{material.sections[selectIndex].time_days}</td>
										<td>{material.sections[selectIndex].room}</td>
								</tr>
							</tbody>
						
							
							{isDropDownOpen && 
								<tbody id='drop-down-menu' onMouseLeave={()=> setDropDownOpen(false)}>
									{material.sections.map(
										(_option, index)=>
											<tr key={index} onClick={()=>{setSelectIndex(index)}}>
													<td>{_option.instructor}</td>
													<td>{_option.time_days}</td>
													<td>{_option.room}</td>
													<td>{index == selectIndex ? "✔" : null}</td>
											</tr>
									)}
								</tbody>
							}

						</table>
					</div>
			</td>
		</tr>
	)
};