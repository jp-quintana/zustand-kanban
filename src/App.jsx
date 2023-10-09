import Column from './components/Column';

import './App.css';

const App = () => {
  return (
    <div className="App">
      <Column status="PLANNED" />
      <Column status="ONGOING" />
      <Column status="DONE" />
    </div>
  );
};

export default App;
