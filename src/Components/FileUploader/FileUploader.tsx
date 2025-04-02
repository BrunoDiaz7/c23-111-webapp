import { Button, styled, Typography, Box, useMediaQuery } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import WarningIcon from "@mui/icons-material/Warning";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import theme from "@/theme/theme";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const Label = styled("label")({
  color: "#494949",
  fontSize: "15px",
  fontWeight: "500",
  marginBottom: "5px",
  "&::after": {
    content: "' *'",
    color: "#fe645e",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "12px",
  },
});

type FileUploaderProps = {
  formik: any;
  label: string;
  name: string;
  placeholder: string;
};

export const FileUploader: React.FC<FileUploaderProps> = ({
  formik,
  name,
  label,
  placeholder,
}) => {
  const [preview, setPreview] = useState<string | undefined>(undefined);
  const smUp = useMediaQuery(theme.breakpoints.up("sm"));
  const touchedAndError = formik.touched[name] && formik.errors[name];

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);

      formik.setFieldValue(name, file);
    },
    [formik, name]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/png": [], "image/jpg": [], "image/jpeg": [] },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      formik.setFieldValue(name, file);
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col w-full">
      <Label>{placeholder}</Label>

      {smUp ? (
        <div
          {...getRootProps()}
          style={{ borderColor: "#F48E28" }}
          className="border-dashed border-2 p-4 text-center cursor-pointer"
        >
          <input
            type="file"
            accept="image/png, image/jpg, image/jpeg"
            name={name}
            {...getInputProps()}
          />
          {isDragActive ? (
            <Typography variant="body2">Suelta los archivos aquí...</Typography>
          ) : (
            <Typography variant="caption">
              Arrastra y suelta archivos aquí o haz clic para seleccionarlos
            </Typography>
          )}
        </div>
      ) : (
        <Button
          component="label"
          variant="contained"
          fullWidth
          startIcon={<CloudUploadIcon />}
          aria-label="Subir archivo"
        >
          {label}
          <VisuallyHiddenInput
            type="file"
            accept="image/png, image/jpg, image/jpeg"
            name={name}
            onChange={handleFileChange}
          />
        </Button>
      )}
      {touchedAndError ? (
        <div>
          <WarningIcon
            sx={{
              verticalAlign: "middle",
              marginRight: "5px",
              fontSize: "15px",
              color: "#fe645e",
            }}
          />
          <span style={{ color: "#fe645e", verticalAlign: "middle" }}>
            {formik.errors[name]}
          </span>
        </div>
      ) : null}

      {preview && !smUp && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "280px",
            border: "3px solid #F48E28",
            borderRadius: "10px",
            marginTop: "5%",
          }}
        >
          <img
            style={{
              width: "95%",
              height: "95%",
              borderRadius: "10px",
              objectFit: "contain",
            }}
            src={preview}
            alt="Vista previa"
          />
        </Box>
      )}
    </div>
  );
};
