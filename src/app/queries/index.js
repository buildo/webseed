import * as _oldQs from './queries';
import omit from 'lodash/omit';
import { make as makeGraph } from 'avenger/lib/graph';

const old = omit(_oldQs, ['__esModule']);

const input = Object.keys(old).reduce((ac, k) => ({ ...ac, ...old[k] }), {});

export default makeGraph(input);
