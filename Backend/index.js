const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const port = 3000; 

app.use(cors());


app.use(express.static(path.join(__dirname, 'public')));


const mongoURI = 'mongodb://localhost:27017/photogallery'; 

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));


const imageSchema = new mongoose.Schema({
    category: String,
    url: String
});


const Image = mongoose.model('Image', imageSchema);


app.get('/api/images', async (req, res) => {
    const category = req.query.category;
    
    try {
        const images = await Image.find({ category });
        if (images.length > 0) {
            res.json(images);
        } else {
            res.status(404).json({ message: 'Category not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching images', error });
    }
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
