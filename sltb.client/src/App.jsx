import RouterBuilder from "./routes/route.jsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {useMemo} from "react";
import {SessionProvider} from "@/context/auth.jsx";

function App() {
    const routes = useMemo(() => RouterBuilder(), []);

    return  <SessionProvider>
        <RouterProvider router={createBrowserRouter(routes)} />
    </SessionProvider>;
};

export default App
