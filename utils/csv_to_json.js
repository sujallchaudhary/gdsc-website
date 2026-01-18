const fs = require('fs');
const path = require('path');

const csvFilePath = path.join(__dirname, 'final_gdsc.csv');
const jsonOutputPath = path.join(__dirname, 'data', 'members2.json');

// CSV Parsing Logic Helper
// Handles quoted fields and newlines within quotes
function parseCSV(text) {
    const rows = [];
    let currentRow = [];
    let currentField = '';
    let insideQuotes = false;

    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const nextChar = text[i + 1];

        if (char === '"') {
            if (insideQuotes && nextChar === '"') {
                // Escaped quote
                currentField += '"';
                i++; // Skip next quote
            } else {
                // Toggle quotes
                insideQuotes = !insideQuotes;
            }
        } else if (char === ',' && !insideQuotes) {
            // End of field
            currentRow.push(currentField);
            currentField = '';
        } else if ((char === '\r' || char === '\n') && !insideQuotes) {
            // Handle CRLF
            if (char === '\r' && nextChar === '\n') {
                i++;
            }
            // End of row
            currentRow.push(currentField);
            rows.push(currentRow);
            currentRow = [];
            currentField = '';
        } else {
            currentField += char;
        }
    }
    // Add last row if exists
    if (currentField || currentRow.length > 0) {
        currentRow.push(currentField);
        rows.push(currentRow);
    }
    return rows;
}

function main() {
    console.log('Reading CSV file...');
    const csvContent = fs.readFileSync(csvFilePath, 'utf8');
    const rows = parseCSV(csvContent);

    if (rows.length === 0) {
        console.log('Empty CSV');
        return;
    }

    const header = rows[0];

    // Convert headers to more friendly JSON keys
    const keys = header.map(h => {
        const trimmed = h.trim();
        if (trimmed === 'Timestamp') return 'timestamp';
        if (trimmed === 'Name') return 'name';
        if (trimmed === 'Department') return 'department';
        if (trimmed === 'Position') return 'position';
        if (trimmed.includes('Core Position')) return 'corePosition';
        if (trimmed === 'Roll Number') return 'rollNumber';
        if (trimmed === 'NSUT Email') return 'nsutEmail';
        if (trimmed === 'Personal Email') return 'personalEmail';
        if (trimmed === 'LinkedIn') return 'linkedin';
        if (trimmed === 'GitHub') return 'github';
        if (trimmed.startsWith('About You')) return 'bio';
        if (trimmed === 'Picture on Website') return 'image';
        return trimmed.replace(/ /g, '_').toLowerCase();
    });

    console.log(`Found ${rows.length - 1} entries to process.`);
    const jsonData = [];

    for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        if (row.length === 0 || (row.length === 1 && row[0] === '')) continue;

        const obj = {};
        keys.forEach((key, index) => {
            if (index < row.length) {
                let value = row[index].trim();
                // If it's the image, ensure it's relative to public if needed, 
                // but the prompt said "use this data" and previous script put "teams/..." there.
                // Assuming "teams/..." is what they want in the JSON too.

                obj[key] = value;
            } else {
                obj[key] = "";
            }
        });
        jsonData.push(obj);
    }

    console.log(`Writing JSON to ${jsonOutputPath}...`);
    fs.writeFileSync(jsonOutputPath, JSON.stringify(jsonData, null, 2), 'utf8');
    console.log('Done.');
}

main();
