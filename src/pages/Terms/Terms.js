import React from "react";
import { useNavigate } from "react-router";
import Wrapper from "../../components/Wrapper/Wrapper";
import doubleicon from "../../assets/icons/doubleicon.png";
import "./Terms.scss";

export default function Terms() {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <section className="termspage">
        <div className="termspage__heading">
          <h1 className="termspage__title">Terms of Service</h1>
        </div>

        <section className="terms">
          <section className="terms__mission">
            <p className="terms__text">
              Welcome to myPIKIN! These terms govern your use of our platform
              and services. By accessing or using myPIKIN, you agree to be bound
              by these terms. Please read them carefully.
            </p>
            <h2>1. Introduction</h2>
            <p className="terms__text">
              myPIKIN is an online platform that connects parents with home
              daycare providers in their community. Our mission is to make
              childcare more accessible, convenient, and reliable for families
              while supporting daycare providers in building successful
              businesses.
            </p>
            <h2>2. User Accounts</h2>
            <p className="terms__text">
              In order to access certain features of myPIKIN, you may be
              required to create an account. You are responsible for maintaining
              the confidentiality of your account credentials and for all
              activities that occur under your account.
            </p>
            <h2>3. Use of Services</h2>
            <p className="terms__text">
              You agree to use myPIKIN solely for lawful purposes and in
              compliance with all applicable laws and regulations. You must not
              use myPIKIN in any manner that could interfere with the operation
              of the platform or infringe upon the rights of others.
            </p>

            <button className="terms__button" onClick={() => navigate("/")}>
              Back to Home
            </button>
          </section>
        </section>
      </section>
    </Wrapper>
  );
}
