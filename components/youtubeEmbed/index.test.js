import React from "react";
import ReactDOM from "react-dom";
import YoutubeEmbed from "./index";
import { render } from "@testing-library/react";

describe("YoutubeEmbed Component", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<YoutubeEmbed embedId="abc123" />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("renders with correct embedId prop", () => {
    const { getByTitle } = render(<YoutubeEmbed embedId="abc123" />);
    const iframe = getByTitle("Embedded youtube");
    expect(iframe.src).toContain("abc123");
  });
});
