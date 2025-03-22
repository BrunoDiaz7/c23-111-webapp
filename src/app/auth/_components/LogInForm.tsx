import Grid from "@mui/material/Grid2";
import { styled, Typography, Box, Divider } from "@mui/material";
import { Form, CommonButton } from "@/Components";
import { useFormik } from "formik";
import { logInSchema, logInfields } from "../_utils";
import Image from "next/image";
import { useAuth } from "@/context/authContext";
import { useState } from "react";
import { toast } from "react-toastify";
import theme from "@/theme/theme";

const FormBox = styled(Grid)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-around",
  height: "100%",
  backgroundColor: "#ffff",
  borderRadius: "10px",
  boxShadow: "14px 11px 14px -3px rgba(0,0,0,0.62)",
  width: "100%",
});

const FrameBox = styled(Box)({
  display: "flex",
  height: "250px",
  width: "250px",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#ffffff",
  borderRadius: "50%",
  border: "1px solid black",
});

export const LogInForm: React.FC = () => {
  const { signIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: logInSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        await signIn(values);
      } catch (error) {
        if (error) {
          toast.error(`${error}`);
        }
      } finally {
        setLoading(false);
      }
    },
  });
  return (
    <FormBox container spacing={{sm: 1, md:2}}>
      <Grid
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          alignItems: "center",
          [theme.breakpoints.down("md")]: {
            gap: "15px"
          }
        }}
        size={{sm: 12, md: 6}}
        component={"div"}
      >
        <>
          <Typography
            sx={{ marginTop: "3%", textAlign: "center" }}
            variant="h1"
          >
            ¡Bienvenido!
          </Typography>
          <Typography variant="body2">Nos alegra tenerte de vuelta.</Typography>
        </>
        <Form sx={{ width: "60%" }} fields={logInfields} formik={formik}>
          <CommonButton
            text="Iniciar sesión"
            buttonSize="small"
            variant="contained"
            fontWeight={600}
            type="submit"
            loading={loading}
          />
        </Form>
      </Grid>

      <Divider orientation="vertical" variant="middle" />

      <Grid
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "47%",
          [theme.breakpoints.down("md")]: {
            display: "none"
          }
        }}
        size={{sm: 0, md: 5}}
        component={"div"}
      >
        <FrameBox>
          <Image src="/Frame1.png" alt="ilustracion" width="200" height="200" />
        </FrameBox>
      </Grid>
    </FormBox>
  );
};
