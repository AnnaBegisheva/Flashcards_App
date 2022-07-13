import React, { useState, useEffect, useContext } from "react";
import styles from "../assets/styles/modules/table-row.module.scss";
import TableCellInput from "./TableCellInput";
import CheckValidation from "./CheckValidation";
import { DataContext } from "../context/DataContext";
import Icon from "@mui/material/Icon";

function NewWord(props) {
  const [state, setState] = useState(props);
  const [disabled, setDisabled] = useState();
  const { data, setValid, setErrors } = useContext(DataContext);
  const keys = ["english", "transcription", "russian", "tags"];

  useEffect(() => {
    if (disabled === false) {
      setDisabled(undefined);
      let newWord = {
        english: state.english,
        id:
          props.data.length > 0 ? +props.data[props.data.length - 1].id + 1 : 1,
        russian: state.russian,
        tags: state.tags,
        transcription: state.transcription,
      };
      props.addWord(newWord);
      setState(props);

      console.log("New word data:", newWord);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disabled]);

  const handleChange = (event) => {
    event.stopPropagation();
    let value = event.target.value.trim().replace(/ +/g, " ");
    setState({
      ...state,
      [event.target.dataset.name]: value,
    });
  };

  const handleCancel = () => {
    setState(props);
  };

  const validate = () => {
    const { errors, valid } = CheckValidation(state, true, data);
    setDisabled(!valid);
    setValid(valid);
    setErrors(errors);
    return valid;
  };

  const handleSave = () => {
    validate();
  };

  return (
    <tr className={styles.row}>
      {keys.map((item, i) => (
        <td className={styles.cell} key={i}>
          <TableCellInput
            key={i}
            valid={!disabled}
            onChange={handleChange}
            state={state[item]}
            data={item}
          ></TableCellInput>
        </td>
      ))}
      <td className={styles.icons}>
        <button className={styles.iconBtn} disabled={disabled}>
          <Icon
            fontSize="small"
            className={styles.iconAccent}
            onClick={handleSave}
          >
            save
          </Icon>
        </button>
        <button className={styles.iconBtn}>
          <Icon fontSize="small" className={styles.icon} onClick={handleCancel}>
            cancel
          </Icon>
        </button>
      </td>
    </tr>
  );
}

export default NewWord;
