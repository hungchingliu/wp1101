
import React, { Component } from 'react';
import xPng from './img/x.png';

class ListItem extends Component{
    constructor(props){
        super(props)
        this.state = {isComplete: props.isComplete}
    }

    onClickCheckFunction = () => {
        this.props.onClickCheckFunction(this.props.id)
        this.setState(state => ({isComplete: !state.isComplete}))
    }

    onClickXFunction = () => {
        this.props.onClickXFunction(this.props.id)
    }
    
    render(){
        return (
            <li className="todo-app__item" >
                <div className="todo-app__checkbox">
                    <input id={this.props.id} defaultChecked={this.state.isComplete} type="checkbox" onClick={this.onClickCheckFunction}/>
                    <label htmlFor={this.props.id}></label>
                </div>
                <h1 className={this.state.isComplete?"todo-app__item-detail-clicked":"todo-app__item-detail"}>{this.props.content}</h1>
                <img src={xPng} className="todo-app__item-x" onClick={this.onClickXFunction}/>
            </li>
        )
    };
}

class ListComponent extends Component{
    
    render(){
        return (
            <ul id="todo-list" className="todo-app__list">
                {this.props.displayData.map(ele => <ListItem key = {ele.id} id = {ele.id} content = {ele.content}
                 isComplete = {ele.isComplete}
                 onClickCheckFunction={this.props.onClickCheckFunction}
                 onClickXFunction = {this.props.onClickXFunction}/>)}
            </ul>
        )
    }
}
export default ListComponent;