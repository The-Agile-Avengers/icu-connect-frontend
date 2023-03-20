import axios from 'axios';
import {getDomain} from './getDomain';


export const api = axios.create({
  baseURL: getDomain(),
  headers: {'Content-Type': 'application/json'}
});