/**
 * Represents the interface for a product item.
 * @interface
 */
export interface OrderedProductItemInterface {
  /**
   * The retailer ID of the product.
   */
  productRetailerId: string;
  /**
   * The price of the item.
   */
  itemPrice: string;
  /**
   * The currency of the item price.
   */
  currency: string;
  /**
   * The quantity of the item.
   */
  quantity: string;
}

/**
 * Represents the interface for an order.
 * @interface
 */
export interface OrderInterface {
  /**
   * The catalog ID of the order.
   * @type {string}
   */
  catalogId: string;
  /**
   * The text description of the order.
   * @type {string}
   */
  text: string;
  /**
   * The array of product items in the order.
   * @type {OrderedProductItemInterface[]}
   */
  productItems: OrderedProductItemInterface[];
  /**
   * Adds a product item to the order.
   * @param {OrderedProductItemInterface} product - The product item to add.
   * @returns {void}
   */
  addProductItem: (product: OrderedProductItemInterface) => void;
}
