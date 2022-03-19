import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import MainComponent from './components/MainComponent';
import store from './redux/store';

const App=()=> {
  return (
    <Provider store={store}>
      <BrowserRouter>
          <MainComponent/>
      </BrowserRouter>
        
    </Provider>
  );
}

export default App;
