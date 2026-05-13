function roundingNumbers(number) {
    if (number > 999999) {
        return (Math.round(number)/1000000).toFixed(0)
    } else {
        return "< 1"
    }
}

export default roundingNumbers;