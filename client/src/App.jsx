import './App.css'
import Header from './components/Header/Header'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import AddStock from './views/Stock/AddStock'
import StockListing from './views/Stock/StockListing'
import Home from './views/Home/Home'
import WorkerListing from './views/Worker/WorkerListing'
import AddWorker from './views/Worker/AddWorker'
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <Router basename={import.meta.env.APP_STATIC_BASE_PATH}>
      <Header />
      <Toaster />

      <main>
          <div>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/add-stock" component={AddStock} />
              <Route path="/stocks" component={StockListing} />
              <Route path="/workers" component={WorkerListing} />
              <Route path="/add-worker" component={AddWorker} />
            </Switch>
          </div>
      </main>
      </Router>
    </>
  )
}

export default App