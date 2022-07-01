// ----------------------------------------------------------------- //

exports.isEmptyObject = (obj) => {
  return Object.keys(obj).length === 0;
};

// ----------------------------------------------------------------- //

exports.isArrayOfStrings = (array) => {
  return array.every((element) => typeof element === "string");
};

// ----------------------------------------------------------------- //

exports.isEmailValid = (email) => {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  return emailRegex.test(email);
};

// ----------------------------------------------------------------- //
