export type {
  GetPurchaseBillsParamsInclude,
  GetPurchaseBillsParams,
  GetPurchaseBillsResponse,
} from "./resources/expenses";

export type {
  CreateEArchivesParams,
  CreateEArchivesAttributes,
  CreateEArchivesRelationships,
  CreateEArchivesResponse,
  GetEInvoiceInboxesParams,
  GetEInvoiceInboxesResponse,
  ShowEArchivesResponse,
  ShowPDFEArchivesResponse,
} from "./resources/legalize";

export type {
  GetContactParams,
  GetContactAttributes,
  GetContactRelationships,
  GetContactResponse,
  CreateContactParams,
  CreateContactAttributes,
  CreateContactRelationships,
  CreateContactResponse,
  ShowContactResponse,
  UpdateContactParams,
  UpdateContactResponse,
  DeleteContactResponse,
  GetSalesInvoicesParams,
  GetSalesInvoicesAttributes,
  GetSalesInvoicesRelationships,
  GetSalesInvoicesResponse,
  CreateSalesInvoicesParams,
  CreateSalesInvoicesAttributes,
  CreateSalesInvoicesRelationships,
  CreateSalesInvoicesResponse,
  UpdateSalesInvoicesParams,
  UpdateSalesInvoicesResponse,
  DeleteSalesInvoicesResponse,
  RecoverSalesInvoicesResponse,
  ArchiveSalesInvoicesResponse,
  UnarchiveSalesInvoicesResponse,
} from "./resources/sales";

export type {
  GetProductParams,
  GetProductAttributes,
  GetProductRelationships,
  GetProductResponse,
  CreateProductParams,
  CreateProductAttributes,
  CreateProductRelationships,
  CreateProductResponse,
} from "./resources/stock";

export type { ShowTrackableJobsResponse } from "./resources/trackable_jobs";

export type {
  GetBankAccountsParams,
  GetBankAccountsResponse,
} from "./resources/cash";

export type AccessTokenResponse =
  | AccessTokenSuccessResponse
  | AccessTokenErrorResponse;

export type AccessTokenSuccessResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  created_at: number;
};

export type AccessTokenErrorResponse = {
  error: string;
  error_description: string;
};

export type ParasutConfig = {
  client_id: string;
  client_secret: string;
  redirect_uri: string;
  email: string;
  password: string;
  base_url: string;
  firm_id: string;
};

declare global {
  var token: {
    access_token: string;
    token_type: string;
    expires_in: number;
    refresh_token: string;
    created_at: number;
  };
  var user: {
    firm_id: string;
    base_url: string;
    grant_type: string;
    username: string;
    password: string;
    client_id: string;
    client_secret: string;
    redirect_uri: string;
  };
}

type Enumerate<
  N extends number,
  Acc extends number[] = []
> = Acc["length"] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc["length"]]>;

export type Range<F extends number, T extends number> =
  | Exclude<Enumerate<T>, Enumerate<F>>
  | T;
