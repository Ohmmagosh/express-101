import mongoose, { Schema } from 'mongoose';

export type TJob = {
    name: string;
    description: string;
    create_at: Date;
    update_at: Date;
    end_at: Date;
    user_id: string[];
}

export const jobSchema = new Schema<TJob>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now },
    end_at: { type: Date, required: true },
    user_id: { type: [String], default: [] },
});


export const Job = mongoose.model<TJob>('Job', jobSchema);