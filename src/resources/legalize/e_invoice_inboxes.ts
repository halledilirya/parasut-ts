import { send } from "../../utils/requests";
import { getFilterParam } from "../../utils";
import { Range } from "../../types";

export default class EInvoiceInboxes {
  /**
   * @param params {@link GetEInvoiceInboxesParams}
   * @returns Promise<{@link GetEInvoiceInboxesResponse}>
   */
  async retrieve(
    params?: GetEInvoiceInboxesParams
  ): Promise<GetEInvoiceInboxesResponse> {
    const { filter, page } = params || {};
    const filterParam = getFilterParam(filter);
    const response = await send({
      path: `/e_invoice_inboxes?${filterParam}${page ? `&page=${page}` : ""}`,
      method: "GET",
    });
    return response as GetEInvoiceInboxesResponse;
  }
}

export type GetEInvoiceInboxesParams = {
  filter?: {
    vkn?: string;
  };
  page?: {
    size?: Range<1, 25>;
    number?: number;
  };
};

type GetEInvoiceInboxesResponseData = {
  id: string;
  type: "e_invoice_inboxes";
  attributes: {
    vkn: string;
    e_invoice_address: string;
    name: string;
    inbox_type: string;
    address_registered_at: string;
    registered_at: string;
    created_at: string;
    updated_at: string;
  };
  relationships: any;
};

export type GetEInvoiceInboxesResponse = {
  data: GetEInvoiceInboxesResponseData[];
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
