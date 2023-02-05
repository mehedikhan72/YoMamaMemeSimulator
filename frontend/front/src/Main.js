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
            setTopTxt(topText.toUpperCase());
            setbottomTxt(bottomText.toUpperCase());
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
            ctx.lineWidth = 2.5;

            var textWidthTop = ctx.measureText(topTxt).width;
          
            // check if the text width is greater than the canvas width
            if (textWidthTop > canvas.width - 25) {
              // reduce the font size until it fits
              let fontSize = 60;
              while (textWidthTop > canvas.width - 25 && fontSize > 30) {
                fontSize -= 5;
                ctx.font = `${fontSize}px impact, sans-serif`;
                textWidthTop = ctx.measureText(topTxt).width;
                console.log("infinite")
              }
            }

            ctx.drawImage(image, 0, 0);

            const textWidth = ctx.measureText(topTxt).width;
            const textHeight = ctx.measureText(topTxt).actualBoundingBoxAscent;
            ctx.fillText(topTxt, topX, topY, textWidth, textHeight);
            ctx.strokeText(topTxt, topX, topY, textWidth, textHeight);

            const bottomTextWidth = ctx.measureText(bottomTxt).width;
            const bottomTextHeight = ctx.measureText(bottomTxt).actualBoundingBoxAscent;
            ctx.fillText(bottomTxt, bottomX, bottomY, bottomTextWidth, bottomTextHeight);
            ctx.strokeText(bottomTxt, bottomX, bottomY, bottomTextWidth, bottomTextHeight);
        };
    }, [topTxt, bottomTxt, memeType]);

    async function CopyImage() {
        const canvas = canvasRef.current;
        const dataURL = canvas.toDataURL();

        const data = await fetch(dataURL);
        const blob = await data.blob();

        try{
            await navigator.clipboard.write([
                new ClipboardItem({
                    [blob.type] : blob,
                })
            ])
            console.log("Image Copied!");
            alert("Copied to clipboard");
        }
        catch(e){
            console.log(e);
        }
    }

    return (
        <div>
            <div className="d-flex justify-content-center">
                <form className="form-inline mr-3" onSubmit={handleSubmit}>
                    <div className="form-group mx-sm-3 mb-2">
                    <input ref={inputRef} className="form-control form-control-sm form-input" type="text" placeholder="Enter a friend's name" />
                    <button className="btn btn-danger mb-2 form-input">Get A Joke</button>
                    </div>
                </form>
            </div>

            <div className="canvas-image">
                {topTxt ? <canvas ref={canvasRef} /> : null}
            </div>
            
            <br />
            <br />
            <div className="copy-btn">
                {topTxt ? <button className="btn btn-danger mb-2 form" onClick={CopyImage}>Send A Friend</button> : null}
            </div>
        
        </div>
    )
}