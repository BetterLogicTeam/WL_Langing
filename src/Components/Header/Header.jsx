import React from "react";
import "./Hader.css";
import v9 from "../../assets/V9.png";
function Header() {
  return (
    <div className="text-center ">
      <div className="pt-5">
        <img src={v9} alt="" className="Ico_log" />
        <p className="dripe_h3">
          Multi-Chain <b> ICO LAUNCH</b>
        </p>
      </div>
      <div className="container btn_home ">
        <a href="https://arc-ico.netlify.app" target="_blank">
          <button className="btn_loyal" disabled="true">LAUNCH DAPP</button>
        </a>
        <button className="  btn_loyal" disabled="true">EARLY ACCESS</button>
      </div>

      <div className="container">
        <div className="WHITEL text-center">
          <p className="sdsd">WHITELIST</p>
        </div>

        <div className="div text-center">
          <h4 className="clr_txt text-center fmg  ">
            GAIN EARLY ACCESS TO EXCLUSIVE PRE-SALE.
          </h4>
          
        </div>
      </div>
      <div className="p-3 d-flex secon_btn ">
        <p>
          <p className="text-white">24 HRS VOICE CHAT</p>
          <a href="https://t.me/+LuabdnK0i6ozNWIx" target="_blank">
            <button className="btn_loyal">
              https://t.me/+LuabdnK0i6ozNWIx
            </button>
          </a>
        </p>
        <p>
          <p className="text-white">EXCLUSIVE PRE-SALE</p>
          <a href="https://t.me/+Ny8Zaw1FeaQwZWM5" target="_blank">
            <button className="  btn_loyal">
              https://t.me/+Ny8Zaw1FeaQwZWM5
            </button>
          </a>
        </p>
      </div>
      <div className="pre_sale_note">
        <h6 style={{fontSize:"1.5rem",fontWeight:"700"}}> <b>PLEASE NOTE:  </b> </h6>
        <p className="fs-5">THERE ARE MULTI-CHAIN ICO (ARCHIE/ETH/BSC),</p>
        <p>THIS IS ONLY FOR ARCHIE CHAIN ARC/USDC POOL</p>
        <p style={{ textTransform: "uppercase" }}>
          Wl people will have first two hours of opening.
        </p>

        <h4>COMPLETE WHITELIST FORM BELOW</h4>
      </div>
    </div>
  );
}

export default Header;
