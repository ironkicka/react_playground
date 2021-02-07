import React, {Component} from 'react';

class About extends Component{
    render(){
        return(
            <div className="About">
                <h1>About画面だよ</h1>
                <h2>I am {this.props.name}</h2>
            </div>
        )
    }
}

export default About;