let FIZZ_ENABLED = true;
let BUZZ_ENABLED = true;
let BANG_ENABLED = true;
let BONG_ENABLED = true;
let FEZZ_ENABLED = true;
let REVERSE_ENABLED = true;
let CUSTOM_DIVISIBLE_RULES = {};

function fizz_buzz(number) {
    let result = [];

    if (FIZZ_ENABLED && number % 3 === 0) {
        result.push("Fizz");
    }
    if (FEZZ_ENABLED && number % 13 === 0) {
        result.push("Fezz");
    }
    if (BUZZ_ENABLED && number % 5 === 0) {
        result.push("Buzz");
    }
    if (BANG_ENABLED && number % 7 === 0) {
        result.push("Bang");
    }

    // Other rules
    for (let divisible_num in CUSTOM_DIVISIBLE_RULES) {
        if (number % divisible_num === 0) {
            result.push(CUSTOM_DIVISIBLE_RULES[divisible_num]);
        }
    }

    if (BONG_ENABLED && number % 11 === 0) {
        // Edge case: Fezz is the only one that persists if Bong.
        if (FEZZ_ENABLED && number % 13 === 0) {
            result = ["Fezz", "Bong"];
        } else {
            result = ["Bong"];
        }
    }
    if (REVERSE_ENABLED && number % 17 === 0) {
        result.reverse();
    }

    if (result.length === 0) {
        return number.toString();
    }

    return result.join("");
}

function test_given() {
    // Ensuring that given tests are correct
    const tests = {
        21: "FizzBang",
        33: "Bong",
        65: "FezzBuzz",
        195: "FizzFezzBuzz",
        143: "FezzBong",
        255: "BuzzFizz"
    };

    // Reset custom rules, temporarily
    const rules = [FIZZ_ENABLED, BUZZ_ENABLED, BANG_ENABLED, BONG_ENABLED, FEZZ_ENABLED, REVERSE_ENABLED, CUSTOM_DIVISIBLE_RULES];
    FIZZ_ENABLED = true;
    BUZZ_ENABLED = true;
    BANG_ENABLED = true;
    BONG_ENABLED = true;
    FEZZ_ENABLED = true;
    REVERSE_ENABLED = true;
    CUSTOM_DIVISIBLE_RULES = {};

    console.log("-----");
    for (let test_number in tests) {
        const expected = tests[test_number];
        const actual = fizz_buzz(test_number);
        console.assert(expected === actual, "fizz_buzz(" + test_number + "), expected " + expected + ", got " + actual);
    }
    console.log("All tests complete.\n-----");

    // Reset custom rules to what they were
    FIZZ_ENABLED = rules[0];
    BUZZ_ENABLED = rules[1];
    BANG_ENABLED = rules[2];
    BONG_ENABLED = rules[3];
    FEZZ_ENABLED = rules[4];
    REVERSE_ENABLED = rules[5];
    CUSTOM_DIVISIBLE_RULES = rules[6];
}

const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
});

// Deal with command line arguments
let invalid_argument = false;
for (let counter = 2; counter < process.argv.length; counter++) {
    switch (process.argv[counter]) {
        case "--no-fizz":
            FIZZ_ENABLED = false;
            break;
        case "--no-buzz":
            BUZZ_ENABLED = false;
            break;
        case "--no-bang":
            BANG_ENABLED = false;
            break;
        case "--no-bong":
            BONG_ENABLED = false;
            break;
        case "--no-fezz":
            FEZZ_ENABLED = false;
            break;
        case "--help":
            invalid_argument = true;
            break;
        default:
            if (process.argv[counter].startsWith("--") && process.argv.length > counter + 1) {
                let divisible = parseInt(process.argv[counter + 1], 10);
                if (divisible > 0) { // filters out NaNs too
                    CUSTOM_DIVISIBLE_RULES[divisible] = process.argv[counter].slice(2);
                    counter++;
                } else {
                    invalid_argument = true;
                }
            } else {
                invalid_argument = true;
            }
    }
}
if (invalid_argument) {
    console.log("Invalid argument detected. Ignoring.");
    console.log("Usage: node index.js [--help] [--no-[fizz|buzz|bang|bong|reverse]] [--NAME DIVISIBLE_NUMBER]");
}

// Main program
readline.question("Enter a maximum number: ", user_maximum => {
    const maximum = parseInt(user_maximum, 10);
    if (maximum > 0) { // filters out NaNs too
        for (let counter = 1; counter <= maximum; counter++) {
            console.log(fizz_buzz(counter));
        }
    } else {
        console.log("Not a valid integer.");
    }

    readline.close();
});