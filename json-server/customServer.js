const express = require('express');
const multer = require('multer');
const cors = require('cors');

const upload = multer();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/upload', upload.single('file'), (req, res) => {
    const { file } = req;
    const userData = JSON.parse(req.body.userData);

    console.log('File:', file);
    console.log('User data:', userData);

    return res.send('File uploaded successfully');
});

app.listen(4000, () => console.log('Server started on port 4000'));
