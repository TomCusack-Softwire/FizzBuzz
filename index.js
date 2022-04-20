function fizz_buzz(number) {
    let result = "";
    if (number % 3 === 0) {
        result += "Fizz"
    }
    if (number % 5 === 0) {
        result += "Buzz";
    }
    if (result === "") {
        result = number.toString();
    }
    return result;
}

for (let counter = 1; counter <= 100; counter++) {
    console.log(fizz_buzz(counter));
}