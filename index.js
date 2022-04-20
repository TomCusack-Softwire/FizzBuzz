function fizz_buzz(number) {
    let result = [];

    if (number % 3 === 0) {
        result.push("Fizz");
    }
    if (number % 13 === 0) {
        result.push("Fezz");
    }
    if (number % 5 === 0) {
        result.push("Buzz");
    }
    if (number % 7 === 0) {
        result.push("Bang");
    }
    if (number % 11 === 0) {
        // Edge case: Fezz is the only one that persists if Bong.
        if (number % 13 === 0) {
            result = ["Fezz", "Bong"];
        } else {
            result = ["Bong"];
        }
    }
    if (number % 17 === 0) {
        result.reverse();
    }

    if (result.length === 0) {
        return number.toString();
    }

    return result.join("");
}

function test_given() {
    // Ensuring that given tests are correct
    let tests = {
        21: "FizzBang",
        33: "Bong",
        65: "FezzBuzz",
        195: "FizzFezzBuzz",
        143: "FezzBong",
        255: "BuzzFizz"
    };

    console.log("\n-----");
    for (let test_number in tests) {
        let expected = tests[test_number];
        let actual = fizz_buzz(test_number);
        console.assert(expected === actual, "fizz_buzz(" + test_number + "), expected " + expected + ", got " + actual);
    }
    console.log("All tests complete.\n-----");
}

// Main program
for (let counter = 1; counter <= 300; counter++) {
    console.log(fizz_buzz(counter));
}

test_given();
