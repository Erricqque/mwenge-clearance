import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ziddnchwknhwawbcoegu.supabase.co';
const supabaseAnonKey = 'sb_publishable_Y_TRlw0IjJwhasoRyALlsw_Yxayk1Yh';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);