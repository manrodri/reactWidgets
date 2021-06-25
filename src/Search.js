import React, {useState, useEffect} from 'react';
import axios from "axios";

const Search = () => {
    const [term, setTerm] = useState("cats");
    const [result, setResult] = useState([]);


    useEffect(() => {
        const search = async () => {
            const {data} = await axios.get('https://en.wikipedia.org/w/api.php', {
                params: {
                    action: "query",
                    list: "search",
                    origin: "*",
                    format: "json",
                    srsearch: term
                }
            });

            setResult(data.query.search);

        }

        if (term && !result.length) {
            search();
        } else {
            const timeoutId = setTimeout(() => {
                if (term) {
                    search();
                }
            }, 500)
            return () => {
                clearTimeout(timeoutId)
            }
        }
    }, [term]);

    const renderedResults = result.map((result) => {
        return (
            <div className={`item`} key={result.pageid}>
                <div className="right floated content">
                    <a
                        href={`https://en.wikipedia.org/?curid=${result.pageid}`}
                        className="ui button">
                        Go
                    </a>
                </div>
                <div className="content">
                    <div className="header">
                        {result.title}
                    </div>
                    <span dangerouslySetInnerHTML={{__html: result.snippet}}/>
                </div>
            </div>
        )
    });


    return (
        <div>
            <div className="ui form">
                <div className="field">
                    <label htmlFor="">Enter Search Term</label>
                    <input
                        type="text"
                        className={`input`}
                        value={term}
                        onChange={e => {
                            setTerm(e.target.value)
                        }}
                    />
                </div>
            </div>
            <div className={`ui celled list`}>
                {renderedResults}
            </div>

        </div>
    )
}

export default Search;