GRANT INSERT ON public.contact_submissions TO anon, authenticated;

CREATE POLICY "Visitors can submit contact enquiries"
ON public.contact_submissions
FOR INSERT
TO anon, authenticated
WITH CHECK (
  char_length(btrim(name)) BETWEEN 1 AND 100
  AND char_length(btrim(email)) BETWEEN 3 AND 255
  AND email LIKE '%@%'
  AND char_length(btrim(message)) BETWEEN 1 AND 5000
  AND (phone IS NULL OR char_length(phone) <= 30)
  AND (subject IS NULL OR char_length(subject) <= 200)
  AND forwarded_to_sheet = false
);