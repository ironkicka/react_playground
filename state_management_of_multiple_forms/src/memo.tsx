import React from 'react';
import './App.css';
import TextField from "@material-ui/core/TextField";
import addDays from 'date-fns/addDays'
import {Button} from "@material-ui/core";


type TermBudget = {
  id: number;
  startDate: string;
  endDate: string;
  budget: number;
}

const formatDate = (date: Date, format: string): string => {
  if (!format) format = 'YYYY-MM-DD hh:mm:ss.SSS';
  format = format.replace(/YYYY/g, String(date.getFullYear()));
  format = format.replace(/MM/g, ('0' + String((date.getMonth() + 1))).slice(-2));
  format = format.replace(/DD/g, ('0' + String(date.getDate())).slice(-2));
  return format;
};

const currentDate = new Date()
const currentDateStr = formatDate(currentDate, 'YYYY-MM-DD')

const initialTermBudget = {
  id : 1,
  startDate:currentDateStr,
  endDate:formatDate(addDays(currentDate,1),'YYYY-MM-DD'),
  budget:0
}

const createNewTermBudget = (id:number) =>{
  return {
    ...initialTermBudget,
    id
  }
}

function App() {
  const [termBudgets,setTermBudgets] = React.useState<TermBudget[]>([initialTermBudget])
  const [inputValue,setInputValue] = React.useState('')
  const handleInputTermBudget = (event: React.ChangeEvent<HTMLInputElement>,index:number) => {
    event.preventDefault();
    const eventName = event.target.name
    const newTermBudgets = [...termBudgets]
    console.log(newTermBudgets)
    console.log("index",index)
    switch (eventName) {
      case 'startDate':
        newTermBudgets[index]={...newTermBudgets[index],startDate:event.target.value}
        setTermBudgets(newTermBudgets)
        console.log(newTermBudgets)
        // termBudgets[index]={...termBudgets[index],startDate:event.target.value}
        // setTermBudgets(termBudgets)
        break;
      case 'endDate':
        newTermBudgets[index]={...newTermBudgets[index],endDate:event.target.value}
        setTermBudgets(newTermBudgets)
        console.log(newTermBudgets)
        // termBudgets[index]={...termBudgets[index],endDate:event.target.value}
        // setTermBudgets(termBudgets)
        break;
      case 'budget':
        // newTermBudgets[index]={...newTermBudgets[index],budget:Number(event.target.value)}
        // console.log("同じstate?",Object.is(termBudgets,newTermBudgets))
        // setTermBudgets(newTermBudgets)
        const termBudgets2 = termBudgets
        termBudgets2[index]={...termBudgets[index],budget:Number(event.target.value)}
        setTermBudgets(termBudgets2)
        console.log(termBudgets2)
        console.log(Object.is(termBudgets,termBudgets2))
        break;
      default:

    }

  }

  const handleAddTerm = (event:any) =>{
    const result = createNewTermBudget(termBudgets.length + 1);
    const newTermBudgets = termBudgets.concat([result])
    setTermBudgets(newTermBudgets)
  }


  const TermAndBudgetForm = (props:{termBudget:TermBudget,index:number}) => {
    console.log('renderされたよ1111')
    return (
      <div>
        <h2>期間{props.index + 1}</h2>
        <TextField
          id={`startDate_${props.index}`}
          label="開始日"
          type="date"
          value={props.termBudget.startDate}
          InputLabelProps={{
            shrink: true,
          }}
          name='startDate'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputTermBudget(e, props.index)}
          variant="outlined"
        />
        <TextField
          id={`endDate_${props.index}`}
          label="終了日"
          type="date"
          value={props.termBudget.endDate}
          InputLabelProps={{
            shrink: true,
          }}
          name='endDate'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputTermBudget(e, props.index)}
          variant="outlined"
        />
        <TextField
          required
          id={`budget_${props.index}`}
          label="期間予算"
          name='budget'
          helperText="1文字以上255文字まで"
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
          defaultValue={props.termBudget.budget}
          type="number"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputTermBudget(e, props.index)}
        />
      </div>
    )
  }
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>)=>{
    event.preventDefault();
    setInputValue(event.target.value)
  }
  const InputForm = ()=>{
    return(
      <input defaultValue={inputValue} type="text" onChange={handleInput}/>
    )
  }
  return (
    <div className="App">
      {/*{termBudgets.map((t,index)=><TermAndBudgetForm2 key={index} termBudget={t} index={index} handleInputTermBudget={handleInputTermBudget}/>)}*/}
      {termBudgets.map((t,index)=><TermAndBudgetForm key={index} termBudget={t} index={index}/>)}
      <Button variant="contained" color="primary" onClick={handleAddTerm}>期間を追加</Button>
      <input type="text" onChange={handleInput}/>
      <InputForm/>
    </div>
  );
}

const TermAndBudgetForm2 = (props: { termBudget: TermBudget, index: number,handleInputTermBudget:any}) => {
  console.log('renderされたよ')
  return(
    <div>
      <h2>期間{props.index + 1}</h2>
      <TextField
        id={`startDate_${props.index}`}
        label="開始日"
        type="date"
        value={props.termBudget.startDate}
        InputLabelProps={{
          shrink: true,
        }}
        name='startDate'
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => props.handleInputTermBudget(e, props.index)}
        variant="outlined"
      />
      <TextField
        id={`endDate_${props.index}`}
        label="終了日"
        type="date"
        value={props.termBudget.endDate}
        InputLabelProps={{
          shrink: true,
        }}
        name='endDate'
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => props.handleInputTermBudget(e, props.index)}
        variant="outlined"
      />
      <TextField
        required
        id={`budget_${props.index}`}
        label="期間予算"
        name='budget'
        helperText="1文字以上255文字まで"
        variant="outlined"
        InputLabelProps={{
          shrink: true,
        }}
        defaultValue={props.termBudget.budget}
        type="number"
        onInput={(e: React.ChangeEvent<HTMLInputElement>) => props.handleInputTermBudget(e, props.index)}
      />
    </div>
  )
}
export default App;
