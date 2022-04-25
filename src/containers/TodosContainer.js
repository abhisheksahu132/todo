import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { loadTodos, addTodo, toggleTodo, deleteTodo } from '../actions/actionCreators'
import InputBox from '../components/InputBox'
import TodoList from '../components/TodoList'
const baseURL = 'http://localhost:3005'
class Todos extends Component {
    getTodos() {
        axios.get(`${baseURL}/todos`)
            .then(response => {
                this.props.dispatch(loadTodos(response.data));
            })
            .catch(error => console.log(error))
    }

    createTodo = (title) => {
        if (!(title === '')) {
            axios.post(`${baseURL}/todos`, {title: title, done:false})
                .then(response => {
                    this.props.dispatch(addTodo(response.data.id, response.data.title))
                })
                .catch(error => console.log(error))
        }
    }

    updateTodo = (params) => {
        axios.patch(`${baseURL}/todos/${params.id}`, {done: params.checked})
            .then(response => {
                this.props.dispatch(toggleTodo(params.id))
            })
            .catch(error => console.log(error))
    }

    deleteTodo = (id) => {
        axios.delete(`${baseURL}/todos/${id}`)
            .then(response => {
                this.props.dispatch(deleteTodo(id))
            })
            .catch(error => console.log(error))
    }

    componentDidMount() {
        this.getTodos();
    }

    render() {
        return (
            <div className="container">
                <InputBox createTodo={this.createTodo} />
                <TodoList todos={this.props.todos}
                          updateTodo={this.updateTodo}
                          deleteTodo={this.deleteTodo} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        todos: state.todos
    }
}

export default connect(mapStateToProps)(Todos)