const express = require('express');
const app = express();
const test = require('./routes/test');

app.use('/api', test);

const path = require('path');
/**dotenv 설정 */
const dotenv = require('dotenv');
dotenv.config({
  path: path.join(__dirname, '../.env'),
});

/**client와의 통신 */
const cors = require('cors');
app.use(
  cors({
    origin: ['http://35.174.208.128:3000', 'http://localhost:3000'],
    credentials: true,
  })
);

app.use(express.static(path.join(__dirname, 'public'))); // 요청시 기본 경로 설정
app.use(express.json()); // json 파싱, 유저가 보낸 데이터 출력하기 위해 필요
app.use(express.urlencoded({ extended: true })); // uri 파싱

// DB 연결 성공 여부
const { sequelize } = require('./model/index');
// 다른 require문은 일단 생략
const ConnectDB = async () => {
  try {
    await sequelize
      .authenticate()
      .then(() => console.log('데이터베이스 연결 성공!'));
    await sequelize.sync().then(() => console.log('동기화 완료!'));
  } catch (error) {
    console.error('DB 연결 및 동기화 실패', error);
  }
};
// DB와 연결 및 동기화
ConnectDB();

app.listen(process.env.PORT, () => {
  console.log(`server port ${process.env.PORT} open`);
});