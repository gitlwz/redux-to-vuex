import React, { Component } from 'react';
import { connect } from 'react-redux'
import './App.css';

class App extends Component {
    add = () => {
        const { dispatch } = this.props;
        dispatch({
            type: "counter/add",
            payload: "参数"
        })
    }
    dec = () => {
        const { dispatch } = this.props;
        dispatch({
            type: "counter/minus",
            payload: "参数"
        })
    }
    asyncAdd = () => {
        const { dispatch } = this.props;
        dispatch({
            type: "counter/someEffect",
            payload: "参数"
        })
    }
    render() {
        return (
            <div className="App">
                <div className='todo'>
                    <button className='add_btn' onClick={this.add}>+</button>
                    <button className='dec_btn' onClick={this.dec}>-</button>
                    <button className='dec_btn' onClick={this.asyncAdd}>async</button>
                    <div>{this.props.count}</div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = ({ counter }) => {
    const { count } = counter;
    return {
        count
    }
}
export default connect(mapStateToProps)(App);
