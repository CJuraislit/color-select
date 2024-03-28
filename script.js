const cols = document.querySelectorAll(".col");

document.addEventListener("keydown", event => {
    console.log(event.code)
    if(event.code.toLowerCase == "space") {
        console.log(event.code);
        setRandomColors();
    }
});

function generateRandomColor() {
    // RGB
    // #ff0000 red
    // #00ff00 green
    // #0000ff blue

    const hexCodes = "0123456789ABCDEF"
    let color = "";
    for (let i = 0; i < 6; i++){
        color += hexCodes[Math.floor(Math.random() * hexCodes.length)];
    }
    return "#" + color
}

function setRandomColors() {
    cols.   (col => {
        const text = col.querySelector("h2");
        const button = col.querySelector("button");
        const color = generateRandomColor();

        text.textContent = color;
        col.style.background = generateRandomColor();

        setTextColor(text, color);  
        setTextColor(button, color);
    })
}

function setTextColor(text, color) {
    const luminance = chroma(color).luminance;
    text.style.color = luminance > 0.5 ? "black" : "white";
}

setRandomColors();