import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class MainPageSidebar extends Component {
	render() {
		const { folders } = this.props;
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