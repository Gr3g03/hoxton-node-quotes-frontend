import { useParams } from "react-router-dom"
import { QuotesType } from "../App"

type props = {
    quotes: QuotesType[]
}

export default function SingleQuote({ quotes }: props) {

    const params = useParams()

    const quote = quotes.find((filtredQuote) => filtredQuote.id === Number(params.id));

    if (quote !== undefined)
        return (
            <section className="product-detail main-wrapper">
                <img
                    src={quote.img}
                    alt={quote.firstName}
                />
                <div className="product-detail__side"  >
                    <h2 >  {quote.quote}</h2>
                    <p>{quote.author} </p>
                    <p>{quote.age}</p>
                </div>

            </section>
        )
}