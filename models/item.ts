import mongoose, { models, Schema } from "mongoose";

const itemSchema = new Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    supplierName: {
      type: String,
      required: true,
    },
    orderWhen: {
      type: String,
      required: true,
    },
    quantity: {
      type: String,
      required: true,
    },
    storedLocation: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Item = models.Item || mongoose.model("Item", itemSchema);
export default Item;
