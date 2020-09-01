

const state = {
    category: 'all',
    from: 0,
    to: 1e10,
    name: '',
    phone: '',
    email: ''
};

const filterProducts = (state, products) => {
    return products.filter((product) => {
        if (state.category === 'all'){
            return true;
        }
        return product.category === state.category;
    }).filter((product) => {
        return product.price >= state.from
    }).filter((product) => {
        return product.price <= state.to
    });
};

const onClickProductToCart = function(products){
    const productId = +this.dataset.id;
    const product = products.find((product) => {
        return product.id === productId;
    });
    const cartProducts = JSON.parse(localStorage.getItem("cartProducts") || '[]');
    const isInCart = cartProducts.find((product) => product.id === productId);
    if(isInCart){
        isInCart.count++;
    } else {
        cartProducts.push({
            name: product.heading,
            count: 1,
            price: product.price,
            id: product.id
        });
    }
    localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
    renderCart()
}

const renderProducts = (productsContainer, products) =>{
    productsContainer.innerHTML = "";
    if (products.length) {
        products.forEach((product) => {
            productsContainer.innerHTML += markup.product(product);
        });
    } else {
        productsContainer.innerHTML += markup.emptyProducts();
    }
    const productOpenFullButtons = document.querySelectorAll(".product-open-full")
    productOpenFullButtons.forEach((openFull) => {
        openFull.addEventListener("click", function (event) {
            const productFull = document.querySelector(".product-full");
            const productId = +this.dataset.id;
            const product = products.find((product) => {
                return product.id === productId;
            });
            productFull.innerHTML = markup.productFull(product);
            productFull.classList.add("product-full__visible");
            const productFullClose = document.querySelector(".product-close");
            const productToCart = document.querySelector(".product-full .product-to-cart");
            productFullClose.addEventListener("click", function (event) {
                productFull.classList.remove("product-full__visible");
                productFull.innerHTML = '';
            })
            productToCart.addEventListener("click", onClickProductToCart.bind(productToCart, products))
        })
    })

    const productToCartButtons = document.querySelectorAll(".product-to-cart");
    productToCartButtons.forEach((productToCart) =>{
        productToCart.addEventListener("click", onClickProductToCart.bind(productToCart, products));
    })
};


const closeCart = () => {
    const clickHandler = (event) => {
        if(!state.cartVisible) return;
        if(event.path.includes(cart)){
            event.stopPropagation();
            event.preventDefault();
            return false;
        }
        state.cartVisible = false;
        renderCart();
    }
    document.body.removeEventListener('click', clickHandler);
    document.body.addEventListener("click", clickHandler);
};

const filtersHandlers = (products) => {
    const categorySelector = document.querySelector("#category-select");
    const priceFrom = document.querySelector('#price-from');
    const priceTo = document.querySelector('#price-to');

    const changeCategory = function(event){
        state.category = this.value;
        const productsToFilter = filterProducts(state, products);
        renderProducts(productsContainer, productsToFilter);
    }
    const priceFromHandler = (event) => {
        const {value} = event.target;
        state.from = isNaN(+value) ? 1 : +value;
        const productsToFilter = filterProducts(state, products);
        renderProducts(productsContainer, productsToFilter);
    }
    const priceToHandler = (event) => {
        const {value} = event.target;
        state.to = isNaN(+value) || +value === 0 ? 1e10: +value;
        const productsToFilter = filterProducts(state, products);
        renderProducts(productsContainer, productsToFilter);
    }

    categorySelector.removeEventListener("change", changeCategory);
    categorySelector.addEventListener("change", changeCategory);

    priceFrom.removeEventListener("change", priceFromHandler);
    priceFrom.addEventListener("change", priceFromHandler);

    priceTo.removeEventListener("change", priceToHandler);
    priceTo.addEventListener("change", priceToHandler);
}

