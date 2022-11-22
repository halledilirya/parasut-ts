import { send } from "../../utils/requests";
import { getFilterParam } from "../../utils";
import { Range } from "../../types";

export default class PurchaseBills {
  /**
   *
   * @param params {@link GetPurchaseBillsParams}
   * @returns Promise<{@link GetPurchaseBillsResponse}>
   */
  async retrieve(
    params?: GetPurchaseBillsParams
  ): Promise<GetPurchaseBillsResponse> {
    const { filter, sort, page, include } = params || {};
    const filterParam = getFilterParam(filter);
    const response = await send({
      path: `/purchase_bills?${filterParam}${sort ? `&sort=${sort}` : ""}${
        page ? `&page=${page}` : ""
      }${include ? `&include=${include}` : ""}`,
      method: "GET",
    });
    return response as GetPurchaseBillsResponse;
  }
}

export type GetPurchaseBillsParamsInclude =
  | "category"
  | "spender"
  | "details"
  | "details.product"
  | "details.warehouse"
  | "payments"
  | "payments.transaction"
  | "tags"
  | "recurrence_plan"
  | "active_e_document"
  | "pay_to";

export type GetPurchaseBillsParams = {
  filter?: {
    issue_date?: string;
    due_date?: string;
    supplier_id?: number;
    item_type?: "purchase_bill" | "refund" | "cancelled";
    spender_id?: number;
  };
  sort?: "id" | "issue_date" | "due_date" | "remaining" | "remaining_in_trl";
  page?: {
    number?: number;
    size?: Range<1, 25>;
  };
  include?: string;
};

export type GetPurchaseAttributes = {
  archived?: boolean;
  total_paid?: number;
  gross_total?: number;
  total_excise_duty?: number;
  total_communications_tax?: number;
  total_vat: number;
  total_discount?: number;
  total_invoice_discount?: number;
  remaining?: number;
  remaining_in_trl?: number;
  payment_status?: "paid" | "overdue" | "unpaid" | "partially_paid";
  is_detailed?: boolean;
  sharings_count?: number;
  e_invoices_count?: number;
  remaining_reimbursement?: number;
  remaining_reimbursement_in_trl?: number;
  created_at?: string;
  updated_at?: string;
  item_type:
    | "purchase_bill"
    | "cancelled"
    | "recurring_purchase_bill"
    | "refund";
  description?: string;
  issue_date: string;
  due_date: string;
  invoice_no?: string;
  currency: "TRL" | "USD" | "EUR" | "GBP";
  exchange_rate?: number;
  net_total: number;
  withholding_rate?: number;
  vat_withholding_rate?: number;
  invoice_discount_type?: "percentage" | "amount";
  invoice_discount?: number;
};

export type GetPurchaseRelationships = {
  category: {
    data: {
      id: string;
      type: "item_categories";
    };
  };
  spender: {
    data: {
      id: string;
      type: "employees";
    };
  };
  supplier: {
    data: {
      id: string;
      type: "contacts";
    };
  };
  details: {
    data: {
      id: string;
      type: "purchase_bill_details";
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
  recurrence_plan: {
    data: {
      id: string;
      type: "recurrence_plans";
    };
  };
  active_e_document: {
    data: {
      id: string;
      type: "e_invoices";
    };
  };
  pay_to: {
    data: {
      id: string;
      type: "contacts" | "employees";
    };
  };
};

type GetPurchaseIncluded = {
  id: string;
  type:
    | "item_categories"
    | "employees"
    | "contacts"
    | "purchase_bill_details"
    | "payments"
    | "tags"
    | "recurrence_plans"
    | "e_invoices";
  attributes: any;
  relationships: any;
};

type GetPurchaseBillsResponseData = {
  id: string;
  type: "purchase_bills";
  attributes: GetPurchaseAttributes;
  relationships: GetPurchaseRelationships;
};

export type GetPurchaseBillsResponse = {
  data: GetPurchaseBillsResponseData[];
  included: GetPurchaseIncluded[];
  meta: {
    current_page: number;
    total_pages: number;
    total_count: number;
  };
};
