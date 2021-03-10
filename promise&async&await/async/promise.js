'use stricrt';

//1. Producer
//비동기적으로 수행하고 싶은 코드를 여기에 작성한다.
//그리고, resolve, reject를 통해 값을 내보낸다.
const promise = new Promise((resolve, reject) => {
    //doing some heavy work (network, read files)
    console.log('doing something...');
    setTimeout(() => {
        //resolve('ellie');
        reject(new Error('no network'));
    }, 2000);
});

//2. Consumers: then, catch, finally를 이용해서 값을 받아온다.
//value에는 resolve에서 전달된 값이 들어온다.
//then은 다시 프로미스를 반환한다. 
//따라서, 리턴된 프로미스에 catch를 등록한 것이다.
promise
    .then((value) => {
        console.log(value);
    })
    .catch(error => {
        console.log(error);
    })
    // finally: 성공, 실패와 관련없이 무조건 호출되는 것.
    .finally(() => {
        console.log('finally');
    });

//3. Promise chaning
const fetchNumber = new Promise((resolve, reject) => {
    setTimeout(() => resolve(1), 1000);
});

fetchNumber
    .then(num => num * 2)
    .then(num => num * 3)
    //then은 값을 전달할 수도 있고, 프로미스를 전달할 수도 있다.
    .then(num => {
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(num - 1), 1000);
        });
    })
    .then (num => console.log(num));


//4. Error Handling
const getHen = () =>
    new Promise((resolve, reject) => {
        setTimeout(() => resolve('닭'), 1000);
    });
const getEgg = hen =>
    new Promise((resolve, reject) => {
        setTimeout(() => resolve(`${hen} => 달걀`), 1000);
    });
const cook = egg =>
    new Promise((resolve, reject) => {
        setTimeout(() => resolve(`${egg} => 후라이`), 1000);
    });

getHen()
.then(hen => getEgg(hen))
//.then(getEgg(hen)) 과 같다.
//.then(getEgg) 와도 같다.
.then(egg => cook(egg))
.then(meal => console.log(meal));

