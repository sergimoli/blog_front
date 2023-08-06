import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Start } from "../components/pages/start";
import { Articles } from "../components/pages/Articles";
import { Header } from "../components/layout/Header";
import { Nav } from "../components/layout/Nav";
import { Sidebar } from "../components/layout/Sidebar";
import { Footer } from "../components/layout/Footer";
import { Create } from "../components/pages/Create";
import { Search } from "../components/pages/Search";
import { Article } from "../components/pages/Article";
import { Edit } from "../components/pages/Edit";

export const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Nav />
      {/* contingut central i rutes */}
      <section id="content" className="content">
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/start" element={<Start />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/create-articles" element={<Create />} />
          <Route path="/find/:search" element={<Search />} />
          <Route path="/article/:id" element={<Article />}></Route>
          <Route path="/edit/:id" element={<Edit />}></Route>
          <Route
            path="*"
            element={
              <div className="jumbo">
                <h1>Error 404</h1>
              </div>
            }
          />
        </Routes>
      </section>
      <Sidebar />
      <Footer />
    </BrowserRouter>
  );
};
