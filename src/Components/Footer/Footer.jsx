import React, { useState } from "react";
import "./Footer.css";
import { ImTwitter } from "react-icons/im";
import { SiTelegram } from "react-icons/si";
import { BsFacebook, BsYoutube } from "react-icons/bs";
import { FaSnapchat } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Modal } from "antd";
import { Button, Checkbox, Form, Input } from "antd";
import axios from "axios";
import { toast } from "react-toastify";

function Footer() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [Spinner, setSpinner] = useState(false);
  const history = useNavigate();
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = async (values) => {
    try {
      setSpinner(true);
      const res = await axios.post("https://ico.archiecoin.online/Sign_in", {
        email: values.username,
        password: values.password,
      });
      console.log("Res", res);
      if (res.data.success == true) {
        toast.success(res.data.msg);
        sessionStorage.setItem("isAuthenticated",true);
        setSpinner(false);
        history("/Report");
      } else {
        toast.error(res.data.msg);
        setSpinner(false);
      }
    } catch (e) {
      console.log(e);
      setSpinner(false);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <div className="container-fluid footer_main_bg">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="soical_icon d-flex justify-content-center ">
                <ImTwitter className="soical_icons  text-white" />
                <SiTelegram className="soical_icons text-white" />
                <BsYoutube className="soical_icons text-white" />
                <FaSnapchat className="soical_icons text-white" />
                <BsFacebook className="soical_icons text-white" />
              </div>
            </div>
          </div>
          <h3 className="ftr_txt text-center">
            Have A Question Or Suggestion? Fill In BELOW
          </h3>

          <div className="row  justify-content-center mt-5">
            <div className="col-md-6">
              <input
                type="text"
                className="footer_input w-75"
                placeholder="Enter Your Question/Suggestion"
              />
            </div>
          </div>
          <div className="row  justify-content-center mt-2">
            <div className="col-md-6">
              <input
                type="text"
                className="footer_input w-100"
                placeholder="Enter Your Question/Suggestion"
              />
              <button className="ask_btn mt-3">ASK</button>
            </div>
          </div>
        </div>
        <Modal open={isModalOpen} onCancel={handleCancel} footer={null}>
          <h3 className="text-center" style={{ color: "#6E3187" }}>
            View Report{" "}
          </h3>
          <Form
            name="basic"
            style={{
              maxWidth: 600,
            }}
            initialValues={{
              remember: true,
            }}
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Email"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your Email!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button type="primary" htmlType="submit" className="contBtn">
                {Spinner == true ? (
                  <>
                    <div class="spinner-border" role="status">
                      <span class="visually-hidden">Loading...</span>
                    </div>
                  </>
                ) : (
                  "Submit"
                )}
              </Button>
            </Form.Item>
          </Form>
        </Modal>
        <hr className="ftr_txt" />
        <div className="footer_btn">
          <p
            style={{ paddingLeft: "30px", fontWeight: "600px" }}
            className="ffffffss"
          >
            ARC (All rights reserved)
          </p>
          {/* <Link to="/Report"> */}
          <button className=" me-4 contBtn" onClick={showModal}>
            View Report
          </button>
          {/* </Link> */}
        </div>
      </div>
    </div>
  );
}

export default Footer;
