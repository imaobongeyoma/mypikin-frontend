import React from "react";
import { useNavigate } from "react-router";
import Wrapper from "../../components/Wrapper/Wrapper";
import doubleicon from "../../assets/icons/doubleicon.png";
import "./Support.scss";

export default function Support() {
  const navigate = useNavigate();
  return (
    <Wrapper>
         <div className="supportpage">
          <div className="supportpage__heading">
            <h1 className="supportpage__title">Get Support</h1>
          </div>
       
        <section className="support">
          <section className="support__mission">
            <p className="support__text">
             Our support team is always available through our email and through our chat service. Don't hesitate to reach out if you have any issues or if you have suggestions! We'd love to hear from you.

             <p> <strong>Email:</strong> support@mypikin.com </p>
            </p>
           
            <button className="support__button" onClick={() => navigate("/")}>
             Back to Home
            </button>
          </section>
        </section>
        </div>
    </Wrapper>
  );
}
