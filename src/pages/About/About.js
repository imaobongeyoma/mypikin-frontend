import React from "react";
import { useNavigate } from "react-router";
import Wrapper from "../../components/Wrapper/Wrapper";
import doubleicon from "../../assets/icons/doubleicon.png";
import "./About.scss";

export default function About() {
  const navigate = useNavigate();
  return (
    <Wrapper>
        <div className="aboutpage">
          <div className="aboutpage__heading">
            <h1 className="aboutpage__title">Welcome to myPIKIN</h1>
          </div>
          <div className="aboutpage__ctawrap">
            <img
              src={doubleicon}
              alt="doubleicon"
              className="aboutpage__icon"
            ></img>
            <p className="aboutpage__text">
              Empowering Parents. Supporting Providers. Building Communities.
            </p>
          </div>
       
        <section className="about">
          <section className="about__mission">
            <h2>Our Mission</h2>
            <p className="about__text">
              At myPikin, we believe that every child deserves a safe,
              nurturing, and loving environment to grow and thrive. We are on a
              mission to revolutionize the way parents find childcare by
              connecting them with trusted home daycare providers in their
              community.
            </p>
            <p className="about__text">
              We understand the challenges parents face when searching for
              childcare options - the long waitlists, the limited availability,
              and the uncertainty of finding the right fit for their child.
              That's why we're here to make the process easier, faster, and more
              transparent.
            </p>
          </section>
          <section className="about__vision">
            <h2>Our Vision</h2>
            <p className="about__text">
              Our vision is to create a world where every child has access to
              high-quality childcare that meets their unique needs and every
              provider has the opportunity to thrive in their profession.
            </p>
            <p className="about__text">
              We envision a future where parents can easily search for and
              compare home daycare options in their area, where providers have
              the resources and support they need to deliver exceptional care,
              and where communities come together to support the growth and
              development of our youngest members.
            </p>
          </section>
          <section className="about__values">
            <h2>Our Values</h2>
            <ul className="about__values">
              <li className="about__text">
                <strong>Empowerment:</strong> We empower parents to make
                informed choices about their child's care and providers to build
                successful daycare businesses.
              </li>
              <li className="about__text">
                <strong>Inclusivity:</strong> We embrace diversity and strive to
                create a welcoming and inclusive platform for all families and
                providers.
              </li>
              <li className="about__text">
                <strong>Community:</strong> We believe in the power of community
                and the importance of building connections between families,
                providers, and local businesses.
              </li>
              <li className="about__text">
                <strong>Excellence:</strong> We are committed to excellence in
                everything we do - from the quality of our service to the
                support we provide to our users.
              </li>
            </ul>
          </section>
          <section className="about__join-us">
            <h2>Join Us</h2>
            <p className="about__text">
              Whether you're a parent searching for childcare or a provider
              looking to grow your business, we invite you to join our community
              and be a part of the myPikin movement. Together, we can create a
              brighter future for our children and our communities.
            </p>
            <button className="about__getstarted" onClick={() => navigate("/")}>
              Get Started
            </button>
          </section>
        </section>
        </div>
    </Wrapper>
  );
}
