import * as old from './queries';
import { make as makeGraph } from 'avenger/lib/graph';

const input = Object.keys(old).reduce((ac, k) => ({ ...ac, ...old[k] }), {});

export default makeGraph(input);
