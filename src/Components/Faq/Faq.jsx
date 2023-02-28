import React, { useEffect, useState } from "react";

import { Button, Modal } from "antd";
import "./Faq.css";
import { AiFillWarning, AiOutlineCheck } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-toastify";
import success from "../../assets/success.png";
import Web3 from "web3";
import { CSVLink } from "react-csv";

function Faq() {
  const [question, setquestion] = useState(0);
  const [Spinner, setSpinner] = useState(false);
  const [getValues, setgetValues] = useState({
    telegram: "",
    metamask_address: "",
    amount: "",
    experience: "",
    safe: "",
    features: "",
    Invite: "",
    blockchain: "",
  });
  const [error, seterror] = useState(null);
  const [telegram_condition, settelegram_condition] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [btndisable, setbtndisable] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const submitform = async () => {
    try {
      setbtndisable(true)
      setSpinner(true);
      let res = await axios.post(
        "https://ico.archiecoin.online/create_Icon_Launch",
        {
          telegram: getValues.telegram,
          address: getValues.metamask_address,
          amount_BUSD: getValues.amount,
          experience: getValues.experience,
          ico_safe: getValues.safe,
          features: getValues.features,
          Invite: getValues.Invite,
          blockchain: getValues.blockchain,
        }
      );

      if (res.data.success == true) {
        // toast.success("Data is Store Successfull In ICO");
        setSpinner(false);
        showModal();
      } else {
        toast.error(res.data.msg);
        setSpinner(false);
      }
    } catch (e) {
      console.log("Error While Api is Call ICo created", e);
      setSpinner(false);
    }
  };

  const vaild_wallet_address = async (e) => {
    try {
      setSpinner(true)
      const web3 = window.web3;
      let IsCorrectAddress = Web3.utils.isAddress(e.target.value);
      // console.log("Web3",await web3.utils);
      //  let isMatemaskAddress= await Web3.eth.getCode("0xd5677cf67b5aa051bb40496e68ad359eb97cfbf8")
      //  console.log("isMatemaskAddress", isMatemaskAddress);

      let addres_res=await axios.post(`https://ico.archiecoin.online/ICo_address_check`,{

        "address":e.target.value
      })
      console.log("addres_res",addres_res.data.success==false);

      if (IsCorrectAddress == true) {
        if(addres_res.data.success==false){
         
        seterror("Wallet Address Allready Exist");

        }else{
        console.log("IsCorrectAddress", IsCorrectAddress);
        setgetValues(
          {
            ...getValues,
            metamask_address: e.target.value,
          },
          seterror(null)
        );
      }
      } else {
        // setaddressError("Please Enter Correct Metamask Address")
        seterror("Please Enter Correct Metamask Address");
      }
    } catch (e) {
      setSpinner(false)
      console.log(e);
    }
  };

  function clearInput() {
    var getValue = document.getElementById("firstName");
    if (getValue.value != "") {
      getValue.value = "";
    }
  }
  function clearInput1() {
    var getValue = document.getElementById("experience");
    if (getValue.value != "") {
      getValue.value = "";
    }
  }
  function clearInput2() {
    var getValue = document.getElementById("safe");
    if (getValue.value != "") {
      getValue.value = "";
    }
  }
  function clearInput3() {
    var getValue = document.getElementById("features");
    if (getValue.value != "") {
      getValue.value = "";
    }
  }

  const condition_telegram = async () => {
    try {
      if(getValues.telegram !=""){
        setSpinner(true)
        let Res = await axios.post("https://ico.archiecoin.online/ICo_telegram", {
          dtaa: getValues.telegram,
        });
        console.log("Res", Res.data.success);
        settelegram_condition(Res.data.success)
        setSpinner(false)

        if(Res.data.success == false){
          seterror("Telegram handle Allready Exist")
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect( () => {
    condition_telegram();
  }, [getValues.telegram]);

 

  return (
    <div>
      <Modal open={isModalOpen} onCancel={handleCancel} footer={null}>
        <div className="d-flex justify-content-center">
          <p className="success_model_icon">
            <AiOutlineCheck className="icon_check" />
          </p>
        </div>
        <p className="success_model">
          Thank you from{" "}
          <a href="http://archiecoin.io/" target="_blank">
            ArchieCoin.io
          </a>
        </p>
        <p className="scond_text_success">
          We will contact you from office archie telegram. Meanwhile any
          questions please login to our official telegram. Or email your query
          to info@archieneko.com
        </p>
        <div className="d-flex justify-content-end">
          <button
            className="contBtn "
            onClick={() => (handleCancel(), window.location.reload())}
          >
            OK
          </button>
        </div>
      </Modal>
      <div
        class="elementor-element elementor-element-f1f54db e-con-boxed e-con"
        data-id="f1f54db"
        data-element_type="container"
        data-settings='{"content_width":"boxed"}'
      >
       
        <div class="e-con-inner">

          <div
            class="elementor-element elementor-element-c24efb1 elementor-widget elementor-widget-html"
            data-id="c24efb1"
            data-element_type="widget"
            data-widget_type="html.default"
          >
            <div class="elementor-widget-container">
              <div
                data-tf-widget="IiZbvYz8"
                data-tf-opacity="33"
                data-tf-hide-headers=""
                data-tf-iframe-props="title=Whitelist Form"
                data-tf-medium="snippet"
                style={{
                  width: "100%",
                  height: "500px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <div
                  class={
                    question == 0
                      ? "tf-v1-widget"
                      : question == 4
                      ? "bg_chang_4"
                      : "bg_chang_same"
                  }
                  data-testid="tf-v1-widget"
                ></div>
                {question == 0 ? (
                  <>
                    <div
                      className="mt-5 w-75 innerdiv_qution"
                      style={{ position: "absolute" }}
                    >
                      <div>
                        <h4 className="form_main_heading">
                          Exclusive ARC Whitelist Form
                        </h4>
                        <p
                          data-qa="block-description"
                          class="TextWrapper-sc-__sc-1f8vz90-0 cHOlOq form_main_heading"
                        >
                          <span>Why join our community? </span>
                          <a
                            href="https://archiecoin.io/"
                            rel="noopener noreferrer"
                            target="_blank"
                            className="form_main_heading"
                          >
                            Click here to find out more
                          </a>
                        </p>
                        <Button
                          className="contBtn"
                          onClick={() => setquestion(1)}
                        >
                          Continue
                        </Button>
                      </div>
                    </div>
                  </>
                ) : question == 1 ? (
                  <>
                    <div className="mt-5 w-75 innerdiv_qution">
                      <h4 className="form_main_heading">
                        What is your telegram handle?This question is required.
                        *
                      </h4>
                      <p
                        data-qa="block-description"
                        class="TextWrapper-sc-__sc-1f8vz90-0 cHOlOq form_main_heading"
                      >
                        <span style={{ color: "rgba(92, 214, 200, 0.7);" }}>
                          Example: @archieneko
                        </span>
                        <br />
                        <input
                          type="text"
                          placeholder="Type your answer here..."
                          className="input_style form-control"
                          required="true"
                          id="firstName"
                          name="firstName"
                          defaultValue=""
                          onChange={(e) => (
                            setgetValues({
                              ...getValues,
                              telegram: e.target.value,
                            }),
                            seterror(null)
                          )}
                        />
                        {error == null && telegram_condition == true ? (
                          <Button
                            className="contBtn fs-5 mt-4"
                            onClick={(e) =>
                              getValues.telegram == ""
                                ? seterror("Please fill this in")
                                : (setquestion(2), clearInput())
                            }
                          >
                            {
                              Spinner==true ? <> <div class="spinner-border" role="status">
                              <span class="visually-hidden">Loading...</span>
                            </div></>:<> Ok <AiOutlineCheck
                              style={{
                                fontSize: "20px",
                                marginLeft: "0.5rem",
                                fontWeight: "700",
                                marginTop: "-0.4rem",
                              }}
                            /></>
                            }
                            
                           
                          </Button>
                        ) : (
                          
                          <p className="errorMasg">
                            {
                              Spinner == true ?  <div class="spinner-border" role="status">
                              <span class="visually-hidden">Loading...</span>
                            </div>:
                            <>
                            <AiFillWarning /> {error}
                            </>
                            }
                           
                            
                          </p>
                        )}
                      </p>
                    </div>
                  </>
                ) : question == 2 ? (
                  <>
                    <div className="mt-5 w-75 innerdiv_qution">
                      <h4 className="form_main_heading">
                        Insert your wallet address belowThis question is
                        required. *
                      </h4>
                      <p
                        data-qa="block-description"
                        class="TextWrapper-sc-__sc-1f8vz90-0 cHOlOq form_main_heading"
                      >
                        <span style={{ color: "rgba(92, 214, 200, 0.7);" }}>
                          Should start with 0x... (This will be your wallet that
                          stores your ARC)
                        </span>
                        <br />
                        <input
                          type="text"
                          placeholder="Type your answer here..."
                          className="input_style form-control"
                          name="address"
                          onChange={(e) => vaild_wallet_address(e)}
                        />
                        {error !== null ? (
                          <p className="errorMasg" style={{ width: "20rem" }}>
                            {" "}
                            <AiFillWarning /> {error}
                          </p>
                        ) : (
                          <>
                            <Button
                              className="contBtn fs-5 mt-4"
                              onClick={() =>
                                getValues.metamask_address == ""
                                  ? seterror("Please fill this in")
                                  : setquestion(3)
                              }
                            >
                              {
                              Spinner==true ? <> <div class="spinner-border" role="status">
                              <span class="visually-hidden">Loading...</span>
                            </div></>:<> Ok <AiOutlineCheck
                              style={{
                                fontSize: "20px",
                                marginLeft: "0.5rem",
                                fontWeight: "700",
                                marginTop: "-0.4rem",
                              }}
                            /></>
                            }
                            </Button>
                          </>
                        )}
                      </p>
                    </div>
                  </>
                ) : question == 3 ? (
                  <>
                    <div className="mt-5  w-75 innerdiv_qution">
                      <h4 className="form_main_heading">
                        Your whitelist contributionThis question is required. *
                      </h4>
                      <p
                        data-qa="block-description"
                        class="TextWrapper-sc-__sc-1f8vz90-0 cHOlOq form_main_heading"
                      >
                        <span style={{ color: "rgba(92, 214, 200, 0.7);" }}>
                          Using dropdown box, please select how much USD you
                          would like to contribute. Min 200 USD. Max 5000 USD.
                        </span>
                        <br />
                        {/* <input type="text" className="input_style" /> */}

                        <select
                          class="form-select selectdiv"
                          aria-label="Default select example"
                          onChange={(e) =>
                            setgetValues(
                              { ...getValues, amount: e.target.value },
                              seterror(null)
                            )
                          }
                        >
                          <option>Type or select an option</option>
                          <option value="200">200 USD</option>
                          <option value="300">300 USD</option>
                          <option value="400">400 USD</option>
                          <option value="500">500 USD</option>
                          <option value="600">600 USD</option>
                          <option value="700">700 USD</option>
                          <option value="800">800 USD</option>
                          <option value="900">900 USD</option>
                          <option value="1000">1000 USD</option>
                          <option value="1100">1100 USD</option>
                          <option value="1200">1200 USD</option>
                          <option value="1300">1300 USD</option>
                          <option value="1400">1400 USD</option>
                          <option value="1500">1500 USD</option>
                          <option value="1600">1600 USD</option>
                          <option value="1700">1700 USD</option>
                          <option value="1800">1800 USD</option>
                          <option value="1900">1900 USD</option>
                          <option value="2000">2000 USD</option>
                          <option value="2100">2100 USD</option>
                          <option value="2200">2200 USD</option>
                          <option value="2300">2300 USD</option>
                          <option value="2400">2400 USD</option>
                          <option value="2500">2500 USD</option>
                          <option value="2600">2600 USD</option>
                          <option value="2700">2700 USD</option>
                          <option value="2800">2800 USD</option>
                          <option value="2900">2900 USD</option>
                          <option value="3000">3000 USD</option>
                          <option value="3100">3100 USD</option>
                          <option value="3200">3200 USD</option>
                          <option value="3300">3300 USD</option>
                          <option value="3400">3400 USD</option>
                          <option value="3500">3500 USD</option>
                          <option value="3600">3600 USD</option>
                          <option value="3700">3700 USD</option>
                          <option value="3800">3800 USD</option>
                          <option value="3900">3900 USD</option>
                          <option value="4000">4000 USD</option>
                          <option value="4100">4100 USD</option>
                          <option value="4200">4200 USD</option>
                          <option value="4300">4300 USD</option>
                          <option value="4400">4400 USD</option>
                          <option value="4500">4500 USD</option>
                          <option value="4600">4600 USD</option>
                          <option value="4700">4700 USD</option>
                          <option value="4800">4800 USD</option>
                          <option value="4900">4900 USD</option>
                          <option value="5000">5000 USD</option>
                        </select>
                      </p>
                      <Button
                        className="contBtn fs-5"
                        onClick={() => setquestion(4)}
                      >
                        OK{" "}
                        <AiOutlineCheck
                          style={{
                            fontSize: "20px",
                            marginLeft: "0.5rem",
                            fontWeight: "700",
                            marginTop: "-0.4rem",
                          }}
                        />
                      </Button>
                    </div>
                  </>
                ) : question == 4 ? (
                  <>
                    <div className="mt-5 w-75 innerdiv_qution">
                      <h4 className="form_main_heading">
                        Our community is at the heart of everything we do...
                      </h4>
                      <p
                        data-qa="block-description"
                        class="TextWrapper-sc-__sc-1f8vz90-0 cHOlOq form_main_heading"
                      >
                        <span style={{ color: "rgba(92, 214, 200, 0.7);" }}>
                          The next part of this form is optional
                        </span>
                        <br />
                        {/* <input type="text" className="input_style" /> */}
                      </p>
                      <Button
                        className="contBtn fs-5"
                        onClick={() => setquestion(5)}
                      >
                        Continue{" "}
                      </Button>
                    </div>
                  </>
                ) : question == 5 ? (
                  <>
                    <div className="mt-5 w-75 innerdiv_qution">
                      <h4 className="form_main_heading">
                        What is your current experience in crypto and in Defi so
                        far.
                      </h4>
                      <p
                        data-qa="block-description"
                        class="TextWrapper-sc-__sc-1f8vz90-0 cHOlOq form_main_heading"
                      >
                        <input
                          type="text"
                          placeholder="Type your answer here..."
                          className="input_style form-control"
                          name="experience"
                          id="experience"
                          onChange={(e) =>
                            setgetValues(
                              { ...getValues, experience: e.target.value },
                              seterror(null)
                            )
                          }
                        />
                      </p>
                      <Button
                        className="contBtn fs-5"
                        onClick={() => (setquestion(6), clearInput1())}
                      >
                        OK{" "}
                        <AiOutlineCheck
                          style={{
                            fontSize: "20px",
                            marginLeft: "0.5rem",
                            fontWeight: "700",
                            marginTop: "-0.4rem",
                          }}
                        />
                      </Button>
                    </div>
                  </>
                ) : question == 6 ? (
                  <>
                    <div className="mt-5 w-75 innerdiv_qution">
                      <h4 className="form_main_heading">
                        What can ARC do to make Defi more safe?
                      </h4>
                      <p
                        data-qa="block-description"
                        class="TextWrapper-sc-__sc-1f8vz90-0 cHOlOq form_main_heading"
                      >
                        <input
                          type="text"
                          placeholder="Type your answer here..."
                          className="input_style form-control"
                          id="safe"
                          onChange={(e) =>
                            setgetValues(
                              { ...getValues, safe: e.target.value },
                              seterror(null)
                            )
                          }
                        />
                      </p>
                      <Button
                        className="contBtn fs-5"
                        onClick={() => (setquestion(7), clearInput2())}
                      >
                        OK{" "}
                        <AiOutlineCheck
                          style={{
                            fontSize: "20px",
                            marginLeft: "0.5rem",
                            fontWeight: "700",
                            marginTop: "-0.4rem",
                          }}
                        />
                      </Button>
                    </div>
                  </>
                ) : question == 7 ? (
                  <>
                    <div className="mt-5 w-75 innerdiv_qution">
                      <h4 className="form_main_heading">
                        Any features you would like us to implement in our
                        protocol?
                      </h4>
                      <p
                        data-qa="block-description"
                        class="TextWrapper-sc-__sc-1f8vz90-0 cHOlOq form_main_heading"
                      >
                        <input
                          type="text"
                          placeholder="Type your answer here..."
                          className="input_style form-control"
                          id="features"
                          onChange={(e) =>
                            setgetValues(
                              { ...getValues, features: e.target.value },
                              seterror(null)
                            )
                          }
                        />
                      </p>
                      <Button
                        className="contBtn fs-5"
                        onClick={() => (setquestion(8), clearInput3())}
                      >
                        OK{" "}
                        <AiOutlineCheck
                          style={{
                            fontSize: "20px",
                            marginLeft: "0.5rem",
                            fontWeight: "700",
                            marginTop: "-0.4rem",
                          }}
                        />
                      </Button>
                    </div>
                  </>
                ) : question == 8 ? (
                  <>
                    <>
                      <div className="mt-5  w-75 innerdiv_qution">
                        <h4 className="form_main_heading">
                          Since we are on multichain .Which chain will you be
                          interested ?
                        </h4>
                        <p
                          data-qa="block-description"
                          class="TextWrapper-sc-__sc-1f8vz90-0 cHOlOq form_main_heading"
                        >
                          <br />
                          {/* <input type="text" className="input_style" /> */}

                          <select
                            class="form-select selectdiv"
                            aria-label="Default select example"
                            onChange={(e) =>
                              setgetValues(
                                { ...getValues, blockchain: e.target.value },
                                seterror(null)
                              )
                            }
                          >
                            <option>Type or select an option</option>
                            <option value="Ethereum">Ethereum</option>
                            <option value="ArchieChain">ArchieChain</option>
                            <option value="Binance">Binance</option>
                          </select>
                        </p>
                        <Button
                          className="contBtn fs-5"
                          onClick={() => setquestion(9)}
                        >
                          OK{" "}
                          <AiOutlineCheck
                            style={{
                              fontSize: "20px",
                              marginLeft: "0.5rem",
                              fontWeight: "700",
                              marginTop: "-0.4rem",
                            }}
                          />
                        </Button>
                      </div>
                    </>
                  </>
                ) : question == 9 ? (
                  <>
                    <div className="mt-5 w-75 innerdiv_qution last_section">
                      <h4 className="form_main_heading">Invite a friend</h4>
                      <h4 className="form_main_heading">
                        <strong>
                          Know anyone would be interested in joining the ARC
                          evolution...
                        </strong>
                        Drop us their telegram handle down below and we will
                        drop them an invitation.
                      </h4>

                      <p
                        data-qa="block-description"
                        class="TextWrapper-sc-__sc-1f8vz90-0 cHOlOq form_main_heading"
                      >
                        <input
                          type="text"
                          placeholder="Type your answer here..."
                          className="input_style form-control"
                          onChange={(e) =>
                            setgetValues(
                              { ...getValues, Invite: e.target.value },
                              seterror(null)
                            )
                          }
                        />
                      </p>
                      <Button
                      disabled={btndisable}
                        className="contBtn fs-5"
                        onClick={() => submitform()}
                      >
                        {Spinner == true ? (
                          <>
                            <div class="spinner-border" role="status">
                              <span class="visually-hidden">Loading...</span>
                            </div>
                          </>
                        ) : (
                          <>
                            Submit
                            <AiOutlineCheck
                              style={{
                                fontSize: "20px",
                                marginLeft: "0.5rem",
                                fontWeight: "700",
                                marginTop: "-0.4rem",
                              }}
                            />
                          </>
                        )}
                      </Button>
                    </div>
                  </>
                ) : (
                  <></>
                )}
                {/* </div> */}
                {/* <div class="tf-v1-widget" data-testid="tf-v1-widget">
                  <iframe
                    src="https://ddqdzup9wof.typeform.com/to/z41YOMLn"
                    data-testid="iframe"
                    allow="microphone; camera"
                    title="Whitelist Form"
                    style={{ border: "0px", transform: "translateZ(0px)" }}
                  ></iframe>
                </div> */}
              </div>
              <script src="//embed.typeform.com/next/embed.js"></script>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Faq;


// how to download table data in excel file in react js