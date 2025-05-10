import { EContentType } from "../constants/enum";

export type IAddToMyListPayload = {
  contentId: string;
  contentType: EContentType;
};

export type IFetchListReq = {
  params: { contentId: string };
  query: { page: number; limit: number; filter: { contentType: EContentType } };
};
