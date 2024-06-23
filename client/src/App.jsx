import './App.css'
import Header from './components/Header/Header'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import AddStock from './views/Stock/AddStock'
import StockListing from './views/Stock/StockListing'

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <AddStock />
//   }
// ])

function App() {
  return (
    <>
      <Header />
      
      <main>
        <Router basename={import.meta.env.APP_STATIC_BASE_PATH}>
          <div>
            <Switch>
              <Route exact path="/" component={AddStock} />
              <Route path="/stocks" component={StockListing} />
            </Switch>
          </div>
        </Router>
      </main>
    </>
  )
}

export default App