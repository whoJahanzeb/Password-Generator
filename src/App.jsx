import React, { useCallback, useEffect, useState } from "react";

const App = () => {
  const [length, setLength] = useState(8);
  const [isNumberAllowed, setIsNumberAllowed] = useState(false);
  const [isCharAllowed, setIsCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passwordGenerator = useCallback(() => {
    let password = "";
    let string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (isNumberAllowed) string += "0123456789";
    if (isCharAllowed) string += "@#$%&{}[]-_+=!~`";
    for (let i = 1; i <= length; i++) {
      let character = Math.floor(Math.random() * string.length + 1);
      password += string.charAt(character);
    }
    setPassword(password);
  }, [length, isNumberAllowed, isCharAllowed, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [length, isNumberAllowed, isCharAllowed, passwordGenerator]);

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-2 m-8 text-orange-500 bg-blue-300">
      <div className="shadow flex rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          onChange={() => setPassword()}
          value={password}
          placeholder="Password"
          readOnly
          className="w-full outline-none px-3 py-1"
        />
        <button className="capitalize bg-orange-400 text-white outline-none px-2 py-1">
          copy
        </button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="items-center flex gap-x-1">
          <input
            type="range"
            min={8}
            max={50}
            value={length}
            className="cursor-pointer"
            onChange={(e) => {
              setLength(e.target.value);
            }}
          />
          <label>Length: {length}</label>
        </div>
        <div className="items-center flex gap-x-1">
          <input
            type="checkbox"
            value={isNumberAllowed}
            id="numberInput"
            onChange={() => {
              setIsNumberAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className="items-center flex gap-x-1">
          <input
            type="checkbox"
            value={isCharAllowed}
            id="charInput"
            onChange={() => {
              setIsCharAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="charInput">Characters</label>
        </div>
      </div>
    </div>
  );
};

export default App;
