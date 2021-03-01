import React from 'react';
import './App.css';

function App() {
  const [inputValueArr,setInputValueArr] = React.useState(["input1","input2","input3"])
  const [inputValue,setInputValue] = React.useState('')

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>)=>{
    event.preventDefault();
    setInputValue(event.target.value)
  }

  const InputForm = ()=>{
    console.log("レンダリングされたよ")
    return(
      <label htmlFor="input2">
        <input id ="input2" type="text" defaultValue={inputValue} onChange={handleInput}/>
      </label>
    )
  }

  return (
    <div className="App">
      <InputForm/>
      {/*<InputForm2 value={inputValue} handler={handleInput}/>*/}
      {inputValueArr.map((value) => (
        <label key={`hoge_${value}`} htmlFor="input1">
          keyにバリューを使っている時
          <input  id ={`input_${value}`} type="text" defaultValue={value} onChange={handleInput}/>
        </label>
      ))}
    </div>
  );
}

const InputForm2 = (props)=>{
  console.log("レンダリングされたよ2")
  return(
    <label htmlFor="input2">
      コンポーネントを関数コンポーネント内に定義している時
      <input id ="input2" type="text" defaultValue={props.value} onChange={props.handler}/>
    </label>
  )
}
export default App;
