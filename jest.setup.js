import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

import fetch from 'node-fetch';

global.fetch = fetch;
