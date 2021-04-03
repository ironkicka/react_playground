import React from 'react';

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

  const handleFetchStroies = React.useCallback(()=>{
    dispatchStories({type:'STORIES_FETCH_INIT'})
    fetch(url)
      .then(response=>response.json())
      .then(result=>{
        if(result.hits.length===0){
          dispatchStories({
            type:'STORIES_FETCH_NO_RESULTS'
          });
        }else{
          dispatchStories({
            type:'STORIES_FETCH_SUCCESS',
            payload:result.hits,
          });
        }
      })
      .catch(()=>{
        dispatchStories({type:'STORIES_FETCH_FAILURE'})
      })
  },[url])

  React.useEffect(()=>{
    handleFetchStroies();
  },[handleFetchStroies])

  const handleRemoveStory = item =>{
    dispatchStories({
      type:'REMOVE_STORY',
      payload:item
    });
  }

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  const handleSearchInput = (event) =>{
    setSearchTerm(event.target.value);
  }

  const handleSearchSubmit = () =>{
   setUrl(`${API_ENDPOINT}${searchTerm}`)
  }

  return (
    <div>
      <h1>My Hacker Stories</h1>

      <InputWithLabel
        id="search"
        value={searchTerm}
        onInputChange={handleSearchInput}

      >
        <strong>Search:</strong>
      </InputWithLabel>
      <button
        type="button"
        disabled={!searchTerm}
        onClick={handleSearchSubmit}
      >
        Submit
      </button>

      <hr />
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

const InputWithLabel = ({
  id,
  value,
  type = 'text',
  onInputChange,
  children,
  }) => (
  <>
    <label htmlFor={id}>{children}</label>
    &nbsp;
    <input
      id={id}
      type={type}
      value={value}
      onChange={onInputChange}
    />
  </>
);

const List = ({ list,onRemoveItem }) =>
  list.map(item => <Item key={item.objectID} item={item} onRemoveItem={onRemoveItem} />);

const Item = ({ item,onRemoveItem }) => (
  <div>
    <span>
      <a href={item.url}>{item.title}</a>
    </span>
    <span>{item.author}</span>
    <span>{item.num_comments}</span>
    <span>{item.points}</span>
    <span>
      <button type="button" onClick={()=>onRemoveItem(item)} >
        Dismiss
      </button>
    </span>
  </div>
);

export default App;