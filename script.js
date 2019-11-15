function generatePassword() {
    var passwordLength = 0;             //Variable to store length of password
    var needSpecialChars;            //Variable to store if special charaters are required in password
    var needNumericChars;            //Variable to store if numeric charaters are required in password
    var needLowercaseChars;          //Variable to store if lowercase charaters are required in password
    var needUppercaseChars;          //Variable to store if uppercase charaters are required in password

    passwordLength = parseInt(document.getElementById("passwordLength").value);

    if((passwordLength != null) && (passwordLength > 7) && (passwordLength < 129)) {
        needSpecialChars = document.getElementById("specialChar").checked;
        needNumericChars = document.getElementById("number").checked;
        needLowercaseChars = document.getElementById("lowercase").checked;
        needUppercaseChars = document.getElementById("uppercase").checked;

        if(!(needSpecialChars || needNumericChars || needLowercaseChars || needUppercaseChars)) {      //validating that atleast one charater type is selected
            alert("Please select atleast one charater type. Try again!");
            window.location.reload(true);                                              //Forcing the page to reload from server and not from HTTP cache so that user can retry
        }
    }
    else {
        alert("Please enter length between 8 and 128. Try again!");
        window.location.reload(true);                                                 //Forcing the page to reload from server and not from HTTP cache so that user can retry
    }

    var generatedPassword = "";                                     //string variable storing the generated password
    var specialCharacters = "!#$%&'()*+,-./:;<=>?@[\]^_`{|}~"+'"';      //string variable storing all special characters
    var numericCharacters = "0123456789";                           //string variable storing all numeric characters
    var lowercaseCharacters = "abcdefghijklmnopqrstuvwxyz";         //string variable storing all lowercase alphabets
    var uppercaseCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";         //string variable storing all uppercase alphabets
    var domain = [                                                  //object array storing all the 4 charater sets, a boolean IsSelected storing the user's selection of that character set and boolean isIncluded storing if a character from that set has been included in the password. We must ensure that all of the user's character preferences have been included in the password.
                    {
                       characters : specialCharacters, isSelected : needSpecialChars, isIncluded : false
                    },
                    {
                        characters : numericCharacters, isSelected : needNumericChars, isIncluded : false
                    },
                    {
                        characters : uppercaseCharacters, isSelected : needUppercaseChars, isIncluded : false
                    },
                    {
                        characters : lowercaseCharacters, isSelected : needLowercaseChars, isIncluded : false
                    }
                ];
    var selectedDomain = [];                // The sub-domain array storing only the domain objects whose isSelected is true ie., user has selected those character sets

    for(var i=0; i<domain.length ; i++) {
        if(domain[i].isSelected) {
            selectedDomain.push(domain[i]);
        }
    }
    var isIncludedCount = 0;                //variable to keep track of whether all character preferences have been incorporated in the generated password

    for(var i=0; i<passwordLength; i++) {
        var randomDomainIndex = Math.floor(Math.random() * selectedDomain.length);      //generating a random domain index for randomly selecting a character set
        if(!selectedDomain[randomDomainIndex].isIncluded) {             //If a character set is selected for the first time, set it's isIncluded to true and increase the included count
            selectedDomain[randomDomainIndex].isIncluded = true;
            isIncludedCount++;
        }  
        var randomCharIndex = Math.floor(Math.random() * selectedDomain[randomDomainIndex].characters.length);  
        //generating a random character index for randomly selecting a character within the selected character set
        var c = selectedDomain[randomDomainIndex].characters.charAt(randomCharIndex);
        generatedPassword = generatedPassword + c;    //Adding the randomly selected character to the password string

        if((isIncludedCount < selectedDomain.length) && (selectedDomain.length - isIncludedCount) == (passwordLength-1-i)) {
            //This check is to ensure that all character preferences have been incorporated in the password. If the number of character sets not included in the password equals the number of remaining iterations of i, then include a random character from each of the not included character sets into the password and increment the value of i.
            for(var j=0; j<selectedDomain.length; j++) {
                if(!selectedDomain[j].isIncluded) {
                    randomCharIndex = Math.floor(Math.random() * selectedDomain[j].characters.length);
                    c = selectedDomain[j].characters.charAt(randomCharIndex);
                    generatedPassword = generatedPassword + c;
                    selectedDomain[j].isIncluded = true;
                    i++;
                    isIncludedCount++;
                }
            }
        }
    }
    document.getElementById("password").textContent = generatedPassword.toString();       //Set the generated password to the textarea HTML element with id - password
}

function copyPassword() {
    document.getElementById("password").select();
    document.execCommand("copy");
}