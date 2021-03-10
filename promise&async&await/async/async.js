// async & await
// clear style of using promise :)

//1. 그냥 promise를 사용했을 때
function fetchUser() {
    return new Promise((resolve, reject) => {
        resolve('ellie');
    })
}

const user = fetchUser();
user.then(console.log);

//2. async 사용 시
async function fetchUser() {
    return 'ellie';
}

const user1 = fetchUser();
user1.then(console.log);

//3. await
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function getApple() {
    await delay(2000);
    return 'apple';
}

async function getBanana() {
    await delay(1000);
    return 'banana';
}

//콜백 지옥이 떠오르는 코드
function pickFruits() {
    return getApple().then(apple => {
        return getBanana().then(banana => `${apple} + ${banana}`);
    });
}

pickFruits().then(console.log);

//await을 사용해 보자
async function pickFruits() {
    const applePromise = getApple();
    const bananaPromise = getBanana();
    const apple = await getApple();
    const banana = await getBanana();
    return `${apple} + ${banana}`;
}

pickFruits().then(console.log);
xw
//4. useful Promise APIs
//배열의 프로미스를 모두 실행해서 배열로 값을 반환한다.
function pickAllFruits() {
    return Promise.all([getApple(), getBanana()])
    .then(fruits => fruits.join(' + '));
}

pickAllFruits().then(console.log);

//가장 먼저 값을 반환하는 함수의 값만 전달된다.
function pickOnlyOne() {
    return Promise.race([getApple(), getBanana()]);
}

pickOnlyOne().then(console.log);