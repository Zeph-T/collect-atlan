import mongoose from "mongoose";
import Form from "../models/form";
import Question from "../models/question";

export function deleteQuestion(req, res) {
  try {
    if (req.body && req.params.id) {
      Question.findOneAndUpdate(
        { _id: mongoose.Types.ObjectId(req.params.id), isValid: true },
        { $set: { isValid: false } }
      )
        .then(() => res.status(200).send({ status: "Success!" }))
        .catch((err) => res.status(400).send({ error: err }));
    } else throw new Error("No Question Id to delete!");
  } catch (err) {
    return res.status(400).json(err);
  }
}

export function addQuestion(req, res) {
  try {
    if (req.body && req.body.question && req.body.formId) {
      let newQuestion = new Question(req.body);
      newQuestion.formId = mongoose.Types.ObjectId(
        newQuestion.formId.toString()
      );
      newQuestion.save((err, question) => {
        if (err) {
          console.log("here", err);
          return res.status(400).send({ error: err });
        } else {
          return res.status(200).send(question);
        }
      });
    } else {
      console.log(req.body);
      throw new Error("form Id missing!");
    }
  } catch (err) {
    return res.status(400).json(err);
  }
}

export function updateQuestion(req, res) {
  try {
    console.log(req.body);
    if (req.body && req.body._id) {
      Question.findOneAndUpdate(
        { _id: mongoose.Types.ObjectId(req.body._id), isValid: true },
        req.body,
        { new: true }
      )
        .then((oQuestion) => {
          return res.status(200).json(oQuestion);
        })
        .catch((err) => {
          return res.status(400).json(err);
        });
    } else {
      throw new Error("Question Id missing!");
    }
  } catch (err) {
    return res.status(400).json(err);
  }
}
