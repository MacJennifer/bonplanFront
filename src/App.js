import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Admin from "./pages/Admin";
import Home from "./pages/Home";
import AddArticles from "./pages/articles/AddArticle";
import Article from "./pages/articles/Articles";
import EditArticle from "./pages/articles/EditArticle";
import AddCategorie from "./pages/categories/AddCategorie";
import Categories from "./pages/categories/Categories";
import EditCategorie from "./pages/categories/EditCategorie";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/articles" element={<Article />} />
        <Route path="/admin/AddArticle" element={<AddArticles />} />
        <Route path="/admin/editArticle/:articleId" element={<EditArticle />} />
        <Route path="/admin/Categories" element={<Categories />} />
        <Route path="/admin/AddCategorie" element={<AddCategorie />} />
        <Route
          path="/admin/editCategorie/:categorieId"
          element={<EditCategorie />}
        />

        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
