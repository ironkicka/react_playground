import React from 'react';
import './App.css';

function App() {
  const stories =[
    {name:"ほげほげ"},
    {name:"FugaFuga"},
    {name:"Fuga"}
  ]
  const [searchTerm,setInput] = React.useState('aaa')

  const handleSearch = event =>{
    setInput(event.target.value);
  }


  const searchedStories = stories.filter(function(story){
    return story.name.toLowerCase().includes(searchTerm.toLowerCase())
  })
  return (
    <div>
      <Search search={searchTerm} onSearch={handleSearch}/>
      <hr/>
      <List list={searchedStories}/>
    </div>
  );
}

export default App;

const List = props =>{
  return(
  props.list.map(item=> {
    return (
      <div>{item.name}</div>
    )
  })
  )
}


const Search =props =>{
  return (
  <div>
    <label htmlFor="search">Search: </label>
    <input id="search" type="text" value={props.search} onChange={props.onSearch}/>
  </div>
  )
};