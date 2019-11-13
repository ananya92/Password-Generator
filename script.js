window.onload = function() {
    var passwordLength;             //Variable to store length of password
    var hasSpecialChars;            //Variable to store if special charaters are required in password
    var hasNumericChars;            //Variable to store if numeric charaters are required in password
    var hasLowercaseChars;          //Variable to store if lowercase charaters are required in password
    var hasUppercaseChars;          //Variable to store if uppercase charaters are required in password

    passwordLength = prompt("Please enter the length of password to be generated");

    if((passwordLength != null) && (passwordLength > 7) && (passwordLength < 129)) {
        hasSpecialChars = confirm("Do you want special charaters?");
        hasNumericChars = confirm("Do you want numbers?");
        hasLowercaseChars = confirm("Do you want lowercase alphabets?");
        hasUppercaseChars = confirm("Do you want uppercase alphabets?")
    }
    else {
        alert("Please enter length between 8 and 128");
    }
}
