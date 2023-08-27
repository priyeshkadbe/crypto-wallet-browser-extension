// global.d.ts
declare global {
  interface Window {
    ethereum?: any; // Use 'any' if you don't want to specify a strict type
  }
}
