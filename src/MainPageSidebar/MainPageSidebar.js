import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class MainPageSidebar extends Component {
	render() {
		const { folders } = this.props;
		return (
			<>
				<ul className='folderList'>
					{folders.map(folder => 
						<li className="folder" key={folder.id}>
							<Link to={`/folder/${folder.id}`}>{folder.name}</Link>
						</li>
					)}
				</ul>
      </>
		);
	}
}

export default MainPageSidebar;