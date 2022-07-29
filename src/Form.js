import { TextField, Button, Stack, Grid } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormHelperText from "@mui/material/FormHelperText";
import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";

const FormReact = () => {
  const validationSchema = Yup.object({
    nom: Yup.string().required("nom FB requis"),
    email: Yup.string().email("Email non valide").required("Email requis"),
    CIU: Yup.string().required("CIU requis"),
    sexe: Yup.string().required("Sexe requis")
  });
  const formik = useFormik({
    initialValues: {
      nom: "",
      email: "",
      CIU: "",
      sexe: ""
    },
    onSubmit: (val, { resetForm }) => {
      console.log(val);
      resetForm();
    },
    validationSchema
  });

  const {
    handleChange,
    values,
    handleSubmit,
    touched,
    handleBlur,
    errors,
    resetForm
  } = formik;
  return (
    <Grid container>
      <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
        <FormikProvider value={formik}>
          <Form autoComplete="off" onSubmit={handleSubmit}>
            <Stack spacing={3} direction="column">
              <h2>Form</h2>

              <TextField
                label="Nom FB"
                name="nom"
                onChange={handleChange}
                value={values.nom}
                onBlur={handleBlur}
                error={Boolean(touched.nom && errors.nom)}
                helperText={touched.nom && errors.nom}
              />
              <TextField
                label="email"
                name="email"
                onChange={handleChange}
                value={values.email}
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
              />
              <TextField
                label="CIU"
                name="CIU"
                onChange={handleChange}
                value={values.CIU}
                error={Boolean(touched.CIU && errors.CIU)}
                helperText={touched.CIU && errors.CIU}
              />
              <FormControl error={Boolean(touched.sexe && errors.sexe)}>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Sexe
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="sexe"
                  value={values.sexe}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                </RadioGroup>
                <FormHelperText>{touched.sexe && errors.sexe}</FormHelperText>
              </FormControl>
              <Button variant="contained" type="submit">
                Save
              </Button>
              <Button
                variant="outlined"
                type="button"
                onClick={() => resetForm()}
              >
                Annuler
              </Button>
            </Stack>
          </Form>
        </FormikProvider>
      </Grid>
    </Grid>
  );
};

export default FormReact;
