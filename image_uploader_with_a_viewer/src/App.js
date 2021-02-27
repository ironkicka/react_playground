import React from 'react'
import './App.css';

function App() {
  const [imageUrl,setImageUrl] = React.useState('')

  const onClickedUploadFunc = (event) =>{
    console.log(event)
    const file = (event.target.files !== null ? event.target.files[0]:null);
    if (file!== null){
      const objectURL = URL.createObjectURL(file);
      setImageUrl(objectURL)
    }
  }
  const handleOnClick = ()=>{
    console.log("onClickだよ")
  }

  return (
    <div className="App">
      {imageUrl !== '' && <img src={imageUrl} alt=""/>}
      <input
        accept="image/*"
        id="raised-button-file"
        type="file"
        style={{ display: "none" }}
        onChange={onClickedUploadFunc}
        // onClick={onClickedUploadFunc}
      />
      <label htmlFor="raised-button-file">
        あ
        <button onClick={handleOnClick}>
          Upload
        </button>
      </label>
    </div>
  );
}

export default App;
