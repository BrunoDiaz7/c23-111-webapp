import { styled, Typography, Box, Divider } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Form, CommonButton } from "@/Components";
import { useFormik } from "formik";
import Image from "next/image";
import { signUpFields, signUpSchema } from "../_utils";
import { useAuth } from "@/context/authContext";
import { useState } from "react";
import { toast } from "react-toastify";
import theme from "@/theme/theme";

const FormBox = styled(Grid)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-around",
  height: "100%",
  width: "100%",
  maxWidth: "940px",
  backgroundColor: "#ffff",
  borderRadius: "10px",
  padding: "20px",
  boxShadow: "14px 11px 14px -3px rgba(0,0,0,0.62)",
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

export const SignUpForm: React.FC = () => {
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: signUpSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        await register(values);
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
    <FormBox container spacing={{ sm: 1, md: 2 }}>
      <Grid
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "47%",
          [theme.breakpoints.down("md")]: { display: "none" },
        }}
        size={{ sm: 0, md: 5 }}
        component={"div"}
      >
        <FrameBox>
          <Image src="/Frame.png" alt="ilustracion" width="200" height="200" />
        </FrameBox>
      </Grid>

      <Divider orientation="vertical" variant="middle" />

      <Grid
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          alignItems: "center",
        }}
        size={{sm:12, md:6}}
        component={"div"}
      >
        <Typography variant="h1">Registrate</Typography>
        <Form sx={{ width: "60%" }} fields={signUpFields} formik={formik}>
          <CommonButton
            text="Registrarse"
            buttonSize="small"
            variant="contained"
            fontWeight={600}
            type="submit"
            loading={loading}
          />
        </Form>
      </Grid>
    </FormBox>
  );
};
