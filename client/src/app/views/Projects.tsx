import React, { FunctionComponent, useState } from 'react';
import Model from '../components/Model';
import Table from '../components/Table';
import constants from '../constants';
import IMessage from '../model/IMessage';
import IProject from '../model/IProject';
import IProjectsView from '../model/IProjectProps';
import IQuerySorting from '../model/IQuerySorting';


//<ProjectsViewProps>
const Projects: FunctionComponent<IProjectsView> = (props) => {
    let projectList = props.dataListObject;
    const [selectedItem, setSelectedItem] = useState<IProject | null>(null);
    const [entryButtonDisabled, setEntryButtonDisabled] = useState(true);
    const [textInput, setTextInput] = useState('');
    const [updatedStatusWithUser, setUpdatedStatusWithUser] = useState(false);
    const [myEntryButtonText, setMyEntryButtonText] = useState(constants.MY_ENTRY_BUTTON_ENABLED_TEXT);

    const handleRowSelect = (project: IProject) => {
        setSelectedItem(project);
        setEntryButtonDisabled(project === null);
    }
    const handleSearch = (event: any) => {
        event.preventDefault();
        if (textInput !== undefined && textInput != null && textInput !== '')
            props.searchAction(textInput);
    }

    const handleChange = (value: string) => {
        setTextInput(value);
    }

    const handleQuerySorting = (querySorting: IQuerySorting) => {
        props.querySorting(querySorting);
    }

    const handleRerenderParentCallback = (message: IMessage) => {
        setSelectedItem(null);
        setEntryButtonDisabled(true);
        props.rerenderParentCallback(message);
    }

    const handleMyEntries = () => {
        setUpdatedStatusWithUser(!updatedStatusWithUser);
        setMyEntryButtonText(updatedStatusWithUser ? constants.MY_ENTRY_BUTTON_DISABLED_TEXT : constants.MY_ENTRY_BUTTON_ENABLED_TEXT);
        props.updatedStatusWithUser(updatedStatusWithUser);
    }

    return (
        <>
            <div className="flex items-center my-6">
                <div className="w-1/2">
                    <Model selectedRowItem={selectedItem}
                        isDisable={entryButtonDisabled}
                        rerenderParentCallback={handleRerenderParentCallback}
                        myUser={props.myUser}
                    />
                    <button
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-3"
                        type="button"
                        onClick={() => handleMyEntries()}>{myEntryButtonText}
                    </button>
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