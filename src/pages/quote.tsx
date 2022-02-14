import { useState } from "react"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { QuotesType } from "../App"


type props = {
    quotes: QuotesType[]
}


export default function Quotes({ quotes }: props) {
    const [newQuote, setNewQoute] = useState<QuotesType[]>([])

    const params = useParams()
    const quotesss = quotes.find((filtredQuote) => filtredQuote.id === Number(params.id));




    function addNewQuote(quote: string, author: string, age: number, firstName: string, lastName: string, img: string) {
        fetch(`http://localhost:4000/quotes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                quote: quote,
                author: author,
                age: age,
                firstName: firstName,
                lastName: lastName,
                img: img
            })
        }).then(resp => resp.json())
            .then(() => {
                const updatedUser = JSON.parse(JSON.stringify(newQuote))
                updatedUser.push({
                    quote: quote,
                    author: author,
                    age: age,
                    firstName: firstName,
                    lastName: lastName,
                    img: img
                })
                setNewQoute(updatedUser)
            })

    }


    return (

        <>

            <form className="new-Quote" onSubmit={(e) => {
                e.preventDefault()
                // @ts-ignore
                addNewQuote(e.target.firstName.value, e.target.lastName.value, e.target.quote.value)
                // @ts-ignore
                e.target.reset()
            }}>
                <label htmlFor="firstName">First name</label>
                <input name="firstName" id="firstName" type="text" />

                <label htmlFor="lastName">Last name</label>
                <input name="lastName" id="lastName" type="text" />

                <label htmlFor="phoneNumber">quote</label>
                <input name="quote" id="text" type="text" />

                <button type="submit">CREATE USER</button>
            </form>

            {
                quotes.map(quote =>
                    <Link to={`/qoutes/${quote.id}`}>
                        <blockquote key={quote.id} className='quoteContainer'>
                            <p className='quote'>
                                {quote.quote}
                            </p>
                            <h3 className='author'>
                                {quote.author}
                            </h3>
                        </blockquote>
                    </Link>
                )}
        </>
    )
}