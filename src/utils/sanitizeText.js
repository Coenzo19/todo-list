export function sanitizeText(input) {
    
  if (typeof input !== "string") return "";
  return input.replace(/[^a-zA-Z0-9 ,'!-,?"]/g, '').trim();
  
}
