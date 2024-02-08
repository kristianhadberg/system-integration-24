const base64EncodedString = btoa("this is base 64");
console.log("encoded:");
console.log(base64EncodedString);

const base64DecodedString = atob(base64EncodedString);
console.log("decoded:");
console.log(base64DecodedString);
