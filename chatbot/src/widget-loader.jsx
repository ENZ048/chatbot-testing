import React from "react";
import ReactDOM from "react-dom/client";
import WidgetElement from "./WidgetElement";

class ChatbotWidget extends HTMLElement {
  connectedCallback() {
    const mountPoint = document.createElement("div");
    this.attachShadow({ mode: "open" }).appendChild(mountPoint);

    ReactDOM.createRoot(mountPoint).render(<WidgetElement />);
  }
}

customElements.define("chatbot-widget", ChatbotWidget);
