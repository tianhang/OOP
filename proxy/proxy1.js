var basicFunc = function(str) {
    return str.toUpperCase();
}

var basicFuncRef = basicFunc;

basicFunc = function(str) {
    var value = basicFuncRef.apply(this, arguments);
    console.log(this);
    console.log(arguments);
    return value.split("").reverse().join("");
}

var val = basicFunc("hello,world!");
console.log(val);