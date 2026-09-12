-- Removes the legacy Drizzle schema from `public` AFTER the Payload cutover is
-- verified in production. Run by hand, never from a deploy.
--
-- Preconditions:
--   * /admin, /, /projects, /blog and every post render from Payload in prod
--   * data/legacy/*.json exported and kept somewhere safe
--   * a database snapshot exists
--
-- Order matters: children before parents.
BEGIN;

DROP TABLE IF EXISTS public.project_tags CASCADE;
DROP TABLE IF EXISTS public.skills       CASCADE;
DROP TABLE IF EXISTS public.experiences  CASCADE;
DROP TABLE IF EXISTS public.blogs        CASCADE;
DROP TABLE IF EXISTS public.projects     CASCADE;
DROP TABLE IF EXISTS public.companies    CASCADE;
DROP TABLE IF EXISTS public.tags         CASCADE;
DROP TABLE IF EXISTS public.links        CASCADE;
DROP TABLE IF EXISTS public.users        CASCADE;
DROP TABLE IF EXISTS public.images       CASCADE;

-- The single legacy enum, used only by public.links.type.
DROP TYPE IF EXISTS public."type";

COMMIT;
