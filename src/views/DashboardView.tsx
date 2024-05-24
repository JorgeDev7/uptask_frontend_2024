import { Link } from "react-router-dom";

export default function DashboardView() {
    return (
        <>
            <h1 className="text-3xl md:text-5xl font-black">Mis Proyectos</h1>
            <p className="md:text-2xl font-light text-gray-500 mt-2 md:mt-5">Maneja y administra tus proyectos</p>

            <nav className="my-5">
                <Link
                    className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold transition-colors"
                    to="/projects/create"
                >Nuevo Proyecto</Link>
            </nav>
        </>
    );
}
