import { Schema, model } from 'mongoose';
import { IAcronym } from '../interfaces/acronym.interface';

const acronymSchema = new Schema<IAcronym>({
  acronym: {
    type: String,
    required: true,
  },
  definition: {
    type: String,
    required: true,
  },
});

const Acronym = model<IAcronym>('Acronym', acronymSchema);

export default Acronym;
