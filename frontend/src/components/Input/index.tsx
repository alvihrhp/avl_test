import React, { useState, useEffect } from "react";

interface Props {
  input: { [key: string]: any };
  changeValue: (id: string, value: string) => void;
}

const Input: React.FC<Props> = ({ input, changeValue }) => {
  return (
    <input
      {...input}
      required
      onChange={(e) => changeValue(e.target.id, e.target.value)}
    />
  );
};

export default Input;
