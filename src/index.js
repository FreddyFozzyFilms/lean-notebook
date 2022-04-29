import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';

import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

// Katex eg: <InlineMath math="\frac{5}{2}"/>
ReactDOM.render(
  <React.StrictMode>
    <InlineMath math="R_{\mu \nu} - {1 \over 2}g_{\mu \nu}\,R + g_{\mu \nu} \Lambda = 
 {8 \pi G \over c^4} T_{\mu \nu}"/>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
