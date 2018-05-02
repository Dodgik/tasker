
const publicFields = ['id', 'email', 'firstname'];
module.exports.publicFields = publicFields;

const loggedInUser = function (user) {
  let userInfo = {
    loggedIn: true,
    isFirstLogin: false,
    id: user.id,
    email: user.email,
    displayName: user.displayName,
    firstname: user.firstname,
    lastname: user.lastname,
  }

  return userInfo;
};
module.exports.loggedInUser = loggedInUser;

const guestUser = function (user) {
  let userInfo = {
    displayName: 'Guest',
    loggedIn: false,
  }
  if (user && user.code) {
    user.recovery = user.code
  }

  return userInfo;
};
module.exports.guestUser = guestUser;
