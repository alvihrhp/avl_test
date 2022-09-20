import React, { useState, useEffect } from "react";
/** Components */
import Input from "../Input";
/** Third Party Library */
import classnames from "classnames";

interface Props {
  inputs: { [key: string]: any };
  setInputs: React.Dispatch<React.SetStateAction<{ [key: string]: any }[]>>;
  submitForm: () => void;
  btnName: string;
  from?: string;
}

const Form: React.FC<Props> = ({
  inputs,
  setInputs,
  submitForm,
  btnName,
  from,
}) => {
  const fromScreen = from ? from : null;

  const [passwordError, setPasswordError] = useState<{ [key: string]: any }[]>(
    []
  );

  const [passwordMatch, setPasswordMatch] = useState<string>("");

  const fillInputValue = (id: string, value: string) => {
    const newInputs = inputs.map((input: { [key: string]: any }) => {
      return input.attr.id === id
        ? { ...input, attr: { ...input.attr, value: value } }
        : { ...input };
    });

    let flag = false;

    if (from === "register") {
      setPasswordError(checkPassword(newInputs[1].attr.value));
    }

    if (
      from === "register" &&
      newInputs[2].attr.value !== newInputs[1].attr.value
    ) {
      setPasswordMatch("Confirm Password not match");
    } else if (
      from === "register" &&
      newInputs[2].attr.value === newInputs[1].attr.value
    ) {
      setPasswordMatch("");
    }

    setInputs(newInputs);
  };

  const checkPassword = (value: string) => {
    return [
      {
        message: "Password must contain at least one lowercase character",
        test: RegExp("^(.*[a-z].*)$").test(value),
      },
      {
        message: "Password must contain at least one uppercase character",
        test: RegExp("^(.*[A-Z].*)$").test(value),
      },
      {
        message: "Password must contain at least one number",
        test: /\d/.test(value),
      },
      {
        message: "Password must contain at least one special character",
        test: /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(value),
      },
      {
        message: "Password must be minimum of eight length",
        test: RegExp("^.{8,}$").test(value),
      },
    ];
  };

  return (
    <form className="space-y-6">
      {inputs.map((input: { [key: string]: any }, inputIdx: number) => (
        <div key={inputIdx}>
          <label className="block text-sm font-medium text-gray-700">
            {input.label}
          </label>
          {input.attr.id === "password" ? (
            <div className="mt-1">
              <Input input={input.attr} changeValue={fillInputValue} />
              <ul className="mt-[1.5rem]">
                {passwordError.map((validate: { [key: string]: any }) => (
                  <li
                    className={classnames("text-rose-500 block mt-2", {
                      ["hidden"]: validate.test,
                    })}
                  >
                    • {validate.message}
                  </li>
                ))}
              </ul>
            </div>
          ) : input.attr.id === "confirm-password" ? (
            <div className="mt-1">
              <Input input={input.attr} changeValue={fillInputValue} />
              <div className="w-full mt-[1rem]">
                {passwordMatch && (
                  <span className="text-rose-500">{passwordMatch}</span>
                )}
              </div>
            </div>
          ) : (
            <div className="mt-1">
              <Input input={input.attr} changeValue={fillInputValue} />
            </div>
          )}
        </div>
      ))}
      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          {btnName}
        </button>
      </div>
    </form>
  );
};

export default Form;
