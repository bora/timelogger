import React, { FunctionComponent } from 'react';
import ITimesheetSelectBoxProps from '../model/ITimesheetSelectBoxProps';

const TimesheetSelectBox: FunctionComponent<ITimesheetSelectBoxProps> = (props) => {
    const DEFAULT_INTERVAL_NUMBER = 30;
    const timesheetArray = CreateArray(16, 0);

    function CreateArray(arrayCount: number, intervalNumber: number) {
        const tsArray = [];
        intervalNumber = intervalNumber > 0 ? intervalNumber : DEFAULT_INTERVAL_NUMBER;
        for (let index = intervalNumber; index <= arrayCount * intervalNumber; index = index + intervalNumber) {
            tsArray.push(index);
        }
        return tsArray;
    }

    return (
        <div className="col-span-6 sm:col-span-3">
            <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                Please enter your timesheet.
            </label>
            <select
                id="timesheet"
                name="timesheet"
                autoComplete="timesheetEntry"
                className="form-select form-select-lg mb-3
      appearance-none block w-2/3 px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300
      rounded transition ease-in-out m-0
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label=".form-select-lg example"
                onChange={(e) => props.onChangeTimeSheet(e.target.value)}
            >
                {
                    timesheetArray.map((timesheet) => {
                        return (
                            <option key={timesheet} value={timesheet}>{timesheet} minutes</option>
                        );
                    })
                }

            </select>
        </div>
    );
}
export default TimesheetSelectBox