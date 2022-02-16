import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { QuotesType } from "../App"

type props = {
    quotes: QuotesType[]
}

export default function SingleQuote() {

    const params = useParams()

    const [quote, setQuote] = useState<props>()
    useEffect(() => {
        fetch(`http://localhost:4000/quotes/${params.id}`)
            .then(resp => resp.json())
            .then(quoteFromServer => setQuote(quoteFromServer))
    }, [])


    return (
        <section className="product-detail main-wrapper">
            <img
                src={quote?.img}
                alt={quote?.firstName}
            />
            <div className="product-detail__side"  >
                <h2 >  {quote?.quote}</h2>
                <p>{quote?.author} </p>
                <p>Age: {quote?.age}</p>
            </div>

        </section>
    )
}