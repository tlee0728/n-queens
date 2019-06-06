/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var solution = new Board({n: n});
  /* [[1, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 1]]
  */
  // var check = false;
  // if (n > 1) {

    // recursive helper function
  var helper = function(row, col, numRooks) {
    if (row === n || col === n) {
      return;
    }
    // toggle current piece
    solution.togglePiece(row, col);

    // check if current piece conflicts
    if (solution.hasAnyRooksConflicts()) {
    // if it does conflict, untoggle then return.
      solution.togglePiece(row, col);
      return;
    }

    if (numRooks === n) {
      check = true;
      return;
    }

    // else, iterate through the next row
    for (var i = 0; i < n; i++) {
      helper(row + 1, i, numRooks + 1);
    }
  };
    
  // initial run
  solution.togglePiece(0, 0);
  for (var j = 0; j < n; j++) {
    helper(1, j, 1); 
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution.rows();
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solution = new Board({n: n});
  var solutionCount = 0;

    // recursive helper function
  var helper = function(row, col, numRooks) {
    // toggle current position
    solution.togglePiece(row, col);

    // check if current piece conflicts
    if (solution.hasAnyRooksConflicts()) {
    // if it does conflict, untoggle then return.
      solution.togglePiece(row, col);
      return;
    }

    if (numRooks === n - 1) {
      solutionCount++;
      solution.togglePiece(row, col);
      return;
    }

    // else, iterate through the next row
    for (var j = 0; j < n; j++) {
      helper(row + 1, j, numRooks + 1);
    }
    solution.togglePiece(row, col);
  };
    
  // initial run
  for (var k = 0; k < n; k++) {
    solution.togglePiece(0, k);
    for (var j = 0; j < n; j++) {
      helper(1, j, 1); 
    }

    solution.togglePiece(0, k);
  }


  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; 
  // your code here
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0; 
  // your code here
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
