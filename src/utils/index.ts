/**
 * Invokes func after wait milliseconds
 * @param timeout milliseconds
 */
export const delay = async (timeout: number) => new Promise(resolve => setTimeout(resolve, timeout))
