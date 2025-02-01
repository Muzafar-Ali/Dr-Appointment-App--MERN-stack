import mongoose from "mongoose";

const appoinmentSchema = new mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  slotDate: {
    type: String,
    required: true
  },
  slotTime: {
    type: String,
    required: true
  },
  date: {
    type: Number,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  payment: {
    type: String,
    enum: ['paid', 'unpaid'],
    default: 'unpaid'
  },
  // status: {
  //   type: String,
  //   enum: ['scheduled', 'completed', 'cancelled'],
  //   default: 'scheduled'
  // }
  isCompleted: {
    type: Boolean,
    default: false
  }
}, 
{
  timestamps: true
})

export const AppointmentModel = mongoose.models.Appointment || mongoose.model('Appointment', appoinmentSchema);