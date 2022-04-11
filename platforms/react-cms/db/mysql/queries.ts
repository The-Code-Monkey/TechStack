import { IncomingMessage } from "http";

import fetchWithUrl from "./helpers";

export const GetListData = async (
  req: IncomingMessage,
  ...queryParams: Array<string>
): Promise<Array<never>> => {
  return new Promise((resolve) =>
    fetchWithUrl(req, `/api/db/mysql/list/${queryParams.join("/")}`)
      .then((res) => {
        resolve(res.json());
      })
      .catch((e) => console.error(e))
  );
};

export const GetEntryData = async (
  req: IncomingMessage,
  ...queryParams: Array<string>
): Promise<Record<string, any>> => {
  return new Promise((resolve) =>
    fetchWithUrl(req, `/api/db/mysql/list/${queryParams.join("/")}`)
      .then((res) => {
        resolve(res.json());
      })
      .catch((e) => console.error(e))
  );
};

export const ModifyEntry = async (
  data: Omit<RequestInit, "body"> & { body?: Record<string, any> },
  ...queryParams: [
    string,
    "create" | "update" | "delete",
    ...Array<string | number>
  ]
) => {
  return new Promise((resolve) =>
    fetch(`/api/db/mysql/list/${queryParams.join("/")}`, {
      ...data,
      body: JSON.stringify(data.body),
      method: queryParams.includes("delete") ? "DELETE" : "POST",
    })
      .then((res) => {
        resolve(res.json());
      })
      .catch((e) => console.error(e))
  );
};
