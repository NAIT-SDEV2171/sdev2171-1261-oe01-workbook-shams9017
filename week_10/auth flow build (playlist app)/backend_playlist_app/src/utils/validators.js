const MIN_PASSWORD_LENGTH = 8;

function isValidEmail(email) {
  if (typeof email !== 'string') return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase();
}

function validateRegistrationInput({ name, email, password }) {
  if (!name || !email || !password) {
    return 'name, email, and password are required';
  }

  if (!isValidEmail(email)) {
    return 'email format is invalid';
  }

  if (String(password).length < MIN_PASSWORD_LENGTH) {
    return `password must be at least ${MIN_PASSWORD_LENGTH} characters`;
  }

  return null;
}

function validateLoginInput({ email, password }) {
  if (!email || !password) {
    return 'email and password are required';
  }

  if (!isValidEmail(email)) {
    return 'email format is invalid';
  }

  return null;
}

module.exports = {
  MIN_PASSWORD_LENGTH, isValidEmail, normalizeEmail,
  validateRegistrationInput, validateLoginInput,
};
