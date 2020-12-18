import { resultEnum } from "../entity/types";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LogSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: [true, 'LOG MODEL: pole userId jest wymagane'],
    },

    login: {
      type: String,
      required: [true, 'LOG MODEL: pole login jest wymagane'],
    },

    objectId: {
      type: String,
      defaul: '',
    },
    ip: {
      type: String,
      required: [true, 'LOG MODEL: pole ip jest wymagane'],
    },
    browser: {
      type: String,
      required: [true, 'LOG MODEL: pole browser jest wymagane'],
    },
    action: {
      type: String,
      required: [true, 'LOG MODEL: pole action jest wymagane'],
    },
    controller: {
      type: String,
      required: [true, 'LOG MODEL: pole controller jest wymagane'],
    },
    result: {
      type: String,
      required: [true, 'LOG MODEL: pole result jest wymagane - może przybrać '],
      enum: resultEnum,
    },
    info: {
      type: String,
      required: [true, 'LOG MODEL: pole info jest wymagane'],
    },
  },
  { timestamps: true }
);

export const Log = mongoose.model('Log', LogSchema);

