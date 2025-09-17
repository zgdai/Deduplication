const uniqueByWithMap = (array, keyFn) => {
  const seen = new Map();
  const nameMap = {};
  const result = [];

(array || []).forEach(item => {
  const key = keyFn(item);
  if (!seen.has(key)) {
      seen.set(key, item.name);
      result.push(item);
  } else {
      // 将重复项的 name 指向已保留节点的 name
      nameMap[item.name] = seen.get(key);
    }
  });

return { result, nameMap };
};

function main(config) {
  // 1. 根据 server:port 去重并生成名称映射
    const { result: uniqueProxies, nameMap } = uniqueByWithMap(
    config.proxies,
    p => `${p.server}:${p.port}`
  );
  config.proxies = uniqueProxies;

  // 2. 替换并去重各组中的代理名称
config['proxy-groups'] = (config['proxy-groups'] || []).map(group => {
    const mapped = (group.proxies || []).map(name => nameMap[name] || name);
    const deduped = Array.from(new Set(mapped));
    if (mapped.length !== deduped.length) {
      console.log(`[Group:${group.name}] 去重前：${mapped.length}，去重后：${deduped.length}`);
    }
    return { ...group, proxies: deduped };
  });

  // 3. 去重最外层 rules
console.log(`[Rules] 原 rules：${config.rules.length}，去重后：${new Set(config.rules).size}`);
config.rules = Array.from(new Set(config.rules || []));
return config;
}
