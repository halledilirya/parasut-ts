import type {
  CreateProductAttributes,
  CreateProductRelationships,
  CreateProductResponse,
  GetProductParams,
  GetProductResponse,
} from "./product";
import Product from "./product";

export default class Stock {
  public product: Product = new Product();

  /**
   * @param params {@link GetProductParams}
   * @returns Promise<{@link GetProductResponse}>
   */
  async getProducts(params?: GetProductParams): Promise<GetProductResponse> {
    return this.product.retrieve(params);
  }

  /**
   * @param params.attributes {@link CreateProductAttributes}
   * @param params.relationships {@link CreateProductRelationships}
   * @returns Promise<{@link CreateProductResponse}>
   */
  async createProduct(params: {
    attributes: CreateProductAttributes;
    relationships?: CreateProductRelationships;
  }): Promise<CreateProductResponse> {
    const { attributes, relationships } = params;
    return this.product.create({
      data: {
        type: "products",
        attributes,
        relationships,
      },
    });
  }
}

export type {
  GetProductParams,
  GetProductAttributes,
  GetProductRelationships,
  GetProductResponse,
  CreateProductParams,
  CreateProductAttributes,
  CreateProductRelationships,
  CreateProductResponse,
} from "./product";
