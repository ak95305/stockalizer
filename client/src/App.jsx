import './App.css'
import Header from './components/Header/Header'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import AddStock from './views/Stock/AddStock'

const router = createBrowserRouter([
  {
    path: "/",
    element: <AddStock />
  }
])

function App() {

  return (
    <>
      <Header />
      
      <main>
        <RouterProvider router={router} />
      </main>
    </>
  )
}

export default App