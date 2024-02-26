import React from "react";
import { useNavigate } from "react-router";
import Wrapper from "../../components/Wrapper/Wrapper";
import doubleicon from "../../assets/icons/doubleicon.png";
import "./Privacy.scss";

export default function Privacy() {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <section className="privacypage">
        <div className="privacypage__heading">
          <h1 className="privacypage__title">Privacy Policy</h1>
        </div>

        <section className="privacy">
          <section className="privacy__mission">
            <p className="privacy__text">
              At myPIKIN, we are committed to protecting your privacy and
              safeguarding your personal information. This Privacy Policy
              outlines how we collect, use, and disclose information when you
              use our platform and services.
            </p>
            <h2>1. Information We Collect</h2>
            <p className="privacy__text">
              We collect various types of information from users, including
              personal information such as your name, email address, phone
              number, and home address. We also collect information about your
              interactions with our platform, such as your search history and
              communication between daycare providers and parents.
            </p>
            <h2>2. Use of Information</h2>
            <p className="privacy__text">
              We use the information we collect to provide and improve our
              services, communicate with you, personalize your experience, and
              ensure the security of our platform. We may also use your
              information to offer relevant recommendations and promotions.
            </p>
            <h2>3. Sharing of Information</h2>
            <p className="privacy__text">
              We may share your information with third-party service providers
              who assist us in operating our platform and providing our
              services. We may also share information with daycare providers
              when you express interest in their services. We do not sell or
              rent your personal information to third parties.
            </p>

            <button className="privacy__button" onClick={() => navigate("/")}>
              Back to Home
            </button>
          </section>
        </section>
      </section>
    </Wrapper>
  );
}
