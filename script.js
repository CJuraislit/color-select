const cols = document.querySelectorAll(".col");

document.addEventListener("keydown", event => {
    event.preventDefault();
    if(event.code.toLowerCase() == "space") {
        console.log(event.code);
        setRandomColors();
    }
});

document.addEventListener("click", event => {
    const type = event.target.dataset.type

    if (type === "lock") {
        const node = event.target.tagName.toLowerCase() === "i"
            ? event.target
            : event.target.children[0];
        node.classList.toggle("fa-lock-open");
        node.classList.toggle("fa-lock");
    } else if (type === "copy") {
        copyToClickoard(event.target.textContent);
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

function copyToClickoard(text) {
    navigator.clipboard.writeText(text)
}

function setRandomColors(isInitial) {
    const colors = isInitial ?   getColorsFormHash() : [] ;

    cols.forEach((col, index) => {
        const isLocked = col.querySelector("i").classList.contains("fa-lock");
        const text = col.querySelector("h2");
        const button = col.querySelector("button");
        

        if (isLocked) {
            colors.push(text.textContent);
            return
        }

        const color = isInitial ? colors[index] ? colors[index] : generateRandomColor() : generateRandomColor();

        if (!isInitial){
            colors.push(color);
        }

        text.textContent = color;
        col.style.background = color; // generateRandomColor()

        setTextColor(text, color);  
        setTextColor(button, color);
    })

    updateColorsHash(colors);
}

function setTextColor(text, color) {
    const luminance = chroma(color).luminance();    
    text.style.color = luminance > 0.5 ? "black" : "white";
}

function updateColorsHash(colors = []) {
    document.location.hash = colors
    .map((col) =>  col.toString().substring(1))
    .join("-")
}

function getColorsFormHash() {
    if(document.location.hash.length > 1) {
        return document.location.hash.substring(1).split("-").map(color => "#" + color);
    } 
    return []
}

setRandomColors(true);