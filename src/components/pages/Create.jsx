import { Global } from "../../helpers/Global";
import { Petition } from "../../helpers/Petition";
import { useForm } from "../../hooks/useForm";
import { useState } from "react";

export const Create = () => {
  const { form, send, changed } = useForm({});
  const [result, setResult] = useState("not_send");
  const saveArticle = async (e) => {
    e.preventDefault();
    //Recollim dades del formulari
    let newArticle = form;
    console.log(newArticle);
    //guardem article en el backend
    const { info } = await Petition(Global.url + "save", "POST", newArticle);
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
      <h1>create article</h1>
      <p>Form to create an article</p>
      <strong>{result === "saved" ? "Article saved succesfully" : ""}</strong>
      <strong>{result === "error" ? "data incorrect. Not saved! " : ""}</strong>
      {/* montar formulari */}
      <form className="form" onSubmit={saveArticle}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input type="text" name="title" onChange={changed}></input>
          {/* <pre>{JSON.stringify(form)}</pre> */}
        </div>
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea type="text" name="content" onChange={changed}></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="file">Image</label>
          <input type="file" name="file" id="file"></input>
        </div>
        <input type="submit" value="save" className="btn btn-success"></input>
      </form>
    </div>
  );
};
