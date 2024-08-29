import { Request, Response } from 'express';
import express = require('express');
import {
    helloCustomer
} from '../controllers/helloCustomer'


export const router = express.Router();

router.get('/', helloCustomer);