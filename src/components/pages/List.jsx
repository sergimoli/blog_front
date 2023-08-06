import { Link } from "react-router-dom";
import { Global } from "../../helpers/Global";
import { Petition } from "../../helpers/Petition";

export const List = ({ articles, setArticles }) => {
  //els props es passen com objectes
  const deleteArticle = async (id) => {
    const { info } = await Petition(Global.url + "article/" + id, "DELETE");
    console.log(info);
    if (info.status === "success") {
      //filtrem id diferents al id per updatar el setArticles.
      const articlesUpdates = articles.filter((article) => article._id !== id);
      setArticles(articlesUpdates); //updatem estat del pare
    }
  };
  return articles.map((article) => {
    return (
      <article key={article._id} className="article-item">
        <div className="mask">
          {article.image == "default.png" ? (
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png"
              alt="no real picture"
            />
          ) : (
            <img
              src={Global.url + "image/" + article.image}
              alt={article.title}
            />
          )}
        </div>

        <div className="data">
          <h3 className="title">
            <Link to={"/article/" + article._id}>{article.title}</Link>
          </h3>
          <p className="description">{article.content}</p>

          <Link to={"/edit/" + article._id} className="edit">
            Edit
          </Link>
          <button
            className="delete"
            onClick={() => {
              deleteArticle(article._id);
            }}
          >
            Borrar
          </button>
        </div>
      </article>
    );
  });
};
