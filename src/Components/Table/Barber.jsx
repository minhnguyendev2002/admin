import { Table } from "rsuite";
import React from "react";
import "rsuite/dist/rsuite.min.css";
import "./Table.css";
import axios from "axios";
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const App = () => {
  const { Column, Cell, HeaderCell } = Table;
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    setInterval(function () {
      axios
        .get(
          "https://baber-shop-b94f6-default-rtdb.asia-southeast1.firebasedatabase.app/list-order.json"
        )
        .then((res) => {
          console.log(Object.values(res.data));
          setData(Object.values(res.data));
        })
        .catch((err) => {
          console.log(err);
        });
    }, 3000);
  }, []);

  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';

  const exportToCSV = (inData) => {
      const ws = XLSX.utils.json_to_sheet(inData);
      const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
      const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      const data = new Blob([excelBuffer], {type: fileType});
      FileSaver.saveAs(data, 'DSKH' + fileExtension);
  }

  return (
    <>
    <div className="margin-s text-center">
        <button onClick={() => exportToCSV(data)} className='btn btn-primary mx-3'>Xuất File Excel</button>
        <button onClick={() => {localStorage.removeItem("accept"); window.location.reload()}} className='btn btn-primary mx-3'>Đăng xuất</button>
    </div>
      <Table height={460} data={data}>
        <Column width={200} align="center">
          <HeaderCell>Họ và tên</HeaderCell>
          <Cell dataKey="name" />
        </Column>
        <Column width={135} align="center">
          <HeaderCell>Số điện thoại</HeaderCell>
          <Cell dataKey="phone" />
        </Column>
        <Column width={250} align="center">
          <HeaderCell>Địa chỉ</HeaderCell>
          <Cell dataKey="adress" />
        </Column>
        <Column width={250} align="center">
          <HeaderCell>Mô tả</HeaderCell>
          <Cell dataKey="product" />
        </Column>
        <Column width={110} align="center">
          <HeaderCell>Giá tiền</HeaderCell>
          <Cell dataKey="price" />
        </Column>
      </Table>
    </>
  );
};

export default App;
