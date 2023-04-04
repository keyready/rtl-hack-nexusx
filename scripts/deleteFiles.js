const fs = require('fs');
const path = require('path');

function deleteFiles(dirPath, fileSuffix) {
    // Получаем список файлов и папок в текущей директории
    const files = fs.readdirSync(dirPath);

    // Проходимся по всем элементам в директории
    for (const file of files) {
        const filePath = path.join(dirPath, file);
        const isDirectory = fs.statSync(filePath).isDirectory();

        if (isDirectory) {
            // Если это папка, рекурсивно вызываем эту же функцию для нее
            deleteFiles(filePath, fileSuffix);
        } else if (file.endsWith(fileSuffix)) {
            // Если это файл с нужным суффиксом, то удаляем его
            fs.unlinkSync(filePath);
            console.log(`File ${filePath} was successfully deleted!`);
        }
    }
}

// Вызываем функцию для текущей директории и файлов с суффиксом '.stories.tsx'
deleteFiles('../', '.test.tsx');
