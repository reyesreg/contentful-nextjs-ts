import React from "react";
import { Layout } from "antd";

const { Footer } = Layout;

const CustomFooter = () => (
  <Footer>
    <a href="https://hubblesite.org/" target="_blank" rel="noopener noreferrer">
      Made by Regine with Contentful & Next.js
    </a>
  </Footer>
);

export default CustomFooter;