// validation.js

/**
 * Validation functions for EduTrack LMS
 * Can be used in frontend (React) or backend (Node.js)
 */

/**
 * Check if a string is not empty
 */
export const isRequired = (value) => {
  return value !== undefined && value !== null && value.toString().trim() !== '';
};

/**
 * Validate email format
 */
export const isEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

/**
 * Validate password
 * At least 8 characters, 1 uppercase, 1 lowercase, 1 number
 */
export const isStrongPassword = (password) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return regex.test(password);
};

/**
 * Validate date string (YYYY-MM-DD)
 */
export const isValidDate = (date) => {
  return !isNaN(Date.parse(date));
};

/**
 * Validate positive number (amounts, marks, etc.)
 */
export const isPositiveNumber = (num) => {
  return !isNaN(num) && Number(num) > 0;
};

/**
 * Validate task status
 */
export const isValidTaskStatus = (status) => {
  const validStatuses = ['todo', 'doing', 'done'];
  return validStatuses.includes(status);
};

/**
 * Validate priority
 */
export const isValidPriority = (priority) => {
  const validPriorities = ['low', 'medium', 'high'];
  return validPriorities.includes(priority.toLowerCase());
};

/**
 * Validate array of IDs (Mongo ObjectId strings)
 */
export const isValidIdArray = (arr) => {
  const objectIdRegex = /^[0-9a-fA-F]{24}$/;
  return Array.isArray(arr) && arr.every((id) => objectIdRegex.test(id));
};

/**
 * Validate note content length
 */
export const isValidNoteContent = (content) => {
  return isRequired(content) && content.length <= 5000; // max 5000 chars
};

/**
 * Validate attachment URLs
 */
export const isValidAttachment = (url) => {
  const regex = /^(https?:\/\/[^\s]+)$/;
  return regex.test(url);
};

/**
 * Validate exam marks
 */
export const isValidMarks = (marks, totalMarks) => {
  return isPositiveNumber(marks) && marks <= totalMarks;
};

/**
 * Validate budget entry
 */
export const isValidBudgetEntry = (entry) => {
  const { title, amount, category, date } = entry;
  return (
    isRequired(title) &&
    isPositiveNumber(amount) &&
    isRequired(category) &&
    isValidDate(date)
  );
};

/**
 * Generic string length validator
 */
export const isValidLength = (str, min = 1, max = 255) => {
  return isRequired(str) && str.length >= min && str.length <= max;
};
