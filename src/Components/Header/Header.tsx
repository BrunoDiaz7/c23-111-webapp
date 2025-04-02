"use client";
import { CommonButton, UserAvatar, } from "@/Components";
import {
  styled,
  Box,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";
import theme from "@/theme/theme";

const StyledHeader = styled("header")(() => ({
  display: "flex",
  padding: "25px",
  height: "128px",
  justifyContent: "space-between",
  alignItems: "center",
  background: "#fff",
  boxShadow: "0 5px 5px rgba(0, 0, 0, 0.15)",
  [theme.breakpoints.down("sm")]: {
    padding: "10px",
  }
}));

const FrameBox = styled(Box)({
  display: "flex",
  height: "80px",
  width: "80px",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#ffffff",
  borderRadius: "50%",
  border: "2px solid gray",
  transition: "transform 0.4s ease, box-shadow 0.4s ease",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 10px 10px rgba(0, 0, 0, 0.15)",
  },
});

type HeaderProps = {
  sx?: object;
};

export const Header: React.FC<HeaderProps> = ({ sx = {} }) => {
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();
  
  return (
    <StyledHeader sx={{ ...sx }}>
      <FrameBox>
        <Link href="/">
          <Image src="/logo.png" width={70} height={70} alt="logo de la empresa" />
        </Link>
      </FrameBox>

      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        {isAuthenticated ? (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography sx={{[theme.breakpoints.down("sm")]: {display: "none"}}} color={theme.palette.primary.main} variant="h4">
              Hola, {user?.name}!
            </Typography>
            <UserAvatar />
          </Box>
        ) : (
          <CommonButton
            text="Iniciar sesión"
            buttonSize="small"
            variant="contained"
            clickHandler={() => router.push("/auth")}
          />
        )}

        <CommonButton
          text="Sobre nosotros"
          buttonSize="small"
          variant="contained"
          clickHandler={() => router.push("/about-us")}
        />
      </Box>
    </StyledHeader>
  );
};
