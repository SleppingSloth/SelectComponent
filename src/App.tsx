import React, {useState} from 'react';
import Select from './Select';
import {SelectOptions} from "./model"

const options: SelectOptions[] = [
  {lable : "First", value: 1},
  {lable : "Second", value: 2},
  {lable : "Third", value: 3},
  {lable : "Fourth", value: 4},

]


function App() {
const [value, setValue] = useState<SelectOptions | undefined>(options[1])
const [value2, setValue2] = useState<SelectOptions[]>([options[1]])
 
  return (
    <div className="App">
      <Select multiple options={options} value={value2} onChange ={option => setValue2(option)}/>
      <Select options={options} value={value} onChange ={option => setValue(option)}/>
    </div>
  );
}

export default App;
