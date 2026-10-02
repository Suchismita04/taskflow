export const VALID_DB_TYPES = ['mssql', 'mysql', 'mongodb', 'postgres', 'oracle'] as const;

export type DB_TYPE = typeof VALID_DB_TYPES[number];

// Helper Type Guard
export function isDbType(driver: any): driver is DB_TYPE {
  return VALID_DB_TYPES.includes(driver?.toLowerCase().trim());
}

export default function resolveDbType(driver: string | undefined): DB_TYPE {
  if (!driver) {
    throw new Error('Database driver is missing/undefined in environment configuration.');
  }

  const normalizedDriver = driver.toLowerCase().trim();

  if (!isDbType(normalizedDriver)) {
    throw new Error(
      `Invalid database driver "${driver}". Supported drivers are: ${VALID_DB_TYPES.join(', ')}`
    );
  }

  return normalizedDriver;
}