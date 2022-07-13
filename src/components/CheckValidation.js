function CheckValidation(state, isNewWord, data) {
  const checkEnglish = (item, isNewWord, data) => {
    let words = [];
    data.forEach((element) => {
      words.push(element["english"]);
    });

    if (state[item].length === 0) {
      return "The field is empty";
    } else if (isNewWord && words.includes(state[item])) {
      return "The word is already in the dictionary";
    } else if (!/^[a-zA-Z]+$/.test(state[item])) {
      return "Only latin letters";
    } else {
      return undefined;
    }
  };

  const checkTranscription = (item) => {
    const length = state[item].length;
    if (length === 0) {
      return "The field is empty";
    } else if (state[item][length - 1] !== "]" || state[item][0] !== "[") {
      return "Use parentheses for transcription";
    } else {
      return undefined;
    }
  };

  const checkRussian = (item) => {
    if (state[item].length === 0) {
      return "The field is empty";
    } else if (!/^[а-яА-ЯёЁ\s-]+$/.test(state[item])) {
      return "Use only cyrillic letters";
    } else {
      return undefined;
    }
  };

  const errors = Object.keys(state).reduce((account, item) => {
    switch (item) {
      case "english":
        account = {
          ...account,
          [item]: checkEnglish(item, isNewWord, data),
        };
        break;
      case "transcription":
        account = {
          ...account,
          [item]: checkTranscription(item),
        };
        break;
      case "russian":
      case "tags":
        account = {
          ...account,
          [item]: checkRussian(item),
        };
        break;
      default:
        break;
    }
    return account;
  }, {});

  let valid = true;
  Object.keys(errors).forEach((item) => {
    if (errors[item] !== undefined) {
      valid = false;
    }
  });

  return {
    errors: errors,
    valid: valid
  }
}

export default CheckValidation;
