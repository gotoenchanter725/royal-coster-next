import { createContext } from "react";

export default function GlobalContext() {
  createContext({
    blogItems: [],
    update: (data) => {},
  });
}
