export function transformSportComplexDetail({ sportComplex, subFields = [], fieldImages = [], fieldTypeConfigs = [], pricingRules = [] }) {
  const sc = sportComplex && sportComplex.toObject ? sportComplex.toObject() : (sportComplex ? { ...sportComplex } : null);
  if (!sc) return null;

  delete sc.created_at;
  delete sc.updated_at;

  const ownerObj = sc.owner_id && sc.owner_id.toObject ? sc.owner_id.toObject() : sc.owner_id;

  const clean = {
    ...sc,
    owner_id: ownerObj ? (() => { const o = { ...ownerObj }; delete o._id; delete o.created_at; delete o.updated_at; return o; })() : null,
    subFields: (subFields || []).map(f => {
      const obj = f && f.toObject ? f.toObject() : { ...f };
      delete obj._id;
      delete obj.created_at;
      delete obj.updated_at;
      return obj;
    }),
    fieldImages: (fieldImages || []).map(img => {
      const obj = img && img.toObject ? img.toObject() : { ...img };
      delete obj._id;
      delete obj.created_at;
      delete obj.updated_at;
      return obj;
    }),
    fieldTypeConfigs: (fieldTypeConfigs || []).map(cfg => {
      const obj = cfg && cfg.toObject ? cfg.toObject() : { ...cfg };
      delete obj._id;
      delete obj.created_at;
      delete obj.updated_at;
      return obj;
    }),
    pricingRules: (pricingRules || []).map(rules => (rules || []).map(rule => {
      const obj = rule && rule.toObject ? rule.toObject() : { ...rule };
      delete obj._id;
      delete obj.created_at;
      delete obj.updated_at;
      return obj;
    }))
  };

  delete clean._id;
  return clean;
}
