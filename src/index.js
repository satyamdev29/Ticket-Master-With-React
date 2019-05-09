import React from 'react'
import ReactDOM from 'react-dom'

// npm install --save bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import 'material-design-icons/iconfont/material-icons.css'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(<App/>, document.getElementById('root'))
serviceWorker.unregister()