function getRegionColor(region) {
    if (region === "Americas") {
        return "green";
    }    else if (region === "Africa") {
        return "blue";
    } else if (region === "Asia") {
        return "red";
    } else if (region === "Europe") {
        return "yellow";
    } else if (region === "Oceania") {
        return "purple";
    }
    else {
        return "grey";
    }
}

export default getRegionColor;