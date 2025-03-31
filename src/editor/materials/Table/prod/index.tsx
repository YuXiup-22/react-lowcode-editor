import { Table as AntdTable } from "antd";
import { componentCommonProps } from "../../../interface";
import React, { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import axios from "axios";
export default function Table({ children, url }: componentCommonProps) {
  const columns = useMemo(() => {
    return React.Children.map(children, (item: any) => {
      if (item?.props?.type === "date") {
        return {
          title: item.props?.title,
          dataIndex: item.props?.dataIndex,
          render: (value: any) =>
            value ? dayjs(value).format("YYYY-MM-DD") : null,
        };
      } else {
        return {
          title: item.props?.title,
          dataIndex: item.props?.dataIndex,
        };
      }
    });
  }, [children]);
  const [data, setDate] = useState<Array<Record<string, any>>>([]);
  const [loading, setLoading] = useState(false);
  async function  getData() {
    if (url) {
      setLoading(true);
      const { data } =await  axios.get(url);
      setDate(data);
      setLoading(false);
    }
  }
  useEffect(() => {
    getData();
  }, []);
  return (
    <AntdTable
      columns={columns}
      pagination={false}
      rowKey="id"
      dataSource={data}
      loading={loading}
    ></AntdTable>
  );
}
