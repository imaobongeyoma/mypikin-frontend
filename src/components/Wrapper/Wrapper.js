import "./Wrapper.scss";

export default function Wrapper({children }) {
  return (
    <main className="main">
           
        <section className="wrapper">{children}</section>
    </main>
  );
}

