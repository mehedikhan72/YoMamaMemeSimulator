import React from "react";
import { useRef, useEffect } from "react";

export default function Main() {
    const [topTxt, setTopTxt] = React.useState("");
    const [bottomTxt, setbottomTxt] = React.useState("");
    const [memeType, setMemeType] = React.useState("");
    const inputRef = useRef(null);
    const canvasRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        var name = inputRef.current.value;
        // console.log(inputValue);

        if(name === "") {
            console.log("You must enter a name!");
            return;
        }

        var random_pk = Math.floor(Math.random() * 68) + 1;
        fetch(`http://127.0.0.1:8000/api/joke/${random_pk}/`)
        .then(response => response.json())
        .then(data => {
            var topText = data.top_text;
            // modify the meme
            topText = topText.slice(2);
            topText = name + "'s " + topText;
            var bottomText = data.bottom_text;
            setTopTxt(topText);
            setbottomTxt(bottomText);
            setMemeType(data.type);
        })
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        if(!canvas) return;
        const ctx = canvas.getContext('2d');
        var Fat = ['images/fat_1.PNG', 'images/fat_2.PNG', 'images/fat_3.PNG', 'images/fat_4.PNG', 'images/fat_5.PNG']
        var Ugly = ['images/ugly_1.PNG', 'images/ugly_2.PNG', 'images/ugly_3.PNG', 'images/ugly_4.PNG']
        var Dumb = ['images/dumb_1.PNG', 'images/dumb_2.PNG', 'images/dumb_3.PNG']
        var Stupid = ['images/stupid_1.PNG', 'images/stupid_2.PNG', 'images/stupid_3.PNG']
    
        const image = new Image();
        var memeTypeArr = [];
        if(memeType === 'Fat') memeTypeArr = [...Fat];
        else if(memeType === 'Ugly') memeTypeArr = [...Ugly];
        else if(memeType === 'Dumb') memeTypeArr = [...Dumb];
        else if(memeType === 'Stupid') memeTypeArr = [...Stupid];

        const rand_value = Math.floor(Math.random() * memeTypeArr.length)
        image.src = memeTypeArr[rand_value];
        // console.log(memeType[rand_value]);
        // console.log(rand_value)

        image.onload = () => {
            canvas.height = image.naturalHeight;
            canvas.width = image.naturalWidth;
            //finding text positions

            const topX = canvas.width / 2;
            const topY = canvas.height * .1;

            const bottomX = canvas.width / 2;
            const bottomY = canvas.height - canvas.height * .2;
            //text style
            ctx.font = `60px impact, sans-serif`;
            ctx.textAlign = "center";
            ctx.textBaseline = "top";
            ctx.fillStyle = "white";
            ctx.strokeStyle = "black";
            ctx.lineWidth = 3;

            ctx.drawImage(image, 0, 0);
            ctx.fillText(topTxt, topX, topY);
            ctx.strokeText(topTxt, topX, topY);
            ctx.fillText(bottomTxt, bottomX, bottomY);
            ctx.strokeText(bottomTxt, bottomX, bottomY);
        };
    }, [topTxt, bottomTxt, memeType]);

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input ref={inputRef} type="text" placeholder="Enter a friend's name"/>
                <button>Get a joke.</button>
                {/* {joke ? <h2>{joke}</h2> : null} */}
                {topTxt} {bottomTxt}
                <br />
                <br />
            </form>
            {topTxt ? <canvas ref={canvasRef} /> : null}
        </div>
    )
}