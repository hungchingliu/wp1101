import React, { Component } from 'react';
import Button from '../components/Button'
import ListComponent from '../components/ListComponent';
import './styles.css';


class TodoList extends Component{
    constructor(props){
        super(props)
        this.state = {displayData: [], totalCount: 0, showFooter: false, inputValue: '', completeCount: 0}
        this.itemId = 0
        this.displayState = 0
        this.data = []
    }
    
    createItem = (newContent) => {
        this.data.push({id: this.itemId, content: newContent, isComplete: false})
        this.itemId++
        this.totalIncrement()
        this.display()
        this.setState({showFooter: true})
    }

    onClickCheck = (id) => {
        var idArray = this.data.map(item => item.id);
        var index = idArray.indexOf(Number(id));
        this.data[index].isComplete = !this.data[index].isComplete
        if(this.data[index].isComplete){
            this.totalReduction();
            this.setState(state => ({completeCount: state.completeCount + 1}))
        }
        else{
            this.totalIncrement();
            this.setState(state => ({completeCount: state.completeCount - 1}))
        }
        this.display()
    }


    onClickAll = () => {
        this.setState({displayData: this.data})
        this.displayState = 0
    }

    onClickActive = () => {
        this.setState({displayData: this.data.filter(ele => !ele.isComplete)})
        this.displayState = 1
    }

    onClickCompleted = () => {
        this.setState({displayData: this.data.filter(ele => ele.isComplete)})
        this.displayState = 2
    }

    totalIncrement = () => {
        this.setState(state => ({totalCount: state.totalCount + 1 }))
    }

    totalReduction = () => {
        this.setState(state => ({totalCount: state.totalCount - 1}))
    }
    
    onClickX = (id) => {
        var idArray = this.data.map(item => item.id);
        var index = idArray.indexOf(Number(id));
        if(!this.data[index].isComplete)
            this.totalReduction()
        this.data.splice(index, 1);
        
        this.display()
        if(this.data.length === 0)
            this.setState({showFooter: false})

    }

    display = () => {
        if (this.displayState === 0)
            this.onClickAll()
        else if(this.displayState === 1)
            this.onClickActive()
        else if(this.displayState === 2)
            this.onClickCompleted()
    }

    changeInput = (e) => {
        this.setState({inputValue: e.target.value})
    }

    keyPress = (e) => {
        if(e.keyCode === 13 && this.state.inputValue.trim() !== ""){
            this.createItem(this.state.inputValue)
            this.setState({inputValue: ''})
        }
    }
     
    onClickClean = () => {
        var completed = this.data.filter(ele => ele.isComplete)
        completed = completed.map(ele => ele.id)

        completed.forEach(ele => {
        var index = this.data.map(it => it.id).indexOf(ele);
        this.data.splice(index, 1);
        })
        this.setState({completeCount: 0})
        this.display()
        if(this.data.length === 0)
            this.setState({showFooter: false})
    }

    render(){
        return(
            <div id="root" className="todo-app__root">
                <header className="todo-app__header">
                    <h1 className="todo-app__title">todos</h1>
                </header>
                <section id="main" className="todo-app__main">
                    <input id="todo-input" className="todo-app__input" placeholder="What needs to be done?"
                     onChange = {this.changeInput} onKeyDown = {this.keyPress} value={this.state.inputValue}
                    />
                    {this.data.length ? <ListComponent displayData={this.state.displayData} 
                     onClickCheckFunction={this.onClickCheck} onClickXFunction={this.onClickX}/> : <div/>}
                    {this.state.showFooter ?
                    (<div id="todo-footer" className="todo-app__footer">
                        <div className="todo-app__total">
                            <p id="todo-count">{this.state.totalCount} left</p>
                        </div>
                        <ul className="todo-app__view-buttons">
                            <Button id = "all" onClick = {this.onClickAll} title = "All" />
                            <Button id = "active" onClick = {this.onClickActive} title = "Active" />
                            <Button id = "completed" onClick = {this.onClickCompleted} title = "Completed" />
                        </ul>
                        {this.state.completeCount > 0 ? 
                            <div className="todo-app__clean"> 
                                <Button id = "clean" onClick = {this.onClickClean} title = "Clear completed" />
                            </div>
                            :
                            <div className="todo-app__clean-hide"> 
                                <Button id = "clean" onClick = {this.onClickClean} title = "Clear completed" />
                            </div>
                        }
                    </div>)
                    : <div/>}
                </section>
            </div>
        );
    }
}

export default TodoList;