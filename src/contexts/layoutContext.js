import { createContext } from "react";

const LayoutContext = createContext({ state: { open: false }, dispatch: () => {} });
export default LayoutContext;
