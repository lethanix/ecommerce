export class CartFsRepository {
  #filepath;
  #BASEPATH = "./shared/files/";

  constructor(filename) {
    if (!filename) {
      throw new Error("Unable to create file repo")
    }
  }
  createCart() {}
  getCart() {}
  updateCart() {}
  deleteCart() {}
}
