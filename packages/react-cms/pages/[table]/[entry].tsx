import { ParsedUrlQuery } from "querystring";

import { NextPage } from "next";
import { useForm } from "react-hook-form";
import { Cell, Grid, Input } from "@aw-web-design/components";

import { GetEntryData, ModifyEntry } from "../../db/mysql/queries";

interface Props {
  query: ParsedUrlQuery;
  data: Record<string, any>;
}

const Entry: NextPage<Props> = ({ query }: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const isCreate = query.create === "create";

  const onSubmit = async (data) => {
    const res = await ModifyEntry(
      { body: data },
      `${query.table}`,
      isCreate ? "create" : "update",
      isCreate ? 0 : `${query.entry}`
    );
  };

  return (
    <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
      <Grid p="3" columns={2} gap={5}>
        <Cell>
          <Input w="full" {...register("firstName")} />
        </Cell>
        <Cell>
          <Input w="full" {...register("firstName")} />
        </Cell>
      </Grid>
    </form>
  );
};

Entry.getInitialProps = async ({ req, query }): Promise<Props> => {
  if (query.entry !== "create") {
    const data = await GetEntryData(req, `${query.table}`, "entry", `${query.entry}`);

    return {
      query,
      data,
    };
  }
  return {
    query,
    data: {},
  };
};

export default Entry;
