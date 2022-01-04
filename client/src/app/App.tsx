import *  as  React from 'react';
import Project from './model/IProject';
import ProjectsView from './views/Projects';
import './tailwind.generated.css';
import { useEffect, useState } from 'react';
import User from './model/IUser';
import getMyUser from './api/users';
import getAllProjectsWithTimeSpent, { getAllProjectsWithName } from './api/projects';
import IQuerySorting from './model/IQuerySorting';

export default function App() {
    const [myUser, setMyUser] = useState<User>();
    const [projectListObject, setProjectListObject] = useState<Project[]>([]);
    const [updatedStatus, setUpdatedStatus] = useState(false);
    const [searchString, setSearchString] = useState<string>('');
    const [querySorting, setQuerySorting] = useState<IQuerySorting>();

    const handleRerenderParentCallback = () => {
        setUpdatedStatus(true);
    }

    const handleSearch = (searchStringParam: string) => {
        setSearchString(searchStringParam);
    }

    const handleQuerySorting = (querySorting: IQuerySorting) => {
        setQuerySorting(querySorting);
    }

    useEffect(() => {
        getMyUser()
            .then(data => {
                setMyUser(data)
                getAllProjectsWithTimeSpent(data, querySorting)
                    .then(dataProject => setProjectListObject(dataProject))
                    .catch(err => { console.error('getAllProjectsWithTimeSpent error:', err, myUser) });
                setUpdatedStatus(false);
            })
            .catch(err => { console.log('getMyUser error:', err) });
    }, [updatedStatus, querySorting]);

    useEffect(() => {
        if (searchString !== undefined && searchString !== '') {
            getAllProjectsWithName(searchString)
                .then(data => setProjectListObject(data))
                .catch(err => { console.log('getAllProjectsWithName error:', err) });
            setSearchString('');
        }
    }, [searchString]);

    return (
        <>
            <header className="bg-gray-900 text-white flex items-center h-12 w-full">
                <div className="container mx-auto">
                    <a className="navbar-brand" href="/">Timelogger</a>
                </div>
            </header>
            <main>
                <div className="container mx-auto">
                    <ProjectsView dataListObject={projectListObject}
                        rerenderParentCallback={handleRerenderParentCallback}
                        searchAction={handleSearch}
                        querySorting={handleQuerySorting}
                    />
                </div>
            </main>
        </>
    );
}
