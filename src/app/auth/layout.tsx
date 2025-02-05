"use client";

import { styled } from "@mui/material";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const StyledDiv = styled("div")({
    backgroundImage: `url('/food.jpg')`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    overflow: "hidden",
});

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (isAuthenticated) {
            router.push("/");
        }
    }, [isAuthenticated, router]);

    if (isAuthenticated) {
        return null;
    }

    return <StyledDiv>{children}</StyledDiv>;
}
