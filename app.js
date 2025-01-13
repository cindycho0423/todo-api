import express from 'express';
import tasks from './data/mock.js';
import subscriptions from './data/subscriptions.js';

const app = express();

// hello request가 들어오면, 콜백 함수를 실행하라는 뜻
// 첫 번째 파라미터: url 경로
// 두 번째 파라미터: 실행할 콜백 함수
// app.get('/tasks', (req, res) => {
//   res.send(tasks); // response의 send 메소드 사용하여 내용을 작성하면 돌려줄 수 있다.
// });

// app.get('/subscriptions', (req, res) => {
//   res.send(subscriptions); // response의 send 메소드 사용하여 내용을 작성하면 돌려줄 수 있다.
// });

app.get('/subscriptions', (req, res) => {
  const sort = req.query.sort;

  const compareFn = sort === 'price' ? (a, b) => b.price - a.price : (a, b) => a.createdAt - b.createdAt;

  let newTasks = subscriptions.sort(compareFn);

  res.send(newTasks);
});

// app.get('/tasks', (req, res) => {
//   /**
//    * 쿼리 파라미터
//    * - sort: 'oldest'인 경우 오래된 태스크 기준, 나머지 경우 새로운 태스크 기준
//    * - count: 태스크 개수
//    */

//   const sort = req.query.sort;
//   const count = Number(req.query.count);

//   const compareFn = sort === 'oldest' ? (a, b) => a.createdAt - b.createdAt : (a, b) => b.createdAt - a.createdAt;

//   let newTasks = tasks.sort(compareFn);

//   if (count) {
//     newTasks = newTasks.slice(0, count);
//   }
//   res.send(newTasks);
// });

// :id와 같은 URL 파라미터는 req.params라는 객체에 저장
app.get('/tasks/:id', (req, res) => {
  // 파라미터 값은 항상 문자열인데 Subscription 객체의 id 필드와 비교하기 위해서 숫자형으로 바꿔줌.
  const id = Number(req.params.id);
  // tasks 배열에서 id 값을 가지고 있는 요소를 찾아서 리스폰스로 돌려주면됨.
  const task = tasks.find(task => task.id === id);
  if (task) {
    res.send(task);
  } else {
    // id에 해당하는 객체가 없는 경우 404 상태 코드와 오류 메시지를 담은 JSON을 돌려줌.
    res.status(404).send({ message: 'Cannot find given id.' });
  }
});

app.listen(3000, () => console.log('Server Started'));
