import { createClient } from '@supabase/supabase-js';


// Initialize database client
const supabaseUrl = 'https://ndfkbqvbhuluhcmeekhc.databasepad.com';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjcwZTY3ZTEyLTAzZjUtNGUyMi1iYzNmLWZlMWY2ODNmOWVmOSJ9.eyJwcm9qZWN0SWQiOiJuZGZrYnF2Ymh1bHVoY21lZWtoYyIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzY4NDI0NjUyLCJleHAiOjIwODM3ODQ2NTIsImlzcyI6ImZhbW91cy5kYXRhYmFzZXBhZCIsImF1ZCI6ImZhbW91cy5jbGllbnRzIn0.ICMJ1N6fIZOhww2B11zCBRhWO-ZJpMMv9100tryfdEk';
const supabase = createClient(supabaseUrl, supabaseKey);


export { supabase };