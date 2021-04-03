import React from 'react';
import axios from 'axios';
import './App.css'
import {ReactComponent as Check} from './check.svg'

const useSemiPersistentState = (key, initialState) => {
  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initialState
  );

  React.useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
};

const storiesReducer = (state,action) =>{
  switch(action.type){
    case 'STORIES_FETCH_INIT':
      return {
        ...state,
        isLoading:true,
        isError:false,
        isNoResult: false,
      }
    case 'STORIES_FETCH_SUCCESS':
      return {
        ...state,
        isLoading:false,
        isError: false,
        isNoResult: false,
        data:action.payload,
      }
    case 'STORIES_FETCH_NO_RESULTS':
      return {
        ...state,
        isLoading: false,
        isNoResult:true,
        data:[]
      }
    case 'STORIES_FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
      }
    case 'REMOVE_STORY':
      return{
        ...state,
        data:state.data.filter(
          story => action.payload.objectID !== story.objectID
        ),
      }
    default:
      throw new Error();
  }
};

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query=';



const App = () => {
  const [searchTerm, setSearchTerm] = useSemiPersistentState(
    'search',
    'React'
  );

  const [url,setUrl] = React.useState(
    `${API_ENDPOINT}${searchTerm}`
  )

  const [stories,dispatchStories]=React.useReducer(
    storiesReducer,
    {data:[],isLoading:false,isError:false,isNoResult: false}
  );

  const handleFetchStories = React.useCallback(async()=>{
    dispatchStories({type:'STORIES_FETCH_INIT'})

    try {
      const result = await axios.get(url)
      dispatchStories({
        type:'STORIES_FETCH_SUCCESS',
        payload:result.data.hits,
      });
    }catch{
      dispatchStories({type:'STORIES_FETCH_FAILURE'})
    }
    
  },[url])

  React.useEffect(()=>{
    handleFetchStories();
  },[handleFetchStories])

  const handleRemoveStory = item =>{
    dispatchStories({
      type:'REMOVE_STORY',
      payload:item
    });
  }

  const handleSearchInput = (event) =>{
    setSearchTerm(event.target.value);
  }

  const handleSearchSubmit = (event) =>{
   setUrl(`${API_ENDPOINT}${searchTerm}`)
    event.preventDefault();//HTMLフォームのデフォルトの挙動(リロード)を防ぐ
  }

  return (
    <div className="container">
      <h1 className="headline-primary">My Hacker Stories</h1>
      <SearchForm
        searchTerm={searchTerm}
        onSearchInput={handleSearchInput}
        onSearchSubmit={handleSearchSubmit}
      />
      {stories.isNoResult && <p>No Results ... </p>}
      {stories.isError && <p>Something went wrong ... </p>}
      {stories.isLoading?(
        <p>Loading ... </p>
      ):(
        <List list={stories.data} onRemoveItem={handleRemoveStory}/>
      )}
    </div>
  );
};


const SearchForm = ({
  searchTerm,
  onSearchInput,
  onSearchSubmit
})=>{
  return (
  <form onSubmit={onSearchSubmit} className="search-form">
    <InputWithLabel
      id="search"
      value={searchTerm}
      onInputChange={onSearchInput}
    >
      <strong>Search:</strong>
    </InputWithLabel>
    <button
      type="button"
      disabled={!searchTerm}
      className="button button_large"
    >
      Submit
    </button>
  </form>
)
}
const InputWithLabel = ({
  id,
  value,
  type = 'text',
  onInputChange,
  children,
  }) => (
  <>
    <label htmlFor={id} className="label">{children}</label>
    &nbsp;
    <input
      id={id}
      type={type}
      value={value}
      onChange={onInputChange}
      className="input"
    />
  </>
);

const List = ({ list,onRemoveItem }) =>
  list.map(item => <Item key={item.objectID} item={item} onRemoveItem={onRemoveItem} />);

const Item = ({ item,onRemoveItem }) => (
  <div className="item">
    <span style={{width:'40%'}}>
      <a href={item.url}>{item.title}</a>
    </span>
    <span style={{width:'30%'}}>{item.author}</span>
    <span style={{width:'10%'}}>{item.num_comments}</span>
    <span style={{width:'10%'}}>{item.points}</span>
    <span style={{width:'10%'}}>
      <button
        type="button"
        onClick={()=>onRemoveItem(item)}
        className="button button_small"
      >
        <Check height="18px" width="18px"/>
      </button>
    </span>
  </div>
);

export default App;