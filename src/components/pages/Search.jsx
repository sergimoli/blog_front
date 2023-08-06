import { useEffect } from "react";
import { useState } from "react";
import { Global } from "../../helpers/Global";
import { Petition } from "../../helpers/Petition";
import { List } from "./List";
import { useParams } from "react-router-dom";

export const Search = () => {
  const [articles, setArticles] = useState([]);
  const [charging, setCharging] = useState(true);
  const params = useParams(); //agafar qualsevol paràmetre

  useEffect(() => {
    console.log(params);
    getArticles();
  }, [params]);

  const getArticles = async () => {
    //per que fem servir el await? per que fem petició ajax i ens esperem. fins que no tinguem una resposta de la api no passem a lo següent...
    //Recordem que al fer un await ha de tenir funció async...

    console.log("dfajñl    " + params.search);

    const { info, charging } = await Petition(
      Global.url + "find/" + params.search,
      "GET"
    );
    // console.log("sergi " + info);
    if (info.status === "success") {
      setArticles(info.articles);
      console.log("info.consult" + info.articles);
    } else {
      setArticles([]);
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
