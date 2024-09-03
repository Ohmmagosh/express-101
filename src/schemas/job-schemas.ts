import mongoose, { Schema } from 'mongoose';

export interface IJob extends Document {
    name: string;
    description: string;
    create_at: Date;
    update_at: Date;
    end_at: Date;
    user_id: string[];
}

export const jobSchema = new Schema<IJob>({
    name: { type: String, required: true , unique: true},
    description: { type: String, required: true },
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now },
    end_at: { type: Date, required: true },
    user_id: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
});

export const postCreateSchema = new Schema<IJob>({
    name: { type: String, required: true , unique: true, validate: {
        validator: async (v: string): Promise<boolean> => {
            const Job = mongoose.model<IJob>('Job', jobSchema);
            const jobExist = await Job.findOne({ name: v });
            return !jobExist;
        },
        message: '{VALUE} is already taken',
    }},
    description: { type: String, required: true },
    end_at: { type: Date, required: true },
    user_id: { type: [String], default: [] },
});


export const Job = mongoose.model<IJob>('Job', jobSchema);