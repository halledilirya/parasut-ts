import Resources from "./resources";
import type { ParasutConfig } from "./types";

class Parasut extends Resources {
  constructor(config: ParasutConfig) {
    if (!config.base_url) {
      config.base_url = "https://api.parasut.com";
    }
    if (!config.email || !config.password) {
      throw new Error("Email and password are required");
    }
    if (!config.client_id || !config.client_secret) {
      throw new Error("Client id and secret are required");
    }
    if (!config.redirect_uri) {
      throw new Error("Redirect uri is required");
    }
    global.user = {
      firm_id: config.firm_id,
      base_url: config.base_url,
      grant_type: "password",
      username: config.email,
      password: config.password,
      client_id: config.client_id,
      client_secret: config.client_secret,
      redirect_uri: config.redirect_uri,
    };
    super();
  }
}

export default Parasut;

export type {
  ParasutConfig,
  AccessTokenErrorResponse,
  AccessTokenResponse,
  AccessTokenSuccessResponse,
  GetPurchaseBillsParams,
  GetPurchaseBillsResponse,
  CreateEArchivesParams,
  CreateEArchivesAttributes,
  CreateEArchivesRelationships,
  CreateEArchivesResponse,
  ShowEArchivesResponse,
  ShowPDFEArchivesResponse,
  GetEInvoiceInboxesParams,
  GetEInvoiceInboxesResponse,
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
  ShowSalesInvoicesResponse,
  UpdateSalesInvoicesParams,
  UpdateSalesInvoicesResponse,
  DeleteSalesInvoicesResponse,
  CancelSalesInvoicesResponse,
  RecoverSalesInvoicesResponse,
  ArchiveSalesInvoicesResponse,
  UnarchiveSalesInvoicesResponse,
  GetProductParams,
  GetProductAttributes,
  GetProductRelationships,
  GetProductResponse,
  CreateProductParams,
  CreateProductAttributes,
  CreateProductRelationships,
  CreateProductResponse,
  ShowTrackableJobsResponse,
  GetBankAccountsParams,
  GetBankAccountsResponse,
} from "./types";
