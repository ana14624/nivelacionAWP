const Con = (dbname, tables) => {
  const db = new Dexie(dbname);
  db.version(1).stores(tables);
  console.log(`${dbname} Database is Created...!`);
  return db;
};

const addItem = (dbname, items) => {
  dbname.bulkPut(items);
  console.log(`Data Inserted successfully...!`);
};

const Collection = element => {
  let item = document.querySelectorAll(element);
  return item;
};

const getData = (dbname, fn) => {
  let index = 0;
  dbname.each((table) => {
    fn(table, index++); 
  });
};

const add_Cart = button => {
  button.disabled = true; 
  button.value = ""; 
  button.textContent = "Agregado"; 
  console.log("Added in the Cart");
};


export default Con;
export {
  addItem,
  Collection,
  getData,
  add_Cart
};