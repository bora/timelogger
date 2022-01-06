import *  as  React from 'react';
import Project from './model/IProject';
import ProjectsView from './views/Projects';
import './tailwind.generated.css';
import { useEffect, useState } from 'react';
import User from './model/IUser';
import getMyUser from './api/users';
import getAllProjectsWithTimeSpent, { getAllProjectsWithName } from './api/projects';
import IQuerySorting from './model/IQuerySorting';
import IMessage from './model/IMessage';

export default function App() {
    const [myUser, setMyUser] = useState<User>();
    const [projectListObject, setProjectListObject] = useState<Project[]>([]);
    const [updatedStatus, setUpdatedStatus] = useState(false);
    const [searchString, setSearchString] = useState<string>('');
    const [querySorting, setQuerySorting] = useState<IQuerySorting>();
    const [updatedStatusWithUser, setUpdatedStatusWithUser] = useState(false);
    const [messageObject, setMessageObject] = useState<IMessage>();

    const handleUpdatedStatusWithUser = (updateParamForUser: boolean) => {
        setUpdatedStatusWithUser(updateParamForUser);
        setMessageObject(undefined);
    }

    const handleRerenderParentCallback = (message: IMessage) => {
        setUpdatedStatus(true);
        setMessageObject(message);
    }

    const handleSearch = (searchStringParam: string) => {
        setSearchString(searchStringParam);
        setMessageObject(undefined);
    }

    const handleQuerySorting = (querySorting: IQuerySorting) => {
        setQuerySorting(querySorting);
    }

    useEffect(() => {
        getMyUser()
            .then(data => { setMyUser(data) })
            .catch(err => { console.error('getMyUser error:', err) });
    }, []);

    useEffect(() => {
        let user = updatedStatusWithUser ? myUser : undefined;
        console.log('useEffect no 2 User', myUser?.name + ' ' + myUser?.surname);
        getAllProjectsWithTimeSpent(user, querySorting)
            .then(dataProject => setProjectListObject(dataProject))
            .catch(err => { console.error('getAllProjectsWithTimeSpent error:', err, myUser) });
        setUpdatedStatus(false);
    }, [updatedStatus, querySorting, updatedStatusWithUser]);

    useEffect(() => {
        if (searchString !== undefined && searchString !== '') {
            getAllProjectsWithName(searchString)
                .then(data => setProjectListObject(data))
                .catch(err => { console.error('getAllProjectsWithName error:', err) });
            setSearchString('');
        }
    }, [searchString]);

    return (
        <>
            <header className="bg-gray-900 text-white flex justify-between items-center h-12 w-full">
                <div className="ml-10">
                    <a className="navbar-brand" href="/">Timelogger</a>
                </div>
                <div className="mr-8">
                    <a className="navbar-brand" href="/">
                        {myUser !== undefined ? myUser.name + ' ' + myUser.surname : ''}
                    </a>
                </div>
            </header>
            <main>
                {messageObject !== undefined && !messageObject?.isSucceeded && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-5" role="alert">
                        <strong className="font-bold">VALIDATION WARNING! </strong><br />
                        <span className="block sm:inline">{messageObject?.text}</span>
                    </div>
                )
                }
                {messageObject !== undefined && messageObject?.isSucceeded && (
                    <div className="bg-green-200 border border-green-400 text-green-800 px-4 py-3 rounded relative mb-5" role="alert">
                        <strong className="font-bold">SUCCESSFUL ENTRY :)</strong><br />
                        <span className="block sm:inline">{messageObject?.text}</span>
                    </div>
                )
                }
                <div className="container mx-auto">
                    <ProjectsView dataListObject={projectListObject}
                        rerenderParentCallback={handleRerenderParentCallback}
                        searchAction={handleSearch}
                        querySorting={handleQuerySorting}
                        updatedStatusWithUser={handleUpdatedStatusWithUser}
                        myUser={myUser}
                    />
                </div>
            </main>
        </>
    );
}
