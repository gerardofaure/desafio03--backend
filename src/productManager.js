import fs from "fs";
class ProductManager {
  constructor() {
    this.products = [];
    this.path = "../products.json";
  }
  static id = 0;
  async addProduct(title, description, price, thumbnail, code, stock) {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.log("Por favor, rellene todos los campos");
      return;
    }
    if (this.products.some((product) => product.code === code)) {
      console.log(`El codigo ${code} del producto ingresado ya existe`);
      return;
    }
    this.products.push({
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      id: ++ProductManager.id,
    });
    await fs.promises.writeFile(
      this.path,
      JSON.stringify(this.products, null, 2)
    );
  }
  async deleteProduct(id) {
    const productIndex = this.products.findIndex((p) => p.id === id);
    if (productIndex !== -1) {
      this.products.splice(productIndex, 1);
      try {
        // Limpiar el archivo
        await fs.promises.truncate(this.path, 0);
        // Escribir la lista actualizada de productos en el archivo
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(this.products, null, 2)
        );
      } catch (error) {
        console.error("Error al escribir en el archivo:", error);
      }
    } else {
      console.log(`Error: El producto con ID ${id} no existe.`);
    }
  }
  async updateProduct(
    id,
    { title, description, price, thumbnail, code, stock }
  ) {
    const productIndex = this.products.findIndex((p) => p.id === id);
    if (productIndex !== -1) {
      this.products[productIndex] = {
        ...this.products[productIndex],
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };
    }
  }
  async getProducts() {
    return this.products;
  }
  async getProductById(id) {
    if (this.products.find((product) => product.id === id)) {
      return this.products.find((product) => product.id === id);
    } else {
      return "Not found";
    }
  }
}
//Agregando 10 productos a la lista.
const manager = new ProductManager();
manager.addProduct("Arroz","Arroz paquete 1 kilo",1200,"001.jpg","arroz123",35);
manager.addProduct("Vino","Vino delicioso", 7500, "002.jpg", "vino123", 30);
manager.addProduct("Papas","Papas de la mejor calidad",850,"003.jpg","papas123",40);
manager.addProduct("Azúcar","Azucar natural envase 1 kilo",1150,"004.jpg","azucar123",35);
manager.addProduct("Galleta","Galleta chip de chocolate",990,"005.jpg","galleta123",35);
manager.addProduct("Gaseosa","Coca-Cola 1.5 lt",1800,"006.jpg","gaseosa123",30);
manager.addProduct("Detergente","Skipo 400 gr",4300,"007.jpg","detergente123",40);
manager.addProduct("Jabon","Copito 180 gr",890, "008.jpg","jabon123",35);
manager.addProduct("Sal","Sal gruesa 1 kilo",650,"009.jpg","sal123",35);
manager.addProduct("Aceite","Oliva extra virgen",3200,"010.jpg","aceite123",30);
export default manager;
