import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import NoteContext from '../NoteContext';
import './MainPageSidebar.css';

class MainPageSidebar extends Component {
	static contextType = NoteContext;

	render() {
		const { folders } = this.context;
		return (
			<div className="navBox">
				<div className='folderList'>
					{folders.map(folder => 
						<div className="btn folder" key={folder.id}>
							<NavLink 
								to={`/folder/${folder.id}`}
								activeStyle={{
									background: 'yellow'
								}}
							>
								{folder.folder_name}
							</NavLink>
						</div>
					)}
				</div>
				<Link to={'/add-folder'} className="btn addFolderBtn">Add Folder</Link>
      </div>
		);
	}
}

export default MainPageSidebar;