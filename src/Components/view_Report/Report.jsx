import React, { useEffect, useState } from "react";
import "./Report_style.css";
import v9 from "../../assets/V9.png";
// import { Divider, Table } from "antd";
import { useQuery } from "@tanstack/react-query";
import jsPDF from "jspdf";
import { Table, Button } from "react-bootstrap";
import * as autoTable from "jspdf-autotable";
import axios from "axios";
import { CSVLink } from "react-csv";

export default function Report() {
  const columns = [
    {
      label: "Telegram",
      key: "telegram",
    },
    {
      label: "Address",
      key: "address",
    },
    {
      label: "Amount USD",
      key: "amount_BUSD",
    },
    {
      label: "Multichain ",
      key: "blockchain",
    },
    {
      label: "Experience",
      key: "experience",
    },
    {
      label: "ICO Safe",
      key: "ico_safe",
    },
    {
      label: "Features",
      key: "features",
    },
    {
      label: "Invite",
      key: "Invite",
    },
  ];
  const [Row, setRow] = useState([])

  // const get_Ico_data = async () => {
  //   try {
  //     let res = await axios.get("https://ico.archiecoin.online/ICO_Launch");
  //     console.log("Res", res);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // useEffect(() => {
  //   get_Ico_data();
  // }, []);

  const { isLoading, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      fetch("https://ico.archiecoin.online/ICO_Launch").then((res) => res.json()),
  });

  console.log("data", data);
  if (error) return toast.error("An error has occurred: " + error.message);

  const handleConvert = () => {
    const doc = new jsPDF();

    const tableData = data?.data; // get your table data array
    // let columns = ["Name", "Age", "Country"]; // your column titles in same order as in your table data array

    let rows = []; // empty array for rows data

    tableData.forEach((item) => {
      // loop through your table data array and push each row into rows array

      let temp = 
        {
          telegram:item.telegram,
          address:item.address,
          amount_BUSD:item.amount_BUSD,
          blockchain:item.blockchain,
          experience: item.experience,
          ico_safe:item.ico_safe,
          features: item.features,
          Invite:item.Invite,
        }
     
      rows.push(temp);
    });
    setRow(rows)

    console.log("rows",rows);

    doc.autoTable(columns, rows); // call autotable with columns and rows as parameters

    doc.save("tableToPdf.pdf"); // save the pdf with name tableToPdf
  };
console.log("data?.data.length",data?.data.length);
  return (
    <div className={data?.data.length > 8 ? "text-center text-white bg_table2 ":"text-center text-white bg_table"} >
      <div className="pt-5">
        <img src={v9} alt="" className="Ico_log" />
        <p className="dripe_h3">
          Multi-Chain <b> ICO LAUNCH</b>
        </p>
      </div>

      <div style={{ padding: "2rem", }} className="tab_res">
        <Table bordered className="text-white w-100 table-responsive ">
          <thead>
            <tr>
              {columns.map((items, index) => {
                return (
                  <>
                    <th className="">{items.label}</th>
                  </>
                );
              })}
            </tr>
          </thead>

          <tbody className="text-white">
            {data?.data?.map((item, index) => (
              <tr key={index}>
                <td>{item.telegram}</td>

                <td>
                  {item.address?.substring(0, 6) +
                    "..." +
                    item.address?.substring(item.address?.length - 6)}
                </td>
                <td>{item.amount_BUSD}</td>
                <td>{item.blockchain}</td>

                <td className="w-25"> <input type="text" className="inputremovebg" value={item.experience} /> </td>
                <td>{item.ico_safe}</td>
                <td>{item.features}</td>
                <td>{item.Invite}</td>
              </tr>
            ))}
          </tbody>
        </Table>


        {/* <Button className="contBtn" > */}
        <CSVLink data={data==undefined ? Row : data.data} headers={columns}  filename={"ICO_LAUNCH_Report.csv"} className="text-decoration-none text-white contBtn">   Convert to PDF</CSVLink> 
       
        {/* </Button> */}
      </div>
    </div>
  );
}

// convert Table into pdf functional components in react js
