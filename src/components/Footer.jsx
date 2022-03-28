export default function Footer() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        borderTop: "solid 2px black",
        position: "absolute",
        bottom: "0",
        height: "3rem",
        width: "100%",
        left: "0",
      }}
    >
      <p>
        <a
          style={{ color: "black", textDecoration: "none" }}
          href={"https://www.linkedin.com/in/tim-gottling-tegman-b31262227/"}
        >
          Linkedin
        </a>{" "}
        <a
          style={{ color: "black", textDecoration: "none" }}
          href={"https://github.com/Namget92"}
        >
          Github
        </a>{" "}
        © 2022 Tim Gottling Tegman
      </p>
    </div>
  );
}
