// passwordUtils.js
const bcrypt = require('bcrypt');

async function checkPassword(plainPassword, hashedPassword) {
    try {
        const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
        if (isMatch) {
            console.log('Password is correct!');
        } else {
            console.log('Incorrect password.');
        }
        return isMatch;
    } catch (err) {
        console.error('Error comparing passwords:', err);
        return false;
    }
}

module.exports = checkPassword;
