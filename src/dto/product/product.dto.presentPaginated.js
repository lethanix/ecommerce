export default class ProductDtoPresentPaginated {
    products;

    constructor(paginated) {
        // Convert to JSON object instead of having a mongoose object
        // TODO: implement this with lean function in the query
        this.products = JSON.parse(JSON.stringify(paginated.docs));
    }

}