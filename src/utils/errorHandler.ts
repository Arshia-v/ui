export const handleError = (error: unknown, context: string) => {
  const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
  console.error(`Error in ${context}:`, errorMessage);
  return errorMessage;
};