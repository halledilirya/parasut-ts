import { Range } from "../../types";
import { getFilterParam } from "../../utils";
import { send } from "../../utils/requests";

export default class Bank {
  /**
   * @param params {@link GetBankAccountsParams}
   * @returns Promise<{@link GetBankAccountsResponse}>
   */
  async retrieve(
    params?: GetBankAccountsParams
  ): Promise<GetBankAccountsResponse> {
    const { filter, sort, page } = params || {};
    const filterParam = getFilterParam(filter);
    const response = await send({
      path: `/accounts?${filterParam}${sort ? `&sort=${sort}` : ""}${
        page ? `&page=${page}` : ""
      }`,
      method: "GET",
    });
    return response as GetBankAccountsResponse;
  }
}

export type GetBankAccountsParams = {
  filter?: {
    name?: string;
    currency?: string;
    account_type?: string;
    bank_name?: string;
    bank_branch?: string;
    iban?: string;
  };
  sort?: "id" | "balance" | "balance_in_trl";
  page?: {
    number?: number;
    size?: Range<1, 25>;
  };
};

export type GetBankAccountsAttributes = {
  used_for: string;
  last_used_at: string;
  balance: number;
  last_adjustment_date: string;
  bank_integration_type: string;
  associate_email: string;
  created_at: string;
  updated_at: string;
  name: string;
  currency: "TRL" | "USD" | "EUR" | "GPB";
  account_type: "cash" | "bank" | "sys";
  bank_name: string;
  bank_branch: string;
  bank_account_no: string;
  iban: string;
  archived: boolean;
};

export type GetBankAccountsResponse = {
  data: {
    id: string;
    type: "accounts";
    attributes: GetBankAccountsAttributes;
    relationships?: any;
  }[];
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
