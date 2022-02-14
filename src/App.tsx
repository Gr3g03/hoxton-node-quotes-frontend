import { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Quotes from './pages/quote'
import SingleQuote from './pages/SingleQuote'

export type QuotesType = {
  id: number
  quote: string
  author: string
  age: number;
  firstName: string;
  lastName: string;
  img: string;
}

function App() {

  const [quotes, setQuotes] = useState<QuotesType[]>([])

  useEffect(() => {
    fetch(`http://localhost:4000/quotes`)
      .then(resp => resp.json())
      .then(quotesFromServer => setQuotes(quotesFromServer))
  }, [])




  // useEffect(() => {
  //   fetch(`http://localhost:4000/quotes/1`)
  //     .then(resp => resp.json())
  //     .then(quoteFromServer => setSingleQuote(quoteFromServer))
  // }, [])

  // console.log({ singleQuote })



  return (
    <div className="App">

      <Routes>
        <Route index element={<Navigate replace to="/quotes" />} />
        <Route path='/quotes' element={<Quotes quotes={quotes} />} />
        <Route path='/quotes/:id' element={<SingleQuote quotes={quotes} />} />
      </Routes>
    </div>
  )
}

export default App
