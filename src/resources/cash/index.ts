import type { GetBankAccountsParams, GetBankAccountsResponse } from "./bank";
import Bank from "./bank";

export default class Cash {
  public bank: Bank = new Bank();

  /**
   * @param params {@link GetBankAccountsParams}
   * @returns Promise<{@link GetBankAccountsResponse}>
   * @example
   * const response = await bank.getBankAccounts({
   *    filter?: {
   *        name?: "bank account name",
   *        bank_name?: "bank name",
   *        iban?: "iban",
   *        currency?: "currency",
   *        account_type?: "account_type",
   *        bank_branch?: "bank_branch",
   *    },
   *    page?: {
   *        size?: 10,
   *        number?: 1,
   *    },
   *    sort?: "balance_in_trl",
   * });
   * console.log(response);
   */
  async getBankAccounts(
    params?: GetBankAccountsParams
  ): Promise<GetBankAccountsResponse> {
    return await this.bank.retrieve(params);
  }
}

export type { GetBankAccountsParams, GetBankAccountsResponse } from "./bank";
