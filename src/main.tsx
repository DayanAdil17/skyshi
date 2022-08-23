import ReactDOM from 'react-dom/client';
import App from './App';

import 'virtual:windi.css';
import 'react-toastify/dist/ReactToastify.css';

import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
