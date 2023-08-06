import { useEffect } from "react";
import { useState } from "react";
import { Global } from "../../helpers/Global";
import { Petition } from "../../helpers/Petition";
import { List } from "./List";
import { useParams } from "react-router-dom";

export const Article = () => {
  const [article, setArticle] = useState([]);
  const [charging, setCharging] = useState(true);
  const params = useParams();

  useEffect(() => {
    getArticle();
  }, []);

  const getArticle = async () => {
    //per que fem servir el await? per que fem petició ajax i ens esperem. fins que no tinguem una resposta de la api no passem a lo següent...
    //Recordem que al fer un await ha de tenir funció async...

    const { info, charging } = await Petition(
      Global.url + "article/" + params.id,
      "GET"
    );

    console.log("sergi " + info);

    if (info.status === "success") {
      setArticle(info.consultById);
    }
    setCharging(charging);
    console.log(info.consultById);
    console.log(article.length);
  };

  return (
    <div className="jumbo">
      {charging ? (
        <h1>CHARGING!!!</h1>
      ) : (
        <>
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
          <h1>{article.title}</h1>
          <span>{article.date}</span>
          <p>{article.content}</p>
        </>
      )}
    </div>
  );
};
