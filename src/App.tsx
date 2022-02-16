import { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Quotes from './pages/quote'
import SingleQuote from './pages/SingleQuote'

export type QuotesType = {
  id: number
  quote: string
  authorId: number;
  authors: [
    {
      author: string
      age: number;
      firstName: string;
      lastName: string;
      img: string;
    }
  ]

}

function App() {

  const [quotes, setQuotes] = useState<QuotesType[]>([])
  // const [singleQuote, setSingleQuote] = useState<QuotesType[]>([])

  console.log(quotes)
  useEffect(() => {
    fetch(`http://localhost:4000/quotes`)
      .then(resp => resp.json())
      .then(quotesFromServer => setQuotes(quotesFromServer))
  }, [])



  function deleteQuote(quote: any) {
    return fetch(`http://localhost:4000/quotes/${quote.id}`, {
      method: "DELETE"
    }).then(() => {

      const updatedImage = JSON.parse(JSON.stringify(quotes))
      updatedImage.filter((targetPost: any) => targetPost.id !== quote.id)
      setQuotes(updatedImage)
    })
  }

  // useEffect(() => {
  //   fetch(`http://localhost:4000/quotes/1`)
  //     .then(resp => resp.json())
  //     .then(quoteFromServer => setSingleQuote(quoteFromServer))
  // }, [])


  return (
    <div className="App">

      <Routes>
        <Route path='/' element={<Quotes quotes={quotes} deleteQuote={deleteQuote} />} />
        <Route path='/quotes' element={<Quotes quotes={quotes} deleteQuote={deleteQuote} />} />
        <Route path='/quotes/:id' element={<SingleQuote />} />
        <Route index element={<Navigate replace to="/quotes" />} />
      </Routes>
    </div>
  )
}

export default App
