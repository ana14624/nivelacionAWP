import createElement from "./cartUI.js";
import Con, {
  getData
} from "./connection.js";
import products from "./products.js";

const container = document.querySelector(".container");
const wrapper = document.querySelector(".appendTo");
const removemsg = document.querySelector(".removemsg");

const dbcart = Con("Cart", {
  Tcart: "++id,pname"
});

getData(dbcart.Tcart, (values) => {
  products.forEach(element => {
    if (values.pname == element.name) {
      cardElements(element.src, element.name, element.price, (btn) => {
        btn.addEventListener("click", event => {
          let itemName = event.target.dataset.itemName;
          dbcart.Tcart.get({
            pname: itemName
          }, (item) => {
            dbcart.Tcart.delete(item.id);
            removemsg.className += " addmsg";
            setTimeout(() => {
              location.reload()
            }, 4000);
          });
        })
      });
    }
  });
});


createElement("button", "btn btn-danger float-right clearAll px-5", container, clear => {
  clear.textContent = "Eliminar todo";
  clear.addEventListener("click", (event) => {
    dbcart.delete().then(() => {
      console.log("Database successfully deleted");
      dbcart.close();
      location.reload();
    }).catch((err) => {
      console.error("Could not delete database");
    })
  });
});


function cardElements(imgsrc, itemname, price, fn) {
  createElement("div", "card m-3", wrapper, cartdiv => {
    createElement("div", "row first-row no-gutters", cartdiv, row => {
      createElement("div", "col-md-4", row, col_md_4 => {
        createElement("img", "card-img-top", col_md_4, img => {
          img.src = imgsrc;
        });
        createElement("div", "col-md-8", row, col_md_8 => {
          createElement("div", "row", col_md_8, newRow => {
            createElement("div", "col-md-8", newRow, innercol8 => {
              createElement("div", "card-body", innercol8, cartbody => {
                createElement("h5", "card-title", cartbody, h5 => {
                  h5.textContent = itemname;
                });
                createElement(
                  "p",
                  "card-text text-secondary m-0",
                  cartbody,
                  p => {
                    p.textContent = "Vendedor: UTXJ";
                  }
                );
                createElement("h5", "py-2", cartbody, h5 => {
                  h5.textContent = price;
                });
              });
            });
            createElement(
              "div",
              "col-md-4 col-sm-12 py-1",
              newRow,
              innercol4 => {
                createElement("button", "btn btn-danger remove", innercol4, btn2 => {
                  btn2.setAttribute("data-item-name", itemname);
                  btn2.textContent = "Eliminar";
                  fn(btn2);
                });
              }
            );
          });
        });
      });
    });
  });
  return true;
}