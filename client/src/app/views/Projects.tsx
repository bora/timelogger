import React, {FunctionComponent, useState} from 'react';
import Model from '../components/Model';
import Table from '../components/Table';
import IProject from '../model/IProject';
import IProjectsView from '../model/IProjectProps';
import IQuerySorting from '../model/IQuerySorting';


//<ProjectsViewProps>
const Projects: FunctionComponent<IProjectsView> = (props) => {
	let projectList = props.dataListObject;
	const [selectedItem, setSelectedItem] = useState<IProject|null>( null );
	const [isDisable, setButtonDisabledOrNot] = useState(true);
	const [textInput, setTextInput] = useState('');

	const handleRowSelect = (project:IProject) => {
		setSelectedItem(project);
		setButtonDisabledOrNot(project===null);
	}
	const handleSearch = (event:any) =>{
		event.preventDefault();
		if(textInput!==undefined && textInput!=null && textInput!=='')
			props.searchAction(textInput);
	}

	const handleChange = (value:string) => {
		setTextInput(value);
	}

	const handleQuerySorting = (querySorting:IQuerySorting) => {
		props.querySorting(querySorting);
	}

	const handleRerenderParentCallback = () =>{
		props.rerenderParentCallback();
	}

	return (
		<>
			<div className="flex items-center my-6">
				<div className="w-1/2">
					<Model selectedRowItem={selectedItem} isDisable={isDisable} rerenderParentCallback={handleRerenderParentCallback}  />
				</div>

				<div className="w-1/2 flex justify-end">
					<form>
						<input className="border rounded-full py-2 px-4" 
							   onChange={(e) => handleChange(e.target.value)}
							   id='searchProject'
							   type="search" placeholder="Search" aria-label="Search" />
						<button onClick={(event) => handleSearch(event)} 
								className="bg-blue-500 hover:bg-blue-700 text-white rounded-full py-2 px-4 ml-2" 
								type="submit" >
								Search
						</button>
					</form>
				</div>
			</div>

			<Table dataListObject={projectList} 
				   onRowSelect={handleRowSelect} 
				   selectedIndex={selectedItem?.id}
				   querySorting={handleQuerySorting}
			 />
		</>
	);
}

export default Projects; 