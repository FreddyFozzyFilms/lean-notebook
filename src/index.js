import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import Latex from 'react-latex';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

// Katex eg: <InlineMath math="\frac{5}{2}"/>
ReactDOM.render(
  <React.StrictMode>
    <InlineMath math="\frac{5}{2}"/>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
