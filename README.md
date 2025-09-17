# Deduplication
Remove redundant nodes from the configuration
Define utility functions using `const` to remove duplicates from the `proxies` array in `config.proxies` and `proxy-groups`, as well as the outermost `rules` array.

1. Scan `config.proxies`, using `server:port`as the unique identifier, and retain only the first occurrence of each entry.

2. Simultaneously record the mapping of deleted node names to retained node names.

3. Iterate through all `proxy-groups` and remove duplicates from the mapped names in the list.
