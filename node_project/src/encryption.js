let regIsLetter = RegExp("^([A-Z]|[a-z])$");

function encode(text, shift) {
    let textToArray = text.split('');
    let arrayToText = textToArray.map(letter => {
        if (regIsLetter.test(letter)) {
            let code = findRightLetter(letter, letter.charCodeAt(0) + shift);
            return String.fromCharCode(code)
        }
        return letter;
    });
    text = arrayToText.join('');
    return text;
}

function decode(text, shift) {
    let textToArray = text.split('');
    let arrayToText = textToArray.map(letter => {
        if (regIsLetter.test(letter)) {
            let code = findRightLetter(letter, letter.charCodeAt(0) - shift);
            return String.fromCharCode(code)
        }
        return letter;
    });
    text = arrayToText.join('');
    return text;
}

function findRightLetter(orig_letter, changed_code) {
    let regIsLowLetter = RegExp("^[a-z]$");
    if (regIsLowLetter.test(orig_letter)) {
        changed_code = NormalizeCode(changed_code)
    } else {
        changed_code += 32;
        changed_code = NormalizeCode(changed_code)
        changed_code -= 32;
    }
    return changed_code;
}

function NormalizeCode(code) {
    while (code < 97) code += 26;
    while (code > 122) code -= 26;
    return code;
}

module.exports = {encode, decode}
