import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { useState, useEffect } from "react";

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

export default function MultipleSelectCheckmarks({ props, onSelectChange }) {
  const [lastTry, setLastTry] = useState(null);
  const [namess, setNames] = useState([]);
  var myHeaders = new Headers();
  myHeaders.append("User-Agent", "ChangeMeClient/0.1 by YourUsername");
  myHeaders.append("Authorization", "bearer " + process.env.bearerKey);
  myHeaders.append(
    "Cookie",
    "csv=2; edgebucket=vu8Zr0Azm9tXfQWpq1; loid=0000000000adnpt678.2.1613408283000.Z0FBQUFBQmtNS3RDNDRiX1Nqc2xjeldFMW5fUFh1bGJRTHl4VlY5YmFfd1FneE14SWNMdllEQURObWRtWVdaZE1CSDU0UDZ6YWpraE8tSVJNVDhiMDRHcGlycDNtdXkzajhjZ0xyTjBNMUI1bC1JTEN5RlFxQk5lQnhCLTBhVjA1MGtvQVB1OTN4NUs; session_tracker=irqmmoohenmjrebmgb.0.1680976945036.Z0FBQUFBQmtNYXd4LXRfY3doUnFhOXN0dEpZRzA3VmtTZVUzR3lSaDdQOXlMbmRlXzlSTHRjTzNnNHYxbEwxbnpBa1dFVUZaeE4yR3VUa2ZMSjVOcjR3bm50RzRKR0ZyeUVLd0Y4d2lreEZYdVBfbmVkbjdfQVNCdW12SkFDSDlNdjNtNzZaRTdUMHU"
  );

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  React.useEffect(() => {
    console.log("here");
    const url =
      "https://oauth.reddit.com/r/" + props + "/api/link_flair_v2" ??
      "https://oauth.reddit.com/r/" + "OnePiece" + "/api/link_flair_v2";
    console.log(url);
    setPersonName([]);
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log("Made it");
        let values = [];

        for (let i = 0; i < result.length; i++) {
          let value = result[i]["text"];
          values.push(value);
        }
        setNames(values);
      })
      .catch((error) => console.log("error", error));
  }, [props]);

  const names = [
    "Oliver Hansen",
    "Van Henry",
    "April Tucker",
    "Ralph Hubbard",
    "Omar Alexander",
    "Carlos Abbott",
    "Miriam Wagner",
    "Bradley Wilkerson",
    "Virginia Andrews",
    "Kelly Snyder",
    "Kelly Snyder",
    "Kelly Snyder",
  ];
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  React.useEffect(() => {
    onSelectChange(personName);
  }, [personName]);

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">Flair</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {namess.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={personName.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
