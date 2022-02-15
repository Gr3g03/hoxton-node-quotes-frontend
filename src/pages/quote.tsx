import { useState } from "react"
import { Link } from "react-router-dom"
import { QuotesType } from "../App"


type props = {
    quotes: QuotesType[]
    deleteQuote: any
}

export default function Quotes({ quotes, deleteQuote }: props) {
    const [newQuote, setNewQoute] = useState<QuotesType[]>([])


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

            {
                quotes.map(quote =>
                    <blockquote key={quote.id} className='quoteContainer'>
                        <Link to={`/quotes/${quote?.id}`} key={quote.id}>
                            <p className='quote'>
                                {quote.quote}
                            </p>
                            <h3 className='author'>
                                {quote.author}
                            </h3>

                        </Link>
                        <button className="delteButton" onClick={() => {
                            deleteQuote(quote)
                        }
                        }>X</button>
                    </blockquote>
                )}

            <form className="new-Quote" onSubmit={(e) => {
                e.preventDefault()
                // @ts-ignore
                addNewQuote(e.target.firstName.value, e.target.lastName.value, e.target.quote.value, e.target.author.value, e.target.img.value, e.target.age.value)
                // @ts-ignore
                e.target.reset()
            }}>
                <label htmlFor="firstName">Firstname</label>
                <input name="firstName" id="firstName" type="text" />

                <label htmlFor="lastName">Lastname</label>
                <input name="lastName" id="lastName" type="text" />

                <label htmlFor="quote">quote</label>
                <input name="quote" id="quote" type="textarea " />

                <label htmlFor="author">author</label>
                <input name="author" id="author" type="text" />

                <label htmlFor="age">age</label>
                <input name="age" id="age" type="number" />

                <label htmlFor="img">image</label>
                <input name="img" id="img" type="text" />

                <button type="submit">Submit</button>
            </form>
        </>
    )
}