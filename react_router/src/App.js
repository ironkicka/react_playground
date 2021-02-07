import './App.css';
import React, {Component} from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import Navbar from "./Navbar";
import About from './About';
import Home from './Home';

class App extends Component{
    render(){
        return(
            <div className="App">
                <Router>
                    <div>
                        <Navbar/><hr/>
                        <Route exact path='/' component={Home}/>
                        <Route path='/About' render={()=> <About name={'Tom'}/>}/>
                    </div>
                </Router>
            </div>
        )
    }
}


export default App;
