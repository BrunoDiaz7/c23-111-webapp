"use client";
// import { img } from "framer-motion/client";
import Image from "next/image";
import juanImg from "../../../public/img/juan-ramirez.jpg";
import leandroImg from "../../../public/img/leandro-schugurensky.jpg";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import { BackButton } from "@/Components/BackButton/BackButton";

export default function AboutUs() {
    const compañeros = [
        {
            nombre: "Antonio Navarro",
            img: "https://github.com/anavarro81.png",
            linkedin:
                "https://www.linkedin.com/in/antonio-navarro-del-dujo-b16303164/",
            github: "https://github.com/anavarro81",
            rol: "Backend",
        },
        {
            nombre: "Juan Ramirez",
            img: juanImg,
            linkedin: "https://www.linkedin.com/in/juan-ramirez-490b84271/",
            github: "https://github.com/juanRCoder",
            rol: "Backend",
        },
        {
            nombre: "Leandro Schugurensky",
            img: leandroImg,
            linkedin: "https://www.linkedin.com/in/leanschugu/",
            github: "https://github.com/Schugu",
            rol: "Backend",
        },
        {
            nombre: "Dulce Nevarez",
            img: "https://github.com/DulceNev.png",
            linkedin:
                "https://www.linkedin.com/in/dulce-nevarez-castorena-396757269/",
            github: "https://github.com/DulceNev",
            rol: "Frontend",
        },
        {
            nombre: "Bruno Diaz",
            img: "https://github.com/BrunoDiaz7.png",
            linkedin: "https://www.linkedin.com/in/brunoleandrodiaz/",
            github: "https://github.com/BrunoDiaz7",
            rol: "Frontend",
        },
    ];

    return (
        <>
            <div className="w-full min-h-screen p-10 xl:p-15 bg-fondo bg-no-repeat bg-cover">
                <BackButton />

                <div className="h-full w-full bg-[#f5f5f5] p-10 rounded-2xl grid grid-cols-1 xl:grid-cols-[700px_1fr]  items-start relative">
                    <div className="xl:sticky top-10 right-0">
                        <h1 className="font-bold text-5xl text-primary">
                            Sobre <br />
                            Nosotros...
                        </h1>
                        <p className="my-5 text-lg">
                            Hola! Somos un equipo de desarrolladores creado por
                            la plataforma de{" "}
                            <span className="text-primary font-semibold">
                                NoCountry
                            </span>{" "}
                            unidos por la pasión de crear soluciones
                            tecnológicas innovadoras. Provenientes de distintos
                            países, nos unimos para dar vida a un proyecto
                            único:{" "}
                            <span className="text-primary font-semibold">
                                un recetario interactivo.
                            </span>{" "}
                            Este proyecto permite a los usuarios encontrar
                            recetas deliciosas y adaptadas a sus necesidades
                            mediante filtros fáciles de usar. Nuestro equipo
                            está compuesto por tres desarrolladores{" "}
                            <span className="text-primary font-semibold">
                                Backend
                            </span>{" "}
                            y dos{" "}
                            <span className="text-primary font-semibold">
                                Frontend
                            </span>{" "}
                            , trabajando de manera colaborativa para crear una
                            plataforma intuitiva y dinámica. ¡Nos encanta
                            compartir nuestra pasión por la programación y la
                            cocina!
                        </p>
                    </div>
                    <section>
                        <div className="flex justify-center items-center flex-wrap">
                            {compañeros
                                .filter(
                                    (companiero) => companiero.rol == "Backend"
                                )
                                .map((compañero) => {
                                    return (
                                        <div
                                            key={compañero.nombre}
                                            className="group bg-white w-44 h-64 flex flex-col justify-between items-center p-3 text-center m-3 rounded-xl hover:shadow-lg transition"
                                        >
                                            <div className="w-[140px] h-[140px] overflow-hidden rounded-full">
                                                <Image
                                                    src={compañero.img}
                                                    alt={compañero.nombre}
                                                    width={150}
                                                    height={150}
                                                    className="rounded-2xl w-full h-full object-cover group-hover:scale-110 transition"
                                                />
                                            </div>
                                            <h2 className="font-semibold text-primary">
                                                {compañero.nombre}
                                            </h2>
                                            <p>{compañero.rol}</p>
                                            <div className="flex justify-between gap-3">
                                                <a
                                                    className="hover:text-primary transition-colors"
                                                    href={compañero.github}
                                                    target="_blank"
                                                >
                                                    <GitHubIcon
                                                        href={compañero.github}
                                                    />
                                                </a>

                                                <a
                                                    className="hover:text-primary transition-colors"
                                                    href={compañero.linkedin}
                                                    target="_blank"
                                                >
                                                    <LinkedInIcon
                                                        href={
                                                            compañero.linkedin
                                                        }
                                                    />
                                                </a>
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                        <div className="flex justify-center items-center flex-wrap">
                            {compañeros
                                .filter(
                                    (companiero) => companiero.rol == "Frontend"
                                )
                                .map((compañero) => {
                                    return (
                                        <div
                                            key={compañero.nombre}
                                            className="group bg-white w-44 h-64 flex flex-col justify-between items-center p-3 text-center m-3 rounded-xl hover:shadow-lg transition"
                                        >
                                            <div className="w-[140px] h-[140px] overflow-hidden rounded-full">
                                                <Image
                                                    src={compañero.img}
                                                    alt={compañero.nombre}
                                                    width={150}
                                                    height={150}
                                                    className="rounded-2xl w-full h-full object-cover group-hover:scale-110 transition"
                                                />
                                            </div>
                                            <h2 className="font-semibold text-primary">
                                                {compañero.nombre}
                                            </h2>
                                            <p>{compañero.rol}</p>
                                            <div className="flex justify-between gap-3">
                                                <a
                                                    className="hover:text-primary transition-colors"
                                                    href={compañero.github}
                                                    target="_blank"
                                                >
                                                    <GitHubIcon
                                                        href={compañero.github}
                                                    />
                                                </a>

                                                <a
                                                    className="hover:text-primary transition-colors"
                                                    href={compañero.linkedin}
                                                    target="_blank"
                                                >
                                                    <LinkedInIcon
                                                        href={
                                                            compañero.linkedin
                                                        }
                                                    />
                                                </a>
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}
