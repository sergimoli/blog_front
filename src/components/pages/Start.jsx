import { Link } from "react-router-dom";

export const Start = () => {
  return (
    <div className="jumbo">
      <h1>wellcome to my blog, motherfucker!</h1>
      <p>Blog developed with MERN stack(mongo, expreess, react and node)</p>
      <Link to="/articles" className="button">
        See articles
      </Link>
    </div>
  );
};
