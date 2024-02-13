import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Admin from "./pages/Admin";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Registrer";
import AddArticles from "./pages/articles/AddArticle";
import Article from "./pages/articles/Articles";
import EditArticle from "./pages/articles/EditArticle";
import AddCategorie from "./pages/categories/AddCategorie";
import Categories from "./pages/categories/Categories";
import EditCategorie from "./pages/categories/EditCategorie";
import AddComment from "./pages/comments/AddComment";
import Comments from "./pages/comments/Comments";
import AddPlace from "./pages/places/AddPlace";
import EditPlace from "./pages/places/EditPlace";
import Places from "./pages/places/Places";
import Users from "./pages/users/Users";
import auth from "./services/token";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        {/*  ROUTES ADMIN */}

        <Route
          path="/admin"
          element={
            auth.isLoggedIn() ? (
              auth.getExpiryTime() && auth.loggedAdmin() ? (
                <Admin />
              ) : (
                <Navigate to="/home" replace={true} />
              )
            ) : (
              <Navigate to="/login" replace={true} />
            )
          }
        />
        <Route
          path="/admin/articles"
          element={
            auth.isLoggedIn() ? (
              auth.getExpiryTime() && auth.loggedAdmin() ? (
                <Article />
              ) : (
                <Navigate to="/home" replace={true} />
              )
            ) : (
              <Navigate to="/login" replace={true} />
            )
          }
        />

        <Route
          path="/admin/AddArticle"
          element={
            auth.isLoggedIn() ? (
              auth.getExpiryTime() && auth.loggedAdmin() ? (
                <AddArticles />
              ) : (
                <Navigate to="/home" replace={true} />
              )
            ) : (
              <Navigate to="/login" replace={true} />
            )
          }
        />

        <Route
          path="/admin/editArticle/:articleId"
          element={
            auth.isLoggedIn() ? (
              auth.getExpiryTime() && auth.loggedAdmin() ? (
                <EditArticle />
              ) : (
                <Navigate to="/home" replace={true} />
              )
            ) : (
              <Navigate to="/login" replace={true} />
            )
          }
        />

        <Route
          path="/admin/Categories"
          element={
            auth.isLoggedIn() ? (
              auth.getExpiryTime() && auth.loggedAdmin() ? (
                <Categories />
              ) : (
                <Navigate to="/home" replace={true} />
              )
            ) : (
              <Navigate to="/login" replace={true} />
            )
          }
        />

        <Route
          path="/admin/AddCategorie"
          element={
            auth.isLoggedIn() ? (
              auth.getExpiryTime() && auth.loggedAdmin() ? (
                <AddCategorie />
              ) : (
                <Navigate to="/home" replace={true} />
              )
            ) : (
              <Navigate to="/login" replace={true} />
            )
          }
        />

        <Route
          path="/admin/editCategorie/:categorieId"
          element={
            auth.isLoggedIn() ? (
              auth.getExpiryTime() && auth.loggedAdmin() ? (
                <EditCategorie />
              ) : (
                <Navigate to="/home" replace={true} />
              )
            ) : (
              <Navigate to="/login" replace={true} />
            )
          }
        />
        <Route
          path="/admin/Comments"
          element={
            auth.isLoggedIn() ? (
              auth.getExpiryTime() && auth.loggedAdmin() ? (
                <Comments />
              ) : (
                <Navigate to="/home" replace={true} />
              )
            ) : (
              <Navigate to="/login" replace={true} />
            )
          }
        />

        <Route
          path="/admin/AddComment"
          element={
            auth.isLoggedIn() ? (
              auth.getExpiryTime() && auth.loggedAdmin() ? (
                <AddComment />
              ) : (
                <Navigate to="/home" replace={true} />
              )
            ) : (
              <Navigate to="/login" replace={true} />
            )
          }
        />

        <Route
          path="/admin/places"
          element={
            auth.isLoggedIn() ? (
              auth.getExpiryTime() && auth.loggedAdmin() ? (
                <Places />
              ) : (
                <Navigate to="/home" replace={true} />
              )
            ) : (
              <Navigate to="/login" replace={true} />
            )
          }
        />

        <Route
          path="/admin/AddPlace"
          element={
            auth.isLoggedIn() ? (
              auth.getExpiryTime() && auth.loggedAdmin() ? (
                <AddPlace />
              ) : (
                <Navigate to="/home" replace={true} />
              )
            ) : (
              <Navigate to="/login" replace={true} />
            )
          }
        />

        <Route
          path="/admin/editPlace/:placeId"
          element={
            auth.isLoggedIn() ? (
              auth.getExpiryTime() && auth.loggedAdmin() ? (
                <EditPlace />
              ) : (
                <Navigate to="/home" replace={true} />
              )
            ) : (
              <Navigate to="/login" replace={true} />
            )
          }
        />

        <Route
          path="/admin/users"
          element={
            auth.isLoggedIn() ? (
              auth.getExpiryTime() && auth.loggedAdmin() ? (
                <Users />
              ) : (
                <Navigate to="/home" replace={true} />
              )
            ) : (
              <Navigate to="/login" replace={true} />
            )
          }
        />

        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
