import { useParams } from "react-router-dom";
import { Global } from "../../helpers/Global";
import { Petition } from "../../helpers/Petition";
import { useForm } from "../../hooks/useForm";
import { useEffect, useState } from "react";

export const Edit = () => {
  const { form, send, changed } = useForm({});
  const [result, setResult] = useState("not_send");
  const [article, setArticle] = useState([]);
  const params = useParams();

  useEffect(() => {
    getArticle();
  }, []);

  const getArticle = async () => {
    //per que fem servir el await? per que fem petició ajax i ens esperem. fins que no tinguem una resposta de la api no passem a lo següent...
    //Recordem que al fer un await ha de tenir funció async...

    const { info } = await Petition(Global.url + "article/" + params.id, "GET");

    console.log("sergi " + info);

    if (info.status === "success") {
      setArticle(info.consultById);
    }
    console.log(info.consultById);
    console.log(article.length);
  };

  const editArticle = async (e) => {
    e.preventDefault();
    //Recollim dades del formulari
    let newArticle = form;
    console.log(newArticle);
    //guardem article en el backend
    const { info } = await Petition(
      Global.url + "article/" + params.id,
      "PUT",
      newArticle
    );
    // console.log(info);

    if (info.status === "success") {
      setResult("saved");
    } else {
      setResult("error");
    }

    const fileInput = document.querySelector("#file");
    console.log(fileInput);
    if (info.status === "success" && fileInput.files[0]) {
      setResult("saved");

      //pujar imatge

      const formData = new FormData();
      formData.append("file", fileInput.files[0]);

      const pushPicture = await Petition(
        Global.url + "push-image/" + info.article._id,
        "POST",
        formData,
        true
      );
      console.log(pushPicture);
      if (pushPicture.info.status === "success") {
        setResult("saved");
      } else {
        setResult("error");
      }
    }
  };
  return (
    <div className="jumbo">
      <h1>Edit article</h1>
      <p>Form to edit the article: {article.title}</p>
      <strong>{result === "saved" ? "Article saved succesfully" : ""}</strong>
      <strong>{result === "error" ? "data incorrect. Not saved! " : ""}</strong>
      {/* montar formulari */}
      <form className="form" onSubmit={editArticle}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            onChange={changed}
            defaultValue={article.title}
          ></input>
          {/* <pre>{JSON.stringify(form)}</pre> */}
        </div>
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            type="text"
            name="content"
            onChange={changed}
            defaultValue={article.content}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="file">Image</label>
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
          <input type="file" name="file" id="file"></input>
        </div>
        <input type="submit" value="save" className="btn btn-success"></input>
      </form>
    </div>
  );
};
