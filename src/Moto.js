import { useState } from "react";
import {
  Button,
  Stack,
  Grid,
  Autocomplete,
  Box,
  ButtonGroup
} from "@mui/material";
import TextField from "@material-ui/core/TextField";
import frLocale from "date-fns/locale/fr";
import { frFR as calFR } from "@mui/x-date-pickers";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";
import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const MotoNewForm = () => {
  const validationSchema = Yup.object({
    nom: Yup.string().required("Nom moto requis"),
    dateEntree: Yup.date("La date d'entree n'est pas valide").required(
      "Date requis"
    ),
    numMoteur: Yup.string().required("Num moteur requis"),
    FRN: Yup.string().required("FRN requis"),
    localisation: Yup.string().required("Localisation requis"),
    PA: Yup.number().required("PA requis")
    // tDemande: Yup.string().required("Typ de demande requis"),
    // referent: Yup.string().required("Référent requis"),
    // pSensibilisation: Yup.string().required("Page de sensibilisation requise")
  });
  const formik = useFormik({
    initialValues: {
      nom: "",
      dateEntree: "",
      numMoteur: "",
      FRN: "",
      localisation: "",
      PA: 0
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

  const options = [
    { label: "Depot", year: 1994 },
    { label: "Showroom", year: 1972 }
  ];

  const [value, setValue] = useState(null);
  return (
    <Grid container>
      <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
        <FormikProvider value={formik}>
          <Form autoComplete="off" onSubmit={handleSubmit}>
            <Stack spacing={3} direction="column">
              <h2>Form MOTO</h2>

              <TextField
                label="Nom moto"
                name="nom"
                onChange={handleChange}
                value={values.nom}
                onBlur={handleBlur}
                error={Boolean(touched.nom && errors.nom)}
                helperText={touched.nom && errors.nom}
              />

              <LocalizationProvider
                dateAdapter={AdapterDateFns}
                adapterLocale={frLocale}
                localeText={
                  calFR.components.MuiLocalizationProvider.defaultProps
                    .localeText
                }
              >
                <DatePicker
                  label="Date d'entree'"
                  value={values.dateEntree}
                  name="dateEntree"
                  onChange={(value) => setFieldValue("dateEntree", value)}
                  onBlur={handleBlur}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      error={Boolean(touched.dateEntree && errors.dateEntree)}
                      helperText={touched.dateEntree && errors.dateEntree}
                    />
                  )}
                  disableFuture
                />
              </LocalizationProvider>
              <TextField
                label="Num moteur"
                name="numMoteur"
                onChange={handleChange}
                value={values.numMoteur}
                error={Boolean(touched.numMoteur && errors.numMoteur)}
                helperText={touched.numMoteur && errors.numMoteur}
              />
              <TextField
                label="FRN"
                name="FRN"
                onChange={handleChange}
                value={values.FRN}
                error={Boolean(touched.FRN && errors.FRN)}
                helperText={touched.FRN && errors.FRN}
              />

              <Autocomplete
                name="localisation"
                fullWidth
                options={options}
                autoHighlight
                getOptionLabel={(option) => option.label}
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
                inputValue={values.localisation}
                onInputChange={(event, newInputValue) => {
                  setFieldValue("localisation", newInputValue);
                }}
                freeSolo
                renderOption={(props, option) => (
                  <Box
                    component="li"
                    sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                    {...props}
                  >
                    {option.label}
                  </Box>
                )}
                renderInput={(params) => (
                  <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                    <TextField
                      {...params}
                      label="Localisation"
                      error={Boolean(
                        touched.localisation && errors.localisation
                      )}
                      helperText={touched.localisation && errors.localisation}
                    />
                  </Box>
                )}
              />
              <CurrencyTextField
                name="PA"
                label="PA"
                variant="standard"
                value={values.PA}
                currencySymbol="Ar"
                outputFormat="number"
                decimalCharacter=","
                digitGroupSeparator=" "
                onChange={(event, value) => setFieldValue("PA", value)}
                error={Boolean(touched.PA && errors.PA)}
                helperText={touched.PA && errors.PA}
              />
              <ButtonGroup>
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
              </ButtonGroup>
            </Stack>
          </Form>
        </FormikProvider>
      </Grid>
    </Grid>
  );
};

export default MotoNewForm;
