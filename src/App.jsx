import { Route, Routes } from "react-router";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import Pro from "./pages/Pro.jsx";
import Blog from "./pages/Blog.jsx";
import Article from "./pages/Article.jsx";
import Contact from "./pages/Contact.jsx";
import NotFound from "./pages/NotFound.jsx";
import Legal from "./pages/Legal.jsx";
import { cgu, cgv, mentions } from "./data/legal.js";
import "./styles/site.css";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/etablissements" element={<Pro />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<Article />} />
        <Route path="/contact" element={<Contact />} />
        <Route path={mentions.path} element={<Legal page={mentions} />} />
        <Route path={cgu.path} element={<Legal page={cgu} />} />
        <Route path={cgv.path} element={<Legal page={cgv} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}
