import * as React from "react";
import { Theme, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete'; // import here
import TextField from '@mui/material/TextField';
import { styled } from '@mui/system';
import Paper from "@mui/material/Paper";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};



const names = [
  "python",
  "java",
  "c#",
  "docker",
  "curl",
  "three.js",
  "react",
  "c++",
  "clang",
  "jenkins",
];

const CustomChip = styled(Chip)(({ theme }) => ({
  fontFamily: 'preRg',
  '&.python': {
    backgroundColor: '#F08484',
  },
  '&.java': {
    backgroundColor: '#F9A686'
  },
  '&.c#': {
    backgroundColor: '#FBF6A4',
  },
  '&.docker': {
    backgroundColor: 'F9BF64',
  },
  '&.curl': {
    backgroundColor: '#A0D6B6',
  },
  '&.three.js': {
    backgroundColor: '#30BA96',
  },
  '&.react': {
    backgroundColor: '#789CCE',
  },
  '&.c++': {
    backgroundColor: '#9E7EB9',
  },
  '&.clang': {
    backgroundColor: '#EF404A',
  },
  '&.jenkins': {
    backgroundColor: '#8ED2CD',
  },
  height: '25px',
  '& .MuiChip-label': {
    paddingTop: '0px',
    paddingBottom: '0px',
  },
}));

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function MultiSelect() {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const filter = createFilterOptions<string>();

  return (
    <div>
        <Autocomplete
            multiple
            id="multiple-limit-tags"
            options={names}
            filterOptions={(options, params) => {
              const filtered = filter(options, params);

              // At the opening of dropdown (when search is empty), no options will be shown.
              if (params.inputValue === '') {
                  return [];
              }

              return filtered as string[];
          }}            
          getOptionLabel={(option) => option}
            renderInput={(params) => (
                <TextField {...params} sx={{'& .MuiInputLabel-root': {
                  fontFamily: 'preBd',margin: '-7px 0 0 1px'
              },}} label="언어를 검색하세요" />
            )}
            sx={{ 
                width: '300px', 
                '& .MuiAutocomplete-tag': {
                    maxWidth: '100%',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                },
                '& .MuiAutocomplete-tagArea': {
                    flexWrap: 'nowrap',
                    overflowX: 'auto'
                },
                '& .MuiInputBase-root': {
                  marginTop: '1px',
                  padding: '0 5px',
                  fontFamily: 'preBd'
                },
                marginLeft: '10px',
             }}
             PaperComponent={({ children }) => (
              <Paper style={{ maxHeight: `Desired height for autocomplete dropdown`, fontFamily:'Your desired font for options'}}>{children}</Paper>
            )}
            renderTags={(selectedValues, getTagProps) =>
                selectedValues.map((option, index) => (
                    <CustomChip {...getTagProps({ index })} key={index} label={option} className={option} sx={{ margin: '0 2px' }}/>
                ))
            }
            renderOption={(props, option, { selected }) => (
                <li {...props}>
                    <CustomChip label={option} className={option} color={selected ? 'primary' : undefined} />
                </li>
            )}
        />
    </div>
  );
}

export default MultiSelect;
