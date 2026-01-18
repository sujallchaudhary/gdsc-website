const fs = require('fs');
const path = require('path');
const https = require('https');

const csvFilePath = path.join(__dirname, 'final_gdsc.csv');
const publicTeamsDir = path.join(__dirname, 'public', 'teams');
const csvOutputPath = csvFilePath; // Overwrite the same file

// Ensure public/teams directory exists
if (!fs.existsSync(publicTeamsDir)) {
    console.log(`Creating directory: ${publicTeamsDir}`);
    fs.mkdirSync(publicTeamsDir, { recursive: true });
}

async function downloadImage(url, destPath) {
    // Handle Google Drive links
    let fileId = null;
    const driveMatch = url.match(/id=([a-zA-Z0-9_-]+)/);
    if (driveMatch) {
        fileId = driveMatch[1];
    } else {
        // Try other drive formats or just use the url if direct
        if (url.includes('drive.google.com')) {
            // potentially /d/FILEID/view
            const parts = url.split('/');
            const dIndex = parts.indexOf('d');
            if (dIndex !== -1 && parts.length > dIndex + 1) {
                fileId = parts[dIndex + 1];
            }
        }
    }

    let downloadUrl = url;
    if (fileId) {
        downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
    }

    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(destPath);
        https.get(downloadUrl, (response) => {
            // Handle redirects (Google Drive often redirects)
            if (response.statusCode === 302 || response.statusCode === 303) {
                https.get(response.headers.location, (redirectResponse) => {
                    if (redirectResponse.statusCode !== 200) {
                        reject(new Error(`Failed to download: ${redirectResponse.statusCode}`));
                        return;
                    }
                    redirectResponse.pipe(file);
                    file.on('finish', () => {
                        file.close(resolve);
                    });
                }).on('error', (err) => {
                    fs.unlink(destPath, () => { });
                    reject(err);
                });
            } else if (response.statusCode === 200) {
                response.pipe(file);
                file.on('finish', () => {
                    file.close(resolve);
                });
            } else {
                fs.unlink(destPath, () => { }); // Delete the file async. (But we don't check for this)
                reject(new Error(`Failed to download: ${response.statusCode}`));
            }
        }).on('error', (err) => {
            fs.unlink(destPath, () => { });
            reject(err);
        });
    });
}


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

// Convert Rows Back to CSV String
function rowsToCSV(rows) {
    return rows.map(row => {
        return row.map(field => {
            if (field === null || field === undefined) return '';
            const needsQuotes = field.includes(',') || field.includes('"') || field.includes('\n') || field.includes('\r');
            if (needsQuotes) {
                return `"${field.replace(/"/g, '""')}"`;
            }
            return field;
        }).join(',');
    }).join('\n');
}


async function main() {
    console.log('Reading CSV file...');
    const csvContent = fs.readFileSync(csvFilePath, 'utf8');
    const rows = parseCSV(csvContent);

    if (rows.length === 0) {
        console.log('Empty CSV');
        return;
    }

    const header = rows[0];
    const nameIndex = header.findIndex(h => h.trim() === 'Name');
    const pictureIndex = header.findIndex(h => h.trim() === 'Picture on Website');

    if (nameIndex === -1 || pictureIndex === -1) {
        console.error('Could not find Name or Picture on Website columns');
        return;
    }

    console.log(`Found ${rows.length - 1} entries to process.`);

    for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        if (row.length <= pictureIndex) continue;

        const name = row[nameIndex].trim();
        const pictureUrl = row[pictureIndex].trim();

        if (!name || !pictureUrl) continue;

        // Skip if already a local path (checking if it starts with teams/)
        if (pictureUrl.startsWith('teams/')) {
            console.log(`Skipping ${name}, already local.`);
            continue;
        }

        const safeName = name.replace(/ /g, '_'); // Replace spaces with underscores
        const fileName = `${safeName}.jpg`;
        const localPath = path.join(publicTeamsDir, fileName);
        const relativePath = `teams/${fileName}`;

        console.log(`Downloading image for ${name} from ${pictureUrl}...`);

        try {
            await downloadImage(pictureUrl, localPath);
            console.log(`Saved to ${localPath}`);

            // Update the row
            row[pictureIndex] = relativePath;
        } catch (err) {
            console.error(`Error downloading for ${name}:`, err.message);
        }
    }

    console.log('Writing updated CSV...');
    const newCsvContent = rowsToCSV(rows);
    fs.writeFileSync(csvOutputPath, newCsvContent, 'utf8');
    console.log('Done.');
}

main().catch(console.error);
