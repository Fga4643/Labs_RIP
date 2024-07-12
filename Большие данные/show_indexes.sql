select *
from pg_indexes
where tablename not like 'pg%';