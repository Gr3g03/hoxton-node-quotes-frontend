
import { QuotesType } from "../App"

type Params = {
    quote: QuotesType
}

export default function Quotes({ quote }: Params) {
    return (
        <>
            <blockquote key={quote.id} className='quoteContainer'>

                <p className='quote'>
                    {quote.quote}
                </p>
                <h3 className='author'>
                    {quote.author}
                </h3>

            </blockquote>
        </>
    )
}