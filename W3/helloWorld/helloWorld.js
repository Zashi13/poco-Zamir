let inputName;
const maxChars = 30;

inputName = prompt("Please enter your name");
console.log(inputName.length);

if (inputName.length > maxChars){
    if(confirm('Please get a shorter name, thanks')){}
else    window.location.reload(); 
}

else {
    alert("Hello " + inputName);
}