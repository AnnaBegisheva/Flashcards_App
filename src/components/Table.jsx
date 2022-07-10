import React, { useState, useContext } from "react";
import { DataContext } from "../context/DataContext";
import styles from "../assets/styles/modules/table.module.scss";
import NewWord from "./NewWord";
import TableRow from "./TableRow";
import Loading from "./Loading";
import ErrorsModal from "./ErrorsModal";

function Table() {
  const [editable, setEditable] = useState();
  const { data, loading, valid, editWord, deleteWord, addWord } =
    useContext(DataContext);

  const getWord = (state) => {
    return {
      id: state.id,
      english: state.english,
      transcription: state.transcription,
      russian: state.russian,
      tags: state.tags,
    };
  };

  const handleDelete = (state) => {
    deleteWord(getWord(state));
  };

  const handleSave = (state) => {
    editWord(getWord(state));
  };

  if (loading) {
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
            english={""}
            transcription={""}
            russian={""}
            tags={""}
            addWord={(newWord) => addWord(newWord)}
            data={data}
          />
          {data.map((tr, i) => (
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
      {valid === false && <ErrorsModal></ErrorsModal>}
    </div>
  );
}

export default Table;
