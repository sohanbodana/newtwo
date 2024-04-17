import Signup from "../client/src/componentt/Pages/signup";

const fun = async () => {
    const NAME = 'zzz';
    const EMAIL = 'zz@gmail.com';
    try {
        let result = await Signup.updateOne(
            { name: NAME, email: EMAIL },
            { $push: { PNR: 123 } }
        );
        console.log(result); // prints the number of documents modified
    } catch (error) {
        console.error(error);
    }
};

// Call the async function
fun();