const handleChangeMakeOrderPopup = () => {
    const phone = document.querySelector(".make-order-phone");
    const name = document.querySelector(".make-order-name");
    const email = document.querySelector(".make-order-email");
    phone.addEventListener("change", function () {
        state.phone = this.value;
    });
    name.addEventListener("change", function () {
        state.name = this.value;
    });
    email.addEventListener("change", function () {
        state.email = this.value;
    });
}

const handleMakeOrderPopupEvents = ({onAccept, onClose}) => {
    const acceptButton = document.querySelector(".accept-button");
    const close = document.querySelector(".close-popup");

    close.removeEventListener("click", onClose);
    close.addEventListener("click", onClose);

    acceptButton.removeEventListener("click", onAccept);
    acceptButton.addEventListener("click", onAccept);
}

const renderCart = () => {
    const cartProducts = JSON.parse(localStorage.getItem("cartProducts") || '[]');
    cart.innerHTML = "";
    cart.innerHTML = markup.cart(cartProducts, state.cartVisible);
    const cartIconWrapper = document.querySelector(".cart-icon-wrapper");
    const cartInfo = document.querySelector(".cart-info");
    const makeOrder = document.querySelector(".make-order")
    const cartProductCountInput = document.querySelectorAll(".cart-product-count-input");
    const cartProductDeleteButtons = document.querySelectorAll(".cart-product-delete");
    const makeOrderPopup = document.querySelector(".make-order-popup");
    if(makeOrder){
        makeOrder.addEventListener("click", () =>{
            makeOrderPopup.classList.add("make-order-popup__visible");
            cartInfo.classList.toggle('cart-info__visible');
            state.cartVisible = !state.cartVisible;
            handleMakeOrderPopupEvents({
                onAccept: async () => {
                    await sendOrderToTelegram(
                        `Нове замовлення №${Date.now()} \nІм'я: <b>${state.name}</b> \nТелефон: ${state.phone} \nEmail: ${state.email} \nТовари: ${cartProducts.map((product) => `${product.name}, ${product.count} шт, ${product.price} грн.`)} \nЗагальна сума замовлення: <b>${cartProducts.reduce((total, product) => {return total + (product.count * product.price)}, 0).toString()}</b> грн.`);
                },
                onClose: () => {
                    makeOrderPopup.classList.remove("make-order-popup__visible");
                }
            });
        })
    }
    cartIconWrapper.addEventListener('click', () => {
        cartInfo.classList.toggle('cart-info__visible');
        state.cartVisible = !state.cartVisible;
    });
    cartProductCountInput.forEach(input => {
        input.addEventListener("change", function(){
            const productId = +this.dataset.id;
            const value = +this.value;
            let cartProducts = JSON.parse(localStorage.getItem("cartProducts") || "[]");
            const product = cartProducts.find((product) => product.id === productId);
            if(value > 0){
                product.count = value;
            }
            if(value <= 0){
                cartProducts = cartProducts.filter((product) => {
                    return product.id !== productId
                });
            }
            localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
            renderCart();
        });
        cartProductDeleteButtons.forEach((cartButtonDelete) => {
            cartButtonDelete.addEventListener("click", function(){
                const productId = +this.dataset.id;
                let cartProducts = JSON.parse(localStorage.getItem("cartProducts") || "[]");
                cartProducts = cartProducts.filter((product) => {
                    return product.id !== productId
                });
                localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
                renderCart();
            });
        });
    });
}

const renderCategoriesFilter = (categoriesFilterContainer, categories) => {
    categoriesFilterContainer.innerHTML = markup.categoriesFilter(categories);

};

const productsContainer = document.querySelector(".products");
const cart = document.querySelector(".cart");
const categoriesFilter = document.querySelector("#category-filter");

(async () => {
    const products = await getProducts();
    const categories = await getCategories();
    renderCategoriesFilter(categoriesFilter, categories);
    renderProducts(productsContainer, products);
    renderCart();
    closeCart();
    handleChangeMakeOrderPopup();
    filtersHandlers(products);

})();


