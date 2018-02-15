import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { sourceData, expectedActions } from './sourceData.js'

import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/styles/hljs';
import { createStore } from 'redux';
import { connect } from 'react-redux';
import { Provider } from 'react-redux';
import _ from 'lodash';

let proc = e => e == 'ret' ? { type: "RETURN" } : { type: "CALL", lineNumber: e }
let expected = expectedActions.map(x => x.map(proc))
let reducer = (state, action) => {
  function checkInput(callstack) {
    if (state.expected.length != 0 && !_.isEqual(state.expected[0], action)) {
      alert('you goofed');
      return state;
    }
    var ret = { ...state, callstack, expected: state.expected.slice(1) };
    if (ret.expected.length == 0) {
      ret = { ...ret, done: true };
    }
    return ret;
  }
  function makeState(questionIndex) {
    return { questionIndex, expected: expected[questionIndex], codeString: sourceData[questionIndex], callstack: [] }
  }
  switch (action.type) {
    case 'CALL':
      return checkInput(state.callstack.concat(action.lineNumber));
    case 'RETURN':
      return checkInput(state.callstack.slice(0, -1))
    case 'NEXTQUESTION':

      return makeState(state.questionIndex + 1)
    case 'PREVIOUSQUESTION':
      return makeState(state.questionIndex - 1)

    default:
      return state;
  }
}


const store = createStore(reducer,
  { callstack: [], expected: expected[0], questionIndex: 0, codeString: sourceData[0] },
  window.__REDUX_DEVTOOLS_EXTENSION__()

);

const mapStateToProps = (state) => state


const mapDispatchToProps = (dispatch) => {
  return {
    call: (lineNumber) => { dispatch({ type: 'CALL', lineNumber }) },
    return: () => { dispatch({ type: 'RETURN' }) },
    nextQuestion: () => { dispatch({ type: 'NEXTQUESTION' }) },
    prevQuestion: () => { dispatch({ type: 'PREVIOUSQUESTION' }) }

  }
};

class SubApp extends Component {
  constructor() {
    super();
    this.state = { callstack: [] }
  }
  clickReturn = () => {
    this.setState({ callstack: this.state.callstack.concat("return") })
  }
  clickCall = () => {
    this.setState({ callstack: this.state.callstack.concat("call") })
  }
  render() {
    var prevDisabled = this.props.questionIndex <= 0;
    var nextDisabled = this.props.questionIndex >= sourceData.length - 1;
    return (<div>
      <div> Question {this.props.questionIndex + 1}
        <button disabled={prevDisabled} onClick={this.props.prevQuestion}> previous Question </button>
        <button disabled={nextDisabled} onClick={this.props.nextQuestion}> next Question </button> </div>
      <SyntaxHighlighter showLineNumbers language='javascript' style={docco}>{this.props.codeString}</SyntaxHighlighter>
      <div><button onClick={() => this.props.call(parseInt(this.lineNum.value))}> call </button><input ref={r => this.lineNum = r} type="number" /></div>
      <div><button onClick={this.props.return}> return </button></div>
      <div> {this.props.callstack.map(x => { return (<div>{x}</div>) })}</div>
    </div>);
  }
}

let Connected = connect(mapStateToProps, mapDispatchToProps)(SubApp);

class App extends Component {
  render() {
    return (<Provider store={store}>
      <Connected />
    </Provider>);
  }
}

export default App;
