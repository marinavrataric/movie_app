import React, { ChangeEvent } from "react";

interface Props {
  dropdownName: string;
  selectedValue: string;
  dropdownBarList: Array<any>;
  handleSelectValue: (e: ChangeEvent<HTMLSelectElement>) => void;
}

function Dropdown(props: Props) {
  return (
    <div className="dropdown">
      <label>
        <p className="select-title">Select {props.dropdownName}</p>
        <select value={props.selectedValue} onChange={props.handleSelectValue}>
          {props.dropdownBarList}
        </select>
      </label>
    </div>
  );
}

export default Dropdown;
