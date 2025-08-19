const xlsx = require('xlsx');
const fs = require('fs');

/**
 * Parse an Excel file and convert the first sheet to JSON
 * @param {string} filePath - Path to the uploaded Excel file
 * @returns {Array} - Array of objects representing each row
 */
const parseExcel = (filePath) => {
  try {
    // Read the Excel file
    const workbook = xlsx.readFile(filePath);

    // Get the first sheet name
    const sheetName = workbook.SheetNames[0];

    // Convert sheet to JSON
    const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName], { defval: '' });

    // Optional: remove the uploaded file after parsing
    fs.unlinkSync(filePath);

    return data;
  } catch (error) {
    console.error('Error parsing Excel file:', error);
    throw new Error('Failed to parse Excel file');
  }
};

module.exports = parseExcel;
