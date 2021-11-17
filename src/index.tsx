import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import EditorProvider from './store/EditorContext';

ReactDOM.render(
  <EditorProvider>
    <App />
  </EditorProvider>,
  document.getElementById('root')
);
