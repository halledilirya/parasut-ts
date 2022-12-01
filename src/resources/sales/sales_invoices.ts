import { send } from "../../utils/requests";
import { getFilterParam } from "../../utils";
import { Range } from "../../types";

export default class SalesInvoices {
  /**
   * @param params {@link GetSalesInvoicesParams}
   * @returns {Promise<GetSalesInvoicesResponse>} Promise<{@link GetSalesInvoicesResponse}>
   */
  async retrieve(
    params?: GetSalesInvoicesParams
  ): Promise<GetSalesInvoicesResponse> {
    const { filter, sort, page, include } = params || {};
    const filterParam = getFilterParam(filter);
    const response = await send({
      path: `/sales_invoices?${filterParam}${sort ? `&sort=${sort}` : ""}${
        page ? `&page=${page}` : ""
      }${include ? `&include=${include}` : ""}`,
      method: "GET",
    });
    return response as GetSalesInvoicesResponse;
  }

  /**
   * @param params {@link CreateSalesInvoicesParams}
   * @returns Promise<{@link CreateSalesInvoicesResponse}>
   */
  async create(
    params: CreateSalesInvoicesParams
  ): Promise<CreateSalesInvoicesResponse> {
    const response = await send({
      path: `/sales_invoices`,
      method: "POST",
      body: params,
    });
    return response as CreateSalesInvoicesResponse;
  }

  /**
   * @param id string
   * @param include string
   * @returns Promise<{@link GetSalesInvoicesResponse}>
   */
  async show(id: string, include?: string): Promise<ShowSalesInvoicesResponse> {
    const response = await send({
      path: `/sales_invoices/${id}?${include ? `include=${include}` : ""}`,
      method: "GET",
    });
    return response as ShowSalesInvoicesResponse;
  }

  /**
   * @param id string
   * @param params {@link UpdateSalesInvoicesParams}
   * @returns Promise<{@link UpdateSalesInvoicesResponse}>
   */
  async update(
    id: string,
    params: UpdateSalesInvoicesParams
  ): Promise<UpdateSalesInvoicesResponse> {
    const response = await send({
      path: `/sales_invoices/${id}`,
      method: "PUT",
      body: params,
    });
    return response as UpdateSalesInvoicesResponse;
  }

  /**
   * @param id string
   * @returns Promise<{@link DeleteSalesInvoicesResponse}>
   */
  async delete(id: string): Promise<DeleteSalesInvoicesResponse> {
    const response = await send({
      path: `/sales_invoices/${id}`,
      method: "DELETE",
    });
    return response as DeleteSalesInvoicesResponse;
  }

  /**
   * @param id string
   * @param include string
   * @returns Promise<{@link CancelSalesInvoicesResponse}>
   */
  async cancel(
    id: string,
    include?: string
  ): Promise<CancelSalesInvoicesResponse> {
    const response = await send({
      path: `/sales_invoices/${id}/cancel?${
        include ? `include=${include}` : ""
      }`,
      method: "DELETE",
    });
    return response as CancelSalesInvoicesResponse;
  }

  /**
   * @param id string
   * @returns Promise<{@link RecoverSalesInvoicesResponse}>
   */
  async recover(id: string): Promise<RecoverSalesInvoicesResponse> {
    const response = await send({
      path: `/sales_invoices/${id}/recover`,
      method: "PATCH",
    });
    return response as RecoverSalesInvoicesResponse;
  }

  /**
   * @param id string
   * @returns Promise<{@link ArchiveSalesInvoicesResponse}>
   */
  async archive(id: string): Promise<ArchiveSalesInvoicesResponse> {
    const response = await send({
      path: `/sales_invoices/${id}/archive`,
      method: "PATCH",
    });
    return response as ArchiveSalesInvoicesResponse;
  }

  /**
   * @param id string
   * @returns Promise<{@link UnarchiveSalesInvoicesResponse}>
   */
  async unarchive(id: string): Promise<UnarchiveSalesInvoicesResponse> {
    const response = await send({
      path: `/sales_invoices/${id}/unarchive`,
      method: "PATCH",
    });
    return response as UnarchiveSalesInvoicesResponse;
  }
}

