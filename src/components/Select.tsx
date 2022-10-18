import React from 'react';

interface SelectOptions {
  value: string,
  text: string
}

interface Props {
  options: Array<SelectOptions>,
  value: string,
  selectMessage: string,
  onChange: (value: string) => void
}

const Select: React.FC<Props> = (props) => {

  const options = props.options.map(option => <option key={option.value} value={option.value}>{option.text}</option>)

  return (
    <select value={props.value} onChange={(e) => props.onChange(e.currentTarget.value)}>
      <option value=''> {props.selectMessage} </option>
      {options}
    </select>
  );
};

export default Select;