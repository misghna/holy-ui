import { Grid } from "@mui/material";
import PropTypes from "prop-types";

import CustomDropdown from "~/components/CustomDropdown";
import CustomTextField from "~/components/CustomTextField";
import { useGlobalSetting } from "~/contexts/GlobalSettingProvider";

const DictionaryForm = ({ dictConfig: dictionary, handleChange, errors }) => {
  const { setting } = useGlobalSetting();

  return (
    <Grid container spacing={2} alignItems="baseline">
      <Grid item xs={12} sm={6}>
        <CustomTextField
          label="Key"
          fullWidth
          name="key"
          value={dictionary.key}
          handleChange={handleChange}
          helperText={(errors && errors.key) || ""}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomDropdown
          label="Tenant-Name"
          options={setting.page_types}
          fullWidth
          name="tenant_name"
          value={dictionary.tenant_name}
          handleChange={handleChange}
          helperText={(errors && errors.tenant_name) || ""}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <CustomTextField
          label="English"
          fullWidth
          name="english"
          value={dictionary.english}
          handleChange={handleChange}
          helperText={(errors && errors.english) || ""}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <CustomTextField
          label="ትግርኛ"
          fullWidth
          name="ትግርኛ"
          value={dictionary.ትግርኛ}
          handleChange={handleChange}
          helperText={(errors && errors.ትግርኛ) || ""}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <CustomTextField
          label="Spanilla"
          fullWidth
          name="spanilla"
          value={dictionary.spanilla}
          handleChange={handleChange}
          helperText={(errors && errors.spanilla) || ""}
        />
      </Grid>
    </Grid>
  );
};

DictionaryForm.propTypes = {
  dictConfig: PropTypes.shape({
    key: PropTypes.string.isRequired,
    tenant_name: PropTypes.string.isRequired,
    english: PropTypes.string.isRequired,
    ትግርኛ: PropTypes.string.isRequired,
    spanilla: PropTypes.string.isRequired
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  errors: PropTypes.object
};

export default DictionaryForm;
