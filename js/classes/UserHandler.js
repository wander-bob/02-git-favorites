import {displayError} from '../utils/errorHandler.js';
import {GithubUserData} from './GithubUserData.js';

export class FavoritesHandler{
  constructor(){
    this.load();
  };
  async addEntry(username){
    try{
      const entryAlreadyExists = this.entries.find(entry => entry.login === username);
      if(entryAlreadyExists){
        throw new Error('Essa conta já está na sua lista de favoritos.');
      }
      const userdata = await GithubUserData.search(username);
      if(userdata.login === undefined){
        throw new Error('Usuário não encontrado...');
      }
      this.entries = [userdata, ...this.entries];
      this.updateRows();
      this.save();
      
    }catch(error){
      displayError(error.message);
    };
  };
  deleteEntry(entry){
    const filteredEntries = this.entries.filter(user => entry !== user);
    this.entries = filteredEntries;
    this.updateRows();
    this.save();
  };
  load(){
    this.entries = JSON.parse(localStorage.getItem('@github-cached:')) || [] ;
  };
  save(){
    localStorage.setItem('@github-cached:', JSON.stringify(this.entries));
  }
};