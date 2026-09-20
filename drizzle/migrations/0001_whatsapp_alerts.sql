CREATE TABLE public.whatsapp_notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id uuid REFERENCES public.contact_submissions(id) ON DELETE SET NULL,
  recipient text NOT NULL,
  provider_message_id text UNIQUE,
  state text NOT NULL DEFAULT 'accepted',
  error text,
  provider_timestamp timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.whatsapp_notifications TO authenticated;
GRANT ALL ON public.whatsapp_notifications TO service_role;

ALTER TABLE public.whatsapp_notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read whatsapp notifications"
ON public.whatsapp_notifications
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.whatsapp_webhook_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  delivery_id text NOT NULL UNIQUE,
  event text NOT NULL,
  payload jsonb NOT NULL,
  received_at timestamptz NOT NULL DEFAULT now(),
  processed_at timestamptz,
  processing_error text,
  attempts integer NOT NULL DEFAULT 0,
  next_attempt_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.whatsapp_webhook_events TO authenticated;
GRANT ALL ON public.whatsapp_webhook_events TO service_role;

ALTER TABLE public.whatsapp_webhook_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read whatsapp webhook events"
ON public.whatsapp_webhook_events
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE INDEX whatsapp_webhook_events_pending_idx
ON public.whatsapp_webhook_events (next_attempt_at)
WHERE processed_at IS NULL;