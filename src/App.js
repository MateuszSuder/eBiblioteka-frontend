import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Layout from "./components/Layout/Layout";
import BookList from "./views/BookList/BookList";
import Profile from "./views/Profile";
import Login from "./views/Login/Login";
import React from "react";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterMoment} from "@mui/x-date-pickers/AdapterMoment";
import Register from "./views/Login/Register";
import Book from "./views/Book/Book";
import AdminPanel from "./views/AdminPanel/AdminPanel";

function App() {
  return (
      <LocalizationProvider dateAdapter={AdapterMoment}>
          <BrowserRouter>
              <Routes>
                  <Route element={<Layout container={true} />}>
                      <Route path="/" element={<BookList />}/>
                      <Route path="/book/:bookId" element={<Book />}/>
                  </Route>
                  <Route element={<Layout container={false} />}>
                      <Route path="/profile" element={<Profile />}/>
                      <Route path="/admin" element={<Navigate to="/admin/users" />} />
                      <Route path="/admin/:subPage" element={<AdminPanel />}/>
                  </Route>
                  <Route path="/login" element={<Login />}/>
                  <Route path="/register" element={<Register />} />
              </Routes>
          </BrowserRouter>
      </LocalizationProvider>
  );
}

export default App;
