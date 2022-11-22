import { send } from "../../utils/requests";
import { getFilterParam } from "../../utils";
import { Range } from "../../types";

export default class Contacts {
  /**
   * @param params {@link GetContactParams}
   * @returns Promise<{@link GetContactResponse}>
   */
  async retrieve(params?: GetContactParams): Promise<GetContactResponse> {
    const { filter, sort, page, include } = params || {};
    const filterParam = getFilterParam(filter);
    const response = await send({
      path: `/contacts?${filterParam}${sort ? `&sort=${sort}` : ""}${
        page ? `&page=${page}` : ""
      }${include ? `&include=${include}` : ""}`,
      method: "GET",
    });
    return response as GetContactResponse;
  }

  /**
   * @param params {@link CreateContactParams}
   * @returns Promise<{@link CreateContactResponse}>
   */
  async create(params: CreateContactParams): Promise<CreateContactResponse> {
    const response = await send({
      path: `/contacts`,
      method: "POST",
      body: params,
    });
    return response as CreateContactResponse;
  }

  /**
   * @param id string
   * @returns Promise<{@link ShowContactResponse}>
   */
  async show(id: string): Promise<ShowContactResponse> {
    const response = await send({
      path: `/contacts/${id}`,
      method: "GET",
    });
    return response as ShowContactResponse;
  }

  /**
   * @param id string
   * @param params {@link UpdateContactParams}
   * @returns Promise<{@link UpdateContactResponse}>
   */
  async update(
    id: string,
    params: UpdateContactParams
  ): Promise<UpdateContactResponse> {
    const response = await send({
      path: `/contacts/${id}`,
      method: "PUT",
      body: params,
    });
    return response as UpdateContactResponse;
  }

  /**
   * @param id string
   * @returns Promise<{@link DeleteContactResponse}>
   */
  async delete(id: string): Promise<DeleteContactResponse> {
    const response = await send({
      path: `/contacts/${id}`,
      method: "DELETE",
    });
    return response as DeleteContactResponse;
  }
}

export type GetContactParamsInclude =
  | "category"
  | "contact_portal"
  | "contact_people";

export type GetContactParams = {
  filter?: {
    name?: string;
    email?: string;
    tax_number?: string;
    tax_office?: string;
    city?: string;
    account_type?: "customer" | "supplier";
  };
  sort?: string;
  page?: {
    size?: Range<1, 25>;
    number?: number;
  };
  include?: string;
};

export type GetContactAttributes = {
  balance: number;
  trl_balance: number;
  usd_balance: number;
  eur_balance: number;
  gbp_balance: number;
  created_at: string;
  updated_at: string;
  email: string;
  name: string;
  short_name: string;
  contact_type: "person" | "company";
  tax_office: string;
  tax_number: string;
  district: string;
  city: string;
  country: string;
  address: string;
  phone: string;
  fax: string;
  is_abroad: boolean;
  archived: boolean;
  iban: string;
  account_type: "customer" | "supplier";
  untrackable: boolean;
};

export type GetContactRelationships = {
  category: {
    data: {
      id: string;
      type: "item_categories";
    };
  };
  contact_portal: {
    data: {
      id: string;
      type: "contact_portals";
    };
  };
  contact_people: {
    data: {
      id: string;
      type: "contact_people";
    }[];
  };
};

type GetContactResponseData = {
  id: string;
  type: "contacts";
  attributes: GetContactAttributes;
  relationships: GetContactRelationships;
};

export type GetContactResponseIncluded = {
  id: string;
  type: "item_categories" | "contact_portals" | "contact_people";
  attributes: any;
  relationships: any;
};

export type GetContactResponse = {
  data: GetContactResponseData[];
  included: GetContactResponseIncluded[];
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

export type CreateContactAttributes = {
  email?: string;
  name: string;
  short_name?: string;
  contact_type?: "person" | "company";
  tax_office?: string;
  tax_number?: string;
  district?: string;
  city?: string;
  country?: string;
  address?: string;
  phone?: string;
  fax?: string;
  is_abroad?: boolean;
  archived?: boolean;
  iban?: string;
  account_type: "customer" | "supplier";
  untrackable?: boolean;
};

export type CreateContactRelationships = {
  category?: {
    data: {
      id: string;
      type: "item_categories";
    };
  };
  contact_people?: {
    data: {
      id: string;
      type: "contact_people";
      attributes?: {
        name?: string;
        email?: string;
        phone?: string;
        notes?: string;
      };
    }[];
  };
};

export type CreateContactParams = {
  data: {
    id?: string;
    type: "contacts";
    attributes: CreateContactAttributes;
    relationships?: CreateContactRelationships;
  };
};

export type CreateContactResponse = {
  data: {
    id: string;
    type: "contacts";
    attributes: GetContactAttributes;
    relationships: GetContactRelationships;
  };
  included: {
    id: string;
    type: "item_categories" | "contact_portals" | "contact_people";
    attributes: any;
    relationships: any;
  }[];
  errors?: {
    title: string;
    detail: string;
  }[];
};

export type ShowContactResponse = {
  data: GetContactResponseData;
  included: GetContactResponseIncluded[];
  errors?: {
    title: string;
    detail: string;
  }[];
};

export type UpdateContactParams = {
  data: {
    id: string;
    type: "contacts";
    attributes: CreateContactAttributes;
    relationships?: CreateContactRelationships;
  };
};

export type UpdateContactResponse = CreateContactResponse;

export type DeleteContactResponse = {
  errors?: {
    title: string;
    detail: string;
  }[];
};
