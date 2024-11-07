const Form = require("../models/formModel.js");
const errorHandler = require("../utils/errorHandler.js");

exports.createForm = async (req, res, next) => {
  if (!req.body.name) {
    return next(errorHandler(404, "Form name is required"));
  }
  if (req.body.inputs.length > 20) {
    return next(errorHandler(404, "Maximum 20 inputs are allowed in a form"));
  }
  try {
    const { name, inputs } = req.body;
    const newForm = new Form({
      name,
      inputs,
    });

    await newForm.save();
    res.status(201).json({
      status: "success",
      newForm,
    });
  } catch (error) {}
};

exports.getForms = async (req, res, next) => {
  try {
    const allForms = await Form.find();
    res.status(200).json({
      status: "success",
      allForms,
    });
  } catch (error) {
    next(error);
  }
};

exports.getForm = async (req, res, next) => {
  try {
    const formId = req.params.formId;
    console.log(formId);
    if (!formId) {
      return next(errorHandler(404, "Form id is required"));
    }
    const form = await Form.findById(formId);
    if (!form) {
      return next(errorHandler(404, "no form found with provided id"));
    }
    res.status(200).json({
      status: "success",
      form,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteForm = async (req, res, next) => {
  try {
    const formId = req.params.formId;
    if (!formId) {
      return next(errorHandler(404, "Form id is required"));
    }
    const form = await Form.findByIdAndDelete(formId);
    res.status(204).json({
      status: "success",
    });
  } catch (error) {
    next(error);
  }
};

exports.updateForm = async (req, res, next) => {
  try {
    const form = await Form.findByIdAndUpdate(req.params.formId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!form) {
      return next(errorHandler(404, "Form id is invalid"));
    }

    res.status(200).json({
      status: "success",
      data: {
        form,
      },
    });
  } catch (error) {
    next(error);
  }
};
