const rosData = {
  systems_per_state: {
    optimized: { count: 3, percentage: 9.68 },
    under_pressure: { count: 4, percentage: 12.9 },
    undersized: { count: 6, percentage: 19.35 },
    oversized: { count: 0, percentage: 0.0 },
    idling: { count: 20, percentage: 64.52 },
    waiting_for_data: { count: 0, percentage: 0.0 },
  },
  conditions: {
    io: {
      count: 4,
      percentage: 12.5,
      undersized: -1,
      oversized: -1,
      under_pressure: 4,
    },
    memory: {
      count: 14,
      percentage: 43.75,
      undersized: 6,
      oversized: 4,
      under_pressure: 4,
    },
    cpu: {
      count: 14,
      percentage: 43.75,
      undersized: 6,
      oversized: 4,
      under_pressure: 4,
    },
  },
  meta: {
    total_count: 31,
    non_optimized_count: 30,
    conditions_count: 32,
    non_psi_count: 1,
  },
};

export default rosData;
