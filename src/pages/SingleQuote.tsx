import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { QuotesType } from "../App"





export default function SingleQuote() {

    const params = useParams()

    let [quote, setQuote] = useState<QuotesType | null>()


    useEffect(() => {
        fetch(`http://localhost:4000/quotes/${params.id}`)
            .then(resp => resp.json())
            .then(quoteFromServer => setQuote(quoteFromServer))
    }, [])

    console.log(quote);

    // if(quote === undefined)return
    return (
        <section className="product-detail main-wrapper">
            <img
                src={quote?.image}
                alt={quote?.firstName}
            />
            <div className="product-detail__side"  >
                <h2 > Quote: {quote?.quote}</h2>
                <p>{quote?.author} </p>
                <p>Age: {quote?.age}</p>
            </div>

        </section>
    )
}