import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import NoteContext from '../NoteContext';

class MainPageSidebar extends Component {
	static contextType = NoteContext;

	render() {
		const { folders } = this.context;
		return (
			<>
				<ul className='folderList'>
					{folders.map(folder => 
						<li className="folder" key={folder.id}>
							<NavLink 
								to={`/folder/${folder.id}`}
								activeStyle={{
									background: 'yellow'
								}}
							>
								{folder.name}
							</NavLink>
						</li>
					)}
				</ul>
      </>
		);
	}
}

export default MainPageSidebar;