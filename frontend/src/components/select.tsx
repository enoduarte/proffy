import React, { SelectHTMLAttributes } from "react";

import "../styles/input.css";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  label: string;
  options?: Array<{ value: string; label: string }>;
}

const Select: React.FC<SelectProps> = ({ name, label, options, ...rest }) => {
  return (
    <div className="input-block">
      <label htmlFor={name}>{label}</label>
      <select defaultValue="" id={name} {...rest}>
        <option value="" hidden disabled>
          Selecione uma opção
        </option>

        {options?.map((opt) => (
          <option value={opt.value} key={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
