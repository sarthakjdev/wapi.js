import {
  type OrderedProductItemInterface as OrderedProductItemInterface,
  type OrderInterface,
} from "./interface";

/**
 * Represents an order.
 * @class
 * @implements {OrderInterface}
 */
export class Order implements OrderInterface {
  catalogId: string;
  productItems: OrderedProductItem[];
  text: string;

  /**
   * Creates a new Order instance.
   * @param {Object} params - The parameters for creating an Order.
   * @param {string} params.catalogId - The catalog ID of the order.
   * @param {OrderedProductItem[]} params.productItems - The product items in the order.
   * @param {string} params.text - The text associated with the order.
   */
  constructor(params: {
    catalogId: string;
    productItems: OrderedProductItem[];
    text: string;
  }) {
    this.productItems = params.productItems;
    this.catalogId = params.catalogId;
    this.text = params.text;
  }

  /**
   * Adds a product item to the order.
   * @param {OrderedProductItem} product - The product item to add.
   */
  addProductItem(product: OrderedProductItem) {
    this.productItems.push(product);
  }
}

/**
 * Represents a product item.
 * @class
 * @implements {OrderedProductItemInterface}
 */
export class OrderedProductItem implements OrderedProductItemInterface {
  currency: string;
  itemPrice: string;
  productRetailerId: string;
  quantity: string;

  /**
   * Creates a new ProductItem instance.
   * @param {Object} params - The parameters for creating a ProductItem.
   * @param {string} params.currency - The currency of the product item.
   * @param {string} params.itemPrice - The price of the product item.
   * @param {string} params.productRetailerId - The retailer ID of the product item.
   * @param {string} params.quantity - The quantity of the product item.
   */
  constructor(params: {
    currency: string;
    itemPrice: string;
    productRetailerId: string;
    quantity: string;
  }) {
    this.currency = params.currency;
    this.itemPrice = params.itemPrice;
    this.productRetailerId = params.productRetailerId;
    this.quantity = params.quantity;
  }
}
