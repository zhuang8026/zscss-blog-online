const jwt = require('jsonwebtoken');

// 生成令牌
function generateToken(user) {
  const payload = {
    userId: user.id,
    userName: user.userName,
    // 添加其他用户相关的数据，以供需要时使用
  };

  const expiresInHours = 8; // 过期时间为8小时
  const options = {
    expiresIn: expiresInHours * 3600, // 令牌过期时间，可以根据需求进行更改
  };

  return jwt.sign(payload, 'your-secret-key', options);
}

// 验证令牌
function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, 'your-secret-key');
    return decoded;
  } catch (error) {
    return null; // 令牌验证失败
  }
}

module.exports = { generateToken, verifyToken };
