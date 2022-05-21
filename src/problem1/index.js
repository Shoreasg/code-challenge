//Provide 3 unique implementations of the following function.

//Input: n - any integer 

//Assuming this input will always produce a result lesser than Number.MAX_SAFE_INTEGER.

//Output: return - summation to n, i.e. sum_to_n(5) === 1 + 2 + 3 + 4 + 5 === 15.


var sum_to_n_a = function (n) { // O(N)
    let sum = 0 // let sum = 0
    for (let i = 1; i <= n; i++) { //iterate from 1 to N
        sum += i; // Each iteration, i is added to sum, then i is increase by 1. //When i becomes greater than N, test condition is false              
    }
    return sum //return sum
};

console.log(sum_to_n_a(5))

var sum_to_n_b = function (n) { // O(N)
    if (n > 0) //if number is 5, i will return 5 + sum_to_n_b(4), call again until the number reaches 0
        return n + sum_to_n_b(n - 1);
    return 0 //else if user enter a negative number, i will return 0
};

console.log(sum_to_n_b(5))

var sum_to_n_c = function (n) { //O(N^2)
    return n * (n + 1) / 2; // using Gauss sumation formula
};

console.log(sum_to_n_c(5))