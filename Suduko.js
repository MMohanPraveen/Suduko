/**
 * Displays the Sudoku grid in a formatted manner.
 * 
 * @param {Array<Array<number>>} grid - The Sudoku grid to be displayed.
 */
function display(grid) {
    console.log("sudoku:");
    console.log("---------------------");
    
    for (let i = 0; i < grid.length; i++) {
        let row = "";
        for (let j = 0; j < grid[i].length; j++) {
            row += "| " + grid[i][j] + " ";
        }
        console.log(row + "|");
        if (i === grid.length - 1) {
            console.log("---------------------");
        } else {
            console.log("+---+---+---+---+---+");
        }
    }
}

/**
 * Validates whether the provided grid adheres to Sudoku rules.
 * 
 * @param {Array<Array<number>>} grid - The Sudoku grid to be validated.
 * @returns {boolean} - True if the grid is valid, otherwise False.
 */
function isSudoku(grid) {
    for (let col = 0; col < 5; col++) {
        let seen = new Set();
        for (let row = 0; row < 5; row++) {
            if (seen.has(grid[row][col])) {
                return false;
            }
            seen.add(grid[row][col]);
        }
    }
    return true;
}

/**
 * Generates all permutations of a given string.
 * 
 * @param {string} string - The input string to generate permutations for.
 * @returns {Array<string>} - An array containing all permutations of the input string.
 */
function getPermutations(string) {
    let results = [];

    if (string.length === 1) {
        results.push(string);
        return results;
    }

    for (let i = 0; i < string.length; i++) {
        let first = string[i];
        let rem = string.substring(0, i) + string.substring(i + 1);
        let permutations = getPermutations(rem);
        for (let j = 0; j < permutations.length; j++) {
            results.push(first + permutations[j]);
        }
    }
    return results;
}

/**
 * Generates a random 5x5 Sudoku grid using permutations of "12345".
 * 
 * @returns {Array<Array<number>>} - A 5x5 grid adhering to Sudoku rules.
 */
function getRandomGrid() {
    let permutations = getPermutations("12345");
    while (true) {
        let grid = [];
        for (let i = 0; i < 5; i++) {
            let random_number = Math.floor(Math.random() * permutations.length);
            let num = permutations[random_number];
            grid.push([...num].map(Number)); // Convert string chars to numbers
        }
        if (isSudoku(grid)) {
            return grid;
        }
    }
}

let grid = getRandomGrid();
display(grid);
