const express = require('express');
const cors = require('cors');
const cloudinary = require('./config/cloudinary');
const multer = require('multer');
const path = require('path');

const app = express();
const port = process.env.PORT || 3002;  // 修改端口为3002

// 添加静态文件服务
app.use(express.static(path.join(__dirname, 'public')));

// 配置 CORS
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

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

// 修改上传接口配置
app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString('base64');
    const dataURI = "data:" + req.file.mimetype + ";base64," + b64;
    
    const result = await cloudinary.uploader.upload(dataURI, {
      resource_type: 'auto',
      cors: 'auto',
      access_mode: 'public',
      secure: true,         // 确保使用 HTTPS
      format: 'auto',       // 自动优化格式
      quality: 'auto',      // 自动优化质量
      fetch_format: 'auto'  // 自动选择最佳格式
    });
    
    console.log('上传成功：', result.secure_url);
    
    res.json({
      url: result.secure_url,  // 使用 secure_url 确保 HTTPS
      publicId: result.public_id
    });
  } catch (error) {
    console.error('上传失败：', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});