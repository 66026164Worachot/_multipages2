
import { useEffect, useState } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'

import Layout from './layouts/Layout/Layout'

import Home from './pages/Home/Home'
import Todo from './pages/Todo/Todo'
import Calculator from './pages/Calculator/Calculator'
import Components from './pages/Components/components'
import Products from './pages/Products/Products'
import Carts from './pages/Carts/Carts'
import Login from './pages/login/login'
import Animation from './pages/Animation/animation'
import Navbar from './layouts/Navbar/Navbar'

import { fetchProducts } from './data/product'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

import './App.css'


const initpage = 'home'

function App() {
  const [token, setToken] = useState('')
  const [tab, setTab] = useState('')
  const [products, SetProducts] = useState([])
  const [carts, setCarts] = useState([])

  useEffect(() => {
    SetProducts(fetchProducts())
  }, [])

  useEffect(() => console.log(products), [products])

  useEffect(() => {
    setTab(initpage)
  }, []) //only in first load

  if (token === '') {
    return (<Login setToken={setToken} />)
  } else {
    return (

      <div className='app-container'>
        <HashRouter>
          <Routes>
            <Route element={<Layout tab={tab} setTab={setTab} products={products} carts={carts} setToken={setToken} />}>
              <Route path='/' element={<Home />} />
              <Route path='/home' element={<Home />} />
              <Route path='/calculator' element={<Calculator />} />
              <Route path='/animation' element={<Animation />} />
              <Route path='/components' element={<Components />} />
              <Route path='/todo' element={<Todo />} />
              <Route path='/products' element={<Products
                products={products}
                carts={carts}
                setCarts={setCarts} />} />
              <Route path='/carts' element={<Carts carts={carts} setCarts={setCarts} />} />
            </Route>
          </Routes>
        </HashRouter>
      </div>
    )
  }
}
export default App
