import React, { useState, useEffect} from "react";
import { inject, observer } from "mobx-react";
import styles from "../assets/styles/modules/table-row.module.scss";
import TableCellInput from "./TableCellInput";
import CheckValidation from "./CheckValidation";
import Icon from "@mui/material/Icon";

function TableRow(props) {
  const [state, setState] = useState(props);
  const [disabled, setDisabled] = useState(false);

  const keys = ["english", "transcription", "russian", "tags"];
  
  useEffect(() => {
    let isEmpty = false;
    keys.forEach((element) => {
      if (state[element] === "") {
        isEmpty = true;
      }
    });
    setDisabled(isEmpty);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disabled, state.english, state.russian, state.tags, state.transcription]);

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.dataset.name]: event.target.value,
    });
  };

  const handleCancel = () => {
    setState({
      ...props,
    });
    props.cancel();
  };

  const handleSave = () => {
    if (validate()) {
      props.save(state);
      props.cancel();
    }
  };

  const validate = () => {
    const { errors, valid } = CheckValidation(state, false, props.dataStore.data);
    if (valid === disabled) {
      setDisabled(!disabled);
    }
    props.dataStore.setErrors(errors);
    props.dataStore.setHasErrors(!valid);
    return valid;
  };

  if (props.isEditable) {
    return (
      <tr className={styles.row}>
        {keys.map((item, i) => (
          <td className={styles.cell} key={i}>
            <TableCellInput
              state={state[item]}
              onChange={handleChange}
              data={item}
              valid={!disabled}
            ></TableCellInput>
          </td>
        ))}
        <td className={styles.icons}>
          <button className={styles.iconBtn}>
            <Icon
              fontSize="small"
              className={styles.iconAccent}
              onClick={handleSave}
            >
              save
            </Icon>
          </button>
          <button className={styles.iconBtn}>
            <Icon
              fontSize="small"
              className={styles.icon}
              onClick={handleCancel}
            >
              cancel
            </Icon>
          </button>
        </td>
      </tr>
    );
  } else {
    return (
      <tr className={styles.row}>
        <td className={styles.cell}>{props.english} </td>
        <td className={styles.cell}>{props.transcription}</td>
        <td className={styles.cell}>{props.russian}</td>
        <td className={styles.cell}>{props.tags}</td>
        <td className={styles.icons}>
          <button className={styles.iconBtn}>
            <Icon
              fontSize="small"
              className={styles.iconAccent}
              onClick={props.edit}
            >
              edit
            </Icon>
          </button>
          <button className={styles.iconBtn}>
            <Icon
              fontSize="small"
              className={styles.icon}
              onClick={props.delete}
            >
              delete
            </Icon>
          </button>
        </td>
      </tr>
    );
  }
}

export default inject(["dataStore"])(observer(TableRow));