export type GetSalesInvoicesAttributes = {
  archived: true;
  invoice_no: string;
  net_total: number;
  gross_total: number;
  withholding: number;
  total_excise_duty: number;
  total_communications_tax: number;
  total_vat: number;
  vat_withholding: number;
  total_discount: number;
  total_invoice_discount: number;
  before_taxes_total: number;
  remaining: number;
  remaining_in_trl: number;
  payment_status: "paid" | "overdue" | "unpaid" | "partially_paid";
  created_at: string;
  updated_at: string;
  item_type:
    | "invoice"
    | "export"
    | "estimate"
    | "cancelled"
    | "recurring_invoice"
    | "recurring_estimate"
    | "recurring_export"
    | "refund";
  description: string;
  issue_date: string;
  due_date: string;
  invoice_series: string;
  invoice_id: number;
  currency: "TRL" | "USD" | "EUR" | "GBP";
  exchange_rate: number;
  withholding_rate: number;
  vat_withholding_rate: number;
  invoice_discount_type: "percentage" | "amount";
  invoice_discount: number;
  billing_address: string;
  billing_phone: string;
  billing_fax: string;
  tax_office: string;
  tax_number: string;
  country: string;
  city: string;
  district: string;
  is_abroad: boolean;
  order_no: string;
  order_date: string;
  shipment_addres: string;
  shipment_included: boolean;
  cash_sale: boolean;
};

export type GetSalesInvoicesRelationships = {
  category: {
    data: {
      id: string;
      type: "item_categories";
    };
  };
  contact: {
    data: {
      id: string;
      type: "contacts";
    };
  };
  details: {
    data: {
      id: string;
      type: "sales_invoice_details";
    }[];
  };
  payments: {
    data: {
      id: string;
      type: "payments";
    }[];
  };
  tags: {
    data: {
      id: string;
      type: "tags";
    }[];
  };
  sales_offer: {
    data: {
      id: string;
      type: "sales_offers";
    };
  };
  sharings: {
    data: {
      id: string;
      type: "sharings";
    }[];
  };
  recurrence_plan: {
    data: {
      id: string;
      type: "recurrence_plans";
    };
  };
  active_e_document: {
    data: {
      id: string;
      type: "e_archives" | "e_invoices";
    };
  };
};

export type GetSalesInvoicesParams = {
  filter?: {
    issue_date?: string;
    due_date?: string;
    contact_id?: number;
    invoice_id?: number;
    invoice_series?: string;
    item_type?: "invoice" | "refund" | "estimate" | "export";
    print_status?:
      | "printed"
      | "not_printed"
      | "invoices_not_sent"
      | "e_invoice_sent"
      | "e_archive_sent"
      | "e_smm_sent";
    payment_status?: "overdue" | "not_due" | "unscheduled" | "paid";
  };
  sort?:
    | "id"
    | "issue_date"
    | "due_date"
    | "remaining"
    | "remaining_in_trl"
    | "description"
    | "net_total";
  page?: {
    size?: Range<1, 25>;
    number?: number;
  };
  include?: string;
};

type GetSalesInvoicesResponseData = {
  id: string;
  type: "sales_invoices";
  attributes: GetSalesInvoicesAttributes;
  relationships: GetSalesInvoicesRelationships;
};

type GetSalesInvoicesResponseIncluded = {
  id: string;
  type:
    | "item_categories"
    | "contacts"
    | "sales_invoice_details"
    | "payments"
    | "tags"
    | "sales_offers"
    | "sharings"
    | "recurrence_plans"
    | "e_archives"
    | "e_invoices";
  attributes: any;
  relationships: any;
};

