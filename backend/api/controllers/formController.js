import mongoose from "mongoose";
import Form from "../models/form";
import Question from "../models/question";

export function getForms(req, res) {
  Form.find({ isValid: true })
    .then((oForms) => res.status(200).send(oForms))
    .catch((err) => res.status(200).json(err));
}

export async function getFormById(req, res) {
  try {
    if (req.params && req.params.id) {
      let formData = await Form.findOne({
        _id: mongoose.Types.ObjectId(req.params.id),
        isValid: true,
      });
      const questionsData = await Question.find({
        formId: mongoose.Types.ObjectId(req.params.id),
        isValid: true,
      })
        .sort({ _id: 1 })
        .exec();
      console.log(JSON.parse(JSON.stringify(formData)));
      console.log("questionsData", JSON.parse(JSON.stringify(questionsData)));

      formData = JSON.parse(JSON.stringify(formData));
      formData.questions = questionsData;
      console.log(formData)
      return res.status(200).send(formData);
    } else {
      throw new Error("Form ID not found!");
    }
  } catch (err) {
    return res.status(400).json(err);
  }
}

export function updateForm(req, res) {
  try {
    console.log(req.body);
    if (req.body && req.body._id) {
      Form.findOneAndUpdate(
        { _id: mongoose.Types.ObjectId(req.body._id), isValid: true },
        req.body,
        { new: true }
      )
        .then((oForm) => res.status(200).json(oForm))
        .catch((err) => res.status(400).json(err));
    } else {
      throw new Error("form Id missing!");
    }
  } catch (err) {
    return res.status(400).json(err);
  }
}

export function createForm(req, res) {
  try {
    if (req.body && req.body.name) {
      let newForm = new Form(req.body);
      newForm.save((err, form) => {
        if (err) {
          return res.status(400).send({ error: err });
        } else {
          return res.status(200).send(form);
        }
      });
    } else {
      throw new Error("form Name Missing!");
    }
  } catch (err) {
    return res.status(400).json(err);
  }
}
