import Wrapper from "../Wrapper/Wrapper";
import { Link } from "react-router-dom";
import "./NotFound.scss";

export default function NotFound() {
  return (
    <Wrapper>
   
      <section className="notFound__container">
        <h2 className="notFound__title">Page Not Found!</h2>
      </section>
      <h1 className="notFound-header">
          <Link className="notFound-header__link" to="/">
           <button>Go back to Home Page</button> 
          </Link>
        </h1>
    </Wrapper>
  );
}
