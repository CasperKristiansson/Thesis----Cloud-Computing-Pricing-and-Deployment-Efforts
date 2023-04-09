import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux'
import { Store } from "./store";
import { JssProvider } from 'react-jss';
import { BrowserRouter } from 'react-router-dom';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={Store}>
    <JssProvider id={{ minify: true }}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </JssProvider>
  </Provider>
);
