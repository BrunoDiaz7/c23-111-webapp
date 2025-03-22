"use client";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Rating,
  styled,
  Drawer,
  useMediaQuery,
  Theme
} from "@mui/material";
import { useState } from "react";
import { SidebarRecipeContent } from "./SidebarRecipeContent";
import { getRatesById, getRecipeById } from "@/services/recipes";
import { recipe, recipeWithRates } from "@/types/recipes";
import { usePathname } from "next/navigation";
import theme from "@/theme/theme";

type RecipeCardProps = {
  recipe: recipe;
  sx?: object;
  status?: string;
  _id?: string;
  updateRecipes?: () => void;
};

const StyledCardContent = styled(CardContent)({
  display: "flex",
  flexDirection: "column",
  flex: "1 0 auto",
});

const StyledCard = styled(Card)({
  display: "flex",
  alignItems: "space-between",
  backgroundColor: "#ffffff",
  height: "90%",
  [theme.breakpoints.down("sm")]: {
    height: "150px"
  },
  margin: "5%",
  cursor: "pointer",
  transition:
    "transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 10px 10px rgba(0, 0, 0, 0.15)",
  },
});

export const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,
  sx,
  status,
  _id,
  updateRecipes,
}) => {
    const isMobile = useMediaQuery<Theme>(() => theme.breakpoints.down("sm"))
  const [open, setOpen] = useState(false);
  const [recipeData, setRecipeData] = useState<recipeWithRates>();
  const [ratesData, setRatesData] = useState([]);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);
  const pathname = usePathname();
  const handleUpdateRecipes = async () => {
    if (updateRecipes) await updateRecipes();
    setOpen(false);
  };
  const {
    id,
    name,
    description,
    rateAverage,
    totalRates,
    totalSteps,
    ingredients,
    image,
    missingIngredient,
  } = recipe;

  const backColor = (status: string | undefined) => {
    if (status === "approved") {
      return "#7bd76b";
    } else if (status === "pending") {
      return "#f48e28";
    } else {
      return "#FE645E";
    }
  };

  const getRecipeData = async (id: string | undefined) => {
    const response = await getRecipeById(id);
    const data = response.data.result.recipeWithRates;
    setRecipeData(data);
  };
  const getRatesData = async (id: string | undefined) => {
    const response = await getRatesById(id);
    const data = response.data.result;
    setRatesData(data);
  };
  const handleClick = async (id: string | undefined) => {
    try {
      await getRecipeData(id);
      await getRatesData(id);
      openDrawer();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <StyledCard
        onClick={() => {
          if (pathname === "/user/my-recipes") {
            handleClick(_id);
          } else {
            handleClick(id);
          }
        }}
        sx={{
          width: "100%",
          ...sx,
        }}
      >
        <CardMedia
          sx={{
            width: "40%",
            height: "auto",
            [theme.breakpoints.down("md")]: {
              width: "35%",
              maxHeight: "200px"
            }
          }}
          component="img"
          image={image}
          alt="imagen ilustrativa"
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <StyledCardContent>
            <Box className="flex flex-col">
              <Typography variant="h4">{name}</Typography>
              {missingIngredient?.length && missingIngredient.length > 0 && (
                <Typography variant="body2" sx={{ color: "red" }}>
                  faltan: {missingIngredient?.length} ingredientes
                </Typography>
              )}
              {(pathname === "/admin" || pathname === "/user/my-recipes") && (
                <Box
                  sx={{
                    backgroundColor: backColor(status),
                    borderRadius: "10px",
                    padding: "2px",
                  }}
                >
                  <Typography variant="body2" sx={{ color: "white" }}>
                    {status}
                  </Typography>
                </Box>
              )}

              {pathname === "/" && (
                <Box className="flex gap-1">
                  ({totalRates}){" "}
                  <Rating sx={{[theme.breakpoints.down("md")]: {fontSize: 15}}} readOnly value={rateAverage} precision={0.5} />
                  {totalRates === 0 ? "" : rateAverage.toFixed(1)}
                </Box>
              )}
            </Box>
            {isMobile ? 
              null
              :
              (
                <StyledCardContent sx={{ padding: "0" }}>
                <Typography variant="caption">📋 {totalSteps} pasos</Typography>
                <Typography variant="caption">
                  🍴 {ingredients.length} ingredientes
                </Typography>
              </StyledCardContent>
              )
            }

            <CardContent sx={{ padding: "5px 0", [theme.breakpoints.down("sm")]: {padding: 0} }}>
              <Typography variant="body1">{description}</Typography>
            </CardContent>
          </StyledCardContent>
        </Box>
      </StyledCard>
      <Drawer
        open={open}
        onClose={closeDrawer}
        anchor="right"
        sx={{
          width: 500,
          maxWidth: "100%",
          flexShrink: 0,
          my: 2,
          "& .MuiDrawer-paper": {
            width: 500,
            maxWidth: "100%",
            boxSizing: "border-box",
          },
        }}
      >
        {recipeData && (
          <SidebarRecipeContent
            prop={{
              ...recipeData,
              closeDrawer: closeDrawer,
              rates: ratesData,
              updateRates: getRatesData,
              updateRecipes: handleUpdateRecipes,
            }}
          />
        )}
      </Drawer>
    </>
  );
};
