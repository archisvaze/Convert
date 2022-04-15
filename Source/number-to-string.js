var readlineSync = require('readline-sync');
function main() {
    var choice = readlineSync.question(`\n1. Convert a Number to String.\n2. Convert a String to Number.\n3. Exit\nEnter Choice 1 or 2: \n> `);
    if (choice == 1) {
        var number = readlineSync.question(`Enter a Valid number in Digits.\n\n> `);
        console.log(`\n> "${convertToString(number)}"\n`);
        var ret = readlineSync.question(`1. Convert Again.\n3. Exit.\n> `)
        if (ret == 1) main();
        else { console.log(`\nExiting...\n`) }
    }
    else if (choice == 2) {
        var string = readlineSync.question(`Enter a Valid Number in Words.\n\n> `);
        console.log(`\n> ${convertToNumber(string)}\n`);
        var ret = readlineSync.question(`1. Convert Again.\n3. Exit.\n> `)
        if (ret == 1) main();
        else { console.log(`\nExiting...\n`) }
    }
    else { console.log(`\nExiting...\n`) }
}

main();

function convertToString(num) {
    let obj = { '0': 'zero', '1': 'one', '2': 'two', '3': 'three', '4': 'four', '5': 'five', '6': 'six', '7': 'seven', '8': 'eight', '9': 'nine', '10': 'ten', '11': 'eleven', '12': 'twelve', '13': 'thirteen', '14': 'fourteen', '15': 'fifteen', '16': 'sixteen', '17': 'seventeen', '18': 'eighteen', '19': 'nineteen', '20': 'twenty', '30': 'thirty', '40': 'forty', '50': 'fifty', '60': 'sixty', '70': 'seventy', '80': 'eighty', '90': 'ninety', '100': 'hundred', '1000': 'thousand', '1000000': 'million' }
    num = Number(num);
    if (obj[num]) return obj[num];
    let str = num + '';
    let arr = str.split('')
    function arr2ToStr(arr) {
        if (obj[`${arr[0]}${arr[1]}`]) return obj[`${arr[0]}${arr[1]}`]
        let string = `${obj[(Number(arr[0]) * 10)]}-${obj[arr[1]]}`;
        return string;
    }
    function arr3Tostr(arr) {
        str = `${obj[(Number(arr[0]))]} hundred`;
        if (Number(`${arr[1]}${arr[2]}`) == 0) return str
        if (obj[Number(`${arr[1]}${arr[2]}`)]) {
            str += ` and ${obj[Number(`${arr[1]}${arr[2]}`)]}`
            return str;
        }
        else str += ` and ${arr2ToStr(arr.slice(1))}`;
        return str;
    }
    function arr4ToStr(arr) {
        str = `${obj[(Number(arr[0]))]} thousand`;
        if (Number(`${arr[1]}${arr[2]}${arr[3]}`) == 0) return str
        if (Number(`${arr[1]}${arr[2]}`) == 0) return str + ` and ${obj[arr[3]]}`
        if (Number(`${arr[1]}`) == 0) return str + ` and ${arr2ToStr(arr.slice(2))}`
        str += " " + arr3Tostr(arr.slice(1));
        return str
    }

    if (arr.length === 2) {
        return arr2ToStr(arr);
    }
    if (arr.length === 3) {
        return arr3Tostr(arr);
    }
    if (arr.length === 4) {
        return arr4ToStr(arr);
    }
    if (arr.length === 5) {
        str = arr2ToStr([arr[0], arr[1]]) + " thousand";
        if (Number(`${arr[2]}${arr[3]}${arr[4]}`) == 0) return str
        if (Number(`${arr[2]}${arr[3]}`) == 0) return str + ` ${obj[arr[4]]}`
        if (Number(`${arr[2]}`) == 0) return str + ` ${arr2ToStr(arr.slice(3))}`
        str += " " + arr3Tostr([arr[2], arr[3], arr[4]]);
        return str;
    }
    if (arr.length === 6) {
        str = arr3Tostr(arr.slice(0, 3)) + " thousand";
        if (Number(`${arr[3]}${arr[4]}${arr[5]}`) == 0) return str
        if (Number(`${arr[3]}${arr[4]}`) == 0) return str + ` and ${obj[arr[5]]}`
        if (Number(`${arr[3]}`) == 0) return str + ` and ${arr2ToStr([arr[4], arr[5]])}`;
        str += " " + arr3Tostr([arr[3], arr[4], arr[5]]);
        return str;
    }
    if (arr.length === 6 && obj[arr.slice(0)]) return obj[arr.slice(0)];
    else {
        console.log(`Invalid Number.
Examples:
1 => "one"
20 => "twenty"
246 => "two hundred forty-six"
783919 => "seven hundred eighty-three thousand nine hundred and nineteen"
Additional Notes:
The minimum number is "zero" (inclusively)
The maximum number, which must be supported is 1 million (inclusively)`);
        return main();
    }
}
function convertToNumber(string) {
    let obj = { 'zero': 0, 'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5, 'six': 6, 'seven': 7, 'eight': 8, 'nine': 9, 'ten': 10, 'eleven': 11, 'twelve': 12, 'thirteen': 13, 'fourteen': 14, 'fifteen': 15, 'sixteen': 16, 'seventeen': 17, 'eighteen': 18, 'nineteen': 19, 'twenty': 20, 'thirty': 30, 'forty': 40, 'fifty': 50, 'sixty': 60, 'seventy': 70, 'eighty': 80, 'ninety': 90, 'hundred': 100, 'thousand': 1000, 'million': 1000000 };
    if (Object.keys(obj).includes(string)) return obj[string];
    let arr = string.split(' ');
    for (let word in arr) {
        if (arr[word] === 'and') arr.splice(word, 1)
    }
    let numberArr = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].includes('-')) {
            let tempArr = arr[i].split('-');
            let sum = 0;
            for (let tempWord of tempArr) {
                sum += obj[tempWord];
            }
            numberArr.push(sum);
        } else { numberArr.push(obj[arr[i]]); }
    }
    let hundredIndex = numberArr.indexOf(100);
    while (hundredIndex !== -1 && numberArr[hundredIndex - 1] && numberArr[hundredIndex - 1] !== 1000) {
        numberArr.splice(hundredIndex, 1, 100 * numberArr[hundredIndex - 1]);
        numberArr.splice(hundredIndex - 1, 1);
        hundredIndex = numberArr.indexOf(100);
        if (hundredIndex === 0) hundredIndex = numberArr.lastIndexOf(100);
    }
    let thousandIndex = numberArr.indexOf(1000);
    while (thousandIndex !== -1 && numberArr[thousandIndex - 1]) {
        let beforeThousand = numberArr.slice(0, thousandIndex).reduce((a, b) => a + b) * 1000;
        numberArr.splice(thousandIndex, 1, beforeThousand);
        numberArr = numberArr.slice(thousandIndex)
        thousandIndex = numberArr.indexOf(1000);
    }
    let millionIndex = numberArr.indexOf(1000000);
    while (millionIndex !== -1 && numberArr[millionIndex - 1]) {
        numberArr.splice(millionIndex, 1, 1000000 * numberArr[millionIndex - 1]);
        numberArr.splice(millionIndex - 1, 1);
        millionIndex = numberArr.indexOf(1000000);
    }
    if (numberArr.reduce((a, b) => a + b)) return (numberArr.reduce((a, b) => a + b));
    else {
        console.log(`Invalid String. Enter a Valid Number in Words.
Examples:
"one" => 1
"twenty" => 20
"two hundred forty-six" => 246
"seven hundred eighty-three thousand nine hundred and nineteen" => 783919
Additional Notes:
The minimum number is "zero" (inclusively)
The maximum number, which must be supported is 1 million (inclusively)`)
        return main();
    }

}

