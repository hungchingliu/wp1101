import React, { Component } from 'react';

class Button extends Component{
    
    render(){
        return <button type="button" id={this.props.id} onClick={this.props.onClick}>{this.props.title}</button>
    }
}

export default Button;