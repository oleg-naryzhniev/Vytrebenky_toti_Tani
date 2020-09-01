const PRODUCTS_PAGE = 'Your products page';
const API_KEY = 'Your APIkey';

const getProducts = async () => {
    const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${PRODUCTS_PAGE}/values/Products!A2:E10000?majorDimension=ROWS&key=${API_KEY}`);
    const data = await response.json();
    const products = data.values.map((product, index) => {
        return {
            id: index + 1,
            heading: product[0],
            category: product[1],
            description: product[2],
            price: parseInt(product[3]),
            image: product[4]
        }
    });
    return products;
};

const getCategories = async () => {
    const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${PRODUCTS_PAGE}/values/Categories!A1:A10000?majorDimension=ROWS&key=${API_KEY}`);
    const data = await response.json();
    const categories = data.values.map((category, index) => {
        return {
            id: index + 1,
            name: category[0]
        }
    });
    return categories;
};

const sendOrderToTelegram = async (message = "empty") => {
    const response = await fetch("#", {
        method: "POST",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            apiKey: "secretKey",
            message
        })
    })
}

// const products = [{
//     id: 1001,
//     code: 100001,
//     image: './images/1.jpg',
//     heading: 'Олень новорічний',
//     category: 'New Year',
//     price: 500,
//     description: 'Новорічний сувенір "Олень" зі шпагату. За бажанням його можна прикрасити і посипати блистками, після чого використовувати в якості оригінального подарунка друзям і колегам. Висота , ширина .'
// }, {
//     id: 1002,
//     code: 200001,
//     image: './images/2.jpg',
//     heading: 'Пасхальна підставка',
//     category: 'Easter',
//     price: 300,
//     description: 'Розмістити крашанки на святковому столі допоможе практична підставка з шпагату, яка стане ідеальною прикрасою у це Світле свято. Підставка виготовлена ​​з шпагату найвищої якості. На підставці можна розмістити 6 яєць, а також головний атрибут Великодня - паска (пасочки).\n' +
//         'Розмір підставки 220 * 220 * 130 мм.'
// }, {
//     id: 1003,
//     code: 300001,
//     image: './images/3.jpg',
//     heading: 'Мишка у червоному',
//     category: 'Mice',
//     price: 250,
//     description: 'Це чарівне звірятко легко пробудить найніжніші почуття в будь-якої людини, і вже тим більше в маленькій дитині.'
// }];
