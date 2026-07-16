## Set up your blog admin account

I'll create a ready-to-use admin login so you can add, edit, and delete blog posts yourself. The edit and delete controls already exist in the admin dashboard — you just need an account with admin access.

### Credentials I'll set up
- **Login URL:** https://joycraft-websites.lovable.app/auth
- **Email:** `admin@biznessdoctor.com`
- **Temporary password:** `BiznessDoctor@2026`

You should change the password after first login (I can add a "Change password" screen if you'd like).

### What you'll be able to do
Once logged in at `/auth`, you'll be redirected to `/admin` where you can:
- **Create** new blog posts (title, slug, cover image, markdown content, inline images)
- **Edit** any existing post
- **Publish / Unpublish** posts with one click
- **Delete** posts (with confirmation prompt)
- View contact form submissions

### Steps
1. Create the auth user `admin@biznessdoctor.com` with the password above (email auto-confirmed so you can log in immediately).
2. Assign the `admin` role to that user in the `user_roles` table so the admin dashboard unlocks.
3. No code changes needed — the admin UI, edit, and delete features are already built.

### After approval
I'll share the final login link + credentials in chat. If you'd prefer a different email or password, tell me and I'll use those instead.