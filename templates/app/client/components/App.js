import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'

export default class App extends Component {
  render() {
    return (
      <div>
        <h1>Welcome to Hippy</h1>
        <p>May the force be with you</p>
      </div>
    )
  }
}

App.propTypes = {}
App.defaultProps = {}

ReactDOM.render(<App />, document.querySelector('#root'))
