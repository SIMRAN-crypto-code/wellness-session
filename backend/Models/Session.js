const mongoose = require('mongoose');

let schema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user', // refers to the 'user' model
      required: true
    },
    title: {
      type: String,
      required: true
    },
    tags: {
      type: [String],
      default: []
    },
    json_file_url: {
  type: String,
  required: function () { return this.status === 'published'; }
},

    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'draft'
    }
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

const SessionModel = mongoose.model('session', schema);
module.exports = SessionModel;
