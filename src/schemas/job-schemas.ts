import mongoose, { Schema } from 'mongoose';

export interface IJob extends Document {
    name: string;
    description: string;
    create_at: Date;
    update_at: Date;
    end_at: Date;
    user_id: mongoose.Schema.Types.ObjectId[];
}

export const jobSchema = new Schema<IJob>({
    name: { type: String, required: true , unique: true},
    description: { type: String, required: true },
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now },
    end_at: { type: Date, required: true },
    user_id: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
});



export const Job = mongoose.model<IJob>('Job', jobSchema);