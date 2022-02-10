import { useEffect, useState } from 'react'
import './App.css'
import Quotes from './pages/quote'

export type QuotesType = {
  id: number
  quote: string
  author: string
}

function App() {

  const [quotes, setQuotes] = useState<QuotesType[]>([])

  useEffect(() => {
    fetch(`http://localhost:4000/quotes`)
      .then(resp => resp.json())
      .then(quotesFromServer => setQuotes(quotesFromServer))
  }, [])


  return (
    <div className="App">
      {
        quotes.map(quote =>
          <Quotes quote={quote} key={quote.id} />
        )}
    </div>
  )
}

export default App
