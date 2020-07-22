import React, { ChangeEvent } from "react";

interface Props {
  dropdownName: string;
  selectedValue: string;
  dropdownBarList: Array<React.ReactNode>;
  handleSelectValue: (e: ChangeEvent<HTMLSelectElement>) => void;
}

function Dropdown(props: Props) {
  return (
    <div className="dropdown">
      <label>
        <p className="select-title">{props.dropdownName}</p>
        <select value={props.selectedValue} onChange={props.handleSelectValue}>
          <option value="select">select</option>
          {props.dropdownBarList}
        </select>
      </label>
    </div>
  );
}

export default Dropdown;
