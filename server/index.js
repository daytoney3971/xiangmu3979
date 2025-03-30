const express = require('express');
const cors = require('cors');
const cloudinary = require('./config/cloudinary');
const multer = require('multer');
const path = require('path');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// 配置文件存储
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: multer.memoryStorage() });  // 修改为内存存储

// 上传接口
app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString('base64');
    const dataURI = "data:" + req.file.mimetype + ";base64," + b64;
    
    const result = await cloudinary.uploader.upload(dataURI, {
      resource_type: 'auto'
    });
    
    console.log('上传成功：', result.secure_url);
    
    res.json({
      url: result.secure_url
    });
  } catch (error) {
    console.error('上传失败：', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});