export type GetSalesInvoicesResponse = {
  data: GetSalesInvoicesResponseData[];
  included: GetSalesInvoicesResponseIncluded[];
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

export type CreateSalesInvoicesAttributes = {
  item_type:
    | "invoice"
    | "export"
    | "estimate"
    | "cancelled"
    | "recurring_invoice"
    | "recurring_estimate"
    | "recurring_export"
    | "refund";
  description?: string;
  issue_date: string;
  due_date?: string;
  invoice_series?: string;
  invoice_id?: number;
  currency?: "TRL" | "USD" | "EUR" | "GBP";
  exchange_rate?: number;
  withholding_rate?: number;
  vat_withholding_rate?: number;
  invoice_discount_type?: "percentage" | "amount";
  invoice_discount?: number;
  billing_address?: string;
  billing_phone?: string;
  billing_fax?: string;
  tax_office?: string;
  tax_number?: string;
  country?: string;
  city?: string;
  district?: string;
  is_abroad?: boolean;
  order_no?: string;
  order_date?: string;
  shipment_addres?: string;
  shipment_included?: boolean;
  cash_sale?: boolean;
  payment_account_id?: number;
  payment_date?: string;
  payment_description?: string;
};

export type CreateSalesInvoicesRelationships = {
  details?: {
    data: {
      id?: string;
      type: "sales_invoice_details";
      attributes: {
        quantity: number;
        unit_price: number;
        vat_rate: number;
        discount_type?: "percentage" | "amount";
        discount_value?: number;
        excise_duty_type?: "percentage" | "amount";
        excise_duty_value?: number;
        communications_tax_rate?: number;
        description?: string;
        delivery_method?:
          | "CFR"
          | "CIF"
          | "CIP"
          | "CPT"
          | "DAF"
          | "DDP"
          | "DDU"
          | "DEQ"
          | "DES"
          | "EXW"
          | "FAS"
          | "FCA"
          | "FOB"
          | "DAP"
          | "DAT";
        shipping_method?:
          | "Belirtilmedi"
          | "Denizyolu"
          | "Demiryolu"
          | "Karayolu"
          | "Havayolu"
          | "Posta"
          | "Çok araçlı"
          | "Sabit taşıma tesisleri"
          | "İç su taşımacılığı";
      };
      relationships?: {
        product?: {
          data: {
            id: string;
            type: "products";
          };
        };
        warehouse?: {
          data: {
            id: string;
            type: "warehouses";
          };
        };
      };
    }[];
  };
  contact?: {
    data: {
      id: string;
      type: "contacts";
    };
  };
  category?: {
    data: {
      id: string;
      type: "item_categories";
    };
  };
  tags?: {
    data: {
      id: string;
      type: "tags";
    }[];
  };
  sales_offer?: {
    data: {
      id: string;
      type: "sales_offers";
    };
  };
};

export type CreateSalesInvoicesParams = {
  data: {
    type: "sales_invoices";
    attributes: CreateSalesInvoicesAttributes;
    relationships?: CreateSalesInvoicesRelationships;
  };
};

export type CreateSalesInvoicesResponse = {
  data: {
    id: string;
    type: "sales_invoices";
    attributes: GetSalesInvoicesAttributes;
    relationships: GetSalesInvoicesRelationships;
  };
  included: {
    id: string;
    type:
      | "item_categories"
      | "contacts"
      | "sales_invoice_details"
      | "payments"
      | "tags"
      | "sales_offers"
      | "sharings"
      | "recurrence_plans"
      | "e_archives"
      | "e_invoices";
    attributes: any;
    relationships: any;
  }[];
  errors?: {
    title: string;
    detail: string;
  }[];
};

export type ShowSalesInvoicesResponse = {
  data: {
    id: string;
    type: "sales_invoices";
    attributes: GetSalesInvoicesAttributes;
    relationships: GetSalesInvoicesRelationships;
  };
  included: {
    id: string;
    type:
      | "item_categories"
      | "contacts"
      | "sales_invoice_details"
      | "payments"
      | "tags"
      | "sales_offers"
      | "sharings"
      | "recurrence_plans"
      | "e_archives"
      | "e_invoices";
    attributes: any;
    relationships: any;
  }[];
};

export type UpdateSalesInvoicesParams = CreateSalesInvoicesParams;

export type UpdateSalesInvoicesResponse = CreateSalesInvoicesResponse;

export type DeleteSalesInvoicesResponse = {
  errors?: {
    title: string;
    detail: string;
  }[];
};

export type CancelSalesInvoicesResponse = {
  data: {
    id: string;
    type: "sales_invoices";
    attributes: GetSalesInvoicesAttributes;
    relationships: GetSalesInvoicesRelationships;
  };
  included: {
    id: string;
    type:
      | "item_categories"
      | "contacts"
      | "sales_invoice_details"
      | "payments"
      | "tags"
      | "sales_offers"
      | "sharings"
      | "recurrence_plans"
      | "e_archives"
      | "e_invoices";
    attributes: any;
    relationships: any;
  }[];
  errors?: {
    title: string;
    detail: string;
  }[];
};

export type RecoverSalesInvoicesResponse = {
  data: GetSalesInvoicesResponseData;
  included: GetSalesInvoicesResponseIncluded[];
  errors: {
    title: string;
    detail: string;
  }[];
};

export type ArchiveSalesInvoicesResponse = RecoverSalesInvoicesResponse;

export type UnarchiveSalesInvoicesResponse = RecoverSalesInvoicesResponse;
