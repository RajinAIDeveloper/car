import { config } from 'dotenv';
config();

import '@/ai/flows/generate-car-recommendations.ts';
import '@/ai/flows/identify-car-from-image.ts'; // Added new flow
