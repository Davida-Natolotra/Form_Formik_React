import { useState, useEffect, useRef, useMemo } from "react";
import {
  TextField,
  Button,
  Stack,
  Grid,
  Autocomplete,
  Box
} from "@mui/material";
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
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import PinDropIcon from "@mui/icons-material/PinDrop";
import { referent$ } from "./store";

const FormReact = () => {
  const validationSchema = Yup.object({
    nomFB: Yup.string().required("Nom FB requis"),
    sexe: Yup.string().required("Sexe requis"),
    dateCollecte: Yup.string("La date de collecte n'est pas valide").required(
      "Date requis"
    ),
    prenom: Yup.string().required("Prénom PAX requis"),
    CIU: Yup.string().required("CIU requis"),
    typeCible: Yup.string().required("Type cible requis"),
    region: Yup.string().required("Région requis"),
    tDemande: Yup.string().required("Typ de demande requis"),
    referent: Yup.string().required("Référent requis")
    // pSensibilisation: Yup.string().required("Page de sensibilisation requise")
  });
  const formik = useFormik({
    initialValues: {
      nomFB: "",
      sexe: "",
      dateCollecte: "",
      prenom: "",
      CIU: "",
      typeCible: "",
      region: "",
      tDemande: "",
      referent: []
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

  const options = [{ label: "HSH" }, { label: "PS" }, { label: "UDI" }];
  const regions = [
    { label: "BOENY" },
    { label: "DIANA" },
    { label: "SAVA" },
    { label: "BETSIBOKA" },
    { label: "MELAKY" },
    { label: "SOFIA" },
    { label: "ANALAMANGA" },
    { label: "VAKINANKARATRA" },
    { label: "ALAOTRA MANGORO" },
    { label: "ATSINANANA" },
    { label: "ITASY" },
    { label: "BONGOLAVA" },
    { label: "HAUTE MATSIATRA" },
    { label: "ATSIMO ANDREFANA" },
    { label: "VATOVAVY" },
    { label: "FITOVINANY" },
    { label: "ANDROY" },
    { label: "MENABE" },
    { label: "IHOROMBE" }
  ];

  const [referents, setReferents] = useState([]);
  const [referentsListe, setReferentsListe] = useState([]);

  useEffect(() => {
    const sub = referent$.subscribe(setReferents);
    return () => sub.unsubscribe();
  }, []);

  useEffect(() => {
    setReferentsListe(
      referents.find((val) => val.region === values.region)?.lieu || []
    );
  }, [referents, values.region]);

  const [value, setValue] = useState(null);
  const [valRegion, setValRegion] = useState(null);
  const [valRef, setValRef] = useState(null);

  return (
    <Grid container>
      <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
        <FormikProvider value={formik}>
          <Form autoComplete="off" onSubmit={handleSubmit}>
            <Stack spacing={3} direction="column">
              <h2>Form VIH</h2>

              <TextField
                variant="standard"
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
                    label="Feminin"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Masculin"
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
                      variant="standard"
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
                variant="standard"
                label="Prenom PAX"
                prenom
                name="prenom"
                onChange={handleChange}
                value={values.prenom}
                error={Boolean(touched.prenom && errors.prenom)}
                helperText={touched.prenom && errors.prenom}
              />
              <TextField
                variant="standard"
                label="CIU"
                name="CIU"
                onChange={handleChange}
                value={values.CIU}
                error={Boolean(touched.CIU && errors.CIU)}
                helperText={touched.CIU && errors.CIU}
              />

              <Autocomplete
                name="typeCible"
                fullWidth
                options={options}
                autoHighlight
                getOptionLabel={(option) => option.label}
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
                inputValue={values.typeCible}
                onInputChange={(event, newInputValue) => {
                  setFieldValue("typeCible", newInputValue);
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
                    <GpsFixedIcon
                      sx={{ color: "action.active", mr: 1, my: 0.5 }}
                    />
                    <TextField
                      {...params}
                      label="Type de cible"
                      variant="standard"
                      error={Boolean(touched.typeCible && errors.typeCible)}
                      helperText={touched.typeCible && errors.typeCible}
                    />
                  </Box>
                )}
              />

              <Autocomplete
                name="region"
                fullWidth
                options={regions}
                autoHighlight
                getOptionLabel={(option) => option.label}
                value={valRegion}
                onChange={(event, newValue) => {
                  setValRegion(newValue);
                }}
                inputValue={values.region}
                onInputChange={(event, newInputValue) => {
                  setFieldValue("region", newInputValue);
                }}
                isOptionEqualToValue={(option, value) => option.id === value.id}
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
                    <PinDropIcon
                      sx={{ color: "action.active", mr: 1, my: 0.5 }}
                    />
                    <TextField
                      {...params}
                      label="Région"
                      variant="standard"
                      error={Boolean(touched.region && errors.region)}
                      helperText={touched.region && errors.region}
                    />
                  </Box>
                )}
              />

              <div>
                <h2>Referents</h2>
                {referentsListe.map((el) => (
                  <p key={el.index}>{el.label}</p>
                ))}
              </div>

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
