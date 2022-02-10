import { useEffect, useState } from 'react'
import './App.css'

function App() {

  type Quotes = {
    id: number
    quote: string
    author: string
  }


  const [quotes, setQuotes] = useState<Quotes[]>([])

  useEffect(() => {
    fetch(`http://localhost:4000/quotes`)
      .then(resp => resp.json())
      .then(quotesFromServer => setQuotes(quotesFromServer))
  }, [])


  return (
    <div className="App">
      {
        quotes.map(quote =>
          <blockquote key={quote.id} className='quoteContainer'>

            <p className='quote'>
              {quote.quote}
            </p>
            <h3 className='author'>
              {quote.author}
            </h3>

          </blockquote>
        )}
    </div>
  )
}

export default App
