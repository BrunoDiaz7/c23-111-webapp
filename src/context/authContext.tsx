"use client";

import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from "react";
import { logIn } from "@/services/auth";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { signUpCredentials } from "@/types/auth";
import { signUp } from "@/services/auth";

interface User {
    _id: string;
    name: string;
    email: string;
    rol: string;
    favouritesRecipes: string[];
    createdAt: string;
}

interface LogInCredentials {
    email: string;
    password: string;
}

interface AuthContextProps {
    user: User | null;
    isAuthenticated: boolean;
    signIn: (credentials: LogInCredentials) => Promise<void>;
    register: (credentials: signUpCredentials) => Promise<void>;
    signOut: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    useEffect(() => {
        const token = Cookies.get("token");
        const userData = Cookies.get("user");

        if (token && userData) {
            try {
                const parsedUser = JSON.parse(userData);
                setUser(parsedUser);
            } catch (error) {
                console.error("Error parsing user data from cookies:", error);
            }
        }
    }, []);

    const signIn = async (credentials: LogInCredentials) => {
        try {
            const response = await logIn(credentials);
            const { token, user } = response.data;

            Cookies.set("token", token, { expires: 1 });
            Cookies.set("user", JSON.stringify(user), { expires: 1 });
            Cookies.set("rol", user.rol);

            setUser(user);
            router.push("/");
        } catch (error) {
            console.error("Error during login:", error);
            throw error;
        }
    };

    const signOut = () => {
        Cookies.remove("token");
        Cookies.remove("user");
        Cookies.remove("rol");
        setUser(null);
        router.push("/");
    };

    const register = async (credentials: signUpCredentials) => {
        try {
            const response = await signUp(credentials);
            const { token, user } = response.data;

            Cookies.set("token", token, { expires: 7 });
            Cookies.set("user", JSON.stringify(user), { expires: 7 });

            setUser(user);

            if (user.rol === "admin") {
                router.push("/admin");
            } else {
                router.push("/");
            }
        } catch (error) {
            console.error("Error al registrar usuario", error);
            throw error;
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                signIn,
                register,
                signOut,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
