import React, { useEffect } from "react";
import "./Report_style.css";
import v9 from "../../assets/V9.png";
// import { Divider, Table } from "antd";
import { useQuery } from "@tanstack/react-query";
import jsPDF from "jspdf";
import { Table, Button } from "react-bootstrap";
import * as autoTable from "jspdf-autotable";
import axios from "axios";

export default function Report() {
  const columns = [
    {
      title: "Telegram",
      dataIndex: "telegram",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Amount USD",
      dataIndex: "amount_BUSD",
    },
    {
      title: "Multichain ",
      dataIndex: "blockchain",
    },
    {
      title: "Experience",
      dataIndex: "experience",
    },
    {
      title: "ICO Safe",
      dataIndex: "ico_safe",
    },
    {
      title: "Features",
      dataIndex: "features",
    },
    {
      title: "Invite",
      dataIndex: "Invite",
    },
  ];

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
      let temp = [
        item.telegram,
        item.address,
        item.amount_BUSD,
        item.blockchain,
        item.experience,
        item.ico_safe,
        item.features,
        item.Invite,
      ];
      rows.push(temp);
    });

    doc.autoTable(columns, rows); // call autotable with columns and rows as parameters

    doc.save("tableToPdf.pdf"); // save the pdf with name tableToPdf
  };

  return (
    <div className="text-center text-white bg_table">
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
                    <th className="">{items.title}</th>
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

                <td>{item.experience}</td>
                <td>{item.ico_safe}</td>
                <td>{item.features}</td>
                <td>{item.Invite}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Button className="contBtn" onClick={() => handleConvert()}>
          Convert to PDF
        </Button>
      </div>
    </div>
  );
}

// convert Table into pdf functional components in react js
