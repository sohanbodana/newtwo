// // function encrypt(text, shift) {
// //     let result = '';
// //     for (let i = 0; i < text.length; i++) {
// //         let char = text[i];
// //         if (char.match(/[a-z]/i)) {
// //             let code = text.charCodeAt(i);
// //             if (code >= 65 && code <= 90) {
// //                 char = String.fromCharCode(((code - 65 + shift) % 26) + 65);
// //             } else if (code >= 97 && code <= 122) {
// //                 char = String.fromCharCode(((code - 97 + shift) % 26) + 97);
// //             }
// //         }
// //         result += char;
// //     }
// //     return result;
// // }

// // function decrypt(text, shift) {
// //     return encrypt(text, 26 - shift); // Decrypting is just shifting in the opposite direction
// // }

// // // Example usage:
// // let plaintext = "Hello, World!";
// // let shift = 5;
// // let encryptedText = encrypt(plaintext, shift);
// // console.log("plaintext:", plaintext);
// // console.log("Encrypted:", encryptedText);

// // let decryptedText = decrypt(encryptedText, shift);
// // console.log("Decrypted:", decryptedText);


// function encryptVigenere(plainText, keyword) {
//     let encryptedText = '';
//     for (let i = 0; i < plainText.length; i++) {
//         let plainChar = plainText.charAt(i);
//         let keywordChar = keyword.charAt(i % keyword.length);
//         let shift = keywordChar.charCodeAt(0) - 'A'.charCodeAt(0);

//         if (plainChar.match(/[a-z]/i)) {
//             let code = plainChar.charCodeAt(0);
//             if (code >= 65 && code <= 90) {
//                 encryptedText += String.fromCharCode(((code - 65 + shift) % 26) + 65);
//             } else if (code >= 97 && code <= 122) {
//                 encryptedText += String.fromCharCode(((code - 97 + shift) % 26) + 97);
//             }
//         } else {
//             encryptedText += plainChar;
//         }
//     }
//     return encryptedText;
// }

// function decryptVigenere(encryptedText, keyword) {
//     let decryptedText = '';
//     for (let i = 0; i < encryptedText.length; i++) {
//         let encryptedChar = encryptedText.charAt(i);
//         let keywordChar = keyword.charAt(i % keyword.length);
//         let shift = keywordChar.charCodeAt(0) - 'A'.charCodeAt(0);

//         if (encryptedChar.match(/[a-z]/i)) {
//             let code = encryptedChar.charCodeAt(0);
//             if (code >= 65 && code <= 90) {
//                 decryptedText += String.fromCharCode(((code - 65 - shift + 26) % 26) + 65);
//             } else if (code >= 97 && code <= 122) {
//                 decryptedText += String.fromCharCode(((code - 97 - shift + 26) % 26) + 97);
//             }
//         } else {
//             decryptedText += encryptedChar;
//         }
//     }
//     return decryptedText;
// }

// // Example usage:
// let plaintext = "Hello, World!";
// let keyword = "KEY";
// let encryptedText = encryptVigenere(plaintext, keyword);
// console.log("Encrypted:", encryptedText);

// let decryptedText = decryptVigenere(encryptedText, keyword);
// console.log("Decrypted:", decryptedText);
