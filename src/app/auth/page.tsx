"use client";
import { AnimatePresence } from "framer-motion";
import * as motion from "motion/react-client";
import { Container, styled } from "@mui/material";
import { useState } from "react";
import { LogInForm } from "./_components/LogInForm";
import { SignUpForm } from "./_components/SignUpForm";
import theme from "@/theme/theme";
import { CommonButton } from "@/Components";
import { useRouter } from "next/navigation";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

const PageContainer = styled(Container)({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100vh",
    position: "relative",
});

const StyledNav = styled("nav")({
    margin: "7%",
});

const TabsContainer = styled("ul")({
    display: "flex",
    backgroundColor: "whitesmoke",
    borderRadius: "5px",
    boxShadow: "9px 9px 20px -9px rgba(0,0,0,0.39)",
});

const tabStyle: React.CSSProperties = {
    padding: "10px 20px",
    cursor: "pointer",
    borderRadius: "5px",
};

const underline: React.CSSProperties = {
    height: "2px",
    backgroundColor: "#f5f5f5",
    marginTop: "5px",
};

const AuthPage: React.FC = () => {
    const router = useRouter();
    const [selectedForm, setSelectedForm] = useState<
        "Iniciar sesión" | "Crear cuenta"
    >("Iniciar sesión");

    return (
        <PageContainer>
            <CommonButton
                text="Inicio"
                buttonSize="small"
                variant="contained"
                startIcon={<ArrowBackRoundedIcon />}
                clickHandler={() => router.push("/")}
                sx={{
                    mt: "12px",
                    position: "absolute",
                    top: "100px",
                    left: "200px",
                }}
            />
            <StyledNav>
                <TabsContainer>
                    {["Iniciar sesión", "Crear cuenta"].map((tab) => (
                        <motion.li
                            style={tabStyle}
                            key={tab}
                            initial={false}
                            animate={{
                                backgroundColor:
                                    tab === selectedForm
                                        ? [theme.palette.primary.main]
                                        : "#eee0",
                            }}
                            transition={{ duration: 0.4 }}
                            onClick={() =>
                                setSelectedForm(
                                    tab as "Iniciar sesión" | "Crear cuenta"
                                )
                            }
                        >
                            {tab}
                            {tab === selectedForm ? (
                                <motion.div
                                    style={underline}
                                    layoutId="underline"
                                />
                            ) : null}
                        </motion.li>
                    ))}
                </TabsContainer>
            </StyledNav>
            <main>
                <AnimatePresence mode="wait">
                    {selectedForm === "Iniciar sesión" && (
                        <motion.div
                            key="logIn"
                            initial={{ x: 600, opacity: 0, display: "flex" }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{
                                x: -600,
                                opacity: 0,
                            }}
                            transition={{ duration: 0.4 }}
                        >
                            <LogInForm />
                        </motion.div>
                    )}
                    {selectedForm === "Crear cuenta" && (
                        <motion.div
                            key="signUp"
                            initial={{ x: -600, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: 600, opacity: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <SignUpForm />
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </PageContainer>
    );
};

export default AuthPage;
