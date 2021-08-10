import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import GlobalStyle from './theme/GlobalStyle';
import Game from './components/Game'

ReactDOM.render(
  <Fragment>
    <GlobalStyle />
    <Game />
  </Fragment>,
  document.getElementById('root')
);