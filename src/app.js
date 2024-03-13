import express from "express";
import manager from "./productManager.js";
const app = express();
const PUERTO = 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send(`<h1>Supermercados Lider</h1>`);
});
app.get("/products", (req, res) => {
  const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
  let productsToSend = manager.products;
  if (limit !== undefined) {
    productsToSend = manager.products.slice(0, limit);
  }
  res.send(productsToSend);
});
app.get("/products/:id", (req, res) => {
  const { id } = req.params;
  const buscaid = manager.products.find((prod) => prod.id == id);
  if (buscaid) {
    res.send(buscaid);
  } else {
    res.send("No se encontro el producto");
  }
});
app.listen(PUERTO, () => {
  console.log(`Servidor escuchando en el puerto ${PUERTO}`);
});
