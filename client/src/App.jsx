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
        {/* <RouterProvider router={router} /> */}
        <Router>
          <div>
            {/* <Routes>
              <Route exact path="/" component={<AddStock />} />
            </Routes> */}
            <Switch>
              <Route path="/stocks">
                <StockListing />
              </Route>
              <Route path="/">
                <AddStock />
              </Route>
            </Switch>
          </div>
        </Router>
      </main>
    </>
  )
}

export default App