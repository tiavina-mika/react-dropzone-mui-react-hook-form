import { Box, Button, Typography } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import DropzoneField from "./components/DropzoneField";
import { useEffect } from "react";
import { getFileFromUrl } from "./utils/fileUtils";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  MAX_IMAGES_UPLOAD,
  MAX_IMAGE_UPLOAD,
  uploadSchema
} from "./utils/validations/uploadValidations";

const imageUrls = [
  // "https://static01.nyt.com/images/2021/09/14/science/07CAT-STRIPES/07CAT-STRIPES-superJumbo.jpg?quality=75&auto=webp",
  "https://images.pexels.com/photos/617278/pexels-photo-617278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
];

const multipleImagesUrls = [
  "https://static01.nyt.com/images/2021/09/14/science/07CAT-STRIPES/07CAT-STRIPES-superJumbo.jpg?quality=75&auto=webp",
  "https://images.pexels.com/photos/617278/pexels-photo-617278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
];

/**
 * get form initial values
 */
const getInitialValues = async () => {
  const images = await Promise.all(
    imageUrls.map((url: string) => getFileFromUrl(url))
  );

  const multipleImages = await Promise.all(
    multipleImagesUrls.map((url: string) => getFileFromUrl(url))
  );

  return {
    image: images,
    images: multipleImages
  };
};

const Form = () => {
  const form = useForm({
    mode: "onChange",
    resolver: zodResolver(uploadSchema)
  });

  // load default values
  useEffect(() => {
    // async form default values
    const init = async () => {
      const defaultValues = await getInitialValues();
      form.reset(defaultValues);
    };
    init();
  }, [form]);

  const { handleSubmit } = form;

  const onSubmit = (values) => console.log("values", values);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
      }}
    >
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* -------- inputs -------- */}
          <DropzoneField
            name="image"
            label="Image"
            inputLabel="Add image"
            maxFiles={MAX_IMAGE_UPLOAD}
          />
          <DropzoneField
            name="images"
            label="Images"
            inputLabel="Add images"
            maxFiles={MAX_IMAGES_UPLOAD}
          />
          <DropzoneField
            name="csv"
            label="CSV"
            inputLabel="Add csv"
            type="csv"
            sx={{ mt: 2 }}
          />

          {/* -------- button -------- */}
          <Box mt={1}>
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </Box>
        </form>
      </FormProvider>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <a href="https://www.linkedin.com/in/tiavina-michael-ralainirina/">
          <Typography>By Tiavina Michael Ralainirina</Typography>
        </a>
      </Box>
    </Box>
  );
};

export default Form;
