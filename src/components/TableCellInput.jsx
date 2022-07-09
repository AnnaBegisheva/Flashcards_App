import styles from "../assets/styles/modules/table-row.module.scss";

function TableCellInput (props) {
    return (
        <input
        className={`${styles.input} ${props.valid === true ? "" : `${styles.error}`}`}
        type="text"
        onChange={props.onChange}
        value={props.state}
        data-name={props.data}
      ></input>
    )
}

export default TableCellInput;