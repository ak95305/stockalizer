import './App.css'
import Header from './components/Header/Header'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import AddStock from './views/Stock/AddStock'
import StockListing from './views/Stock/StockListing'
import Home from './views/Home/Home'

function App() {
  return (
    <>
      <Router basename={import.meta.env.APP_STATIC_BASE_PATH}>
      <Header />
      
      <main>
          <div>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/add-stock" component={AddStock} />
              <Route path="/stocks" component={StockListing} />
            </Switch>
          </div>
      </main>
      </Router>
    </>
  )
}

export default App