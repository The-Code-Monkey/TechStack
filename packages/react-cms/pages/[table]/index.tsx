import { ParsedUrlQuery } from "querystring";

import { Table } from "@aw-web-design/components";
import { NextPage } from "next";
import { useRouter } from "next/router";

import { GetListData } from "../../db/mysql/queries";

type ColumnType = {
  accessor: string;
  Header: string;
};

interface Props {
  data: Array<never>;
  columns: Array<ColumnType>;
  query: ParsedUrlQuery;
}

const List: NextPage<Props> = ({ data, query, columns }: Props) => {
  const router = useRouter();

  const handleRowClick = (id) => {
    router.push(`/${query.table}/${parseInt(id, 10) + 1}`);
    console.log(id, query);
  };

  return <Table data={data} className={`${query.table}_table`} columns={columns} onRowClick={handleRowClick} />;
};

List.getInitialProps = async ({ req, query }): Promise<Props> => {
  const data = await GetListData(req, `${query.table}`);

  return {
    query,
    data,
    columns: Object.keys(data[0]).map((key) => ({ accessor: key, Header: key })),
  };
};

export default List;
