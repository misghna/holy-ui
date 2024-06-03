import { useMemo } from "react";

import { Grid } from "@mui/material";
import PropTypes from "prop-types";

import CustomDropdown from "~/components/CustomDropdown";
import CustomTextField from "~/components/CustomTextField";
import { useGlobalSetting } from "~/contexts/GlobalSettingProvider";

const LanguageForm = ({ languageConfig, handleChange, errors }) => {
  const { setting } = useGlobalSetting();

  const tenantOptions = useMemo(
    () =>
      setting.tenants.map((tenant) => {
        const { id, name } = tenant;
        return {
          label: name,
          value: id
        };
      }),
    [setting.tenants]
  );

  return (
    <Grid container spacing={2} alignItems="baseline">
      <Grid item xs={12} sm={6}>
        <CustomTextField
          label="Lang Name:"
          fullWidth
          name="lang_name"
          value={languageConfig.lang_name}
          handleChange={handleChange}
          helperText={(errors && errors?.lang_name) || ""}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <CustomDropdown
          label="Tenant name:"
          options={tenantOptions}
          fullWidth
          name="tenant_id"
          value={languageConfig.tenant_id}
          handleChange={handleChange}
          helperText={(errors && errors?.tenant_id) || ""}
        />
      </Grid>
    </Grid>
  );
};

LanguageForm.propTypes = {
  languageConfig: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  errors: PropTypes.object
};

export default LanguageForm;
