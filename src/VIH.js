import { TextField, Button, Stack, Grid } from "@mui/material";
import frLocale from "date-fns/locale/fr";
import { frFR as calFR } from "@mui/x-date-pickers";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormHelperText from "@mui/material/FormHelperText";
import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const FormReact = () => {
  const validationSchema = Yup.object({
    nomFB: Yup.string().required("Nom FB requis"),
    sexe: Yup.string().required("Sexe requis"),
    dateCollecte: Yup.string("La date de collecte n'est pas valide").required(
      "Date requis"
    ),
    prenom: Yup.string().required("Prénom PAX requis"),
    CIU: Yup.string().required("CIU requis")
    // typeCible: Yup.string().required("Type cible requis"),
    // region: Yup.string().required("Région requis"),
    // tDemande: Yup.string().required("Typ de demande requis"),
    // referent: Yup.string().required("Référent requis"),
    // pSensibilisation: Yup.string().required("Page de sensibilisation requise")
  });
  const formik = useFormik({
    initialValues: {
      nomFB: "",
      sexe: "",
      dateCollecte: "",
      prenom: "",
      CIU: ""
      // typeCible: "",
      // region: "",
      // tDemande: "",
      // referent: "",
      // pSensibilisation: ""
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
    resetForm,
    setFieldValue
  } = formik;
  return (
    <Grid container>
      <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
        <FormikProvider value={formik}>
          <Form autoComplete="off" onSubmit={handleSubmit}>
            <Stack spacing={3} direction="column">
              <h2>Form VIH</h2>

              <TextField
                label="Nom FB"
                name="nomFB"
                onChange={handleChange}
                value={values.nomFB}
                onBlur={handleBlur}
                error={Boolean(touched.nomFB && errors.nomFB)}
                helperText={touched.nomFB && errors.nomFB}
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
              <LocalizationProvider
                dateAdapter={AdapterDateFns}
                adapterLocale={frLocale}
                localeText={
                  calFR.components.MuiLocalizationProvider.defaultProps
                    .localeText
                }
              >
                <DatePicker
                  label="Date de collecte"
                  value={values.dateCollecte}
                  name="dateCollecte"
                  onChange={(value) => setFieldValue("dateCollecte", value)}
                  onBlur={handleBlur}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      error={Boolean(
                        touched.dateCollecte && errors.dateCollecte
                      )}
                      helperText={touched.dateCollecte && errors.dateCollecte}
                    />
                  )}
                  disableFuture
                  variant="standard"
                />
              </LocalizationProvider>
              <TextField
                label="Prenom PAX"
                prenom
                name="prenom"
                onChange={handleChange}
                value={values.prenom}
                error={Boolean(touched.prenom && errors.prenom)}
                helperText={touched.prenom && errors.prenom}
              />
              <TextField
                label="CIU"
                name="CIU"
                onChange={handleChange}
                value={values.CIU}
                error={Boolean(touched.CIU && errors.CIU)}
                helperText={touched.CIU && errors.CIU}
              />

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
