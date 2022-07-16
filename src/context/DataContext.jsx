// import React, { useState, useEffect } from "react";
// const DataContext = React.createContext();

// function DataContextProvider(props) {
//   const [data, setData] = useState([]);
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [valid, setValid] = useState(undefined);

//   useEffect(() => {
//     getData();
//   }, []);

//   const getData = () => {
//     setLoading(true);
//     fetch('http://itgirlschool.justmakeit.ru/api/words' )
//       .then((response) => response.json())
//       .then((response) => {
//         setData(response);
//       })
//       .catch((errors) => setErrors(errors))
//       .finally(() => {
//         setLoading(false)
//       });
//   };  

//   const editWord = (word) => {
//     fetch(`http://itgirlschool.justmakeit.ru/api/words/${word.id}/update`, {
//       method: 'POST', 
//       body: JSON.stringify(word),
//     })
//       .then(() => {
//         getData();
//       })
//       .catch((errors) => setErrors(errors));
//   };

//   const deleteWord = (word) => {
//     fetch(`http://itgirlschool.justmakeit.ru/api/words/${word.id}/delete`, {
//       method: 'POST', 
//     })
//       .then(() => {
//         getData();
//       })
//       .catch((errors) => setErrors(errors));
//   };

//   const addWord = (word) => {
//     fetch(`http://itgirlschool.justmakeit.ru/api/words/add`, {
//       method: 'POST', 
//       body: JSON.stringify(word),
//     })
//       .then(() => {
//         getData();
//       })
//       .catch((errors) => setErrors(errors));
//   };

//   return (
//     <DataContext.Provider
//       value={{ data, loading, errors, valid, editWord, deleteWord, addWord, setErrors, setValid }}
//     >
//       {props.children}
//     </DataContext.Provider>
//   );
// }

// export { DataContextProvider, DataContext };
