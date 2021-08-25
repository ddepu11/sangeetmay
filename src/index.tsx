import ReactDOM from 'react-dom';
import App from './components/App';
import './style/style.css';
import store from './redux/store';
import { Provider } from 'react-redux';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
