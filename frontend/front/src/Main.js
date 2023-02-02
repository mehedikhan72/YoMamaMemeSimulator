import React from "react";
import { useRef } from "react";

export default function Main() {
    const [joke, setJoke] = React.useState("");
    const inputRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        var name = inputRef.current.value;
        // console.log(inputValue);

        if(name === "") {
            console.log("You must enter a name!");
            return;
        }

        var random_pk = Math.floor(Math.random() * 3) + 1;
        fetch(`http://127.0.0.1:8000/api/joke/${random_pk}/`)
        .then(response => response.json())
        .then(data => {
            var newJoke = data.joke;
            // modify the meme
            newJoke = newJoke.slice(2);
            newJoke = name + "'s " + newJoke;
            setJoke(newJoke);
        })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input ref={inputRef} type="text" placeholder="Enter a friend's name"/>
                <button>Get a joke.</button>
                {joke ? <h2>{joke}</h2> : null}
            </form>
        </div>
    )
}