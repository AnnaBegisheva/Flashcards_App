import { makeAutoObservable, runInAction } from "mobx";

export default class DataStore {
  data = [];
  errors = {};
  hasErrors = false;
  isLoaded = false;
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setHasErrors = (bool) => {
    this.hasErrors = bool;
  };

  setErrors = (errors) => {
    this.errors = errors;
  };

  loadData = async () => {
    if (this.isLoaded || this.isLoading) {
      return;
    }
    try {
      this.isLoading = true;
      const response = await fetch(
        "http://itgirlschool.justmakeit.ru/api/words"
      );
      const recievedData = await response.json();
      if (response.ok) {
        runInAction(() => {
          this.data = recievedData;
        });
      } else {
        throw new Error("Something went wrong ...");
      }
    } catch (error) {
      runInAction(() => {
        this.data = [];
        this.setErrors(error);
        this.setHasErrors(true);  
      });
    } finally {
      runInAction(() => {
        this.isLoaded = true;
        this.isLoading = false;
      });
    }
  };

  editWord = (word) => {
    fetch(`http://itgirlschool.justmakeit.ru/api/words/${word.id}/update`, {
      method: "POST",
      body: JSON.stringify(word),
    })
      .then(() => {
        this.loadData();
      })
      .catch((errors) => (this.errors = errors));
  };

  addWord = (newWord) => {
    fetch(`http://itgirlschool.justmakeit.ru/api/words/add`, {
      method: "POST",
      body: JSON.stringify(newWord),
    })
      .then(() => {
        this.data.push(newWord);
      })
      .catch((errors) => (this.errors = errors));
  };

  removeWord = (word) => {
    fetch(`http://itgirlschool.justmakeit.ru/api/words/${word.id}/delete`, {
      method: "POST",
    })
      .then(() => {
        this.data.splice(this.data.indexOf(word), 1);
      })
      .catch((errors) => (this.errors = errors));
  };
}
