function sum (a, b) {
    return a + b;
}

function div (a, b) {
    if (b == 0) {
        throw new Error('You can not divide by 0!');
    }
    else {
        return a / b;
    }
}

function containsNumbers(text) {
    for (let i = 0; i < text.length; i++) {
        if (!isNaN(text.charAt(i)))
            return true;
    }
    return false;
}

export default { sum, div, containsNumbers };