function getContinentColor(continent) {
    if (continent === "North America" || continent === "South America") {
        return "green";
    }    else if (continent === "Africa") {
        return "blue";
    } else if (continent === "Asia") {
        return "red";
    } else if (continent === "Europe") {
        return "yellow";
    } else if (continent === "Oceania") {
        return "purple";
    }
    else {
        return "grey";
    }
}

export default getContinentColor;