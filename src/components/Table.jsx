import React, { useState, useEffect } from "react";
import { inject, observer } from "mobx-react";
import styles from "../assets/styles/modules/table.module.scss";
import NewWord from "./NewWord";
import TableRow from "./TableRow";
import Loading from "./Loading";
import ErrorsModal from "./ErrorsModal";

function Table({ dataStore }) {
  const [editable, setEditable] = useState();

useEffect (() => {
  dataStore.loadData();
}, [])

  const handleDelete = (i) => {
    dataStore.removeWord(i);
  };

  const handleSave = (state) => {
    dataStore.data.forEach((element) => {
      if (element.id === state.id) {
        for (const key in element) {
          if (Object.hasOwnProperty.call(element, key)) {
            element[key] = state[key];
          }
        }
      }
    });
    dataStore.editWord(state);
  };

  if (!dataStore.isLoaded) {
    return (
      <div className={styles.container}>
        <Loading></Loading>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead className={styles.header}>
          <tr className={styles.row}>
            <th className={styles.cell}>Word</th>
            <th className={styles.cell}>Transcription</th>
            <th className={styles.cell}>Translation</th>
            <th className={styles.cell}>Tags</th>
            <th className={styles.cell}>Edit</th>
          </tr>
        </thead>
        <tbody className={styles.body}>
          <NewWord
            key={Math.random() * 55}
            className={styles.row}
            addWord={(newWord) => dataStore.addWord(newWord)}
            data={dataStore.data}
          />
          {dataStore.data.map((tr, i) => (
            <TableRow
              key={tr.id}
              id={tr.id}
              className={styles.row}
              english={tr.english}
              transcription={tr.transcription}
              russian={tr.russian}
              tags={tr.tags}
              isEditable={editable === i}
              edit={() => setEditable(i)}
              cancel={() => setEditable(!editable)}
              delete={() => handleDelete(tr)}
              save={(state) => handleSave(state, setEditable)}
            ></TableRow>
          ))}
        </tbody>
      </table>
      {dataStore.hasErrors === true && <ErrorsModal></ErrorsModal>}
    </div>
  );
}

export default inject(["dataStore"])(observer(Table));
