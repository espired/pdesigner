import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import EditorProvider from './store/EditorContext';

ReactDOM.render(
  <React.StrictMode>
    <EditorProvider>
      <App />
    </EditorProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
