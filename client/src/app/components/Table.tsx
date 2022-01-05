import React, { FunctionComponent, useState } from 'react';
import Moment from 'moment';
import ITableProps from '../model/ITableProps';
import IQuerySorting from '../model/IQuerySorting';

const Table: FunctionComponent<ITableProps> = (props) => {
    let projects = props.dataListObject;
    const [isAscSorting, setIsAscSorting] = useState(false);

    const handleQuerySorting = (filterString: string, isAscSorting: boolean): any => {
        const querySortingObject: IQuerySorting = {
            filterString: filterString,
            isAscSorting: isAscSorting
        }
        props.querySorting(querySortingObject);
        setIsAscSorting(!isAscSorting);
    }

    return (
        <table className="table-fixed w-full hoverTable">
            <thead className="bg-gray-400">
                <tr>
                    <th onClick={() => handleQuerySorting('id', isAscSorting)} className="border px-4 py-2 w-40 cursor-pointer hover:text-blue-600">
                        <div className="flex items-stretch ">
                            <div>Project Id</div>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                                </svg>
                            </div>
                        </div>
                    </th>
                    <th onClick={() => handleQuerySorting('name', isAscSorting)} className="border px-4 py-2 cursor-pointer hover:text-blue-600">
                        <div className="flex items-stretch ">
                            <div>Project Name</div>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                                </svg>
                            </div>
                        </div>
                    </th>
                    <th onClick={() => handleQuerySorting('deadline', isAscSorting)} className="border px-4 py-2 cursor-pointer hover:text-blue-600">
                        <div className="flex items-stretch ">
                            <div>Project Deadline</div>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                                </svg>
                            </div>
                        </div>
                    </th>
                    <th onClick={() => handleQuerySorting('totalCost', isAscSorting)} className="border px-4 py-2 cursor-pointer hover:text-blue-600">
                        <div className="flex items-stretch ">
                            <div>Project Total-Cost</div>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                                </svg>
                            </div>
                        </div>
                    </th>
                    <th onClick={() => handleQuerySorting('timeSpent', isAscSorting)} className="border px-4 py-2 cursor-pointer hover:text-blue-600">
                        <div className="flex items-stretch ">
                            <div>Worked-Hours</div>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                                </svg>
                            </div>
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody>
                {
                    projects.map((project) => {
                        return (
                            <tr className={
                                props.selectedIndex > 0 && props.selectedIndex === project.id ? "bg-green-200" : "hover:bg-gray-100"
                            } key={project.id} onClick={() => props.onRowSelect(project)}>
                                <td className="border px-4 py-2 w-32">{project.id}</td>
                                <td className="border px-4 py-2">{project.name}</td>
                                <td className="border px-4 py-2">{Moment(project.deadline).format('DD.MM.YYYY')}</td>
                                <td className="border px-4 py-2">{project.totalCost} hours</td>
                                <td className="border px-4 py-2">{project.timeSpent / 60} hours</td>
                            </tr>
                        );
                    })
                }
            </tbody>
        </table>
    );
}
export default Table