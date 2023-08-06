import { useEffect } from "react";
import { useState } from "react";
import { Global } from "../../helpers/Global";
import { Petition } from "../../helpers/Petition";
import { List } from "./List";

export const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [charging, setCharging] = useState(true);

  useEffect(() => {
    getArticles();
  }, []);

  const getArticles = async () => {
    //per que fem servir el await? per que fem petició ajax i ens esperem. fins que no tinguem una resposta de la api no passem a lo següent...
    //Recordem que al fer un await ha de tenir funció async...

    const { info, charging } = await Petition(Global.url + "articles", "GET");

    console.log("sergi " + info);

    if (info.status === "success") {
      setArticles(info.consult);
    }
    setCharging(charging);
  };

  return (
    <>
      {charging ? (
        <h1>CHARGING!!!</h1>
      ) : articles.length >= 1 ? (
        <List articles={articles} setArticles={setArticles} />
      ) : (
        <h1>There are no articles!</h1>
      )}
    </>
  );
};
