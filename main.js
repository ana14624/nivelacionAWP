import Con, {
    addItem,
    Collection,
    getData,
    add_Cart
} from "./connection.js";
import products from "./products.js";
let buttons = document.querySelectorAll(".card-body .btn"); 
const count_cart = document.getElementById("count-cart"); 
const dbcart = Con("Cart", {
    Tcart: "++id,pname"
});
dbcart.open();
window.onload = () => {
    const card_title = Collection(".card-title");
    card_title.forEach((ele, index) => {
        ele.textContent = products[index].name;
    });
    const img = Collection(".card-img-top");
    img.forEach((ele, index) => {
        ele.src = products[index].src;
    });
    const price = Collection(".price");
    price.forEach((ele, index) => {
        ele.textContent = products[index].price;
    });
    let btndata = []; 
    buttons.forEach((element, index) => {
        btndata[index] = element.dataset.productName;
    });
    getData(dbcart.Tcart, value => { 
        btndata.forEach(data => { 
            if (data == value.pname) { 
                buttons.forEach(btn => { 
                    if (btn.dataset.productName == value.pname) { 
                        add_Cart(btn);
                    }
                })
            }
        })
    });
};
const databases = Dexie.getDatabaseNames();
databases.then(result => { 
    result.forEach(value => { 
        if (value === "Cart") { 
            dbcart.Tcart.count(value => { 
                if (value != 0) {
                    count_cart.textContent = value;
                    count_cart.classList.add("scale-cart");
                }
            });
        }
    });
});
buttons.forEach(ele => {
    ele.addEventListener("click", event => {
        const dataname = event.target.dataset.productName;
        addItem(dbcart.Tcart, [{
            pname: dataname
        }]);
        dbcart.Tcart.count(value => {
            count_cart.textContent = value;
            count_cart.classList.add("scale-cart");
        });
        add_Cart(event.target);
    });
});