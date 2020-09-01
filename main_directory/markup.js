const markup = {
    emptyProducts(){
        return `<div class="products-empty">Вироби не знайдені.</div>`
    },
    product: ({heading, price, description, image, id}) =>{
        return `
        <div class="product-wrapper product-wrapper__grid">
            <div class="product-open-full" data-id="${id}">
                <div class="product-image-wrapper" style="background-image: url('${image}')">
                </div>
                <!-- <img src="./images/1.jpg" alt="product 1" class="product-image">   картинка товара №1 -->
                <h3 class="product-heading">
                    ${heading}
                </h3>
                <div class="product-price">
                ${price} грн.
                </div>
            </div>
            <div class="product-description product-description__hide-text">
                ${description}
            </div>
            <button class="product-to-cart" data-id="${id}">
                <!-- иконка корзины -->
                <svg class="product-to-cart-image" height="512" viewBox="0 0 128 128" width="512" xmlns="http://www.w3.org/2000/svg">
                    <g>
                        <path class="cart-path" d="m11.207 31.485h105.586v90.209h-105.586z" fill="#f2da30"/>
                        <path class="cart-path" d="m6.306 6.306h115.387v25.179h-115.387z" fill="#3ea2e5"/>
                        <circle class  =cart-path cx="64" cy="76.589" fill="#dfeef4" r="32.298"/>
                        <path class="cart-path" d="m68.954 80.658v-22.131h-9.908v22.131h-9.039l13.993 13.993 13.993-13.993z" fill="#3ea2e5"/>
                        <g>
                            <path d="m25.984 8.057h4.473a1.75 1.75 0 0 0 0-3.5h-4.473a1.75 1.75 0 0 0 0 3.5z"/>
                            <path d="m121.693 4.557h-82.579a1.75 1.75 0 0 0 0 3.5h80.829v21.678h-111.886v-21.678h9.69a1.75 1.75 0 0 0 0-3.5h-11.44a1.749 1.749 0 0 0 -1.75 1.75v25.178a1.749 1.749 0 0 0 1.75 1.75h3.15v88.458a1.75 1.75 0 0 0 1.75 1.75h105.586a1.75 1.75 0 0 0 1.75-1.75v-14.918a1.75 1.75 0 0 0 -3.5 0v13.168h-102.086v-86.708h102.086v65.865a1.75 1.75 0 1 0 3.5 0v-65.865h3.15a1.749 1.749 0 0 0 1.75-1.75v-25.178a1.749 1.749 0 0 0 -1.75-1.75z"/>
                            <path d="m94.477 16.1a1.75 1.75 0 0 0 0-3.5h-2.765a1.75 1.75 0 0 0 0 3.5z"/>
                            <path d="m112.066 16.1a1.75 1.75 0 0 0 0-3.5h-10.691a1.75 1.75 0 0 0 0 3.5z"/>
                            <path d="m29.952 76.589a34.048 34.048 0 1 0 34.048-34.048 34.087 34.087 0 0 0 -34.048 34.048zm64.6 0a30.548 30.548 0 1 1 -30.552-30.548 30.583 30.583 0 0 1 30.548 30.548z"/>
                            <path d="m57.3 58.527v20.381h-7.293a1.75 1.75 0 0 0 -1.237 2.992l13.993 13.989a1.75 1.75 0 0 0 2.474 0l13.993-13.989a1.75 1.75 0 0 0 -1.237-2.988h-7.293v-20.385a1.751 1.751 0 0 0 -1.75-1.75h-9.904a1.751 1.751 0 0 0 -1.746 1.75zm3.5 22.131v-20.381h6.4v20.381a1.749 1.749 0 0 0 1.75 1.75h4.814l-9.764 9.769-9.768-9.769h4.814a1.749 1.749 0 0 0 1.754-1.75z"/>
                        </g>
                    </g>
                </svg>
                До кошику
            </button>
        </div>
`
    },
    productFull: (product) => {
        return `
        <div class="product-wrapper product-wrapper__full">
            <div class="product-close">X</div>
            <div class="product-view">
                <div class="product-image-wrapper" style="background-image: url('${product.image}')">
                </div>
            </div>
            <div class="product-info">
                <!-- <img src="./images/1.jpg" alt="product 1" class="product-image">   картинка товара №1 -->
                <h3 class="product-heading">
                    ${product.heading} - ${product.category}
                </h3>
                <div class="product-price">
                    ${product.price} грн.
                </div>
                <div class="product-description">
                    ${product.description}
                </div>
                <button class="product-to-cart" data-id="${product.id}">
                    <!-- иконка корзины -->
                    <svg class="product-to-cart-image" height="512" viewBox="0 0 128 128" width="512" xmlns="http://www.w3.org/2000/svg">
                        <g>
                            <path class="cart-path" d="m11.207 31.485h105.586v90.209h-105.586z" fill="#f2da30"/>
                            <path class="cart-path" d="m6.306 6.306h115.387v25.179h-115.387z" fill="#3ea2e5"/>
                            <circle class  =cart-path cx="64" cy="76.589" fill="#dfeef4" r="32.298"/>
                            <path class="cart-path" d="m68.954 80.658v-22.131h-9.908v22.131h-9.039l13.993 13.993 13.993-13.993z" fill="#3ea2e5"/>
                            <g>
                                <path d="m25.984 8.057h4.473a1.75 1.75 0 0 0 0-3.5h-4.473a1.75 1.75 0 0 0 0 3.5z"/>
                                <path d="m121.693 4.557h-82.579a1.75 1.75 0 0 0 0 3.5h80.829v21.678h-111.886v-21.678h9.69a1.75 1.75 0 0 0 0-3.5h-11.44a1.749 1.749 0 0 0 -1.75 1.75v25.178a1.749 1.749 0 0 0 1.75 1.75h3.15v88.458a1.75 1.75 0 0 0 1.75 1.75h105.586a1.75 1.75 0 0 0 1.75-1.75v-14.918a1.75 1.75 0 0 0 -3.5 0v13.168h-102.086v-86.708h102.086v65.865a1.75 1.75 0 1 0 3.5 0v-65.865h3.15a1.749 1.749 0 0 0 1.75-1.75v-25.178a1.749 1.749 0 0 0 -1.75-1.75z"/>
                                <path d="m94.477 16.1a1.75 1.75 0 0 0 0-3.5h-2.765a1.75 1.75 0 0 0 0 3.5z"/>
                                <path d="m112.066 16.1a1.75 1.75 0 0 0 0-3.5h-10.691a1.75 1.75 0 0 0 0 3.5z"/>
                                <path d="m29.952 76.589a34.048 34.048 0 1 0 34.048-34.048 34.087 34.087 0 0 0 -34.048 34.048zm64.6 0a30.548 30.548 0 1 1 -30.552-30.548 30.583 30.583 0 0 1 30.548 30.548z"/>
                                <path d="m57.3 58.527v20.381h-7.293a1.75 1.75 0 0 0 -1.237 2.992l13.993 13.989a1.75 1.75 0 0 0 2.474 0l13.993-13.989a1.75 1.75 0 0 0 -1.237-2.988h-7.293v-20.385a1.751 1.751 0 0 0 -1.75-1.75h-9.904a1.751 1.751 0 0 0 -1.746 1.75zm3.5 22.131v-20.381h6.4v20.381a1.749 1.749 0 0 0 1.75 1.75h4.814l-9.764 9.769-9.768-9.769h4.814a1.749 1.749 0 0 0 1.754-1.75z"/>
                            </g>
                        </g>
                    </svg>
                    До кошику
                </button>
            </div>
        </div>
        `
},
    cart: (cartProducts, cartVisible = false) => {
        return `
            <div class="cart-icon-wrapper">
                <div class="count">${cartProducts?.reduce((count, product) => count + product.count, 0) || 0}</div>
                <img class="cart-icon" src="./images/add-to-cart-icon.svg">
            </div>
            <div class="cart-info ${cartVisible ? 'cart-info__visible' : ''}">
                ${cartProducts?.length ? `
                    <table class="cart-products">
                        ${cartProducts?.length && cartProducts?.map((product) => {
                            return `
                            <tr>
                                <td class="cart-product-name">${product.name}</td>
                                <td class="cart-product-price">${product.price} грн.</td>
                                <td class="cart-product-count">
                                    <input type="number" 
                                           name="count" 
                                           class="cart-product-count-input" 
                                           value="${product.count}"
                                           data-id="${product.id}"       
                                    />
                                </td>
                                <td data-id="${product.id}" 
                                    class="cart-product-delete">
                                    X
                                </td>
                            </tr>
                            `;
                        }).join("")}
                        <tr>
                            <td class="cart-product-count-sum">
                                Загальна сума замовлення: 
                            </td>
                            <td class="cart-product-count-sum">
                                ${cartProducts.reduce((total, product) => {return total + (product.count * product.price)}, 0).toString()} грн.
                            </td>
                        </tr>
                    </table>
                    <button class="make-order">Оформити замовлення</button>
                ` : `
                    <div class="cart-empty">Кошик порожній.</div>
                `}
                
            </div>
        `;
    },
    categoriesFilter: (categories) => {
        return `
            <select name="category" id="category-select" class="categories">
                <option value="all">Усе</option>
                ${categories?.length && categories?.map((category) => {
                        return `
                            <option value="${category.name}">${category.name}</option>
                        `;
                }).join("")}
            </select>
        `;
    }
}