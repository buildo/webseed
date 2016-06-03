import { t } from 'revenge';

const Gender = t.enums.of(['male', 'female'], 'Gender');

export default t.struct({
  name: t.String,
  surname: t.String,
  gender: Gender,
  region: t.String
});
