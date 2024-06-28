import { type InteractiveMessageInterface } from "../interaction/interface";
import type { Product, ProductListSection } from ".";

export interface ProductListSectionInterface {
  products: Product[];
  title: string;
  addProduct(product: Product): void;
}

export interface ProductInterface {
  retailerId: string;
}

/**
 * Represents the interface for a product list interaction message.
 * @interface
 * @extends {InteractiveMessageInterface}
 */
export interface ProductListMessageInterface
  extends InteractiveMessageInterface {
  data: {
    catalogId: string;
    productRetailerId: string;
    sections: ProductListSection[];
  };
  addSection(section: ProductListSection): void;
}
