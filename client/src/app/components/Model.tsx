import React, {FunctionComponent, useState} from 'react';
import insertTimesheet from '../api/timesheets';
import IModalProps from '../model/IModalProps';
import TimesheetSelectBox from './TimesheetSelectBox';

const Modal: FunctionComponent<IModalProps> = (props) => {
  const DEFAULT_INTERVAL_NUMBER = "30";
  let projectInfo = props.selectedRowItem;
  let buttonClassName = (props.isDisable) ? "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed" :
    "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded";
  const [showModal, setShowModal] = useState(false);
  const [timeEntered, setTimesheet] = useState<string>(DEFAULT_INTERVAL_NUMBER);

  const HandleSaveFacade = (props:any) =>{
    let time = parseInt(timeEntered);
    var today = new Date();
    const currentDate = new Date(today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate());
    let projectId = projectInfo?.id !== undefined ? projectInfo?.id : 0;
    let deadline = projectInfo?.deadline !== undefined ? new Date(projectInfo?.deadline) : '1900-01-01';
    let timeSpent = projectInfo?.timeSpent !== undefined ? projectInfo?.timeSpent : 0;
    let totalCost = projectInfo?.totalCost !== undefined ? projectInfo?.totalCost : 0;
    let newTimeSpent = timeSpent + time;
    let totalHours = newTimeSpent/60;
    if( totalHours > totalCost ){
      alert('VALIDATION WARNING: You can not enter time more than total cost of the project!');
      return false;
    }
    if( currentDate > deadline ){
      alert('VALIDATION WARNING: You can not enter time projects deadline passed!');
      return false;
    }
    insertTimesheet(projectId,1,time);
    //projectInfo?.timeSpent = newTimeSpent!==undefined ? newTimeSpent : projectInfo?.timeSpent;
    props.rerenderParentCallback();
    setShowModal(false);
    return true;
  }

  const HandleOnChangeTimeSheet = (timeEnteredParam:string) => {
    setTimesheet(timeEnteredParam);
	}
  console.log('MODELE geldi selectBoxtan. MUJDE!', timeEntered);

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
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                    {/* <p>Time Entered: {timeEntered}</p> */}
                    <TimesheetSelectBox selectedItem={projectInfo} onChangeTimeSheet={HandleOnChangeTimeSheet}  />
                  
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
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