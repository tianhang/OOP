var strUtil = {
    getUpperCaseStr: function(str) {
        return str.toUpperCase();
    }
}

//backup reference of original function
var getUpperCaseStrRef = strUtil.getUpperCaseStr;

//add reverse functionality
strUtil.getUpperCaseStr = function(str) {
    var value = getUpperCaseStrRef.apply(this, arguments);
    return value.split("").reverse().join("");
}

var val = strUtil.getUpperCaseStr("hello,world!");
console.log(val); //!DLROW,OLLEH