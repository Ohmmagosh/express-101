import mongoose, { Schema } from 'mongoose';

export type TJob = {
    name: string;
    description: string;
    create_at: Date;
    end_at: Date;
    user_id: string[];
}

export const productSchema = new Schema<TJob>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    create_at: { type: Date, required: true },
    end_at: { type: Date, required: true },
    user_id: { type: [String], default: [] },
});


export const Users = mongoose.model<TJob>('Job', productSchema);