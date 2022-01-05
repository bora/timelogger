import React, { FunctionComponent, useState } from 'react';
import insertTimesheet from '../api/timesheets';
import IModalProps from '../model/IModalProps';
import TimesheetSelectBox from './TimesheetSelectBox';
import Constants from '../constants';
import IMessage from '../model/IMessage';

const Modal: FunctionComponent<IModalProps> = (props) => {
    let projectInfo = props.selectedRowItem;
    let myUser = props.myUser;
    let buttonClassName = (props.isDisable) ? Constants.ENTRY_BUTTON_DISABLED_CSS : Constants.ENTRY_BUTTON_ENABLED_CSS;
    const [showModal, setShowModal] = useState(false);
    const [timeEntered, setTimesheet] = useState<string>(Constants.DEFAULT_INTERVAL_NUMBER.toString());
    //const [warningMessage, setWarningMessage] = useState('');

    const HandleSaveFacade = (props: any) => {
        var projInfo = props.selectedRowItem;
        let time = parseInt(timeEntered);

        if (IsValidated(projInfo, time)) {
            let projectId = projInfo?.id !== undefined ? projInfo?.id : 0;
            let userId = myUser !== undefined && myUser.id > 0 ? myUser.id : 1;
            insertTimesheet(projectId, userId, time);
            const messageObject: IMessage = {
                text: Constants.SUCCESS_MESSAGE,
                isSucceeded: true
            }
            HandleCloseFacade();
            props.rerenderParentCallback(messageObject);
            return true;
        }
        return false;
    }

    const IsValidated = (selectedRowItem: any, time: number): boolean => {
        let projInfo = selectedRowItem;
        var today = new Date();
        const currentDate = new Date(today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate());
        const messageObj: IMessage = {
            text: '',
            isSucceeded: true
        }
        let deadline = projInfo?.deadline !== undefined ? new Date(projInfo?.deadline) : Constants.DEFAULT_EMPTY_DATE;
        let timeSpent = projInfo?.timeSpent !== undefined ? projInfo?.timeSpent : 0;
        let totalCost = projInfo?.totalCost !== undefined ? projInfo?.totalCost : 0;
        let newTimeSpent = timeSpent + time;
        let totalHours = newTimeSpent / 60;
        if (totalHours > totalCost) {
            messageObj.isSucceeded = false;
            messageObj.text = Constants.TOTAL_HOURS_WARNING;
            HandleCloseFacade();
            props.rerenderParentCallback(messageObj);
            return false;
        }
        if (currentDate > deadline) {
            messageObj.isSucceeded = false;
            messageObj.text = Constants.DEADLINE_WARNING;
            HandleCloseFacade();
            props.rerenderParentCallback(messageObj);
            return false;
        }
        return true;
    }

    const HandleCloseFacade = () => {
        setShowModal(false);
    }

    const HandleOnChangeTimeSheet = (timeEnteredParam: string) => {
        setTimesheet(timeEnteredParam);
    }

    return (
        <>
            <button
                disabled={props.isDisable}
                className={buttonClassName}
                type="button"
                onClick={() => setShowModal(true)}>Add entry
            </button>
            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                    <h3 className="text-2xl font-semibold">
                                        {projectInfo?.name}
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => HandleCloseFacade()}
                                    >
                                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative p-6 flex-auto">
                                    <TimesheetSelectBox selectedItem={projectInfo} onChangeTimeSheet={HandleOnChangeTimeSheet} />
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => HandleCloseFacade()}
                                    >
                                        Close
                                    </button>
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                        type="button"
                                        onClick={() => HandleSaveFacade(props)}
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
}

export default Modal