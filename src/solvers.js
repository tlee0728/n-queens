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
    // toggle current piece
    solution.togglePiece(row, col);

    // check if current piece conflicts
    if (solution.hasAnyRooksConflicts()) {
    // if it does conflict, untoggle then return.
      solution.togglePiece(row, col);
      return;
    }

    if (numRooks === n - 1) {
      // check = true;
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
    

  if (n === 1) {
    return 1;
  }

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
  var solution = new Board({n: n}); 
  var flag = false;
  if (n === 0) {
    console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
    return solution.rows();
  } else if (n === 1) {
    solution.togglePiece(0,0);
    console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
    return solution.rows();
  }

  //recursive helper function with row, columns, number of queens
  var helper = function(row, column, numQueens){
    //toggle position and then check from there
    solution.togglePiece(row, column);

    //check if there are conflicts with queens
    if (solution.hasAnyQueensConflicts()){
      //toggle the piece that caused conflict
      solution.togglePiece(row, column);
      //return out
      return;
    }
    //need to add something for when all conditions met, and I want to exit out

    //want it to be n - 1 because number of queens lags behind our toggole
    //we toggled it at line 125. solution.togglePiece(row, column) and we never added to numQueens
    //also we never want to mutate the parameter numQueens because it is inputted into our helper fn
    //we just want to compare it with n - 1 b/c it is lagging
    if (numQueens === n - 1){
      flag = true; 
      return;
    }

    //if there isnt a conflict
    //use recursive helper function again to go one lvl deeper
    //since no for loop inside of helper fn, i would need one to loop across row 
    for (var i = 0; i < n; i++){
      //because i successfuly passed has no conflicts above and toggled piece, i would now update numQueens becuase i placed one on board
      helper(row + 1, i, numQueens + 1);
      //as i call the helper fn to go own lvl deeper, that lvl will be stopped at 145
      //so if 4 levels deep, each lvl will be stopped at helper fn call, line 144, as i return out of helper function, it will encounter the return statement
      //so lvl 3, line 144. lvl 2 line 144, lvl 1 line 144. 
      if (flag){
        return;
      }

    }
    solution.togglePiece(row, column);
  }

  // initialize
  //for loop will go across
  for (var i = 0; i < n; i++){
    solution.togglePiece(0, i);
    //for loop will tackle the rest of the rows below row 2. (ie 4 rows, recursion does 2 top rows, but 2 bott rows are not taken into account)
    for (var j = 0; j < n; j++){

      //recursion goes into first two rows
      helper(1, j, 1);  
      if (flag) {
        //need to get out of this outer for loop so we added this
        return solution.rows();
      }
    }
    solution.togglePiece(0, i);

  }

  console.log(solution);
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  //put this here just in case
  return solution.rows();
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0; 
  // your code here
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
