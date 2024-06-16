// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function handleAxiosError(error:any) : Error{
    if (error.response) {
      const errorMessage = typeof error.response.data === 'object'
      ? JSON.stringify(error.response.data)
      : error.response.data;
      return new Error(`Server responded with status ${error.response.status}: ${errorMessage}`);
    } else if (error.request) {
      return new Error('No response received: ' + error?.request);
    } else {
      return new Error('Error setting up request: ' + error?.message);
    }
  }