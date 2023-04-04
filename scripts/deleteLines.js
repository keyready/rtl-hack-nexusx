const fs = require('fs');
const path = require('path');

function replaceTStrings(dirPath) {
    const files = fs.readdirSync(dirPath);

    files.forEach((file) => {
        const fullPath = path.join(dirPath, file);
        if (fs.statSync(fullPath).isDirectory()) {
            replaceTStrings(fullPath);
        } else if (path.extname(fullPath) === '.tsx' || path.extname(fullPath) === '.jsx') {
            let fileData = fs.readFileSync(fullPath, 'utf8');
            fileData = fileData.replace(/{t\('([^']*)'\)}/g, "{'$1'}");
            fs.writeFileSync(fullPath, fileData, 'utf8');
        }
    });
}

replaceTStrings('../src');
