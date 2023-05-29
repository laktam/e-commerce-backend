import { EOL } from 'os';
import { join } from 'path';

import { Direction, Flags, Format, TypeormUml } from 'typeorm-uml';

const configPath = join('C:\\Users\\abdellah\\NestJsApp\\ormconfig.json');
const flags: Flags = {
  direction: Direction.LR,
  format: Format.PNG,
  handwritten: true,
  monochrome: true,
};

const typeormUml = new TypeormUml();
typeormUml.build(configPath, flags).then((url) => {
  process.stdout.write('Diagram URL: ' + url + EOL);
});