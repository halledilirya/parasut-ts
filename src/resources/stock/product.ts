import { send } from "../../utils/requests";
import { getFilterParam } from "../../utils";
import { Range } from "../../types";

export default class Products {
  /**
   * @param params {@link GetProductParams}
   * @returns Promise<{@link GetProductResponse}>
   */
  async retrieve(params?: GetProductParams): Promise<GetProductResponse> {
    const { filter, sort, page, include } = params || {};
    const filterParam = getFilterParam(filter);
    const response = await send({
      path: `/products?${filterParam}${sort ? `&sort=${sort}` : ""}${
        page ? `&page=${page}` : ""
      }${include ? `&include=${include}` : ""}`,
      method: "GET",
    });
    return response as GetProductResponse;
  }

  /**
   * @param params {@link CreateProductParams}
   * @returns Promise<{@link CreateProductResponse}>
   */
  async create(params: CreateProductParams): Promise<CreateProductResponse> {
    const response = await send({
      path: `/products`,
      method: "POST",
      body: params,
    });
    return response as CreateProductResponse;
  }
}

export type GetProductParams = {
  filter?: {
    name?: string;
    code?: string;
  };
  sort?: string;
  page?: {
    size?: Range<1, 25>;
    number?: number;
  };
  include?: string;
};

export type GetProductAttributes = {
  sales_excise_duty_code: string;
  sales_invoice_details_count: number;
  purchase_invoice_details_count: number;
  list_price_in_trl: number;
  buying_price_in_trl: number;
  stock_count: number;
  created_at: string;
  updated_at: string;
  code: string;
  name: string;
  vat_rate: number;
  sales_excise_duty: number;
  sales_excise_duty_type: string;
  purchase_excise_duty: number;
  purchase_excise_duty_type: string;
  unit: string;
  communications_tax_rate: number;
  archived: boolean;
  list_price: number;
  currency: string;
  buying_price: number;
  buying_currency: string;
  inventory_tracking: boolean;
  initial_stock_count: number;
  gtip: string;
  barcode: string;
};

export type GetProductRelationships = {
  inventory_levels: {
    data: {
      id: string;
      type: "inventory_levels";
    };
  };
  category: {
    data: {
      id: string;
      type: "item_categories";
    };
  };
};

type GetProductResponseData = {
  id: string;
  type: "products";
  attributes: GetProductAttributes;
  relationships: GetProductRelationships;
};

export type GetProductResponseIncluded = {
  id: string;
  type: "inventory_levels";
  attributes: any;
  relationships: any;
};

export type GetProductResponse = {
  data: GetProductResponseData[];
  included: GetProductResponseIncluded[];
  meta: {
    current_page: number;
    total_pages: number;
    total_count: number;
  };
  errors?: {
    title: string;
    detail: string;
  }[];
};

export type CreateProductAttributes = {
  code?: string;
  name: string;
  vat_rate?: number;
  sales_excise_duty?: number;
  sales_excise_duty_type?: string;
  purchase_excise_duty?: number;
  purchase_excise_duty_type?: string;
  unit?: string;
  communications_tax_rate?: number;
  archived?: boolean;
  list_price?: number;
  currency?: string;
  buying_price?: number;
  buying_currency?: string;
  inventory_tracking?: boolean;
  initial_stock_count?: number;
  gtip?: string;
  barcode?: string;
};

export type CreateProductRelationships = {
  inventory_levels: {
    data: {
      id: string;
      type: "inventory_levels";
    }[];
  };
  category: {
    data: {
      id: string;
      type: "item_categories";
    };
  };
};

export type CreateProductParams = {
  data: {
    type: "products";
    attributes: CreateProductAttributes;
    relationships?: CreateProductRelationships;
  };
};

export type CreateProductResponseAttributes = {
  sales_excise_duty_code: string;
  sales_invoice_details_count: number;
  purchase_invoice_details_count: number;
  list_price_in_trl: number;
  buying_price_in_trl: number;
  stock_count: number;
  created_at: string;
  updated_at: string;
  code: string;
  name: string;
  vat_rate: number;
  sales_excise_duty: number;
  sales_excise_duty_type: string;
  purchase_excise_duty: number;
  purchase_excise_duty_type: string;
  unit: string;
  communications_tax_rate: number;
  archived: boolean;
  list_price: number;
  currency: string;
  buying_price: number;
  buying_currency: string;
  inventory_tracking: boolean;
  initial_stock_count: number;
  gtip: string;
  barcode: string;
};

export type CreateProductResponseRelationships = {
  inventory_levels: {
    data: {
      id: string;
      type: "inventory_levels";
    };
  };
  category: {
    data: {
      id: string;
      type: "item_categories";
    };
  };
};

export type CreateProductResponse = {
  data: {
    id: string;
    type: "products";
    attributes: CreateProductResponseAttributes;
    relationships: CreateProductResponseRelationships;
  };
  included: {
    id: string;
    type: "inventory_levels";
    attributes: any;
    relationships: any;
  }[];
  errors: {
    title: string;
    detail: string;
  }[];
};
