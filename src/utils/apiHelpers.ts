// API Helper functions

/**
 * Safely gets a property from an object without throwing errors
 */
export const safeGet = <T, K extends keyof T>(obj: T | null | undefined, key: K): T[K] | undefined => {
  if (!obj) return undefined;
  return obj[key];
};

/**
 * Extracts a value from meta_data array
 */
export const getMetaValue = (metaData: any[] | undefined, key: string): any => {
  if (!metaData || !Array.isArray(metaData)) return undefined;
  
  const meta = metaData.find(item => item.key === key);
  return meta?.value;
};

/**
 * Gets an attribute value by name
 */
export const getAttributeValue = (attributes: any[] | undefined, name: string): string | undefined => {
  if (!attributes || !Array.isArray(attributes)) return undefined;
  
  const attribute = attributes.find(attr => attr.name === name);
  return attribute?.options?.[0];
};

/**
 * Logs API-related errors with additional context
 */
export const logApiError = (context: string, error: any): void => {
  console.error(`API Error [${context}]:`, {
    message: error.message,
    status: error.response?.status,
    data: error.response?.data,
    stack: error.stack?.split('\n').slice(0, 3).join('\n') // Show just first 3 lines of stack
  });
};

/**
 * Check API response validity
 */
export const isValidApiResponse = (data: any): boolean => {
  if (!data) return false;
  if (Array.isArray(data)) return true;
  if (typeof data === 'object' && Object.keys(data).length > 0) return true;
  return false;
};

/**
 * Helper to retry failed requests
 */
export const retryRequest = async <T>(
  requestFn: () => Promise<T>,
  maxRetries: number = 3
): Promise<T> => {
  let lastError: any;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await requestFn();
    } catch (error) {
      lastError = error;
      console.warn(`Request failed (attempt ${attempt}/${maxRetries}):`, error);
      
      // Wait with exponential backoff before retrying
      if (attempt < maxRetries) {
        const delay = Math.min(1000 * Math.pow(2, attempt - 1), 10000);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  throw lastError;
}; 