import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Global } from "../../helpers/Global";

export const Sidebar = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const doSearch = (e) => {
    e.preventDefault();
    console.log(e.target.search_field.value);
    const mySearch = e.target.search_field.value;
    navigate("/find/" + mySearch, { replace: true });
  };

  return (
    <aside className="lateral">
      <div className="search">
        <h3 className="title">Buscador</h3>
        <form onSubmit={doSearch}>
          <input type="text" name="search_field" />
          {/* <button id="search">Find</button> */}
          <input type="submit" id="search" value="Find" />
        </form>
      </div>

      {/* <div className="add">
        <h3 className="title">Añadir pelicula</h3>
        <form>
          <input type="text" id="title" placeholder="Titulo" />
          <textarea id="description" placeholder="Descripción"></textarea>
          <input type="submit" id="save" value="Guardar" />
        </form>
      </div> */}
    </aside>
  );
};
